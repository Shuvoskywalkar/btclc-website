"use client"

import { AdminHeader } from '@/components/admin/header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useCollection, useAdmins } from '@/hooks/use-firestore'
import { COLLECTIONS, type Publication, type GalleryItem, type Event, type Voice } from '@/lib/types'
import {
  BookOpen,
  Image as ImageIcon,
  Calendar,
  MessageSquareQuote,
  Users,
  TrendingUp,
} from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboardPage() {
  const { data: publications } = useCollection<Publication>(COLLECTIONS.PUBLICATIONS)
  const { data: gallery } = useCollection<GalleryItem>(COLLECTIONS.GALLERY)
  const { data: events } = useCollection<Event>(COLLECTIONS.EVENTS)
  const { data: voices } = useCollection<Voice>(COLLECTIONS.VOICES)
  const { admins } = useAdmins()

  const stats = [
    {
      title: 'Publications',
      value: publications.length,
      icon: BookOpen,
      href: '/admin/publications',
      color: 'bg-blue-500/10 text-blue-600',
    },
    {
      title: 'Gallery Images',
      value: gallery.length,
      icon: ImageIcon,
      href: '/admin/gallery',
      color: 'bg-green-500/10 text-green-600',
    },
    {
      title: 'Events',
      value: events.length,
      icon: Calendar,
      href: '/admin/events',
      color: 'bg-purple-500/10 text-purple-600',
    },
    {
      title: 'Community Voices',
      value: voices.length,
      icon: MessageSquareQuote,
      href: '/admin/voices',
      color: 'bg-orange-500/10 text-orange-600',
    },
    {
      title: 'Admins',
      value: admins.length,
      icon: Users,
      href: '/admin/admins',
      color: 'bg-tea-green/10 text-tea-green',
    },
  ]

  const quickLinks = [
    { title: 'Edit Hero Section', href: '/admin/hero', description: 'Update the homepage hero content' },
    { title: 'Edit About Section', href: '/admin/about', description: 'Update the about us content' },
    { title: 'Manage Programs', href: '/admin/programs', description: 'Add or edit program listings' },
    { title: 'Site Settings', href: '/admin/settings', description: 'Configure site-wide settings' },
  ]

  return (
    <>
      <AdminHeader 
        title="Dashboard" 
        description="Welcome to the BTCLC Admin Panel" 
      />
      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {stats.map((stat) => (
              <Link key={stat.href} href={stat.href}>
                <Card className="cursor-pointer transition-shadow hover:shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <div className={`rounded-lg p-2 ${stat.color}`}>
                      <stat.icon className="h-4 w-4" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-charcoal">{stat.value}</div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-tea-green" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Frequently used admin actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {quickLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <Card className="cursor-pointer transition-all hover:border-tea-green hover:shadow-sm">
                      <CardContent className="p-4">
                        <h3 className="font-medium text-charcoal">{link.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {link.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity - Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>
                Tips for managing your BTCLC website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-tea-green" />
                  <span>Use the sidebar to navigate between different content sections</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-tea-green" />
                  <span>All content supports both Bengali and English - fill in both fields for bilingual support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-tea-green" />
                  <span>Images are automatically optimized when uploaded</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-tea-green" />
                  <span>Changes are saved automatically and reflected on the website immediately</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
