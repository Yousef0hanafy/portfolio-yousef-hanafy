'use client'

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { GraduationCap, Code, FolderGit2, Trophy } from 'lucide-react'

interface AboutSectionProps {
  aboutText: string
}

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const steps = 60
          const increment = target / steps
          let current = 0

          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <div ref={ref} className="text-3xl sm:text-4xl font-bold text-primary">
      {count}
      {suffix}
    </div>
  )
}

const stats = [
  { icon: FolderGit2, value: 15, suffix: '+', label: 'Projects' },
  { icon: Code, value: 500, suffix: '+', label: 'Coding Hours' },
  { icon: FolderGit2, value: 26, suffix: '+', label: 'Repositories' },
  { icon: Trophy, value: 96, suffix: '%', label: 'Diploma Score' },
]

export function AboutSection({ aboutText }: AboutSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-20 sm:py-28 px-4 sm:px-6" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <div className="section-reveal">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-12 rounded-full" />
        </div>

        <div className="section-reveal grid lg:grid-cols-5 gap-10 items-center">
          {/* Avatar and Education */}
          <div className="lg:col-span-2 flex flex-col items-center text-center">
            <Avatar className="h-40 w-40 mb-6 border-4 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary text-3xl font-bold">
                YH
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-2 text-muted-foreground">
              <GraduationCap className="h-4 w-4" />
              <span className="text-sm">
                Al-Azhar University — Systems & Computers Engineering
              </span>
            </div>
            <span className="text-xs text-muted-foreground mt-1">2023 — 2027</span>
          </div>

          {/* Bio */}
          <div className="lg:col-span-3">
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg mb-8">
              {aboutText}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((stat, idx) => (
                <Card key={idx} className="bg-accent/50 border-primary/10 text-center">
                  <CardContent className="p-4">
                    <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
