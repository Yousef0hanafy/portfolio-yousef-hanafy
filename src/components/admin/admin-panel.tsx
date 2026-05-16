'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useToast } from '@/hooks/use-toast'
import {
  X,
  Lock,
  LayoutDashboard,
  Settings,
  Code2,
  FolderGit2,
  Briefcase,
  Award,
  MessageSquareQuote,
  Plus,
  Pencil,
  Trash2,
  ArrowUp,
  ArrowDown,
  LogOut,
  Loader2,
  Save,
} from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// Types
interface SiteInfo { key: string; value: string }
interface Skill { id: string; name: string; category: string; level: number; order: number }
interface Project { id: string; title: string; description: string; liveUrl: string; githubUrl: string; imageUrl: string; techStack: string; category: string; featured: boolean; order: number }
interface Experience { id: string; role: string; company: string; startDate: string; endDate: string; description: string; current: boolean; order: number }
interface Certification { id: string; title: string; issuer: string; date: string; score: string; order: number }
interface Recommendation { id: string; name: string; role: string; company: string; text: string; avatarUrl: string; order: number }

type TabId = 'dashboard' | 'siteinfo' | 'skills' | 'projects' | 'experience' | 'certifications' | 'recommendations'

const SIDEBAR_TABS: { id: TabId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'siteinfo', label: 'Site Info', icon: Settings },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'recommendations', label: 'Recommendations', icon: MessageSquareQuote },
]

