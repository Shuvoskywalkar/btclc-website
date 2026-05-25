"use client"

import { useState } from 'react'
import { AdminHeader } from '@/components/admin/header'
import { BilingualInput } from '@/components/admin/bilingual-input'
import { ImageUpload, FileUpload } from '@/components/admin/image-upload'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
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
import { COLLECTIONS, type Publication, type BilingualText } from '@/lib/types'
import { toast } from 'sonner'
import { Loader2, Plus, Pencil, Trash2, Star, BookOpen } from 'lucide-react'
import Image from 'next/image'

const defaultPublication: Omit<Publication, 'id'> = {
  title: { bn: '', en: '' },
  description: { bn: '', en: '' },
  imageUrl: '',
  pdfUrl: '',
  publishedAt: new Date(),
  featured: false,
  order: 0,
}

export default function PublicationsPage() {
  const { data: publications, loading, add, update, remove } = useCollection<Publication>(COLLECTIONS.PUBLICATIONS, 'order')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Publication | null>(null)
  const [formData, setFormData] = useState<Omit<Publication, 'id'>>(defaultPublication)
  const [saving, setSaving] = useState(false)

  const handleOpenDialog = (item?: Publication) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        title: item.title,
        description: item.description,
        imageUrl: item.imageUrl,
        pdfUrl: item.pdfUrl,
        publishedAt: item.publishedAt,
        featured: item.featured,
        order: item.order,
      })
    } else {
      setEditingItem(null)
      setFormData({ ...defaultPublication, order: publications.length })
    }
    setIsDialogOpen(true)
  }

  const handleSave = async () => {
    setSaving(true)
    
    if (editingItem?.id) {
      const result = await update(editingItem.id, formData)
      if (result.success) {
        toast.success('Publication updated successfully')
        setIsDialogOpen(false)
      } else {
        toast.error('Failed to update publication')
      }
    } else {
      const result = await add(formData)
      if (result.success) {
        toast.success('Publication added successfully')
        setIsDialogOpen(false)
      } else {
        toast.error('Failed to add publication')
      }
    }
    
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    const result = await remove(id)
    if (result.success) {
      toast.success('Publication deleted')
    } else {
      toast.error('Failed to delete')
    }
  }

  if (loading) {
    return (
      <>
        <AdminHeader title="Publications" description="Manage publications like Utkorsha" />
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-tea-green" />
        </div>
      </>
    )
  }

  return (
    <>
      <AdminHeader title="Publications" description="Manage publications like Utkorsha" />
      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground">{publications.length} publications</p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => handleOpenDialog()} className="bg-tea-green hover:bg-tea-green-dark">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Publication
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingItem ? 'Edit Publication' : 'Add New Publication'}</DialogTitle>
                  <DialogDescription>
                    Add a publication with cover image and optional PDF
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
                  <ImageUpload
                    label="Cover Image"
                    value={formData.imageUrl}
                    onChange={(imageUrl) => setFormData({ ...formData, imageUrl })}
                  />
                  <FileUpload
                    label="PDF File (optional)"
                    value={formData.pdfUrl}
                    onChange={(pdfUrl) => setFormData({ ...formData, pdfUrl })}
                    accept=".pdf"
                  />
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Published Date</Label>
                      <Input
                        type="date"
                        value={formData.publishedAt instanceof Date 
                          ? formData.publishedAt.toISOString().split('T')[0]
                          : new Date().toISOString().split('T')[0]}
                        onChange={(e) => setFormData({ ...formData, publishedAt: new Date(e.target.value) })}
                      />
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
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={formData.featured}
                      onCheckedChange={(featured) => setFormData({ ...formData, featured })}
                    />
                    <Label>Featured Publication</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleSave} disabled={saving} className="bg-tea-green hover:bg-tea-green-dark">
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {editingItem ? 'Update' : 'Add'} Publication
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {publications.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative aspect-[3/4] bg-muted">
                  {item.imageUrl ? (
                    <Image src={item.imageUrl} alt={item.title.en} fill className="object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <BookOpen className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                  {item.featured && (
                    <div className="absolute left-2 top-2 rounded-full bg-gold px-2 py-1 text-xs font-medium text-charcoal">
                      <Star className="mr-1 inline-block h-3 w-3" />
                      Featured
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-charcoal line-clamp-1">{item.title.en || item.title.bn}</h3>
                  <p className="text-sm text-muted-foreground font-serif line-clamp-1">{item.title.bn}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {item.publishedAt instanceof Date 
                        ? item.publishedAt.toLocaleDateString()
                        : new Date(item.publishedAt).toLocaleDateString()}
                    </span>
                    <div className="flex items-center gap-1">
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
                            <AlertDialogTitle>Delete Publication?</AlertDialogTitle>
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

            {publications.length === 0 && (
              <Card className="col-span-full">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <BookOpen className="mb-4 h-12 w-12 text-muted-foreground" />
                  <p className="text-muted-foreground">No publications yet</p>
                  <Button variant="link" onClick={() => handleOpenDialog()} className="text-tea-green">
                    Add your first publication
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
