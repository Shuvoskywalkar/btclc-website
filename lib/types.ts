// Bilingual content type
export interface BilingualText {
  bn: string
  en: string
}

// Admin user
export interface AdminUser {
  email: string
  name: string
  createdAt: Date
  addedBy: string
}

// Site settings
export interface SiteSettings {
  logoUrl?: string
  contactEmail: string
  contactPhone: string
  address: BilingualText
  tagline: BilingualText
  socialLinks: {
    facebook?: string
    youtube?: string
    twitter?: string
    instagram?: string
  }
}

// Hero section - matches frontend component structure
export interface HeroSection {
  tagline: BilingualText
  title: BilingualText
  description: BilingualText
  primaryButtonText: BilingualText
  secondaryButtonText: BilingualText
  image: string
  imageAlt: BilingualText
}

// About section - matches frontend component structure
export interface AboutSection {
  tagline: BilingualText
  title: BilingualText
  description: BilingualText
}

// Program item
export interface Program {
  id?: string
  title: BilingualText
  description: BilingualText
  icon: string
  href: string
  order: number
}

// Publication
export interface Publication {
  id?: string
  title: BilingualText
  description: BilingualText
  imageUrl: string
  pdfUrl?: string
  publishedAt: Date
  featured: boolean
  order: number
}

// Gallery item
export interface GalleryItem {
  id?: string
  imageUrl: string
  alt: BilingualText
  category: BilingualText
  order: number
  uploadedAt: Date
}

// Event
export interface Event {
  id?: string
  title: BilingualText
  description: BilingualText
  date: Date
  location: BilingualText
  imageUrl?: string
  status: 'upcoming' | 'ongoing' | 'completed'
}

// Archive item
export interface ArchiveItem {
  id?: string
  title: BilingualText
  description: BilingualText
  type: 'document' | 'image' | 'video' | 'audio'
  fileUrl: string
  thumbnailUrl?: string
  order: number
}

// Community voice / testimonial
export interface Voice {
  id?: string
  quote: BilingualText
  name: BilingualText
  role: BilingualText
  image?: string
  order: number
}

// Firestore collection names
export const COLLECTIONS = {
  ADMINS: 'admins',
  SITE_SETTINGS: 'site-settings',
  HERO: 'hero-section',
  ABOUT: 'about-section',
  PROGRAMS: 'programs',
  PUBLICATIONS: 'publications',
  GALLERY: 'gallery',
  EVENTS: 'events',
  ARCHIVE: 'archive',
  VOICES: 'voices',
  CONTACT_SUBMISSIONS: 'contact-submissions',
} as const

// Contact form submission
export interface ContactSubmission {
  id?: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  createdAt: Date
  read: boolean
}
