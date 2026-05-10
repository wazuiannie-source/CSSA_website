import { google } from 'googleapis'
import { NextRequest, NextResponse } from 'next/server'

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive',
]

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: SCOPES,
  })
}

async function uploadPhotoToDrive(
  drive: ReturnType<typeof google.drive>,
  base64: string,
  filename: string,
  folderId: string
): Promise<string> {
  const base64Data = base64.replace(/^data:image\/\w+;base64,/, '')
  const buffer = Buffer.from(base64Data, 'base64')
  const mimeType = base64.match(/data:(image\/\w+);/)?.[1] ?? 'image/jpeg'

  const res = await drive.files.create({
    supportsAllDrives: true,
    requestBody: {
      name: filename,
      parents: [folderId],
    },
    media: {
      mimeType,
      body: require('stream').Readable.from(buffer),
    },
    fields: 'id, webViewLink',
  })

  // Make file publicly viewable
  await drive.permissions.create({
    fileId: res.data.id!,
    supportsAllDrives: true,
    requestBody: { role: 'reader', type: 'anyone' },
  })

  return res.data.webViewLink ?? ''
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, major, socials, tags, photos } = body

    const auth = getAuth()
    const drive = google.drive({ version: 'v3', auth })
    const sheets = google.sheets({ version: 'v4', auth })

    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID!
    const sheetId = process.env.GOOGLE_SHEET_ID!

    // Upload photos to Drive (optional — skip if folder not accessible)
    const photoLinks: string[] = []
    for (let i = 0; i < photos.length; i++) {
      if (photos[i]) {
        try {
          const ext = photos[i].match(/data:image\/(\w+);/)?.[1] ?? 'jpg'
          const link = await uploadPhotoToDrive(drive, photos[i], `${name}_${i + 1}.${ext}`, folderId)
          photoLinks.push(link)
        } catch {
          photoLinks.push('(upload failed)')
        }
      } else {
        photoLinks.push('')
      }
    }

    // Format socials
    const socialText = (socials as { type: string; value: string }[])
      .map(s => s.type === 'prefer_not' ? 'Prefer not to say' : `${s.type}: ${s.value}`)
      .join(' | ')

    // Append row to Google Sheets
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Form Responses 2!A:H',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          new Date().toLocaleString('zh-CN', { timeZone: 'America/Los_Angeles' }),
          name,
          major,
          socialText,
          tags,
          photoLinks[0] ?? '',
          photoLinks[1] ?? '',
          photoLinks[2] ?? '',
        ]],
      },
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}
