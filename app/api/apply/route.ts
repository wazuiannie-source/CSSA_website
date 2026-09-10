import { NextRequest } from 'next/server'
import { google } from 'googleapis'

const departmentSctKeys: Record<string, string | undefined> = {
  activity:   process.env.SCTKEY_ACTIVITY,
  career:     process.env.SCTKEY_CAREER,
  external:   process.env.SCTKEY_EXTERNAL,
  operations: process.env.SCTKEY_OPERATIONS,
  media:      process.env.SCTKEY_MEDIA,
  sports:     process.env.SCTKEY_SPORTS,
}

const departmentLabels: Record<string, string> = {
  activity:   '活动部 · Activities',
  career:     '职发部 · Career Development',
  external:   '外联部 · Business Development',
  operations: '运营部 · Operations',
  media:      '新媒体部 · New Media',
  sports:     '体育部 · Sports',
}

const MAX_RESUME_BYTES = 4 * 1024 * 1024

/**
 * Uploads via an Apps Script web app running as the Drive owner. The service
 * account cannot do this itself — service accounts have no storage quota, so
 * creating files in a personal Drive folder always fails.
 */
async function uploadResume(file: File): Promise<string> {
  const url = process.env.APPS_SCRIPT_UPLOAD_URL
  const secret = process.env.APPS_SCRIPT_SECRET
  if (!url || !secret) throw new Error('Resume upload is not configured')

  const buffer = Buffer.from(await file.arrayBuffer())
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret,
      filename: file.name,
      mimeType: file.type || 'application/octet-stream',
      data: buffer.toString('base64'),
    }),
  })

  if (!res.ok) throw new Error(`Resume upload failed (${res.status})`)

  const result = await res.json()
  if (!result.ok) throw new Error(`Resume upload failed: ${result.error}`)
  return result.url as string
}

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
}

async function sendWechatNotification(sctKey: string, title: string, content: string) {
  const body = new URLSearchParams({ title, desp: content })
  await fetch(`https://sctapi.ftqq.com/${sctKey}.send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const name         = formData.get('name') as string
    const major        = formData.get('major') as string
    const email        = formData.get('email') as string
    const wechat       = formData.get('wechat') as string
    const grade        = formData.get('grade') as string
    const firstChoice  = formData.get('firstChoice') as string
    const secondChoice = formData.get('secondChoice') as string | null
    const statement    = formData.get('statement') as string
    const resumeFile   = formData.get('resume') as File | null

    if (!name || !major || !email || !wechat || !grade || !firstChoice || !statement) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (resumeFile && resumeFile.size > MAX_RESUME_BYTES) {
      return Response.json({ error: '简历文件过大（上限 4MB）· Resume must be under 4MB' }, { status: 400 })
    }

    const firstLabel = departmentLabels[firstChoice] ?? firstChoice
    const secondLabel = secondChoice ? (departmentLabels[secondChoice] ?? secondChoice) : ''

    const resumeUrl = resumeFile && resumeFile.size > 0 ? await uploadResume(resumeFile) : ''

    // Append application to Google Sheet
    const sheets = google.sheets({ version: 'v4', auth: getAuth() })
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_APPLICATIONS_SHEET_ID!,
      range: `${process.env.GOOGLE_APPLICATIONS_SHEET_TAB ?? 'Sheet1'}!A:J`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          new Date().toLocaleString('zh-CN', { timeZone: 'America/Los_Angeles' }),
          name,
          major,
          email,
          wechat,
          grade,
          firstLabel,
          secondLabel,
          statement,
          resumeUrl,
        ]],
      },
    })

    // Send WeChat notification via Server酱
    const sctKey = departmentSctKeys[firstChoice]
    if (sctKey && !sctKey.startsWith('YOUR_')) {
      const content = [
        `**姓名 / Name:** ${name}`,
        `**专业 / Major:** ${major}`,
        `**微信 / WeChat:** ${wechat}`,
        `**年级 / Grade:** ${grade}`,
        `**第一志愿:** ${firstLabel}`,
        secondLabel ? `**第二志愿:** ${secondLabel}` : null,
        resumeUrl ? `**简历:** [查看简历](${resumeUrl})` : null,
      ].filter(Boolean).join('\n\n')

      await sendWechatNotification(sctKey, `📋 新申请 · ${name} → ${firstLabel}`, content)
    }

    return Response.json({ success: true })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : JSON.stringify(err)
    const details = typeof err === 'object' && err !== null ? JSON.stringify(err, Object.getOwnPropertyNames(err)) : String(err)
    console.error('Apply error:', msg, details)
    return Response.json({ error: 'Submission failed. Please try again.', details: msg }, { status: 500 })
  }
}
