import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const experiences = await db.experience.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json(experiences)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { role, company, startDate, endDate, description, current, order } = body

    if (!role || !company) {
      return NextResponse.json({ error: 'Role and company are required' }, { status: 400 })
    }

    const experience = await db.experience.create({
      data: {
        role,
        company,
        startDate: startDate ?? '',
        endDate: endDate ?? '',
        description: description ?? '',
        current: current ?? false,
        order: order ?? 0,
      },
    })

    return NextResponse.json(experience, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, ...data } = body

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const experience = await db.experience.update({
      where: { id },
      data,
    })

    return NextResponse.json(experience)
  } catch {
    return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    await db.experience.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 })
  }
}
