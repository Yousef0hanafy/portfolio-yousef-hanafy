'use client'

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'

interface Recommendation {
  id: string
  name: string
  role: string
  company: string
  text: string
  avatarUrl: string
  order: number
}

interface RecommendationsSectionProps {
  recommendations: Recommendation[]
}

export function RecommendationsSection({ recommendations }: RecommendationsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)

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

  // Auto scroll
  useEffect(() => {
    if (recommendations.length <= 1) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % recommendations.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [recommendations.length])

  const prev = () => setCurrent((c) => (c - 1 + recommendations.length) % recommendations.length)
  const next = () => setCurrent((c) => (c + 1) % recommendations.length)

  if (recommendations.length === 0) return null

  const rec = recommendations[current]

  return (
    <section id="recommendations" className="py-20 sm:py-28 px-4 sm:px-6 bg-accent/30" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        <div className="section-reveal">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            <span className="text-primary">Recommendations</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-12 rounded-full" />
        </div>

        <div className="section-reveal relative">
          <Card className="border-primary/10 py-8 px-6 sm:px-12">
            <CardContent className="p-0 text-center">
              <Quote className="h-10 w-10 text-primary/20 mx-auto mb-6" />

              <blockquote className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 italic">
                &ldquo;{rec.text}&rdquo;
              </blockquote>

              <div className="flex flex-col items-center gap-2">
                <Avatar className="h-12 w-12 border-2 border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {rec.name.split(' ').map((n) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{rec.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {rec.role}{rec.company ? ` at ${rec.company}` : ''}
                  </p>
                </div>
              </div>

              {/* Navigation */}
              {recommendations.length > 1 && (
                <div className="flex items-center justify-center gap-4 mt-8">
                  <Button variant="ghost" size="icon" onClick={prev} className="rounded-full">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex gap-2">
                    {recommendations.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === current ? 'bg-primary w-6' : 'bg-primary/30'
                        }`}
                      />
                    ))}
                  </div>
                  <Button variant="ghost" size="icon" onClick={next} className="rounded-full">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
