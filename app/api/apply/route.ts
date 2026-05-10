import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

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

const departmentChinese: Record<string, string> = {
  activity:   '活动部',
  career:     '职发部',
  external:   '外联部',
  operations: '运营部',
  media:      '新媒体部',
  sports:     '体育部',
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

    // Upload resume to Supabase Storage if provided
    let resumeUrl: string | null = null
    if (resumeFile && resumeFile.size > 0) {
      const ext = resumeFile.name.split('.').pop()
      const path = `${Date.now()}-${name.replace(/\s+/g, '_')}.${ext}`
      const { error: uploadError } = await supabaseAdmin.storage
        .from('resumes')
        .upload(path, resumeFile)

      if (uploadError) throw uploadError

      const { data: urlData } = supabaseAdmin.storage.from('resumes').getPublicUrl(path)
      resumeUrl = urlData.publicUrl
    }

    // Save application to database
    const { error: dbError } = await supabaseAdmin.from('applications').insert({
      name,
      major,
      email,
      wechat,
      grade,
      first_choice: departmentChinese[firstChoice] ?? firstChoice,
      second_choice: secondChoice ? (departmentChinese[secondChoice] ?? secondChoice) : null,
      personal_statement: statement,
      resume_url: resumeUrl,
      status: 'pending',
    })

    if (dbError) throw dbError

    // Send WeChat notification via Server酱
    const sctKey = departmentSctKeys[firstChoice]
    if (sctKey && !sctKey.startsWith('YOUR_')) {
      const deptLabel = departmentLabels[firstChoice]
      const secondLabel = secondChoice ? departmentLabels[secondChoice] : null
      const content = [
        `**姓名 / Name:** ${name}`,
        `**专业 / Major:** ${major}`,
        `**微信 / WeChat:** ${wechat}`,
        `**年级 / Grade:** ${grade}`,
        `**第一志愿:** ${deptLabel}`,
        secondLabel ? `**第二志愿:** ${secondLabel}` : null,
        resumeUrl ? `**简历:** [查看简历](${resumeUrl})` : null,
      ].filter(Boolean).join('\n\n')

      await sendWechatNotification(sctKey, `📋 新申请 · ${name} → ${deptLabel}`, content)
    }

    return Response.json({ success: true })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : JSON.stringify(err)
    const details = typeof err === 'object' && err !== null ? JSON.stringify(err, Object.getOwnPropertyNames(err)) : String(err)
    console.error('Apply error:', msg, details)
    return Response.json({ error: 'Submission failed. Please try again.', details: msg }, { status: 500 })
  }
}
