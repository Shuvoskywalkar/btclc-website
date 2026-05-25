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
import { COLLECTIONS, type GalleryItem, type BilingualText } from '@/lib/types'
import { toast } from 'sonner'
import { Loader2, Plus, Pencil, Trash2, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

const defaultItem: Omit<GalleryItem, 'id'> = {
  imageUrl: '',
  alt: { bn: '', en: '' },
  category: { bn: '', en: '' },
  order: 0,
  uploadedAt: new Date(),
}

export default function GalleryPage() {
  const { data: gallery, loading, add, update, remove } = useCollection<GalleryItem>(COLLECTIONS.GALLERY, 'order')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null)
  const [formData, setFormData] = useState<Omit<GalleryItem, 'id'>>(defaultItem)
  const [saving, setSaving] = useState(false)

  const handleOpenDialog = (item?: GalleryItem) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        imageUrl: item.imageUrl,
        alt: item.alt,
        category: item.category,
        order: item.order,
        uploadedAt: item.uploadedAt,
      })
    } else {
      setEditingItem(null)
      setFormData({ ...defaultItem, order: gallery.length, uploadedAt: new Date() })
    }
    setIsDialogOpen(true)
  }

  const handleSave = async () => {
    if (!formData.imageUrl) {
      toast.error('Please upload an image')
      return
    }

    setSaving(true)
    
    if (editingItem?.id) {
      const result = await update(editingItem.id, formData)
      if (result.success) {
        toast.success('Image updated successfully')
        setIsDialogOpen(false)
      } else {
        toast.error('Failed to update image')
      }
    } else {
      const result = await add(formData)
      if (result.success) {
        toast.success('Image added successfully')
        setIsDialogOpen(false)
      } else {
        toast.error('Failed to add image')
      }
    }
    
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    const result = await remove(id)
    if (result.success) {
      toast.success('Image deleted')
    } else {
      toast.error('Failed to delete')
    }
  }

  if (loading) {
    return (
      <>
        <AdminHeader title="Gallery" description="Manage gallery images" />
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-tea-green" />
        </div>
      </>
    )
  }

  return (
    <>
      <AdminHeader title="Gallery" description="Manage gallery images" />
      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground">{gallery.length} images</p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => handleOpenDialog()} className="bg-tea-green hover:bg-tea-green-dark">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Image
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-xl">
                <DialogHeader>
                  <DialogTitle>{editingItem ? 'Edit Image' : 'Add New Image'}</DialogTitle>
                  <DialogDescription>
                    Upload an image with alt text and category
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <ImageUpload
                    label="Image"
                    value={formData.imageUrl}
                    onChange={(imageUrl) => setFormData({ ...formData, imageUrl })}
                  />
                  <BilingualInput
                    label="Alt Text"
                    value={formData.alt}
                    onChange={(alt: BilingualText) => setFormData({ ...formData, alt })}
                  />
                  <BilingualInput
                    label="Category"
                    value={formData.category}
                    onChange={(category: BilingualText) => setFormData({ ...formData, category })}
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
                    {editingItem ? 'Update' : 'Add'} Image
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {gallery.map((item) => (
              <Card key={item.id} className="group overflow-hidden">
                <div className="relative aspect-square bg-muted">
                  {item.imageUrl ? (
                    <Image src={item.imageUrl} alt={item.alt.en || item.alt.bn} fill className="object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button variant="secondary" size="icon" onClick={() => handleOpenDialog(item)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Image?</AlertDialogTitle>
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
                <CardContent className="p-2">
                  <p className="truncate text-xs text-muted-foreground">
                    {item.category.en || item.category.bn || 'Uncategorized'}
                  </p>
                </CardContent>
              </Card>
            ))}

            {gallery.length === 0 && (
              <Card className="col-span-full">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <ImageIcon className="mb-4 h-12 w-12 text-muted-foreground" />
                  <p className="text-muted-foreground">No images yet</p>
                  <Button variant="link" onClick={() => handleOpenDialog()} className="text-tea-green">
                    Add your first image
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
