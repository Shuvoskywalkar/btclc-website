"use client"

import { useState, useEffect } from 'react'
import { AdminHeader } from '@/components/admin/header'
import { BilingualInput } from '@/components/admin/bilingual-input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useDocument } from '@/hooks/use-firestore'
import { COLLECTIONS, type AboutSection, type BilingualText } from '@/lib/types'
import { toast } from 'sonner'
import { Loader2, Save } from 'lucide-react'

const defaultAbout: AboutSection = {
  title: { bn: '', en: '' },
  content: { bn: '', en: '' },
}

export default function AboutSectionPage() {
  const { data, loading, update } = useDocument<AboutSection>(COLLECTIONS.ABOUT, 'main')
  const [formData, setFormData] = useState<AboutSection>(defaultAbout)
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
      toast.success('About section updated successfully')
    } else {
      toast.error('Failed to update about section')
    }
    setSaving(false)
  }

  if (loading) {
    return (
      <>
        <AdminHeader title="About Section" description="Edit the about us content" />
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-tea-green" />
        </div>
      </>
    )
  }

  return (
    <>
      <AdminHeader title="About Section" description="Edit the about us content" />
      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle>About Us Content</CardTitle>
              <CardDescription>
                This content appears in the about section of the homepage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <BilingualInput
                label="Section Title"
                value={formData.title}
                onChange={(title: BilingualText) => setFormData({ ...formData, title })}
                required
              />

              <BilingualInput
                label="Content"
                value={formData.content}
                onChange={(content: BilingualText) => setFormData({ ...formData, content })}
                multiline
                required
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
