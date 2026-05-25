"use client"

import { useState, useEffect } from 'react'
import { AdminHeader } from '@/components/admin/header'
import { BilingualInput } from '@/components/admin/bilingual-input'
import { ImageUpload } from '@/components/admin/image-upload'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDocument } from '@/hooks/use-firestore'
import { COLLECTIONS, type HeroSection, type BilingualText } from '@/lib/types'
import { toast } from 'sonner'
import { Loader2, Save } from 'lucide-react'

const defaultHero: HeroSection = {
  title: { bn: '', en: '' },
  subtitle: { bn: '', en: '' },
  ctaText: { bn: '', en: '' },
  ctaLink: '',
  imageUrl: '',
}

export default function HeroSectionPage() {
  const { data, loading, update } = useDocument<HeroSection>(COLLECTIONS.HERO, 'main')
  const [formData, setFormData] = useState<HeroSection>(defaultHero)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (data) {
      setFormData(data)
    }
  }, [data])

  const handleSave = async () => {
    setSaving(true)
    const result = await update(formData)
    if (result?.success) {
      toast.success('Hero section updated successfully')
    } else {
      toast.error('Failed to update hero section')
    }
    setSaving(false)
  }

  if (loading) {
    return (
      <>
        <AdminHeader title="Hero Section" description="Edit the homepage hero content" />
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-tea-green" />
        </div>
      </>
    )
  }

  return (
    <>
      <AdminHeader title="Hero Section" description="Edit the homepage hero content" />
      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle>Hero Content</CardTitle>
              <CardDescription>
                This content appears at the top of the homepage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <BilingualInput
                label="Title"
                value={formData.title}
                onChange={(title: BilingualText) => setFormData({ ...formData, title })}
                required
              />

              <BilingualInput
                label="Subtitle"
                value={formData.subtitle}
                onChange={(subtitle: BilingualText) => setFormData({ ...formData, subtitle })}
                multiline
              />

              <BilingualInput
                label="Call to Action Text"
                value={formData.ctaText}
                onChange={(ctaText: BilingualText) => setFormData({ ...formData, ctaText })}
              />

              <div className="space-y-2">
                <Label>Call to Action Link</Label>
                <Input
                  value={formData.ctaLink}
                  onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                  placeholder="/about or https://..."
                />
              </div>

              <ImageUpload
                label="Hero Image"
                value={formData.imageUrl}
                onChange={(imageUrl) => setFormData({ ...formData, imageUrl })}
              />

              <div className="flex justify-end pt-4">
                <Button onClick={handleSave} disabled={saving} className="bg-tea-green hover:bg-tea-green-dark">
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
