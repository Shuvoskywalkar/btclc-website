"use client"

import { useState } from 'react'
import { AdminHeader } from '@/components/admin/header'
import { BilingualInput } from '@/components/admin/bilingual-input'
import { ImageUpload } from '@/components/admin/image-upload'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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
import { COLLECTIONS, type Voice, type BilingualText } from '@/lib/types'
import { toast } from 'sonner'
import { Loader2, Plus, Pencil, Trash2, Quote, GripVertical } from 'lucide-react'
import Image from 'next/image'

const defaultVoice: Omit<Voice, 'id'> = {
  quote: { bn: '', en: '' },
  name: { bn: '', en: '' },
  role: { bn: '', en: '' },
  imageUrl: '',
  order: 0,
}

export default function VoicesPage() {
  const { data: voices, loading, add, update, remove } = useCollection<Voice>(COLLECTIONS.VOICES, 'order')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Voice | null>(null)
  const [formData, setFormData] = useState<Omit<Voice, 'id'>>(defaultVoice)
  const [saving, setSaving] = useState(false)

  const handleOpenDialog = (item?: Voice) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        quote: item.quote,
        name: item.name,
        role: item.role,
        imageUrl: item.imageUrl,
        order: item.order,
      })
    } else {
      setEditingItem(null)
      setFormData({ ...defaultVoice, order: voices.length })
    }
    setIsDialogOpen(true)
  }

  const handleSave = async () => {
    setSaving(true)
    
    if (editingItem?.id) {
      const result = await update(editingItem.id, formData)
      if (result.success) {
        toast.success('Voice updated successfully')
        setIsDialogOpen(false)
      } else {
        toast.error('Failed to update')
      }
    } else {
      const result = await add(formData)
      if (result.success) {
        toast.success('Voice added successfully')
        setIsDialogOpen(false)
      } else {
        toast.error('Failed to add')
      }
    }
    
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    const result = await remove(id)
    if (result.success) {
      toast.success('Voice deleted')
    } else {
      toast.error('Failed to delete')
    }
  }

  if (loading) {
    return (
      <>
        <AdminHeader title="Community Voices" description="Manage testimonials and quotes" />
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-tea-green" />
        </div>
      </>
    )
  }

  return (
    <>
      <AdminHeader title="Community Voices" description="Manage testimonials and quotes" />
      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground">{voices.length} voices</p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => handleOpenDialog()} className="bg-tea-green hover:bg-tea-green-dark">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Voice
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingItem ? 'Edit Voice' : 'Add Community Voice'}</DialogTitle>
                  <DialogDescription>
                    Add a testimonial or quote from the community
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <BilingualInput
                    label="Quote"
                    value={formData.quote}
                    onChange={(quote: BilingualText) => setFormData({ ...formData, quote })}
                    multiline
                    required
                  />
                  <BilingualInput
                    label="Name"
                    value={formData.name}
                    onChange={(name: BilingualText) => setFormData({ ...formData, name })}
                    required
                  />
                  <BilingualInput
                    label="Role / Position"
                    value={formData.role}
                    onChange={(role: BilingualText) => setFormData({ ...formData, role })}
                  />
                  <ImageUpload
                    label="Photo (optional)"
                    value={formData.imageUrl}
                    onChange={(imageUrl) => setFormData({ ...formData, imageUrl })}
                  />
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
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleSave} disabled={saving} className="bg-tea-green hover:bg-tea-green-dark">
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {editingItem ? 'Update' : 'Add'} Voice
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {voices.map((item) => (
              <Card key={item.id}>
                <CardContent className="flex gap-4 p-4">
                  <GripVertical className="mt-1 h-5 w-5 cursor-move shrink-0 text-muted-foreground" />
                  {item.imageUrl ? (
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-muted">
                      <Image src={item.imageUrl} alt={item.name.en} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-tea-green/10">
                      <Quote className="h-6 w-6 text-tea-green" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-charcoal line-clamp-2">
                      {`"${item.quote.en || item.quote.bn}"`}
                    </p>
                    <div className="mt-2">
                      <p className="text-sm font-medium text-charcoal">{item.name.en || item.name.bn}</p>
                      {(item.role.en || item.role.bn) && (
                        <p className="text-xs text-muted-foreground">{item.role.en || item.role.bn}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-start gap-2">
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
                          <AlertDialogTitle>Delete Voice?</AlertDialogTitle>
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
                </CardContent>
              </Card>
            ))}

            {voices.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Quote className="mb-4 h-12 w-12 text-muted-foreground" />
                  <p className="text-muted-foreground">No community voices yet</p>
                  <Button variant="link" onClick={() => handleOpenDialog()} className="text-tea-green">
                    Add the first voice
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
