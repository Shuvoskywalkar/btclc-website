"use client"

import { LanguageProvider, useLanguage } from '@/lib/language-context'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FileText, FolderArchive, BookMarked, FileBarChart, Download, Eye, Calendar } from 'lucide-react'

const documents = [
  {
    category: { bn: 'মূল দলিল', en: 'Core Documents' },
    items: [
      {
        icon: FileText,
        title: { bn: 'সংবিধান', en: 'Constitution' },
        description: { bn: 'পরিষদের মূল সংবিধান ও নিয়মাবলী', en: 'Official constitution and bylaws of the council' },
        date: { bn: '২০১৮', en: '2018' },
        type: 'PDF',
        size: '2.4 MB'
      },
      {
        icon: FolderArchive,
        title: { bn: 'পোর্টফোলিও', en: 'Portfolio' },
        description: { bn: 'আমাদের কাজের সংক্ষিপ্ত বিবরণ', en: 'Overview of our work and achievements' },
        date: { bn: '২০২৪', en: '2024' },
        type: 'PDF',
        size: '8.5 MB'
      }
    ]
  },
  {
    category: { bn: 'বার্ষিক প্রতিবেদন', en: 'Annual Reports' },
    items: [
      {
        icon: FileBarChart,
        title: { bn: 'বার্ষিক প্রতিবেদন ২০২৩-২৪', en: 'Annual Report 2023-24' },
        description: { bn: 'গত বছরের কার্যক্রম ও অর্জনের বিবরণ', en: 'Activities and achievements of the past year' },
        date: { bn: '২০২৪', en: '2024' },
        type: 'PDF',
        size: '5.2 MB'
      },
      {
        icon: FileBarChart,
        title: { bn: 'বার্ষিক প্রতিবেদন ২০২২-২৩', en: 'Annual Report 2022-23' },
        description: { bn: 'আগের বছরের কার্যক্রম ও অর্জন', en: 'Activities and achievements of previous year' },
        date: { bn: '২০২৩', en: '2023' },
        type: 'PDF',
        size: '4.8 MB'
      }
    ]
  },
  {
    category: { bn: 'প্রকাশনা সংগ্রহ', en: 'Publications Archive' },
    items: [
      {
        icon: BookMarked,
        title: { bn: 'উৎকর্ষ সংগ্রহ (২০১৯-২০২৪)', en: 'Utkorsha Collection (2019-2024)' },
        description: { bn: 'সকল সংখ্যার সম্পূর্ণ সংগ্রহ', en: 'Complete collection of all issues' },
        date: { bn: '২০১৯-২০২৪', en: '2019-2024' },
        type: 'Archive',
        size: '156 MB'
      },
      {
        icon: BookMarked,
        title: { bn: 'বই সংগ্রহ', en: 'Book Collection' },
        description: { bn: 'প্রকাশিত সকল বইয়ের তালিকা ও PDF', en: 'List and PDFs of all published books' },
        date: { bn: '২০১৮-২০২৪', en: '2018-2024' },
        type: 'Archive',
        size: '89 MB'
      }
    ]
  }
]

function ArchiveContent() {
  const { language, t } = useLanguage()

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block text-gold font-medium text-sm uppercase tracking-wider mb-4">
              {t('সংগ্রহশালা', 'Archive')}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-6 text-balance">
              {t('সংবিধান ও সংগ্রহশালা', 'Constitution & Archive')}
            </h1>
            <p className="text-charcoal-light text-lg md:text-xl leading-relaxed">
              {t(
                'আমাদের সকল দলিল, প্রতিবেদন ও প্রকাশনার ডিজিটাল সংগ্রহ।',
                'Digital collection of all our documents, reports, and publications.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {documents.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h2 className="font-serif text-2xl text-charcoal mb-6 pb-3 border-b border-border">
                  {language === 'bn' ? section.category.bn : section.category.en}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {section.items.map((item, itemIndex) => {
                    const Icon = item.icon
                    return (
                      <div key={itemIndex} className="bg-card p-6 rounded-lg border border-border hover:border-tea-green/30 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-tea-green/10 rounded-lg flex items-center justify-center shrink-0">
                            <Icon className="w-6 h-6 text-tea-green" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h3 className="font-serif text-lg text-charcoal">
                                {language === 'bn' ? item.title.bn : item.title.en}
                              </h3>
                              <span className="text-xs font-medium text-charcoal-light bg-cream-dark px-2 py-1 rounded shrink-0">
                                {item.type}
                              </span>
                            </div>
                            <p className="text-charcoal-light text-sm mb-3">
                              {language === 'bn' ? item.description.bn : item.description.en}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-charcoal-light mb-4">
                              <span className="flex items-center gap-1">
                                <Calendar size={12} />
                                {language === 'bn' ? item.date.bn : item.date.en}
                              </span>
                              <span>{item.size}</span>
                            </div>
                            <div className="flex gap-3">
                              <button className="inline-flex items-center gap-1.5 text-tea-green text-sm font-medium hover:text-tea-green-dark transition-colors">
                                <Eye size={14} />
                                {t('দেখুন', 'View')}
                              </button>
                              <button className="inline-flex items-center gap-1.5 text-tea-green text-sm font-medium hover:text-tea-green-dark transition-colors">
                                <Download size={14} />
                                {t('ডাউনলোড', 'Download')}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Section */}
      <section className="py-16 md:py-24 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl text-charcoal mb-4">
            {t('নির্দিষ্ট দলিল প্রয়োজন?', 'Need a Specific Document?')}
          </h2>
          <p className="text-charcoal-light text-lg max-w-2xl mx-auto mb-8">
            {t(
              'এখানে না পেলে আমাদের সাথে যোগাযোগ করুন। আমরা আপনাকে প্রয়োজনীয় দলিল সরবরাহ করতে সাহায্য করব।',
              'If you can\'t find what you\'re looking for, contact us. We\'ll help you get the documents you need.'
            )}
          </p>
          <a
            href="mailto:archive@btclc.org"
            className="inline-flex items-center gap-2 px-8 py-4 bg-tea-green text-cream font-medium rounded hover:bg-tea-green-dark transition-colors"
          >
            {t('যোগাযোগ করুন', 'Contact Us')}
          </a>
        </div>
      </section>
    </>
  )
}

export default function ArchivePage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <ArchiveContent />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}
