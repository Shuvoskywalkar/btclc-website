"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { BilingualText } from '@/lib/types'

interface BilingualInputProps {
  label: string
  value: BilingualText
  onChange: (value: BilingualText) => void
  multiline?: boolean
  required?: boolean
}

export function BilingualInput({
  label,
  value,
  onChange,
  multiline = false,
  required = false,
}: BilingualInputProps) {
  const InputComponent = multiline ? Textarea : Input

  return (
    <div className="space-y-4">
      <Label className="text-base font-medium">{label}</Label>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">
            Bengali (বাংলা)
            {required && <span className="text-destructive"> *</span>}
          </Label>
          <InputComponent
            value={value?.bn || ''}
            onChange={(e) => onChange({ ...value, bn: e.target.value })}
            placeholder="বাংলায় লিখুন..."
            className="font-serif"
            required={required}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">
            English
            {required && <span className="text-destructive"> *</span>}
          </Label>
          <InputComponent
            value={value?.en || ''}
            onChange={(e) => onChange({ ...value, en: e.target.value })}
            placeholder="Write in English..."
            required={required}
          />
        </div>
      </div>
    </div>
  )
}
