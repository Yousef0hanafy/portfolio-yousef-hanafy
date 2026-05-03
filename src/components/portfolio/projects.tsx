'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github, Star } from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  liveUrl: string
  githubUrl: string
  imageUrl: string
  techStack: string
  category: string
  featured: boolean
  order: number
}

interface ProjectsSectionProps {
  projects: Project[]
}

const CATEGORY_CONFIG: Record<string, { label: string; color: string }> = {
  'fullstack': { label: 'Fullstack', color: 'bg-[#4b2bab]/15 text-[#4b2bab] dark:text-[#9b85e8]' },
  'big-frontend': { label: 'Big Frontend', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  'mini-frontend': { label: 'Mini Frontend', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState('all')

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: projects.length }
    for (const p of projects) {
      counts[p.category] = (counts[p.category] || 0) + 1
    }
    return counts
  }, [projects])

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'fullstack', label: 'Fullstack' },
    { key: 'big-frontend', label: 'Big Frontend' },
    { key: 'mini-frontend', label: 'Mini Frontend' },
  ]

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter((p) => p.category === filter)

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
    <section id="projects" className="py-20 sm:py-28 px-4 sm:px-6" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <div className="section-reveal">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            My <span className="text-primary">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-4 rounded-full" />
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            A showcase of my recent work and side projects
          </p>
        </div>

        {/* Category Filters */}
        <div className="section-reveal flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => {
            const count = categoryCounts[f.key] || 0
            return (
              <Button
                key={f.key}
                variant={filter === f.key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(f.key)}
                className="text-xs rounded-full px-4 transition-all duration-200"
                style={filter === f.key ? { backgroundColor: '#4b2bab' } : undefined}
              >
                {f.label}
                <span className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full ${
                  filter === f.key
                    ? 'bg-white/20 text-white'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {count}
                </span>
              </Button>
            )
          })}
        </div>

        {/* Projects grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => {
            const catConfig = CATEGORY_CONFIG[project.category]
            return (
              <Card
                key={project.id}
                className="group section-reveal overflow-hidden border-primary/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                style={{ transitionDelay: `${idx * 0.1}s` }}
              >
                {/* Project image placeholder */}
                <div className="h-44 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center relative overflow-hidden">
                  <div className="text-primary/20 text-6xl font-bold">
                    {project.title.charAt(0)}
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full ${catConfig?.color || 'bg-muted text-muted-foreground'}`}>
                      {catConfig?.label || project.category}
                    </span>
                  </div>
                  {project.featured && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-primary text-primary-foreground text-xs">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-5">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.split(',').slice(0, 4).map((tech) => (
                      <Badge key={tech.trim()} variant="secondary" className="text-xs">
                        {tech.trim()}
                      </Badge>
                    ))}
                    {project.techStack.split(',').length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.techStack.split(',').length - 4}
                      </Badge>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="px-5 pb-5 pt-0 gap-2">
                  {project.liveUrl && (
                    <Button size="sm" variant="outline" asChild className="flex-1 text-xs">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button size="sm" variant="outline" asChild className="flex-1 text-xs">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-3.5 w-3.5 mr-1.5" />
                        GitHub
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            )
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg">No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  )
}
