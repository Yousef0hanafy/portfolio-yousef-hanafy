'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowDown, Download } from 'lucide-react'

const roles = ['Front-End Developer', 'React Developer', 'UI/UX Enthusiast', 'Web Developer']

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentRole = roles[roleIndex]
    let timeout: NodeJS.Timeout

    if (!isDeleting && text === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && text === '') {
      timeout = setTimeout(() => {
        setIsDeleting(false)
        setRoleIndex((prev) => (prev + 1) % roles.length)
      }, 50)
    } else {
      timeout = setTimeout(() => {
        setText(
          isDeleting
            ? currentRole.substring(0, text.length - 1)
            : currentRole.substring(0, text.length + 1)
        )
      }, isDeleting ? 50 : 100)
    }

    return () => clearTimeout(timeout)
  }, [text, isDeleting, roleIndex])

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-purple-800/10 dark:from-purple-950/50 dark:via-background dark:to-purple-900/30 animate-gradient" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="animate-fade-in-up opacity-0 stagger-1">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Available for opportunities
          </div>
        </div>

        <h1 className="animate-fade-in-up opacity-0 stagger-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
          Hi, I&apos;m{' '}
          <span className="text-primary">Youssef</span>
        </h1>

        <div className="animate-fade-in-up opacity-0 stagger-3 h-10 sm:h-12 flex items-center justify-center mb-6">
          <span className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-medium">
            {text}
            <span className="animate-blink text-primary">|</span>
          </span>
        </div>

        <p className="animate-fade-in-up opacity-0 stagger-4 text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-8">
          Building clean, responsive, user-focused web experiences with modern technologies.
        </p>

        <div className="animate-fade-in-up opacity-0 stagger-5 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            onClick={scrollToProjects}
            className="w-full sm:w-auto px-8 py-6 text-base bg-primary hover:bg-primary/90"
          >
            View Projects
            <ArrowDown className="ml-2 h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="w-full sm:w-auto px-8 py-6 text-base"
          >
            <a href="/api/cv" target="_blank" rel="noopener noreferrer">
              Download CV
              <Download className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
