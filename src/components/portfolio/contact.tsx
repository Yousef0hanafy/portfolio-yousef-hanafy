'use client'

import { useRef, useState } from 'react'
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
        toast({ title: 'Message sent!', description: 'Thank you for reaching out. I\'ll get back to you soon!' })
        setForm({ name: '', email: '', message: '' })
      } else {
        toast({ title: 'Error', description: 'Failed to send message. Try again.', variant: 'destructive' })
      }
    } catch {
      toast({ title: 'Error', description: 'Network error.', variant: 'destructive' })
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        <div className="section-reveal">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-10 rounded-full" />
        </div>

        <div className="section-reveal grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="border-primary/10">
            <CardContent className="p-5">
              <h3 className="font-semibold mb-4 text-lg">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="message" className="text-xs">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project..."
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    className="text-sm"
                  />
                </div>
                <Button
                  type="submit"
                  size="sm"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={sending}
                >
                  {sending ? 'Sending...' : (
                    <>
                      Send <Send className="ml-1.5 h-3.5 w-3.5" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info - compact */}
          <div className="space-y-3">
            <h3 className="font-semibold mb-4 text-lg">Contact Info</h3>

            {[
              { icon: Mail, label: 'Email', value: siteInfo.email || 'yousefhanafy325@gmail.com', href: `mailto:${siteInfo.email || 'yousefhanafy325@gmail.com'}` },
              { icon: Phone, label: 'Phone', value: siteInfo.phone || '+20 110 047 6722', href: `tel:${siteInfo.phone || '+201100476722'}` },
              { icon: MapPin, label: 'Location', value: siteInfo.location || 'Cairo, Egypt', href: undefined },
              { icon: Github, label: 'GitHub', value: 'Yousef0hanafy', href: 'https://github.com/Yousef0hanafy' },
              { icon: Linkedin, label: 'LinkedIn', value: 'youssef-hanafy', href: 'https://linkedin.com/in/youssef-hanafy-7986342a8' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="section-reveal flex items-center gap-3 p-3 rounded-lg border border-primary/10 hover:border-primary/20 transition-colors"
                style={{ transitionDelay: `${idx * 0.05}s` }}
              >
                <div className="p-2 rounded-md bg-primary/10 text-primary shrink-0">
                  <item.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-muted-foreground leading-none">{item.label}</p>
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
