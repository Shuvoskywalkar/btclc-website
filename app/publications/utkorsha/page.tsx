"use client"

import { LanguageProvider, useLanguage } from '@/lib/language-context'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import { Download, Calendar, Users, BookOpen } from 'lucide-react'

const issues = [
  {
    id: '5-2',
    volume: 5,
    issue: 2,
    title: { bn: 'শীতের গল্প', en: 'Winter Tales' },
    date: { bn: 'ডিসেম্বর ২০২৪', en: 'December 2024' },
    contributors: 22,
    pages: 64,
    description: { bn: 'চা বাগানের শীতের দিনগুলোর গল্প ও কবিতা', en: 'Stories and poems of winter days in tea gardens' },
    latest: true
  },
  {
    id: '5-1',
    volume: 5,
    issue: 1,
    title: { bn: 'বর্ষার সুর', en: 'Monsoon Melodies' },
    date: { bn: 'জুন ২০২৪', en: 'June 2024' },
    contributors: 18,
    pages: 56,
    description: { bn: 'বর্ষায় চা বাগানের রূপ ও রস', en: 'The beauty and essence of tea gardens in monsoon' },
    latest: false
  },
  {
    id: '4-2',
    volume: 4,
    issue: 2,
    title: { bn: 'শ্রমের সংগীত', en: 'Songs of Labor' },
    date: { bn: 'ডিসেম্বর ২০২৩', en: 'December 2023' },
    contributors: 20,
    pages: 60,
    description: { bn: 'চা শ্রমিকদের জীবন ও সংগ্রামের কথা', en: 'Life and struggles of tea workers' },
    latest: false
  },
  {
    id: '4-1',
    volume: 4,
    issue: 1,
    title: { bn: 'মাটির টান', en: 'Call of the Soil' },
    date: { bn: 'জুন ২০২৩', en: 'June 2023' },
    contributors: 16,
    pages: 52,
    description: { bn: 'চা বাগানের মাটি ও মানুষের গল্প', en: 'Stories of the soil and people of tea gardens' },
    latest: false
  },
  {
    id: '3-2',
    volume: 3,
    issue: 2,
    title: { bn: 'স্মৃতির পাতা', en: 'Pages of Memory' },
    date: { bn: 'ডিসেম্বর ২০২২', en: 'December 2022' },
    contributors: 15,
    pages: 48,
    description: { bn: 'পূর্বপুরুষদের স্মৃতিকথা', en: 'Memoirs of ancestors' },
    latest: false
  },
  {
    id: '3-1',
    volume: 3,
    issue: 1,
    title: { bn: 'নতুন সূর্য', en: 'New Dawn' },
    date: { bn: 'জুন ২০২২', en: 'June 2022' },
    contributors: 14,
    pages: 44,
    description: { bn: 'তরুণ প্রজন্মের কবিতা ও গল্প', en: 'Poetry and stories of the young generation' },
    latest: false
  }
]

function UtkorshaContent() {
  const { language, t } = useLanguage()

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-tea-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-gold font-medium text-sm uppercase tracking-wider mb-4">
                {t('সাহিত্য পত্রিকা', 'Literary Magazine')}
              </span>
              <h1 className="font-serif text-5xl md:text-6xl text-cream mb-4">
                উৎকর্ষ
              </h1>
              <p className="text-cream/80 text-lg md:text-xl leading-relaxed mb-6">
                {t(
                  'চা জনগোষ্ঠীর প্রথম ও একমাত্র সাহিত্য পত্রিকা। ২০১৯ সাল থেকে প্রকাশিত হচ্ছে এই পত্রিকা, যেখানে তুলে ধরা হয় চা শ্রমিক ও তাদের বংশধরদের কবিতা, গল্প, প্রবন্ধ ও স্মৃতিকথা।',
                  'The first and only literary magazine of the tea community. Published since 2019, this magazine showcases poetry, stories, essays, and memoirs of tea workers and their descendants.'
                )}
              </p>
              <div className="flex flex-wrap gap-6 text-cream/70 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{t('বর্ষে দুইবার প্রকাশিত', 'Published twice a year')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} />
                  <span>{t('১০০+ অবদানকারী', '100+ contributors')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen size={16} />
                  <span>{t('১২টি সংখ্যা প্রকাশিত', '12 issues published')}</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[3/4] max-w-xs mx-auto rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/images/utkorsha-magazine.jpg"
                  alt="Utkorsha Magazine"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-gold/30 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Issues Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl text-charcoal mb-8">
            {t('সকল সংখ্যা', 'All Issues')}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {issues.map((issue) => (
              <div key={issue.id} className="bg-card rounded-lg border border-border hover:border-tea-green/30 transition-colors overflow-hidden">
                <div className="relative aspect-[4/3] bg-cream-dark">
                  <Image
                    src="/images/utkorsha-magazine.jpg"
                    alt={language === 'bn' ? issue.title.bn : issue.title.en}
                    fill
                    className="object-cover opacity-90"
                  />
                  {issue.latest && (
                    <div className="absolute top-3 right-3 bg-gold text-charcoal text-xs font-medium px-2 py-1 rounded">
                      {t('সর্বশেষ', 'Latest')}
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent p-4">
                    <p className="text-cream font-serif text-2xl">
                      {t(`বর্ষ ${issue.volume}, সংখ্যা ${issue.issue}`, `Vol. ${issue.volume}, Issue ${issue.issue}`)}
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-charcoal mb-1">
                    {language === 'bn' ? issue.title.bn : issue.title.en}
                  </h3>
                  <p className="text-charcoal-light text-sm mb-3">
                    {language === 'bn' ? issue.date.bn : issue.date.en}
                  </p>
                  <p className="text-charcoal-light text-sm mb-4">
                    {language === 'bn' ? issue.description.bn : issue.description.en}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-charcoal-light mb-4">
                    <span>{issue.contributors} {t('লেখক', 'writers')}</span>
                    <span>{issue.pages} {t('পৃষ্ঠা', 'pages')}</span>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-tea-green text-cream text-sm font-medium rounded hover:bg-tea-green-dark transition-colors">
                      <BookOpen size={14} />
                      {t('পড়ুন', 'Read')}
                    </button>
                    <button className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-tea-green text-tea-green text-sm font-medium rounded hover:bg-tea-green hover:text-cream transition-colors">
                      <Download size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Submit Work CTA */}
      <section className="py-16 md:py-24 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
            {t('আপনার লেখা পাঠান', 'Submit Your Work')}
          </h2>
          <p className="text-charcoal-light text-lg max-w-2xl mx-auto mb-8">
            {t(
              'আপনিও কি চা জনগোষ্ঠীর একজন? আপনার কবিতা, গল্প বা প্রবন্ধ পাঠান উৎকর্ষ পত্রিকায় প্রকাশের জন্য।',
              'Are you from the tea community? Submit your poetry, stories, or essays for publication in Utkorsha magazine.'
            )}
          </p>
          <a
            href="mailto:utkorsha@btclc.org"
            className="inline-flex items-center gap-2 px-8 py-4 bg-tea-green text-cream font-medium rounded hover:bg-tea-green-dark transition-colors"
          >
            {t('লেখা পাঠান', 'Submit Work')}
          </a>
        </div>
      </section>
    </>
  )
}

export default function UtkorshaPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <UtkorshaContent />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}
