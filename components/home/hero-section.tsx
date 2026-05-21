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
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight mb-6 text-balance">
              {t(
                'প্রান্তের কণ্ঠকে সাহিত্যের মূলধারায়',
                'Bringing Marginal Voices to the Literary Mainstream'
              )}
            </h1>
            <p className="text-charcoal-light text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
              {t(
                'বাংলাদেশ চা জনগোষ্ঠী সাহিত্য পরিষদ (BTCLC) চা জনগোষ্ঠীর সাহিত্যিক ও সাংস্কৃতিক পরিচয় সংরক্ষণ, বিকাশ ও বিস্তারে নিবেদিত। প্রকাশনা, সংলাপ ও সম্মিলিত উদ্যোগের মাধ্যমে আমরা প্রান্তের কণ্ঠকে মূলধারায় নিয়ে আসি।',
                'Bangladesh Tea Community Literature Council (BTCLC) works to preserve and amplify the literary and cultural identity of the tea community through publications, dialogue, and collective engagement.'
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
            <div className="relative aspect-[4/3] lg:aspect-[3/4] rounded-lg overflow-hidden">
              <Image
                src="/images/tea-garden-hero.jpg"
                alt={t('চা বাগানের দৃশ্য', 'Tea garden landscape')}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-tea-green/10"></div>
            </div>
            {/* Floating accent */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gold/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
