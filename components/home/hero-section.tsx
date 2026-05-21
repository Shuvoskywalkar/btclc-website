"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in">
            <p className="text-gold font-medium text-sm uppercase tracking-wider mb-4">
              {t('প্রতিষ্ঠিত ২০২৬', 'Established 2026')}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight mb-6 text-balance">
              {t(
                'প্রান্তের কণ্ঠকে সাহিত্যের মূলধারায়',
                'Bringing Marginal Voices to the Literary Mainstream'
              )}
            </h1>
            <p className="text-charcoal-light text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
              {t(
                'বাংলাদেশ চা-জনগোষ্ঠী সাহিত্য পরিষদ (BTCLC) একটি অরাজনৈতিক, অলাভজনক ও স্বেচ্ছাসেবী সংগঠন যা চা-জনগোষ্ঠীর মধ্যে সাহিত্যচর্চা, সাংস্কৃতিক বিকাশ এবং সামাজিক সচেতনতা বৃদ্ধির জন্য কাজ করে।',
                'Bangladesh Tea Community Literature Council (BTCLC) is a non-political, non-profit, and volunteer organization working to promote literature, cultural development, and social awareness among the tea community.'
              )}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-tea-green text-cream font-medium rounded hover:bg-tea-green-dark transition-colors"
              >
                {t('আমাদের সম্পর্কে', 'Explore BTCLC')}
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/publications/utkorsha"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-tea-green text-tea-green font-medium rounded hover:bg-tea-green hover:text-cream transition-colors"
              >
                {t('উৎকর্ষ পড়ুন', 'Read "উৎকর্ষ"')}
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="animate-fade-in-delay relative">
            <div className="relative aspect-[4/3] lg:aspect-square rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/tea-flower-hero.jpg"
                alt={t('চা ফুল - চা গাছের সাদা ফুল', 'Tea flower - white blossoms of the tea plant')}
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
