'use client'

import { useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Briefcase, MapPin, Calendar } from 'lucide-react'

interface Experience {
  id: string
  role: string
  company: string
  startDate: string
  endDate: string
  description: string
  current: boolean
  order: number
}

interface ExperienceSectionProps {
  experiences: Experience[]
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
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
    <section id="experience" className="py-20 sm:py-28 px-4 sm:px-6 bg-accent/30" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        <div className="section-reveal">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            My <span className="text-primary">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-12 rounded-full" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-primary/20" />

          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <div key={exp.id} className="section-reveal relative pl-12 sm:pl-20" style={{ transitionDelay: `${idx * 0.2}s` }}>
                {/* Timeline dot */}
                <div className="absolute left-2.5 sm:left-6.5 top-6 w-3 h-3 rounded-full bg-primary border-4 border-background" />

                <Card className="border-primary/10 hover:border-primary/20 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-primary">{exp.role}</h3>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Briefcase className="h-4 w-4" />
                          <span className="text-sm font-medium">{exp.company}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <Badge variant="secondary" className="text-xs">
                          {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                        </Badge>
                        {exp.current && (
                          <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-0 text-xs">
                            Current
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      {exp.description.split('. ').filter(Boolean).map((sentence, i) => (
                        <p key={i} className="text-sm text-muted-foreground leading-relaxed">
                          {sentence.endsWith('.') ? sentence : sentence + '.'}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {experiences.length === 0 && (
          <p className="text-center text-muted-foreground">No experience entries yet.</p>
        )}
      </div>
    </section>
  )
}
