"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { ArrowRight, Download, BookOpen } from 'lucide-react'

export function PublicationSection() {
  const { t } = useLanguage()

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Magazine Image */}
          <div className="relative">
            <div className="relative aspect-[3/4] max-w-sm mx-auto lg:mx-0 rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/images/utkorsha-magazine.jpg"
                alt={t('উৎকর্ষ সাহিত্য পত্রিকা', 'Utkarsha Magazine')}
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-32 h-32 border-2 border-gold rounded-lg -z-10"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-tea-green/10 rounded-lg -z-10"></div>
          </div>

          {/* Content */}
          <div>
            <span className="inline-block text-gold font-medium text-sm uppercase tracking-wider mb-4">
              {t('বিশেষ প্রকাশনা', 'Featured Publication')}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-2">
              {t('উৎকর্ষ', 'Utkarsha')}
            </h2>
            <p className="text-tea-green font-medium mb-4">
              {t('চা জনগোষ্ঠীর প্রথম সাহিত্য পত্রিকা', 'The First Literary Magazine of the Tea Community')}
            </p>
            <p className="text-charcoal-light leading-relaxed mb-6">
              {t(
                'উৎকর্ষ চা জনগোষ্ঠীর নিজস্ব সাহিত্য পত্রিকা। এতে প্রকাশিত হয় কবিতা, গল্প, প্রবন্ধ, স্মৃতিকথা এবং চা শ্রমিকদের জীবনের নানা অনুষঙ্গ। প্রতিটি সংখ্যা চা বাগানের জীবন, সংস্কৃতি ও ঐতিহ্যের এক অনন্য দলিল।',
                'Utkorsha is the tea community\'s own literary magazine. It publishes poetry, stories, essays, memoirs, and various aspects of tea workers\' lives. Each issue is a unique document of life, culture, and heritage in the tea gardens.'
              )}
            </p>
            
            <div className="bg-cream-dark rounded-lg p-4 mb-6">
              <p className="text-sm text-charcoal-light mb-2">
                {t('সর্বশেষ সংখ্যা', 'Latest Issue')}
              </p>
              <p className="font-serif text-lg text-charcoal">
                {t('উৎকর্ষ - বর্ষ ২, সংখ্যা ২ (২০২৬)', 'Utkorsha - Volume 2, Issue 2 (2026)')}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/publications/utkorsha"
                className="inline-flex items-center gap-2 px-6 py-3 bg-tea-green text-cream font-medium rounded hover:bg-tea-green-dark transition-colors"
              >
                <BookOpen size={18} />
                {t('অনলাইনে পড়ুন', 'Read Online')}
              </Link>
              <button className="inline-flex items-center gap-2 px-6 py-3 border-2 border-tea-green text-tea-green font-medium rounded hover:bg-tea-green hover:text-cream transition-colors">
                <Download size={18} />
                {t('PDF ডাউনলোড', 'Download PDF')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
