'use client'

import { Code2, Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Code2 className="h-4 w-4 text-primary" />
          <span>&copy; {new Date().getFullYear()} Youssef Mahmoud Hanafy</span>
        </div>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          Built with <Heart className="h-3 w-3 text-primary fill-primary" /> using Next.js & Tailwind CSS
        </p>
      </div>
    </footer>
  )
}
