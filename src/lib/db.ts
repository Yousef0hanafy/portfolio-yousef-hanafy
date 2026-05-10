import { PrismaClient } from '@prisma/client'

const databaseUrl = process.env.DATABASE_URL || ''

function createPrismaClient(): PrismaClient {
  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not set')
  }

  // For PostgreSQL (Vercel/Neon deployment)
  if (databaseUrl.startsWith('postgresql://') || databaseUrl.startsWith('postgres://')) {
    const { Pool, neonConfig } = require('@neondatabase/serverless')
    const { PrismaNeon } = require('@prisma/adapter-neon')

    try {
      neonConfig.webSocketConstructor = require('ws')
    } catch {}

    // Clean connection string
    const cleanUrl = databaseUrl
      .replace(/channel_binding=[^&]*&?/g, '')
      .replace(/[?&]$/, '')

    const pool = new Pool({ connectionString: cleanUrl })
    const adapter = new PrismaNeon(pool)

    return new PrismaClient({ adapter } as any)
  }

  // For SQLite (local development)
  return new PrismaClient({
    log: ['query'],
  })
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
