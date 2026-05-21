"use client"

import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { FileText, FolderArchive, BookMarked, FileBarChart, ArrowRight, Download } from 'lucide-react'

const archives = [
  {
    icon: FileText,
    title: { bn: 'সংবিধান', en: 'Constitution' },
    description: { bn: 'পরিষদের মূল সংবিধান ও নিয়মাবলী', en: 'Official constitution and bylaws' },
    type: 'PDF'
  },
  {
    icon: FolderArchive,
    title: { bn: 'পোর্টফোলিও', en: 'Portfolio' },
    description: { bn: 'আমাদের কাজের সংক্ষিপ্ত বিবরণ', en: 'Overview of our work and achievements' },
    type: 'PDF'
  },
  {
    icon: BookMarked,
    title: { bn: 'প্রকাশনা সংগ্রহ', en: 'Publications' },
    description: { bn: 'সকল প্রকাশিত বই ও পত্রিকা', en: 'All published books and magazines' },
    type: 'Archive'
  },
  {
    icon: FileBarChart,
    title: { bn: 'প্রতিবেদন', en: 'Reports' },
    description: { bn: 'বার্ষিক প্রতিবেদন ও কার্যক্রম', en: 'Annual reports and activities' },
    type: 'PDF'
  }
]

export function ArchiveSection() {
  const { language, t } = useLanguage()

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
          <div>
            <span className="inline-block text-gold font-medium text-sm uppercase tracking-wider mb-4">
              {t('সংগ্রহশালা', 'Archive')}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal text-balance">
              {t('সংবিধান ও সংগ্রহশালা', 'Constitution & Archive')}
            </h2>
          </div>
          <Link
            href="/archive"
            className="inline-flex items-center gap-2 text-tea-green font-medium hover:text-tea-green-dark transition-colors"
          >
            {t('সম্পূর্ণ সংগ্রহ', 'Full Archive')}
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {archives.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className="group bg-cream-dark p-6 rounded-lg border border-transparent hover:border-tea-green/20 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-tea-green/10 rounded flex items-center justify-center">
                    <Icon className="w-5 h-5 text-tea-green" />
                  </div>
                  <span className="text-xs font-medium text-charcoal-light bg-cream px-2 py-1 rounded">
                    {item.type}
                  </span>
                </div>
                <h3 className="font-serif text-lg text-charcoal mb-2">
                  {language === 'bn' ? item.title.bn : item.title.en}
                </h3>
                <p className="text-charcoal-light text-sm mb-4">
                  {language === 'bn' ? item.description.bn : item.description.en}
                </p>
                <button className="inline-flex items-center gap-2 text-tea-green text-sm font-medium hover:text-tea-green-dark transition-colors">
                  <Download size={14} />
                  {t('ডাউনলোড', 'Download')}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
