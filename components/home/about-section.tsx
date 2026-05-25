"use client"

import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { useFirestoreData } from '@/lib/firestore-data'
import { ArrowRight } from 'lucide-react'

// Default about content as fallback
const defaultAbout = {
  tagline: { bn: 'পরিচিতি', en: 'About Us' },
  title: {
    bn: 'চা জনগোষ্ঠীর সাহিত্যিক জাগরণের পথিক',
    en: 'Pioneers of the Tea Community\'s Literary Heritage'
  },
  description: {
    bn: 'বাংলাদেশ চা-জনগোষ্ঠী সাহিত্য পরিষদ একটি অরাজনৈতিক, অলাভজনক ও স্বেচ্ছাসেবী সংগঠন যা চা-জনগোষ্ঠীর মধ্যে সাহিত্য, সংস্কৃতি ও সামাজিক সচেতনতার চর্চাকে প্রাতিষ্ঠানিকীকরণ করতে এবং তাদের জ্ঞানভিত্তিক সক্ষমতা, সাংস্কৃতিক পরিচয় ও সামাজিক অংশগ্রহণকে সুসংহত করতে কাজ করে।',
    en: 'Bangladesh Tea Community Literature Council is a non-political, non-profit, and volunteer organization working to institutionalize the practice of literature, culture, and social awareness among the tea community, and to consolidate their knowledge-based capacity, cultural identity, and social participation.'
  }
}

export function AboutSection() {
  const { language, t } = useLanguage()
  const { about, loading } = useFirestoreData()

  // Use Firestore data if available, otherwise fallback to default
  const content = about || defaultAbout

  return (
    <section className="py-16 md:py-24 bg-cream-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-gold font-medium text-sm uppercase tracking-wider mb-4">
            {language === 'bn' ? content.tagline.bn : content.tagline.en}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-6 text-balance">
            {language === 'bn' ? content.title.bn : content.title.en}
          </h2>
          <p className="text-charcoal-light text-lg leading-relaxed mb-8">
            {language === 'bn' ? content.description.bn : content.description.en}
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-tea-green font-medium hover:text-tea-green-dark transition-colors"
          >
            {t('আরও জানুন', 'Learn More')}
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
