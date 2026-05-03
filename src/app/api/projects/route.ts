import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const projects = await db.project.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json(projects)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, liveUrl, githubUrl, imageUrl, techStack, featured, order } = body

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    const project = await db.project.create({
      data: {
        title,
        description: description ?? '',
        liveUrl: liveUrl ?? '',
        githubUrl: githubUrl ?? '',
        imageUrl: imageUrl ?? '',
        techStack: techStack ?? '',
        featured: featured ?? false,
        order: order ?? 0,
      },
    })

    return NextResponse.json(project, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, ...data } = body

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const project = await db.project.update({
      where: { id },
      data,
    })

    return NextResponse.json(project)
  } catch {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    await db.project.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}
