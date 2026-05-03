'use client'

import { useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Award, Building2, Calendar, Star } from 'lucide-react'

interface Certification {
  id: string
  title: string
  issuer: string
  date: string
  score: string
  order: number
}

interface CertificationsSectionProps {
  certifications: Certification[]
}

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
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
    <section id="certifications" className="py-20 sm:py-28 px-4 sm:px-6" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <div className="section-reveal">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            My <span className="text-primary">Certifications</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-12 rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => (
            <Card
              key={cert.id}
              className="section-reveal border-primary/10 hover:border-primary/20 hover:shadow-md hover:shadow-primary/5 transition-all duration-300"
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
                    <Award className="h-5 w-5" />
                  </div>
                  <div className="space-y-2 min-w-0">
                    <h3 className="font-bold text-base leading-tight">{cert.title}</h3>
                    <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                      <Building2 className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{cert.issuer}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                        <Calendar className="h-3 w-3" />
                        {cert.date}
                      </div>
                      {cert.score && (
                        <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                          <Star className="h-3 w-3 mr-1" />
                          {cert.score}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
