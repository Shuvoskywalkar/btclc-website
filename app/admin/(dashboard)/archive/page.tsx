"use client"

import { useState } from 'react'
import { AdminHeader } from '@/components/admin/header'
import { BilingualInput } from '@/components/admin/bilingual-input'
import { FileUpload, ImageUpload } from '@/components/admin/image-upload'
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
import { COLLECTIONS, type ArchiveItem, type BilingualText } from '@/lib/types'
import { toast } from 'sonner'
import { Loader2, Plus, Pencil, Trash2, Archive, FileText, Image as ImageIcon, Video, Music } from 'lucide-react'
import Image from 'next/image'

const defaultItem: Omit<ArchiveItem, 'id'> = {
  title: { bn: '', en: '' },
  description: { bn: '', en: '' },
  type: 'document',
  fileUrl: '',
  thumbnailUrl: '',
  order: 0,
}

const typeIcons = {
  document: FileText,
  image: ImageIcon,
  video: Video,
  audio: Music,
}

const typeColors = {
  document: 'bg-blue-500/10 text-blue-600',
  image: 'bg-green-500/10 text-green-600',
  video: 'bg-purple-500/10 text-purple-600',
  audio: 'bg-orange-500/10 text-orange-600',
}

export default function ArchivePage() {
  const { data: archive, loading, add, update, remove } = useCollection<ArchiveItem>(COLLECTIONS.ARCHIVE, 'order')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<ArchiveItem | null>(null)
  const [formData, setFormData] = useState<Omit<ArchiveItem, 'id'>>(defaultItem)
  const [saving, setSaving] = useState(false)

  const handleOpenDialog = (item?: ArchiveItem) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        title: item.title,
        description: item.description,
        type: item.type,
        fileUrl: item.fileUrl,
        thumbnailUrl: item.thumbnailUrl,
        order: item.order,
      })
    } else {
      setEditingItem(null)
      setFormData({ ...defaultItem, order: archive.length })
    }
    setIsDialogOpen(true)
  }

  const handleSave = async () => {
    setSaving(true)
    
    if (editingItem?.id) {
      const result = await update(editingItem.id, formData)
      if (result.success) {
        toast.success('Archive item updated')
        setIsDialogOpen(false)
      } else {
        toast.error('Failed to update')
      }
    } else {
      const result = await add(formData)
      if (result.success) {
        toast.success('Archive item added')
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
      toast.success('Item deleted')
    } else {
      toast.error('Failed to delete')
    }
  }

  if (loading) {
    return (
      <>
        <AdminHeader title="Archive" description="Manage historical documents and media" />
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-tea-green" />
        </div>
      </>
    )
  }

  return (
    <>
      <AdminHeader title="Archive" description="Manage historical documents and media" />
      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground">{archive.length} items</p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => handleOpenDialog()} className="bg-tea-green hover:bg-tea-green-dark">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingItem ? 'Edit Archive Item' : 'Add Archive Item'}</DialogTitle>
                  <DialogDescription>
                    Add a document, image, video, or audio to the archive
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
                      <Label>Type</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(type: 'document' | 'image' | 'video' | 'audio') => 
                          setFormData({ ...formData, type })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="document">Document</SelectItem>
                          <SelectItem value="image">Image</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="audio">Audio</SelectItem>
                        </SelectContent>
                      </Select>
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
                  {formData.type === 'image' ? (
                    <ImageUpload
                      label="Image File"
                      value={formData.fileUrl}
                      onChange={(fileUrl) => setFormData({ ...formData, fileUrl })}
                    />
                  ) : (
                    <>
                      <FileUpload
                        label="File"
                        value={formData.fileUrl}
                        onChange={(fileUrl) => setFormData({ ...formData, fileUrl })}
                        accept={formData.type === 'document' ? '.pdf,.doc,.docx' : 
                               formData.type === 'video' ? '.mp4,.webm' : '.mp3,.wav'}
                      />
                      <ImageUpload
                        label="Thumbnail (optional)"
                        value={formData.thumbnailUrl}
                        onChange={(thumbnailUrl) => setFormData({ ...formData, thumbnailUrl })}
                      />
                    </>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleSave} disabled={saving} className="bg-tea-green hover:bg-tea-green-dark">
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {editingItem ? 'Update' : 'Add'} Item
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-3">
            {archive.map((item) => {
              const TypeIcon = typeIcons[item.type]
              return (
                <Card key={item.id}>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                      {item.thumbnailUrl || (item.type === 'image' && item.fileUrl) ? (
                        <Image 
                          src={item.thumbnailUrl || item.fileUrl} 
                          alt={item.title.en} 
                          fill 
                          className="object-cover" 
                        />
                      ) : (
                        <div className={`flex h-full w-full items-center justify-center ${typeColors[item.type]}`}>
                          <TypeIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-charcoal truncate">{item.title.en || item.title.bn}</h3>
                        <Badge variant="outline" className={typeColors[item.type]}>
                          {item.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground font-serif truncate">{item.title.bn}</p>
                      {item.fileUrl && (
                        <a
                          href={item.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-block text-xs text-tea-green hover:underline"
                        >
                          View file
                        </a>
                      )}
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
                            <AlertDialogTitle>Delete Item?</AlertDialogTitle>
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
              )
            })}

            {archive.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Archive className="mb-4 h-12 w-12 text-muted-foreground" />
                  <p className="text-muted-foreground">No archive items yet</p>
                  <Button variant="link" onClick={() => handleOpenDialog()} className="text-tea-green">
                    Add your first item
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
