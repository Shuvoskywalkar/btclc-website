"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { useFirestoreData } from '@/lib/firestore-data'
import { ArrowRight } from 'lucide-react'

// Default content as fallback
const defaultContent = {
  tagline: { bn: 'প্রতিষ্ঠিত ২০২৬', en: 'Established 2026' },
  title: {
    bn: 'প্রান্তের কণ্ঠকে সাহিত্যের মূলধারায়',
    en: 'Bringing Marginal Voices to the Literary Mainstream'
  },
  description: {
    bn: 'বাংলাদেশ চা-জনগোষ্ঠী সাহিত্য পরিষদ (BTCLC) একটি অরাজনৈতিক, অলাভজনক ও স্বেচ্ছাসেবী সংগঠন যা চা-জনগোষ্ঠীর মধ্যে সাহিত্যচর্চা, সাংস্কৃতিক বিকাশ এবং সামাজিক সচেতনতা বৃদ্ধির উদ্দেশ্যে কাজ করে।',
    en: 'Bangladesh Tea Community Literature Council (BTCLC) is a non-political, non-profit, and volunteer organization working to promote literature, cultural development, and social awareness among the tea community.'
  },
  primaryButtonText: { bn: 'আমাদের সম্পর্কে', en: 'Explore BTCLC' },
  secondaryButtonText: { bn: 'উৎকর্ষ পড়ুন', en: 'Read "উৎকর্ষ"' },
  image: '/images/tea-flower-hero.jpg',
  imageAlt: { bn: 'চা ফুল - চা গাছের সাদা ফুল', en: 'Tea flower - white blossoms of the tea plant' }
}

export function HeroSection() {
  const { language, t } = useLanguage()
  const { hero, loading } = useFirestoreData()

  // Use Firestore data if available, otherwise fallback to default
  const content = hero || defaultContent

  return (
    <section className="min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in">
            <p className="text-gold font-medium text-sm uppercase tracking-wider mb-4">
              {language === 'bn' ? content.tagline.bn : content.tagline.en}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight mb-6 text-balance">
              {language === 'bn' ? content.title.bn : content.title.en}
            </h1>
            <p className="text-charcoal-light text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
              {language === 'bn' ? content.description.bn : content.description.en}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-tea-green text-cream font-medium rounded hover:bg-tea-green-dark transition-colors"
              >
                {language === 'bn' ? content.primaryButtonText.bn : content.primaryButtonText.en}
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/publications/utkorsha"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-tea-green text-tea-green font-medium rounded hover:bg-tea-green hover:text-cream transition-colors"
              >
                {language === 'bn' ? content.secondaryButtonText.bn : content.secondaryButtonText.en}
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="animate-fade-in-delay relative">
            <div className="relative aspect-[4/3] lg:aspect-square rounded-lg overflow-hidden shadow-xl">
              <Image
                src={content.image || defaultContent.image}
                alt={language === 'bn' ? content.imageAlt.bn : content.imageAlt.en}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent"></div>
            </div>
            {/* Floating accent */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gold/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
