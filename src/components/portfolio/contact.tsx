'use client'

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send,
  GraduationCap,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ContactSectionProps {
  siteInfo: Record<string, string>
}

export function ContactSection({ siteInfo }: ContactSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const [sending, setSending] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast({ title: 'Error', description: 'Please fill in all fields.', variant: 'destructive' })
      return
    }

    setSending(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        toast({ title: 'Message sent!', description: 'Thank you for reaching out.' })
        setForm({ name: '', email: '', message: '' })
      } else {
        toast({ title: 'Error', description: 'Failed to send message.', variant: 'destructive' })
      }
    } catch {
      toast({ title: 'Error', description: 'Network error.', variant: 'destructive' })
    } finally {
      setSending(false)
    }
  }

  const contactInfo = [
    { icon: Mail, label: 'Email', value: siteInfo.email || 'yousefhanafy325@gmail.com', href: `mailto:${siteInfo.email}` },
    { icon: Phone, label: 'Phone', value: siteInfo.phone || '+20 110 047 6722', href: `tel:${siteInfo.phone}` },
    { icon: MapPin, label: 'Location', value: siteInfo.location || 'Cairo, Egypt', href: undefined },
    { icon: Github, label: 'GitHub', value: 'Yousef0hanafy', href: siteInfo.github || 'https://github.com/Yousef0hanafy' },
    { icon: Linkedin, label: 'LinkedIn', value: 'youssef-hanafy', href: siteInfo.linkedin || 'https://linkedin.com/in/youssef-hanafy-7986342a8' },
    { icon: GraduationCap, label: 'University', value: 'Al-Azhar University', href: undefined },
  ]

  return (
    <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <div className="section-reveal">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-4 rounded-full" />
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-4">
            {contactInfo.map((item, idx) => (
              <Card key={idx} className="section-reveal border-primary/10 hover:border-primary/20 transition-colors" style={{ transitionDelay: `${idx * 0.1}s` }}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium hover:text-primary transition-colors truncate block"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium truncate">{item.value}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3 section-reveal">
            <Card className="border-primary/10">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project..."
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={sending}
                  >
                    {sending ? (
                      'Sending...'
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
