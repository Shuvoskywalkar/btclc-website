"use client"

import { useState } from 'react'
import { AdminHeader } from '@/components/admin/header'
import { BilingualInput } from '@/components/admin/bilingual-input'
import { ImageUpload } from '@/components/admin/image-upload'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCollection } from '@/hooks/use-firestore'
import { COLLECTIONS, type Event, type BilingualText } from '@/lib/types'
import { toast } from 'sonner'
import { Loader2, Plus, Pencil, Trash2, Calendar, MapPin } from 'lucide-react'
import Image from 'next/image'

const defaultEvent: Omit<Event, 'id'> = {
  title: { bn: '', en: '' },
  description: { bn: '', en: '' },
  date: new Date(),
  location: { bn: '', en: '' },
  imageUrl: '',
  status: 'upcoming',
}

const statusColors = {
  upcoming: 'bg-blue-500/10 text-blue-600 border-blue-200',
  ongoing: 'bg-green-500/10 text-green-600 border-green-200',
  completed: 'bg-gray-500/10 text-gray-600 border-gray-200',
}

export default function EventsPage() {
  const { data: events, loading, add, update, remove } = useCollection<Event>(COLLECTIONS.EVENTS, 'date')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Event | null>(null)
  const [formData, setFormData] = useState<Omit<Event, 'id'>>(defaultEvent)
  const [saving, setSaving] = useState(false)

  const handleOpenDialog = (item?: Event) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        title: item.title,
        description: item.description,
        date: item.date,
        location: item.location,
        imageUrl: item.imageUrl,
        status: item.status,
      })
    } else {
      setEditingItem(null)
      setFormData(defaultEvent)
    }
    setIsDialogOpen(true)
  }

  const handleSave = async () => {
    setSaving(true)
    
    if (editingItem?.id) {
      const result = await update(editingItem.id, formData)
      if (result.success) {
        toast.success('Event updated successfully')
        setIsDialogOpen(false)
      } else {
        toast.error('Failed to update event')
      }
    } else {
      const result = await add(formData)
      if (result.success) {
        toast.success('Event added successfully')
        setIsDialogOpen(false)
      } else {
        toast.error('Failed to add event')
      }
    }
    
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    const result = await remove(id)
    if (result.success) {
      toast.success('Event deleted')
    } else {
      toast.error('Failed to delete')
    }
  }

  if (loading) {
    return (
      <>
        <AdminHeader title="Events" description="Manage events and programs" />
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-tea-green" />
        </div>
      </>
    )
  }

  return (
    <>
      <AdminHeader title="Events" description="Manage events and programs" />
      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground">{events.length} events</p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => handleOpenDialog()} className="bg-tea-green hover:bg-tea-green-dark">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingItem ? 'Edit Event' : 'Add New Event'}</DialogTitle>
                  <DialogDescription>
                    Create an event with all details
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
                  <BilingualInput
                    label="Location"
                    value={formData.location}
                    onChange={(location: BilingualText) => setFormData({ ...formData, location })}
                  />
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Event Date</Label>
                      <Input
                        type="datetime-local"
                        value={formData.date instanceof Date 
                          ? formData.date.toISOString().slice(0, 16)
                          : new Date().toISOString().slice(0, 16)}
                        onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(status: 'upcoming' | 'ongoing' | 'completed') => 
                          setFormData({ ...formData, status })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="upcoming">Upcoming</SelectItem>
                          <SelectItem value="ongoing">Ongoing</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <ImageUpload
                    label="Event Image (optional)"
                    value={formData.imageUrl}
                    onChange={(imageUrl) => setFormData({ ...formData, imageUrl })}
                  />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleSave} disabled={saving} className="bg-tea-green hover:bg-tea-green-dark">
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {editingItem ? 'Update' : 'Add'} Event
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {events.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="flex gap-4 p-0">
                  {item.imageUrl && (
                    <div className="relative h-32 w-48 shrink-0 bg-muted">
                      <Image src={item.imageUrl} alt={item.title.en} fill className="object-cover" />
                    </div>
                  )}
                  <div className="flex flex-1 items-center justify-between p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-charcoal">{item.title.en || item.title.bn}</h3>
                        <Badge variant="outline" className={statusColors[item.status]}>
                          {item.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground font-serif">{item.title.bn}</p>
                      <div className="flex items-center gap-4 pt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {item.date instanceof Date 
                            ? item.date.toLocaleDateString()
                            : new Date(item.date).toLocaleDateString()}
                        </span>
                        {(item.location.en || item.location.bn) && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {item.location.en || item.location.bn}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(item)}>
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
                            <AlertDialogTitle>Delete Event?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => item.id && handleDelete(item.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {events.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Calendar className="mb-4 h-12 w-12 text-muted-foreground" />
                  <p className="text-muted-foreground">No events yet</p>
                  <Button variant="link" onClick={() => handleOpenDialog()} className="text-tea-green">
                    Add your first event
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
