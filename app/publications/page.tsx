"use client"

import { LanguageProvider, useLanguage } from '@/lib/language-context'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import Link from 'next/link'
import { Download, BookOpen, Calendar, ArrowRight } from 'lucide-react'

const publications = [
  {
    id: 'utkorsha-5-2',
    title: { bn: 'উৎকর্ষ - বর্ষ ৫, সংখ্যা ২', en: 'Utkorsha - Volume 5, Issue 2' },
    date: { bn: 'ডিসেম্বর ২০২৪', en: 'December 2024' },
    type: { bn: 'পত্রিকা', en: 'Magazine' },
    description: { bn: 'চা বাগানের শীতের গল্প ও কবিতা সংকলন', en: 'Collection of winter stories and poems from tea gardens' },
    image: '/images/utkorsha-magazine.jpg',
    featured: true
  },
  {
    id: 'utkorsha-5-1',
    title: { bn: 'উৎকর্ষ - বর্ষ ৫, সংখ্যা ১', en: 'Utkorsha - Volume 5, Issue 1' },
    date: { bn: 'জুন ২০২৪', en: 'June 2024' },
    type: { bn: 'পত্রিকা', en: 'Magazine' },
    description: { bn: 'বর্ষার চা বাগান - বিশেষ সংখ্যা', en: 'Monsoon Tea Gardens - Special Issue' },
    image: '/images/utkorsha-magazine.jpg',
    featured: false
  },
  {
    id: 'chaa-o-shilpo',
    title: { bn: 'চা ও শিল্প', en: 'Tea and Art' },
    date: { bn: '২০২৩', en: '2023' },
    type: { bn: 'বই', en: 'Book' },
    description: { bn: 'চা শিল্পের ইতিহাস ও সংস্কৃতি নিয়ে প্রবন্ধ সংকলন', en: 'Essay collection on the history and culture of tea industry' },
    image: '/images/gallery-2.jpg',
    featured: false
  },
  {
    id: 'muktir-kotha',
    title: { bn: 'মুক্তির কথা', en: 'Words of Freedom' },
    date: { bn: '২০২২', en: '2022' },
    type: { bn: 'কবিতা সংকলন', en: 'Poetry Collection' },
    description: { bn: 'চা শ্রমিকদের মুক্তিযুদ্ধের স্মৃতি নিয়ে কবিতা', en: 'Poems on tea workers\' memories of the liberation war' },
    image: '/images/gallery-2.jpg',
    featured: false
  }
]

