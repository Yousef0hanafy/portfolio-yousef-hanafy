import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const recommendations = await db.recommendation.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json(recommendations)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch recommendations' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, role, company, text, avatarUrl, order } = body

    if (!name || !text) {
      return NextResponse.json({ error: 'Name and text are required' }, { status: 400 })
    }

    const recommendation = await db.recommendation.create({
      data: {
        name,
        role: role ?? '',
        company: company ?? '',
        text,
        avatarUrl: avatarUrl ?? '',
        order: order ?? 0,
      },
    })

    return NextResponse.json(recommendation, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create recommendation' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, ...data } = body

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const recommendation = await db.recommendation.update({
      where: { id },
      data,
    })

    return NextResponse.json(recommendation)
  } catch {
    return NextResponse.json({ error: 'Failed to update recommendation' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    await db.recommendation.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete recommendation' }, { status: 500 })
  }
}
