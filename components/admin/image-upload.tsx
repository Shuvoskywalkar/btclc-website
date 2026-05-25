"use client"

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadProps {
  label: string
  value?: string
  onChange: (url: string) => void
  accept?: string
}

export function ImageUpload({
  label,
  value,
  onChange,
  accept = 'image/*',
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB')
        return
      }

      setUploading(true)
      setError(null)

      try {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          throw new Error('Failed to upload file')
        }

        const data = await response.json()
        onChange(data.url)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to upload')
      } finally {
        setUploading(false)
      }
    },
    [onChange]
  )

  const handleRemove = () => {
    onChange('')
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {value ? (
        <div className="relative">
          <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-lg border border-border bg-muted">
            <Image
              src={value}
              alt="Uploaded image"
              fill
              className="object-cover"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -right-2 -top-2 h-8 w-8 rounded-full"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 p-8 transition-colors hover:border-tea-green/50">
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-tea-green" />
              <p className="text-sm text-muted-foreground">Uploading...</p>
            </div>
          ) : (
            <>
              <ImageIcon className="mb-4 h-10 w-10 text-muted-foreground" />
              <div className="text-center">
                <Label
                  htmlFor="image-upload"
                  className="cursor-pointer text-tea-green hover:underline"
                >
                  Click to upload
                </Label>
                <p className="mt-1 text-xs text-muted-foreground">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
              <Input
                id="image-upload"
                type="file"
                accept={accept}
                onChange={handleUpload}
                className="hidden"
              />
            </>
          )}
        </div>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}

interface FileUploadProps {
  label: string
  value?: string
  onChange: (url: string) => void
  accept?: string
}

export function FileUpload({
  label,
  value,
  onChange,
  accept = '.pdf,.doc,.docx',
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      // Validate file size (max 50MB for documents)
      if (file.size > 50 * 1024 * 1024) {
        setError('File size must be less than 50MB')
        return
      }

      setUploading(true)
      setError(null)

      try {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          throw new Error('Failed to upload file')
        }

        const data = await response.json()
        onChange(data.url)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to upload')
      } finally {
        setUploading(false)
      }
    },
    [onChange]
  )

  const handleRemove = () => {
    onChange('')
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {value ? (
        <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/50 p-4">
          <Upload className="h-8 w-8 text-tea-green" />
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium">{value.split('/').pop()}</p>
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-tea-green hover:underline"
            >
              View file
            </a>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 p-6 transition-colors hover:border-tea-green/50">
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-tea-green" />
              <p className="text-sm text-muted-foreground">Uploading...</p>
            </div>
          ) : (
            <>
              <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
              <Label
                htmlFor="file-upload"
                className="cursor-pointer text-sm text-tea-green hover:underline"
              >
                Click to upload a file
              </Label>
              <Input
                id="file-upload"
                type="file"
                accept={accept}
                onChange={handleUpload}
                className="hidden"
              />
            </>
          )}
        </div>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
