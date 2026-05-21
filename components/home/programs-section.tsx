"use client"

import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { BookOpen, Users, MessageCircle, GraduationCap, ArrowRight } from 'lucide-react'

const programs = [
  {
    icon: BookOpen,
    title: { bn: 'সাহিত্য উৎসব', en: 'Literary Festival' },
    description: {
      bn: 'বার্ষিক সাহিত্য উৎসব যেখানে চা জনগোষ্ঠীর লেখক ও কবিরা একত্রিত হন।',
      en: 'Annual literary festival where writers and poets from the tea community come together.'
    },
    href: '/programs/literary-festival'
  },
  {
    icon: GraduationCap,
    title: { bn: 'সাহিত্য কর্মশালা', en: 'Writing Workshops' },
    description: {
      bn: 'তরুণ লেখকদের জন্য সৃজনশীল লেখালেখি ও প্রকাশনা বিষয়ক কর্মশালা।',
      en: 'Creative writing and publishing workshops for young writers.'
    },
    href: '/programs/workshops'
  },
  {
    icon: MessageCircle,
    title: { bn: 'সম্প্রদায় সংলাপ', en: 'Community Dialogue' },
    description: {
      bn: 'সাহিত্য ও সংস্কৃতি বিষয়ে মুক্ত আলোচনা ও মতবিনিময় সভা।',
      en: 'Open discussions and exchange of ideas on literature and culture.'
    },
    href: '/programs/dialogue'
  },
  {
    icon: Users,
    title: { bn: 'যুব কার্যক্রম', en: 'Youth Programs' },
    description: {
      bn: 'তরুণ প্রজন্মের মধ্যে সাহিত্যিক চেতনা ও সাংস্কৃতিক সচেতনতা বিকাশ।',
      en: 'Developing literary consciousness and cultural awareness among youth.'
    },
    href: '/programs/youth'
  }
]

export function ProgramsSection() {
  const { language, t } = useLanguage()

  return (
    <section className="py-16 md:py-24 bg-cream-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-gold font-medium text-sm uppercase tracking-wider mb-4">
            {t('কার্যক্রম', 'Programs')}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4 text-balance">
            {t('আমাদের কার্যক্রম', 'Our Programs & Activities')}
          </h2>
          <p className="text-charcoal-light text-lg max-w-2xl mx-auto">
            {t(
              'সাহিত্য ও সংস্কৃতির বিকাশে আমাদের বিভিন্ন কার্যক্রম',
              'Our various initiatives for the development of literature and culture'
            )}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => {
            const Icon = program.icon
            return (
              <Link
                key={index}
                href={program.href}
                className="group bg-card p-6 rounded-lg border border-border hover:border-tea-green hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-tea-green/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-tea-green transition-colors">
                  <Icon className="w-6 h-6 text-tea-green group-hover:text-cream transition-colors" />
                </div>
                <h3 className="font-serif text-xl text-charcoal mb-2">
                  {language === 'bn' ? program.title.bn : program.title.en}
                </h3>
                <p className="text-charcoal-light text-sm leading-relaxed mb-4">
                  {language === 'bn' ? program.description.bn : program.description.en}
                </p>
                <span className="inline-flex items-center gap-1 text-tea-green text-sm font-medium group-hover:gap-2 transition-all">
                  {t('বিস্তারিত', 'Learn more')}
                  <ArrowRight size={14} />
                </span>
              </Link>
            )
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 text-tea-green font-medium hover:text-tea-green-dark transition-colors"
          >
            {t('সকল কার্যক্রম দেখুন', 'View All Programs')}
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