interface AdminPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<TabId>('dashboard')

  // Data
  const [siteInfo, setSiteInfo] = useState<SiteInfo[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])

  // Dialogs
  const [editDialog, setEditDialog] = useState<{ open: boolean; type: string; data: any }>({ open: false, type: '', data: null })
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; type: string; id: string }>({ open: false, type: '', id: '' })

  const { toast } = useToast()

  const handleLogin = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        setAuthenticated(true)
        loadAllData()
      } else {
        toast({ title: 'Invalid password', variant: 'destructive' })
      }
    } catch {
      toast({ title: 'Login failed', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  const loadAllData = useCallback(async () => {
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

      setSiteInfo(Object.entries(si).map(([key, value]) => ({ key, value: value as string })))
      setSkills(Array.isArray(sk) ? sk : [])
      setProjects(Array.isArray(pr) ? pr : [])
      setExperiences(Array.isArray(ex) ? ex : [])
      setCertifications(Array.isArray(ce) ? ce : [])
      setRecommendations(Array.isArray(re) ? re : [])
    } catch (err) {
      toast({ title: 'Failed to load data', variant: 'destructive' })
    }
  }, [toast])

  useEffect(() => {
    if (authenticated) loadAllData()
  }, [authenticated, loadAllData])

  const handleClose = () => {
    onClose()
  }

  const handleLogout = () => {
    setAuthenticated(false)
    setPassword('')
    handleClose()
  }

  // Reorder helper
  const handleReorder = async (type: string, id: string, direction: 'up' | 'down') => {
    const list = type === 'skills' ? skills : type === 'projects' ? projects : type === 'experience' ? experiences : type === 'certifications' ? certifications : recommendations
    const idx = list.findIndex((item: any) => item.id === id)
    if (idx < 0) return
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1
    if (swapIdx < 0 || swapIdx >= list.length) return

    const item = list[idx]
    const swapItem = list[swapIdx]
    const newOrder = swapItem.order
    const swapOrder = item.order

    const endpoint = `/api/${type === 'experience' ? 'experience' : type === 'certifications' ? 'certifications' : type === 'recommendations' ? 'recommendations' : type === 'skills' ? 'skills' : 'projects'}`

    try {
      await Promise.all([
        fetch(endpoint, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: item.id, order: newOrder }) }),
        fetch(endpoint, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: swapItem.id, order: swapOrder }) }),
      ])
      loadAllData()
    } catch {
      toast({ title: 'Reorder failed', variant: 'destructive' })
    }
  }

  // Delete helper
  const handleDelete = async () => {
    const { type, id } = deleteDialog
    const endpoint = `/api/${type === 'experience' ? 'experience' : type === 'certifications' ? 'certifications' : type === 'recommendations' ? 'recommendations' : type === 'skills' ? 'skills' : 'projects'}`

    try {
      await fetch(`${endpoint}?id=${id}`, { method: 'DELETE' })
      toast({ title: 'Deleted successfully' })
      loadAllData()
    } catch {
      toast({ title: 'Delete failed', variant: 'destructive' })
    }
    setDeleteDialog({ open: false, type: '', id: '' })
  }

  // Edit dialog helpers
  const openEditDialog = (type: string, data: any) => {
    setEditDialog({ open: true, type, data })
  }
  const closeEditDialog = () => {
    setEditDialog({ open: false, type: '', data: null })
  }

  // Login screen
  if (!authenticated) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Admin Login
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-password">Password</Label>
              <Input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Enter admin password"
              />
            </div>
            <Button onClick={handleLogin} disabled={loading} className="w-full">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Login
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Dashboard Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { label: 'Site Info', count: siteInfo.length, icon: Settings },
                  { label: 'Skills', count: skills.length, icon: Code2 },
                  { label: 'Projects', count: projects.length, icon: FolderGit2 },
                  { label: 'Experience', count: experiences.length, icon: Briefcase },
                  { label: 'Certifications', count: certifications.length, icon: Award },
                  { label: 'Recommendations', count: recommendations.length, icon: MessageSquareQuote },
                ].map((stat) => (
                  <Card key={stat.label} className="border-primary/10">
                    <CardContent className="p-4 text-center">
                      <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                      <p className="text-2xl font-bold text-primary">{stat.count}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )

      case 'siteinfo':
        return (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Site Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {siteInfo.map((info) => (
                <div key={info.key} className="grid sm:grid-cols-4 gap-3 items-start">
                  <Label className="sm:col-span-1 pt-2 font-medium text-sm">{info.key}</Label>
                  <div className="sm:col-span-2">
                    {info.key === 'aboutText' ? (
                      <Textarea
                        value={info.value}
                        onChange={async (e) => {
                          const newVal = e.target.value
                          setSiteInfo((prev) => prev.map((i) => i.key === info.key ? { ...i, value: newVal } : i))
                          try {
                            await fetch('/api/site-info', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key: info.key, value: newVal }) })
                          } catch { /* ignore */ }
                        }}
                        rows={3}
                      />
                    ) : (
                      <Input
                        value={info.value}
                        onChange={async (e) => {
                          const newVal = e.target.value
                          setSiteInfo((prev) => prev.map((i) => i.key === info.key ? { ...i, value: newVal } : i))
                          try {
                            await fetch('/api/site-info', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key: info.key, value: newVal }) })
                          } catch { /* ignore */ }
                        }}
                      />
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="sm:col-span-1"
                    onClick={async () => {
                      await fetch('/api/site-info', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key: info.key, value: info.value }) })
                      toast({ title: 'Saved!' })
                    }}
                  >
                    Save
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )

      case 'skills':
        return (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Skills ({skills.length})</CardTitle>
              <Button size="sm" onClick={() => openEditDialog('skills', null)}>
                <Plus className="h-4 w-4 mr-1" /> Add Skill
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {skills.map((skill) => (
                    <TableRow key={skill.id}>
                      <TableCell className="font-medium">{skill.name}</TableCell>
                      <TableCell><Badge variant="secondary">{skill.category}</Badge></TableCell>
                      <TableCell>{skill.level}%</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleReorder('skills', skill.id, 'up')}><ArrowUp className="h-3 w-3" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleReorder('skills', skill.id, 'down')}><ArrowDown className="h-3 w-3" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditDialog('skills', skill)}><Pencil className="h-3 w-3" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setDeleteDialog({ open: true, type: 'skills', id: skill.id })}><Trash2 className="h-3 w-3" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )

      case 'projects':
        return (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Projects ({projects.length})</CardTitle>
              <Button size="sm" onClick={() => openEditDialog('projects', null)}>
                <Plus className="h-4 w-4 mr-1" /> Add Project
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden sm:table-cell">Category</TableHead>
                    <TableHead className="hidden sm:table-cell">Tech Stack</TableHead>
                    <TableHead className="hidden md:table-cell">Featured</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.title}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="outline" className="text-xs capitalize">{project.category?.replace('-', ' ') || 'mini-frontend'}</Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {project.techStack.split(',').slice(0, 2).map((t) => (
                            <Badge key={t.trim()} variant="outline" className="text-xs">{t.trim()}</Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {project.featured ? <Badge>Featured</Badge> : '—'}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleReorder('projects', project.id, 'up')}><ArrowUp className="h-3 w-3" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleReorder('projects', project.id, 'down')}><ArrowDown className="h-3 w-3" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditDialog('projects', project)}><Pencil className="h-3 w-3" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setDeleteDialog({ open: true, type: 'projects', id: project.id })}><Trash2 className="h-3 w-3" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )

      case 'experience':
        return (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Experience ({experiences.length})</CardTitle>
              <Button size="sm" onClick={() => openEditDialog('experience', null)}>
                <Plus className="h-4 w-4 mr-1" /> Add Experience
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className="hidden sm:table-cell">Period</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {experiences.map((exp) => (
                    <TableRow key={exp.id}>
                      <TableCell className="font-medium">{exp.role}</TableCell>
                      <TableCell>{exp.company}</TableCell>
                      <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                        {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleReorder('experience', exp.id, 'up')}><ArrowUp className="h-3 w-3" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleReorder('experience', exp.id, 'down')}><ArrowDown className="h-3 w-3" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditDialog('experience', exp)}><Pencil className="h-3 w-3" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setDeleteDialog({ open: true, type: 'experience', id: exp.id })}><Trash2 className="h-3 w-3" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )

      case 'certifications':
        return (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Certifications ({certifications.length})</CardTitle>
              <Button size="sm" onClick={() => openEditDialog('certifications', null)}>
                <Plus className="h-4 w-4 mr-1" /> Add Certification
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Issuer</TableHead>
                    <TableHead className="hidden sm:table-cell">Date</TableHead>
                    <TableHead className="hidden md:table-cell">Score</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {certifications.map((cert) => (
                    <TableRow key={cert.id}>
                      <TableCell className="font-medium">{cert.title}</TableCell>
                      <TableCell>{cert.issuer}</TableCell>
                      <TableCell className="hidden sm:table-cell">{cert.date}</TableCell>
                      <TableCell className="hidden md:table-cell">{cert.score || '—'}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleReorder('certifications', cert.id, 'up')}><ArrowUp className="h-3 w-3" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleReorder('certifications', cert.id, 'down')}><ArrowDown className="h-3 w-3" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditDialog('certifications', cert)}><Pencil className="h-3 w-3" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setDeleteDialog({ open: true, type: 'certifications', id: cert.id })}><Trash2 className="h-3 w-3" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )

      case 'recommendations':
        return (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recommendations ({recommendations.length})</CardTitle>
              <Button size="sm" onClick={() => openEditDialog('recommendations', null)}>
                <Plus className="h-4 w-4 mr-1" /> Add Recommendation
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden sm:table-cell">Role</TableHead>
                    <TableHead className="hidden md:table-cell">Text</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recommendations.map((rec) => (
                    <TableRow key={rec.id}>
                      <TableCell className="font-medium">{rec.name}</TableCell>
                      <TableCell className="hidden sm:table-cell">{rec.role} at {rec.company}</TableCell>
                      <TableCell className="hidden md:table-cell max-w-[200px] truncate text-muted-foreground text-sm">{rec.text}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleReorder('recommendations', rec.id, 'up')}><ArrowUp className="h-3 w-3" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleReorder('recommendations', rec.id, 'down')}><ArrowDown className="h-3 w-3" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditDialog('recommendations', rec)}><Pencil className="h-3 w-3" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setDeleteDialog({ open: true, type: 'recommendations', id: rec.id })}><Trash2 className="h-3 w-3" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  // Admin panel
  return (
    <div className="fixed inset-0 z-[100] bg-background flex">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex w-64 bg-card border-r border-border flex-col">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h1 className="font-bold text-lg flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            Admin Panel
          </h1>
          <Button variant="ghost" size="icon" onClick={handleClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-1">
            {SIDEBAR_TABS.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </nav>
        <div className="p-4 border-t border-border">
          <Button variant="outline" onClick={handleLogout} className="w-full">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-border">
          <h1 className="font-bold text-lg flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            Admin
          </h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile tab bar */}
        <div className="md:hidden flex gap-1 p-2 border-b border-border overflow-x-auto">
          {SIDEBAR_TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Main content area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* Edit/Add Dialog */}
      <EditDialog
        open={editDialog.open}
        type={editDialog.type}
        data={editDialog.data}
        onClose={closeEditDialog}
        onSaved={loadAllData}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialog.open} onOpenChange={(open) => !open && setDeleteDialog({ open: false, type: '', id: '' })}>
        <AlertDialogContent className="z-[200]">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this {deleteDialog.type.replace('s', '').replace('ie', 'y')}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-white hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

// Edit Dialog Component
function EditDialog({ open, type, data, onClose, onSaved }: {
  open: boolean
  type: string
  data: any
  onClose: () => void
  onSaved: () => void
}) {
  const { toast } = useToast()
  const [form, setForm] = useState<Record<string, any>>({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (open) {
      if (data) {
        setForm({ ...data })
      } else {
        setForm(getDefaultForm(type))
      }
    }
  }, [open, data, type])

  const getDefaultForm = (t: string) => {
    switch (t) {
      case 'skills': return { name: '', category: 'Languages', level: 80, order: 0 }
      case 'projects': return { title: '', description: '', liveUrl: '', githubUrl: '', imageUrl: '', techStack: '', category: 'mini-frontend', featured: false, order: 0 }
      case 'experience': return { role: '', company: '', startDate: '', endDate: '', description: '', current: false, order: 0 }
      case 'certifications': return { title: '', issuer: '', date: '', score: '', order: 0 }
      case 'recommendations': return { name: '', role: '', company: '', text: '', avatarUrl: '', order: 0 }
      default: return {}
    }
  }

  const getEndpoint = () => {
    switch (type) {
      case 'skills': return '/api/skills'
      case 'projects': return '/api/projects'
      case 'experience': return '/api/experience'
      case 'certifications': return '/api/certifications'
      case 'recommendations': return '/api/recommendations'
      default: return ''
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const endpoint = getEndpoint()
      const isEdit = !!data
      const body = isEdit ? { ...form } : { ...form }

      const res = await fetch(endpoint, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (res.ok) {
        toast({ title: isEdit ? 'Updated!' : 'Created!' })
        onSaved()
        onClose()
      } else {
        const errorText = await res.text().catch(() => 'Unknown error')
        toast({ title: 'Failed: ' + errorText, variant: 'destructive' })
      }
    } catch (err) {
      toast({ title: 'Error saving', variant: 'destructive' })
    } finally {
      setSaving(false)
    }
  }

  const updateField = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const labelMap: Record<string, string> = {
    skills: 'Skill',
    projects: 'Project',
    experience: 'Experience',
    certifications: 'Certification',
    recommendations: 'Recommendation',
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto z-[200]">
        <DialogHeader>
          <DialogTitle>{data ? 'Edit' : 'Add'} {labelMap[type] || type}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {type === 'skills' && (
            <>
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={form.name || ''} onChange={(e) => updateField('name', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input value={form.category || ''} onChange={(e) => updateField('category', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Level (1-100)</Label>
                <Input type="number" min={1} max={100} value={form.level ?? ''} onChange={(e) => updateField('level', parseInt(e.target.value) || 0)} />
              </div>
            </>
          )}

          {type === 'projects' && (
            <>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={form.title || ''} onChange={(e) => updateField('title', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea rows={3} value={form.description || ''} onChange={(e) => updateField('description', e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Live URL</Label>
                  <Input value={form.liveUrl || ''} onChange={(e) => updateField('liveUrl', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>GitHub URL</Label>
                  <Input value={form.githubUrl || ''} onChange={(e) => updateField('githubUrl', e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input value={form.imageUrl || ''} onChange={(e) => updateField('imageUrl', e.target.value)} placeholder="/screenshots/my-project.webp" />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={form.category || 'mini-frontend'} onValueChange={(v) => updateField('category', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fullstack">Fullstack</SelectItem>
                    <SelectItem value="big-frontend">Big Frontend</SelectItem>
                    <SelectItem value="mini-frontend">Mini Frontend</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tech Stack (comma separated)</Label>
                <Input value={form.techStack || ''} onChange={(e) => updateField('techStack', e.target.value)} />
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.featured || false} onCheckedChange={(v) => updateField('featured', v)} />
                <Label>Featured</Label>
              </div>
            </>
          )}

          {type === 'experience' && (
            <>
              <div className="space-y-2">
                <Label>Role</Label>
                <Input value={form.role || ''} onChange={(e) => updateField('role', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Company</Label>
                <Input value={form.company || ''} onChange={(e) => updateField('company', e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input value={form.startDate || ''} onChange={(e) => updateField('startDate', e.target.value)} placeholder="Nov 2025" />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input value={form.endDate || ''} onChange={(e) => updateField('endDate', e.target.value)} placeholder="Leave empty if current" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea rows={4} value={form.description || ''} onChange={(e) => updateField('description', e.target.value)} />
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.current || false} onCheckedChange={(v) => updateField('current', v)} />
                <Label>Currently working here</Label>
              </div>
            </>
          )}

          {type === 'certifications' && (
            <>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={form.title || ''} onChange={(e) => updateField('title', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Issuer</Label>
                <Input value={form.issuer || ''} onChange={(e) => updateField('issuer', e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input value={form.date || ''} onChange={(e) => updateField('date', e.target.value)} placeholder="Jan 2026" />
                </div>
                <div className="space-y-2">
                  <Label>Score</Label>
                  <Input value={form.score || ''} onChange={(e) => updateField('score', e.target.value)} placeholder="e.g. 95%" />
                </div>
              </div>
            </>
          )}

          {type === 'recommendations' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input value={form.name || ''} onChange={(e) => updateField('name', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Avatar URL</Label>
                  <Input value={form.avatarUrl || ''} onChange={(e) => updateField('avatarUrl', e.target.value)} placeholder="https://..." />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input value={form.role || ''} onChange={(e) => updateField('role', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input value={form.company || ''} onChange={(e) => updateField('company', e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Recommendation Text</Label>
                <Textarea rows={4} value={form.text || ''} onChange={(e) => updateField('text', e.target.value)} />
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Save className="h-4 w-4 mr-2" />
            {data ? 'Update' : 'Create'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
