"use client"

import { LanguageProvider } from '@/lib/language-context'
import { FirestoreDataProvider } from '@/lib/firestore-data'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { HeroSection } from '@/components/home/hero-section'
import { AboutSection } from '@/components/home/about-section'
import { PublicationSection } from '@/components/home/publication-section'
import { ProgramsSection } from '@/components/home/programs-section'
import { ArchiveSection } from '@/components/home/archive-section'
import { VoicesSection } from '@/components/home/voices-section'
import { GallerySection } from '@/components/home/gallery-section'
import { JoinSection } from '@/components/home/join-section'

export default function HomePage() {
  return (
    <LanguageProvider>
      <FirestoreDataProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <HeroSection />
          <AboutSection />
          <PublicationSection />
          <ProgramsSection />
          <ArchiveSection />
          <VoicesSection />
          <GallerySection />
          <JoinSection />
        </main>
        <Footer />
      </div>
      </FirestoreDataProvider>
    </LanguageProvider>
  )
}
