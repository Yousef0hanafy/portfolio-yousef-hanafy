import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 })
    }

    // Store message in database
    await db.contactMessage.create({
      data: { name, email, message },
    })

    // Send email to yousefhanafy325@gmail.com via FormSubmit.co
    try {
      const emailRes = await fetch('https://formsubmit.co/ajax/yousefhanafy325@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
          _subject: `Portfolio Contact: Message from ${name}`,
          _template: 'table',
          _captcha: 'false',
        }),
      })
      const emailData = await emailRes.json()
      console.log('Email sent:', emailData)
    } catch (emailErr) {
      console.error('Email send failed (message still saved):', emailErr)
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
