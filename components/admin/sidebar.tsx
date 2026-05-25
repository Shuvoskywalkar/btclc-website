"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  Image as ImageIcon,
  BookOpen,
  Calendar,
  Archive,
  MessageSquareQuote,
  Settings,
  Users,
  LogOut,
  Home,
  Info,
  Sparkles,
} from 'lucide-react'

const menuItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
]

const contentItems = [
  {
    title: 'Hero Section',
    href: '/admin/hero',
    icon: Sparkles,
  },
  {
    title: 'About Section',
    href: '/admin/about',
    icon: Info,
  },
  {
    title: 'Programs',
    href: '/admin/programs',
    icon: Home,
  },
  {
    title: 'Publications',
    href: '/admin/publications',
    icon: BookOpen,
  },
  {
    title: 'Gallery',
    href: '/admin/gallery',
    icon: ImageIcon,
  },
  {
    title: 'Events',
    href: '/admin/events',
    icon: Calendar,
  },
  {
    title: 'Archive',
    href: '/admin/archive',
    icon: Archive,
  },
  {
    title: 'Community Voices',
    href: '/admin/voices',
    icon: MessageSquareQuote,
  },
]

const settingsItems = [
  {
    title: 'Site Settings',
    href: '/admin/settings',
    icon: Settings,
  },
  {
    title: 'Manage Admins',
    href: '/admin/admins',
    icon: Users,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  return (
    <Sidebar className="border-r border-border bg-card">
      <SidebarHeader className="border-b border-border p-4">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-tea-green text-primary-foreground font-bold">
            BT
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-charcoal">BTCLC Admin</span>
            <span className="text-xs text-muted-foreground">Content Management</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Content</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {contentItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-tea-green/10 text-tea-green">
              <Users className="h-4 w-4" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-sm font-medium text-charcoal">
                {user?.email}
              </span>
              <span className="text-xs text-muted-foreground">Admin</span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => signOut()}
            className="w-full justify-start gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
