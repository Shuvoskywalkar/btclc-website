"use client"

import Link from 'next/link'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

interface AdminHeaderProps {
  title: string
  description?: string
}

export function AdminHeader({ title, description }: AdminHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border bg-card px-4">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-6" />
        <div>
          <h1 className="text-lg font-semibold text-charcoal">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      <Button variant="outline" size="sm" asChild>
        <Link href="/" target="_blank">
          <ExternalLink className="mr-2 h-4 w-4" />
          View Site
        </Link>
      </Button>
    </header>
  )
}
