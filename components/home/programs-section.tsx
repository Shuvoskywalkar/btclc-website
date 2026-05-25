"use client"

import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { useFirestoreData } from '@/lib/firestore-data'
import { BookOpen, Users, MessageCircle, GraduationCap, ArrowRight, LucideIcon } from 'lucide-react'

// Icon mapping for Firestore programs
const iconMap: Record<string, LucideIcon> = {
  'book-open': BookOpen,
  'graduation-cap': GraduationCap,
  'message-circle': MessageCircle,
  'users': Users,
}

// Default programs as fallback
const defaultPrograms = [
  {
    icon: 'book-open',
    title: { bn: 'উৎকর্ষ পত্রিকা', en: 'Utkorsha Magazine' },
    description: {
      bn: 'চা-বাগানে সৃজনশীলতা ও রচনাত্মক প্রতিভার বিকাশ ঘটাতে বার্ষিক সাহিত্য পত্রিকা।',
      en: 'Annual literary magazine to develop creativity and writing talent in tea gardens.'
    },
    href: '/publications/utkorsha'
  },
  {
    icon: 'graduation-cap',
    title: { bn: 'চা-সাহিত্য উৎসব', en: 'Tea Literature Festival' },
    description: {
      bn: 'চা-বাগানে সৃজনশীলতা ও রচনাত্মক প্রতিভার বিকাশ ঘটাতে বার্ষিক সাহিত্য প্রতিযোগিতা।',
      en: 'Annual literary competition to develop creativity and writing talent in tea gardens.'
    },
    href: '/programs/literary-festival'
  },
  {
    icon: 'message-circle',
    title: { bn: 'সচেতনতামূলক কার্যক্রম', en: 'Awareness Programs' },
    description: {
      bn: 'প্রত্যন্ত চা-বাগান অঞ্চলে সচেতনতামূলক আলোচনা, সংলাপ ও ক্যাম্পেইন।',
      en: 'Awareness discussions, dialogues and campaigns in remote tea garden areas.'
    },
    href: '/programs/dialogue'
  },
  {
    icon: 'users',
    title: { bn: 'দক্ষতা উন্নয়ন', en: 'Skill Development' },
    description: {
      bn: 'স্বেচ্ছাসেবকদের দক্ষতা উন্নয়ন ও তরুণ নেতৃত্ব গঠন কর্মসূচি।',
      en: 'Volunteer skill development and youth leadership building programs.'
    },
    href: '/programs/youth'
  }
]

export function ProgramsSection() {
  const { language, t } = useLanguage()
  const { programs: firestorePrograms, loading } = useFirestoreData()

  // Use Firestore data if available, otherwise fallback to default
  const programs = firestorePrograms.length > 0 
    ? firestorePrograms.map(p => ({
        icon: p.icon || 'book-open',
        title: p.title,
        description: p.description,
        href: p.href || `/programs/${p.id}`
      }))
    : defaultPrograms

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
            const Icon = iconMap[program.icon] || BookOpen
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
