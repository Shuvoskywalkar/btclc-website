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
              'বাংলাদেশ চা জনগোষ্ঠী সাহিত্য পরিষদ একটি অলাভজনক সাহিত্য ও সাংস্কৃতিক সংগঠন যা চা শ্রমিক ও তাদের বংশধরদের সাহিত্যিক কণ্ঠস্বর সংরক্ষণ ও প্রচারে নিবেদিত। আমরা বিশ্বাস করি প্রতিটি সম্প্রদায়ের নিজস্ব গল্প আছে যা বলা দরকার।',
              'Bangladesh Tea Community Literature Council is a non-profit literary and cultural organization dedicated to preserving and promoting the literary voices of tea workers and their descendants. We believe every community has stories that deserve to be told.'
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
