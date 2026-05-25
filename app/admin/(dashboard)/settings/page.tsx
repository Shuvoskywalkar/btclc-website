"use client"

import { useState, useEffect } from 'react'
import { AdminHeader } from '@/components/admin/header'
import { BilingualInput } from '@/components/admin/bilingual-input'
import { ImageUpload } from '@/components/admin/image-upload'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useDocument } from '@/hooks/use-firestore'
import { COLLECTIONS, type SiteSettings, type BilingualText } from '@/lib/types'
import { toast } from 'sonner'
import { Loader2, Save, Globe, Mail, Phone, MapPin, Facebook, Youtube } from 'lucide-react'

const defaultSettings: SiteSettings = {
  logoUrl: '',
  contactEmail: '',
  contactPhone: '',
  address: { bn: '', en: '' },
  tagline: { bn: '', en: '' },
  socialLinks: {
    facebook: '',
    youtube: '',
    twitter: '',
    instagram: '',
  },
}

export default function SettingsPage() {
  const { data, loading, update } = useDocument<SiteSettings>(COLLECTIONS.SITE_SETTINGS, 'main')
  const [formData, setFormData] = useState<SiteSettings>(defaultSettings)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (data) {
      setFormData({
        ...defaultSettings,
        ...data,
        socialLinks: { ...defaultSettings.socialLinks, ...data.socialLinks },
      })
    }
  }, [data])

  const handleSave = async () => {
    setSaving(true)
    const result = await update(formData)
    if (result?.success) {
      toast.success('Settings saved successfully')
    } else {
      toast.error('Failed to save settings')
    }
    setSaving(false)
  }

  if (loading) {
    return (
      <>
        <AdminHeader title="Site Settings" description="Configure site-wide settings" />
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-tea-green" />
        </div>
      </>
    )
  }

  return (
    <>
      <AdminHeader title="Site Settings" description="Configure site-wide settings" />
      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {/* Branding */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-tea-green" />
                Branding
              </CardTitle>
              <CardDescription>Logo and tagline for the website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ImageUpload
                label="Site Logo"
                value={formData.logoUrl}
                onChange={(logoUrl) => setFormData({ ...formData, logoUrl })}
              />
              <BilingualInput
                label="Tagline"
                value={formData.tagline}
                onChange={(tagline: BilingualText) => setFormData({ ...formData, tagline })}
              />
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-tea-green" />
                Contact Information
              </CardTitle>
              <CardDescription>How visitors can reach you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    Email
                  </Label>
                  <Input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    placeholder="contact@btclc.org"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    Phone
                  </Label>
                  <Input
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    placeholder="+880 1234567890"
                  />
                </div>
              </div>
              <BilingualInput
                label="Address"
                value={formData.address}
                onChange={(address: BilingualText) => setFormData({ ...formData, address })}
                multiline
              />
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Facebook className="h-5 w-5 text-tea-green" />
                Social Media Links
              </CardTitle>
              <CardDescription>Connect your social media profiles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Facebook className="h-4 w-4 text-muted-foreground" />
                    Facebook
                  </Label>
                  <Input
                    value={formData.socialLinks.facebook || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, facebook: e.target.value }
                    })}
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Youtube className="h-4 w-4 text-muted-foreground" />
                    YouTube
                  </Label>
                  <Input
                    value={formData.socialLinks.youtube || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, youtube: e.target.value }
                    })}
                    placeholder="https://youtube.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Twitter / X</Label>
                  <Input
                    value={formData.socialLinks.twitter || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, twitter: e.target.value }
                    })}
                    placeholder="https://x.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Instagram</Label>
                  <Input
                    value={formData.socialLinks.instagram || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, instagram: e.target.value }
                    })}
                    placeholder="https://instagram.com/..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={saving} className="bg-tea-green hover:bg-tea-green-dark">
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save All Settings
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}
