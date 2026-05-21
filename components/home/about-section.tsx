"use client"

import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { ArrowRight } from 'lucide-react'

export function AboutSection() {
  const { t } = useLanguage()

  return (
    <section className="py-16 md:py-24 bg-cream-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-gold font-medium text-sm uppercase tracking-wider mb-4">
            {t('পরিচিতি', 'About Us')}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-6 text-balance">
            {t(
              'চা জনগোষ্ঠীর সাহিত্যিক ঐতিহ্যের সংরক্ষক',
              'Guardians of the Tea Community\'s Literary Heritage'
            )}
          </h2>
          <p className="text-charcoal-light text-lg leading-relaxed mb-8">
            {t(
              'বাংলাদেশ চা-জনগোষ্ঠী সাহিত্য পরিষদ একটি অরাজনৈতিক, অলাভজনক ও স্বেচ্ছাসেবী সংগঠন যা চা-জনগোষ্ঠীর মধ্যে সাহিত্য, সংস্কৃতি ও সামাজিক সচেতনতার চর্চাকে প্রাতিষ্ঠানিকীকরণ করতে এবং তাদের জ্ঞানভিত্তিক সক্ষমতা, সাংস্কৃতিক পরিচয় ও সামাজিক অংশগ্রহণকে সুসংহত করতে কাজ করে।',
              'Bangladesh Tea Community Literature Council is a non-political, non-profit, and volunteer organization working to institutionalize the practice of literature, culture, and social awareness among the tea community, and to consolidate their knowledge-based capacity, cultural identity, and social participation.'
            )}
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
