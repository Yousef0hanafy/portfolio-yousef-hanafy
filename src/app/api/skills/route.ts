import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const skills = await db.skill.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json(skills)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, category, level, order } = body

    if (!name || !category || level === undefined) {
      return NextResponse.json({ error: 'Name, category, and level are required' }, { status: 400 })
    }

    const skill = await db.skill.create({
      data: { name, category, level: Number(level), order: order ?? 0 },
    })

    return NextResponse.json(skill, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, name, category, level, order } = body

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const skill = await db.skill.update({
      where: { id },
      data: { name, category, level: level !== undefined ? Number(level) : undefined, order: order !== undefined ? Number(order) : undefined },
    })

    return NextResponse.json(skill)
  } catch {
    return NextResponse.json({ error: 'Failed to update skill' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    await db.skill.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete skill' }, { status: 500 })
  }
}
