import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const certifications = await db.certification.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json(certifications)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch certifications' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, issuer, date, score, order } = body

    if (!title || !issuer) {
      return NextResponse.json({ error: 'Title and issuer are required' }, { status: 400 })
    }

    const certification = await db.certification.create({
      data: {
        title,
        issuer,
        date: date ?? '',
        score: score ?? '',
        order: order ?? 0,
      },
    })

    return NextResponse.json(certification, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create certification' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, ...data } = body

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const certification = await db.certification.update({
      where: { id },
      data,
    })

    return NextResponse.json(certification)
  } catch {
    return NextResponse.json({ error: 'Failed to update certification' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    await db.certification.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete certification' }, { status: 500 })
  }
}
