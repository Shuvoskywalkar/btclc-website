"use client"

import { useState } from 'react'
import { AdminHeader } from '@/components/admin/header'
import { BilingualInput } from '@/components/admin/bilingual-input'
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
import { useCollection } from '@/hooks/use-firestore'
import { COLLECTIONS, type Program, type BilingualText } from '@/lib/types'
import { toast } from 'sonner'
import { Loader2, Plus, Pencil, Trash2, GripVertical } from 'lucide-react'

const defaultProgram: Omit<Program, 'id'> = {
  title: { bn: '', en: '' },
  description: { bn: '', en: '' },
  icon: 'BookOpen',
  href: '',
  order: 0,
}

const iconOptions = [
  'BookOpen', 'Users', 'Calendar', 'Award', 'Heart', 'Star',
  'Globe', 'Mic', 'Music', 'Camera', 'Palette', 'Lightbulb',
]

export default function ProgramsPage() {
  const { data: programs, loading, add, update, remove } = useCollection<Program>(COLLECTIONS.PROGRAMS, 'order')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProgram, setEditingProgram] = useState<Program | null>(null)
  const [formData, setFormData] = useState<Omit<Program, 'id'>>(defaultProgram)
  const [saving, setSaving] = useState(false)

  const handleOpenDialog = (program?: Program) => {
    if (program) {
      setEditingProgram(program)
      setFormData({
        title: program.title,
        description: program.description,
        icon: program.icon,
        href: program.href,
        order: program.order,
      })
    } else {
      setEditingProgram(null)
      setFormData({ ...defaultProgram, order: programs.length })
    }
    setIsDialogOpen(true)
  }

  const handleSave = async () => {
    setSaving(true)
    
    if (editingProgram?.id) {
      const result = await update(editingProgram.id, formData)
      if (result.success) {
        toast.success('Program updated successfully')
        setIsDialogOpen(false)
      } else {
        toast.error('Failed to update program')
      }
    } else {
      const result = await add(formData)
      if (result.success) {
        toast.success('Program added successfully')
        setIsDialogOpen(false)
      } else {
        toast.error('Failed to add program')
      }
    }
    
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    const result = await remove(id)
    if (result.success) {
      toast.success('Program deleted successfully')
    } else {
      toast.error('Failed to delete program')
    }
  }

  if (loading) {
    return (
      <>
        <AdminHeader title="Programs" description="Manage program listings" />
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-tea-green" />
        </div>
      </>
    )
  }

  return (
    <>
      <AdminHeader title="Programs" description="Manage program listings" />
      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground">{programs.length} programs</p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => handleOpenDialog()} className="bg-tea-green hover:bg-tea-green-dark">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Program
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingProgram ? 'Edit Program' : 'Add New Program'}</DialogTitle>
                  <DialogDescription>
                    Fill in the program details in both Bengali and English
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <BilingualInput
                    label="Title"
                    value={formData.title}
                    onChange={(title: BilingualText) => setFormData({ ...formData, title })}
                    required
                  />
                  <BilingualInput
                    label="Description"
                    value={formData.description}
                    onChange={(description: BilingualText) => setFormData({ ...formData, description })}
                    multiline
                  />
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Icon</Label>
                      <select
                        value={formData.icon}
                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                      >
                        {iconOptions.map((icon) => (
                          <option key={icon} value={icon}>{icon}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Link</Label>
                      <Input
                        value={formData.href}
                        onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                        placeholder="/programs/..."
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Display Order</Label>
                    <Input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} disabled={saving} className="bg-tea-green hover:bg-tea-green-dark">
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {editingProgram ? 'Update' : 'Add'} Program
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {programs.map((program) => (
              <Card key={program.id}>
                <CardContent className="flex items-center gap-4 p-4">
                  <GripVertical className="h-5 w-5 cursor-move text-muted-foreground" />
                  <div className="flex-1">
                    <h3 className="font-medium text-charcoal">{program.title.en || program.title.bn}</h3>
                    <p className="text-sm text-muted-foreground font-serif">{program.title.bn}</p>
                    {program.description.en && (
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                        {program.description.en}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenDialog(program)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Program?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the program.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => program.id && handleDelete(program.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))}

            {programs.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <p className="text-muted-foreground">No programs yet</p>
                  <Button
                    variant="link"
                    onClick={() => handleOpenDialog()}
                    className="text-tea-green"
                  >
                    Add your first program
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
