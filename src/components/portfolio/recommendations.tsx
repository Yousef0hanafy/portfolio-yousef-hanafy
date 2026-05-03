'use client'

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react'

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
    }, 6000)
    return () => clearInterval(timer)
  }, [recommendations.length])

  const prev = () => setCurrent((c) => (c - 1 + recommendations.length) % recommendations.length)
  const next = () => setCurrent((c) => (c + 1) % recommendations.length)

  if (recommendations.length === 0) return null

  const rec = recommendations[current]

  return (
    <section id="recommendations" className="py-20 sm:py-28 px-4 sm:px-6" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        <div className="section-reveal">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            What People <span className="text-primary">Say</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-4 rounded-full" />
          <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
            Recommendations from colleagues and instructors I&apos;ve worked with
          </p>
        </div>

        <div className="section-reveal relative">
          {/* Main Card */}
          <Card className="border-primary/10 overflow-hidden">
            {/* Purple accent bar at top */}
            <div className="h-1 bg-gradient-to-r from-primary via-primary/60 to-primary/20" />

            <CardContent className="p-6 sm:p-10">
              {/* Quote icon */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Quote className="h-12 w-12 text-primary/15" />
                  <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary/20" />
                </div>
              </div>

              {/* Quote text */}
              <blockquote className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 text-center max-w-2xl mx-auto">
                &ldquo;{rec.text}&rdquo;
              </blockquote>

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Divider */}
              <div className="w-16 h-px bg-primary/20 mx-auto mb-6" />

              {/* Person info */}
              <div className="flex flex-col items-center gap-3">
                <Avatar className="h-14 w-14 border-2 border-primary/20 shadow-md shadow-primary/10">
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5 text-primary font-bold text-lg">
                    {rec.name.split(' ').map((n) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <p className="font-bold text-base">{rec.name}</p>
                  <p className="text-sm text-primary font-medium">
                    {rec.role}
                  </p>
                  {rec.company && (
                    <p className="text-xs text-muted-foreground mt-0.5">{rec.company}</p>
                  )}
                </div>
              </div>

              {/* Navigation */}
              {recommendations.length > 1 && (
                <div className="flex items-center justify-center gap-4 mt-8">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prev}
                    className="rounded-full h-9 w-9 border-primary/20 hover:bg-primary/10 hover:border-primary/40"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex gap-2">
                    {recommendations.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          idx === current
                            ? 'bg-primary w-6'
                            : 'bg-primary/20 hover:bg-primary/40 w-2'
                        }`}
                      />
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={next}
                    className="rounded-full h-9 w-9 border-primary/20 hover:bg-primary/10 hover:border-primary/40"
                  >
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
