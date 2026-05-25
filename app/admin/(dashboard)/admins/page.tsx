"use client"

import { useState } from 'react'
import { AdminHeader } from '@/components/admin/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useAdmins } from '@/hooks/use-firestore'
import { useAuth } from '@/lib/auth-context'
import { toast } from 'sonner'
import { Loader2, Plus, Trash2, Users, Shield, Mail, AlertTriangle } from 'lucide-react'

// Primary admin email that cannot be removed
const PRIMARY_ADMIN = 'shuvokoiri0@gmail.com'

export default function AdminsPage() {
  const { admins, loading, addAdmin, removeAdmin } = useAdmins()
  const { user } = useAuth()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [saving, setSaving] = useState(false)

  const handleAddAdmin = async () => {
    if (!email || !name) {
      toast.error('Please fill in all fields')
      return
    }

    if (!email.includes('@')) {
      toast.error('Please enter a valid email')
      return
    }

    // Check if admin already exists
    if (admins.some(a => a.email === email)) {
      toast.error('This email is already an admin')
      return
    }

    setSaving(true)
    const result = await addAdmin(email, name, user?.email || '')
    if (result.success) {
      toast.success('Admin added successfully')
      setIsDialogOpen(false)
      setEmail('')
      setName('')
    } else {
      toast.error('Failed to add admin')
    }
    setSaving(false)
  }

  const handleRemoveAdmin = async (adminEmail: string) => {
    if (adminEmail === PRIMARY_ADMIN) {
      toast.error('Cannot remove the primary admin')
      return
    }

    if (adminEmail === user?.email) {
      toast.error('You cannot remove yourself')
      return
    }

    const result = await removeAdmin(adminEmail)
    if (result.success) {
      toast.success('Admin removed')
    } else {
      toast.error('Failed to remove admin')
    }
  }

  if (loading) {
    return (
      <>
        <AdminHeader title="Manage Admins" description="Add or remove admin users" />
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-tea-green" />
        </div>
      </>
    )
  }

  return (
    <>
      <AdminHeader title="Manage Admins" description="Add or remove admin users" />
      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {/* Info Card */}
          <Card className="border-gold/30 bg-gold/5">
            <CardContent className="flex items-start gap-4 p-4">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <div className="text-sm">
                <p className="font-medium text-charcoal">About Admin Access</p>
                <p className="mt-1 text-muted-foreground">
                  Admins can edit all website content. They need to create a Firebase account with their email 
                  before they can log in. The primary admin ({PRIMARY_ADMIN}) cannot be removed.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Admin List */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-tea-green" />
                  Admin Users
                </CardTitle>
                <CardDescription>{admins.length} admin(s) with access</CardDescription>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-tea-green hover:bg-tea-green-dark">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Admin
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Admin</DialogTitle>
                    <DialogDescription>
                      The user needs to create a Firebase account with this email before they can log in.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Admin name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@example.com"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleAddAdmin} 
                      disabled={saving}
                      className="bg-tea-green hover:bg-tea-green-dark"
                    >
                      {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      Add Admin
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="space-y-3">
              {admins.map((admin) => (
                <div
                  key={admin.email}
                  className="flex items-center justify-between rounded-lg border border-border p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tea-green/10">
                      {admin.email === PRIMARY_ADMIN ? (
                        <Shield className="h-5 w-5 text-tea-green" />
                      ) : (
                        <Users className="h-5 w-5 text-tea-green" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-charcoal">{admin.name || 'Unnamed'}</p>
                        {admin.email === PRIMARY_ADMIN && (
                          <span className="rounded-full bg-tea-green/10 px-2 py-0.5 text-xs font-medium text-tea-green">
                            Primary
                          </span>
                        )}
                        {admin.email === user?.email && (
                          <span className="rounded-full bg-gold/10 px-2 py-0.5 text-xs font-medium text-gold">
                            You
                          </span>
                        )}
                      </div>
                      <p className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {admin.email}
                      </p>
                    </div>
                  </div>
                  {admin.email !== PRIMARY_ADMIN && admin.email !== user?.email && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remove Admin?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will revoke {admin.email}&apos;s admin access. They will no longer be able to
                            log in to the admin panel.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleRemoveAdmin(admin.email)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Remove Admin
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              ))}

              {admins.length === 0 && (
                <div className="py-8 text-center text-muted-foreground">
                  No admins found. Add your first admin above.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
