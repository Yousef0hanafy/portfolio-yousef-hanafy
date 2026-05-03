'use client'

import { useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Code2,
  Layout,
  Wrench,
  Globe,
  Layers,
  Lightbulb,
  Heart,
} from 'lucide-react'

interface Skill {
  id: string
  name: string
  category: string
  level: number
  order: number
}

interface SkillsSectionProps {
  skills: Skill[]
}

const categoryIcons: Record<string, React.ElementType> = {
  'Languages': Code2,
  'Frameworks': Layers,
  'Tools': Wrench,
  'Web & APIs': Globe,
  'CSS & Layout': Layout,
  'Concepts': Lightbulb,
  'Soft Skills': Heart,
}

const categoryColors: Record<string, string> = {
  'Languages': 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  'Frameworks': 'bg-green-500/10 text-green-600 dark:text-green-400',
  'Tools': 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  'Web & APIs': 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  'CSS & Layout': 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
  'Concepts': 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
  'Soft Skills': 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
}

export function SkillsSection({ skills }: SkillsSectionProps) {
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

  // Group skills by category
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {})

  const categories = Object.keys(grouped).sort()

  return (
    <section id="skills" className="py-20 sm:py-28 px-4 sm:px-6 bg-accent/30" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <div className="section-reveal">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            My <span className="text-primary">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-4 rounded-full" />
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="space-y-8">
          {categories.map((category, catIdx) => {
            const Icon = categoryIcons[category] || Code2
            const colorClass = categoryColors[category] || 'bg-primary/10 text-primary'
            const catSkills = grouped[category]

            return (
              <div key={category} className="section-reveal" style={{ transitionDelay: `${catIdx * 0.1}s` }}>
                <Card className="border-primary/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <div className={`p-2 rounded-lg ${colorClass}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      {category}
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {catSkills.length} skills
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                      {catSkills.map((skill) => (
                        <div key={skill.id} className="space-y-1.5">
                          <div className="flex justify-between items-center text-sm">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-xs text-muted-foreground">{skill.level}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-primary transition-all duration-1000 ease-out"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
