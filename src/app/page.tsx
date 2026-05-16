'use client'

import { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Navbar } from '@/components/portfolio/navbar'
import { HeroSection } from '@/components/portfolio/hero'
import { AboutSection } from '@/components/portfolio/about'
import { SkillsSection } from '@/components/portfolio/skills'
import { ProjectsSection } from '@/components/portfolio/projects'
import { ExperienceSection } from '@/components/portfolio/experience'
import { CertificationsSection } from '@/components/portfolio/certifications'
import { RecommendationsSection } from '@/components/portfolio/recommendations'
import { ContactSection } from '@/components/portfolio/contact'
import { Footer } from '@/components/portfolio/footer'
import { AdminPanel } from '@/components/admin/admin-panel'
import { WhatsAppButton } from '@/components/whatsapp-button'

interface SiteInfo {
  siteTitle?: string
  siteSubtitle?: string
  aboutText?: string
  email?: string
  phone?: string
  github?: string
  linkedin?: string
  location?: string
  [key: string]: string | undefined
}

interface Skill {
  id: string
  name: string
  category: string
  level: number
  order: number
}

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

interface Certification {
  id: string
  title: string
  issuer: string
  date: string
  score: string
  order: number
}

interface Recommendation {
  id: string
  name: string
  role: string
  company: string
  text: string
  avatarUrl: string
  order: number
}

export default function Home() {
  const [adminOpen, setAdminOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [siteInfo, setSiteInfo] = useState<SiteInfo>({})
  const [skills, setSkills] = useState<Skill[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])

  useEffect(() => {
    // Check URL hash for admin
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setAdminOpen(true)
      }
    }
    checkHash()
    window.addEventListener('hashchange', checkHash)
    return () => window.removeEventListener('hashchange', checkHash)
  }, [])

  // Global IntersectionObserver for .section-reveal elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    // Observe all current .section-reveal elements
    const elements = document.querySelectorAll('.section-reveal')
    elements.forEach((el) => observer.observe(el))

    // Also observe elements added after initial render (MutationObserver)
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            if (node.classList?.contains('section-reveal')) {
              observer.observe(node)
            }
            node.querySelectorAll?.('.section-reveal')?.forEach((el) => {
              observer.observe(el)
            })
          }
        })
      })
    })
    const target = document.getElementById('portfolio-content')
    if (target) {
      mutationObserver.observe(target, { childList: true, subtree: true })
    }

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [loading])

  useEffect(() => {
    async function fetchData() {
      try {
        const [siRes, skRes, prRes, exRes, ceRes, reRes] = await Promise.all([
          fetch('/api/site-info'),
          fetch('/api/skills'),
          fetch('/api/projects'),
          fetch('/api/experience'),
          fetch('/api/certifications'),
          fetch('/api/recommendations'),
        ])

        const si = await siRes.json()
        const sk = await skRes.json()
        const pr = await prRes.json()
        const ex = await exRes.json()
        const ce = await ceRes.json()
        const re = await reRes.json()

        setSiteInfo(si)
        setSkills(Array.isArray(sk) ? sk : [])
        setProjects(Array.isArray(pr) ? pr : [])
        setExperiences(Array.isArray(ex) ? ex : [])
        setCertifications(Array.isArray(ce) ? ce : [])
        setRecommendations(Array.isArray(re) ? re : [])
      } catch (err) {
        console.error('Failed to fetch portfolio data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="flex flex-col items-center gap-8">
            <Skeleton className="h-12 w-64 rounded-lg" />
            <Skeleton className="h-8 w-96 rounded-lg" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-64 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (adminOpen) {
    return <AdminPanel isOpen={adminOpen} onClose={() => setAdminOpen(false)} />
  }

  return (
    <main id="portfolio-content" className="min-h-screen flex flex-col">
      <Navbar onAdminClick={() => setAdminOpen(true)} />

      <HeroSection />
      <AboutSection aboutText={siteInfo.aboutText || ''} />
      <SkillsSection skills={skills} />
      <ProjectsSection projects={projects} />
      <ExperienceSection experiences={experiences} />
      <CertificationsSection certifications={certifications} />
      <RecommendationsSection recommendations={recommendations} />
      <ContactSection siteInfo={siteInfo} />

      <div className="mt-auto">
        <Footer />
      </div>
      <WhatsAppButton />
    </main>
  )
}
