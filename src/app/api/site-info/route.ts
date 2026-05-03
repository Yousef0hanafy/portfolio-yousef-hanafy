import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const siteInfos = await db.siteInfo.findMany()
    const mapped: Record<string, string> = {}
    for (const info of siteInfos) {
      mapped[info.key] = info.value
    }
    return NextResponse.json(mapped)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch site info' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { key, value } = body

    if (!key || value === undefined) {
      return NextResponse.json({ error: 'Key and value are required' }, { status: 400 })
    }

    const info = await db.siteInfo.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    })

    return NextResponse.json(info)
  } catch {
    return NextResponse.json({ error: 'Failed to update site info' }, { status: 500 })
  }
}
