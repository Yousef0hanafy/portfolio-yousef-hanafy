'use client'

import { useEffect, useRef, useState } from 'react'
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
  featured: boolean
  order: number
}

interface ProjectsSectionProps {
  projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState('All')

  // Extract unique tech categories from projects
  const allTechs = projects.flatMap((p) => p.techStack.split(',').map((t) => t.trim()))
  const uniqueTechs = [...new Set(allTechs)].slice(0, 12)

  const filters = ['All', ...uniqueTechs]

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter((p) => p.techStack.toLowerCase().includes(filter.toLowerCase()))

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

        {/* Filters */}
        <div className="section-reveal flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <Button
              key={f}
              variant={filter === f ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(f)}
              className="text-xs"
            >
              {f}
            </Button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
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
          ))}
        </div>
      </div>
    </section>
  )
}