function PublicationsContent() {
  const { language, t } = useLanguage()

  const featuredPub = publications.find(p => p.featured)
  const otherPubs = publications.filter(p => !p.featured)

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block text-gold font-medium text-sm uppercase tracking-wider mb-4">
              {t('প্রকাশনা', 'Publications')}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-6 text-balance">
              {t('আমাদের প্রকাশনা', 'Our Publications')}
            </h1>
            <p className="text-charcoal-light text-lg md:text-xl leading-relaxed">
              {t(
                'চা জনগোষ্ঠীর কণ্ঠস্বর তুলে ধরতে আমাদের প্রকাশিত বই, পত্রিকা ও অন্যান্য সাহিত্যকর্ম।',
                'Our published books, magazines, and other literary works that amplify the voices of the tea community.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Publication */}
      {featuredPub && (
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="relative aspect-[3/4] max-w-sm mx-auto lg:mx-0 rounded-lg overflow-hidden shadow-2xl">
                  <Image
                    src={featuredPub.image}
                    alt={language === 'bn' ? featuredPub.title.bn : featuredPub.title.en}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute top-4 left-4 bg-gold text-charcoal text-sm font-medium px-3 py-1 rounded">
                  {t('সর্বশেষ', 'Latest')}
                </div>
              </div>

              <div>
                <span className="inline-block text-gold font-medium text-sm uppercase tracking-wider mb-4">
                  {t('বিশেষ প্রকাশনা', 'Featured Publication')}
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-2">
                  {language === 'bn' ? featuredPub.title.bn : featuredPub.title.en}
                </h2>
                <div className="flex items-center gap-4 text-charcoal-light text-sm mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {language === 'bn' ? featuredPub.date.bn : featuredPub.date.en}
                  </span>
                  <span className="bg-tea-green/10 text-tea-green px-2 py-0.5 rounded">
                    {language === 'bn' ? featuredPub.type.bn : featuredPub.type.en}
                  </span>
                </div>
                <p className="text-charcoal-light leading-relaxed mb-6">
                  {language === 'bn' ? featuredPub.description.bn : featuredPub.description.en}
                </p>
                <p className="text-charcoal-light leading-relaxed mb-8">
                  {t(
                    'এই সংখ্যায় রয়েছে চা বাগানের শীতের দিনগুলোর গল্প, কবিতা, প্রবন্ধ এবং চা শ্রমিকদের জীবনের নানা অনুষঙ্গ। ২০ জনেরও বেশি লেখকের সৃষ্টিকর্ম নিয়ে এই বিশেষ সংখ্যা।',
                    'This issue features stories, poems, essays about winter days in tea gardens, and various aspects of tea workers\' lives. This special issue includes works from more than 20 writers.'
                  )}
                </p>
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
      )}

      {/* All Publications */}
      <section className="py-16 md:py-24 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl text-charcoal mb-8">
            {t('সকল প্রকাশনা', 'All Publications')}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherPubs.map((pub) => (
              <div key={pub.id} className="bg-card rounded-lg overflow-hidden border border-border hover:border-tea-green/30 transition-colors">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={pub.image}
                    alt={language === 'bn' ? pub.title.bn : pub.title.en}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-charcoal-light mb-2">
                    <span>{language === 'bn' ? pub.date.bn : pub.date.en}</span>
                    <span className="text-tea-green">•</span>
                    <span className="text-tea-green">{language === 'bn' ? pub.type.bn : pub.type.en}</span>
                  </div>
                  <h3 className="font-serif text-xl text-charcoal mb-2">
                    {language === 'bn' ? pub.title.bn : pub.title.en}
                  </h3>
                  <p className="text-charcoal-light text-sm mb-4">
                    {language === 'bn' ? pub.description.bn : pub.description.en}
                  </p>
                  <div className="flex gap-3">
                    <button className="text-tea-green text-sm font-medium hover:text-tea-green-dark transition-colors flex items-center gap-1">
                      <BookOpen size={14} />
                      {t('পড়ুন', 'Read')}
                    </button>
                    <button className="text-tea-green text-sm font-medium hover:text-tea-green-dark transition-colors flex items-center gap-1">
                      <Download size={14} />
                      {t('ডাউনলোড', 'Download')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Utkorsha Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-tea-green rounded-2xl p-8 md:p-12 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-cream mb-4">
              {t('উৎকর্ষ পত্রিকা', 'Utkorsha Magazine')}
            </h2>
            <p className="text-cream/80 text-lg max-w-2xl mx-auto mb-8">
              {t(
                'চা জনগোষ্ঠীর প্রথম ও একমাত্র সাহিত্য পত্রিকা। প্রতিটি সংখ্যা চা বাগানের জীবন, সংস্কৃতি ও ঐতিহ্যের এক অনন্য দলিল।',
                'The first and only literary magazine of the tea community. Each issue is a unique document of life, culture, and heritage in tea gardens.'
              )}
            </p>
            <Link
              href="/publications/utkorsha"
              className="inline-flex items-center gap-2 px-8 py-4 bg-cream text-tea-green font-medium rounded hover:bg-cream-dark transition-colors"
            >
              {t('উৎকর্ষ সংগ্রহ দেখুন', 'View Utkorsha Collection')}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default function PublicationsPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <PublicationsContent />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}
