"use client"

import { LanguageProvider, useLanguage } from '@/lib/language-context'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import Link from 'next/link'
import { BookOpen, Users, MessageCircle, GraduationCap, Calendar, MapPin, ArrowRight } from 'lucide-react'

const programs = [
  {
    id: 'literary-festival',
    icon: BookOpen,
    title: { bn: 'সাহিত্য উৎসব', en: 'Literary Festival' },
    description: { 
      bn: 'বার্ষিক সাহিত্য উৎসব যেখানে চা জনগোষ্ঠীর লেখক ও কবিরা একত্রিত হন। কবিতা পাঠ, গল্প পাঠ, আলোচনা ও পুরস্কার বিতরণী অনুষ্ঠান।', 
      en: 'Annual literary festival where writers and poets from the tea community gather. Features poetry readings, story sessions, discussions, and award ceremonies.' 
    },
    features: [
      { bn: 'কবিতা ও গল্প পাঠ', en: 'Poetry & Story Readings' },
      { bn: 'সাহিত্য আলোচনা', en: 'Literary Discussions' },
      { bn: 'পুরস্কার বিতরণী', en: 'Award Ceremony' },
      { bn: 'বই মেলা', en: 'Book Fair' }
    ],
    image: '/images/literary-event.jpg'
  },
  {
    id: 'workshops',
    icon: GraduationCap,
    title: { bn: 'সাহিত্য কর্মশালা', en: 'Writing Workshops' },
    description: { 
      bn: 'তরুণ লেখকদের জন্য সৃজনশীল লেখালেখি ও প্রকাশনা বিষয়ক কর্মশালা। অভিজ্ঞ লেখক ও সম্পাদকদের তত্ত্বাবধানে হাতে-কলমে প্রশিক্ষণ।', 
      en: 'Creative writing and publishing workshops for young writers. Hands-on training under the guidance of experienced writers and editors.' 
    },
    features: [
      { bn: 'কবিতা লেখা', en: 'Poetry Writing' },
      { bn: 'গল্প রচনা', en: 'Story Writing' },
      { bn: 'প্রবন্ধ লেখা', en: 'Essay Writing' },
      { bn: 'সম্পাদনা কৌশল', en: 'Editing Skills' }
    ],
    image: '/images/gallery-3.jpg'
  },
  {
    id: 'dialogue',
    icon: MessageCircle,
    title: { bn: 'সম্প্রদায় সংলাপ', en: 'Community Dialogue' },
    description: { 
      bn: 'সাহিত্য ও সংস্কৃতি বিষয়ে মুক্ত আলোচনা ও মতবিনিময় সভা। চা জনগোষ্ঠীর বিভিন্ন বিষয় নিয়ে সচেতনতামূলক আলোচনা।', 
      en: 'Open discussions and exchange of ideas on literature and culture. Awareness discussions on various issues of the tea community.' 
    },
    features: [
      { bn: 'সাহিত্য আলোচনা', en: 'Literary Discussions' },
      { bn: 'সামাজিক সচেতনতা', en: 'Social Awareness' },
      { bn: 'ঐতিহ্য সংরক্ষণ', en: 'Heritage Preservation' },
      { bn: 'মতবিনিময়', en: 'Opinion Exchange' }
    ],
    image: '/images/gallery-1.jpg'
  },
  {
    id: 'youth',
    icon: Users,
    title: { bn: 'যুব কার্যক্রম', en: 'Youth Programs' },
    description: { 
      bn: 'তরুণ প্রজন্মের মধ্যে সাহিত্যিক চেতনা ও সাংস্কৃতিক সচেতনতা বিকাশ। স্কুল ও কলেজে সাহিত্য ক্লাব গঠন ও পরিচালনা।', 
      en: 'Developing literary consciousness and cultural awareness among youth. Formation and management of literary clubs in schools and colleges.' 
    },
    features: [
      { bn: 'স্কুল সাহিত্য ক্লাব', en: 'School Literary Clubs' },
      { bn: 'তরুণ লেখক উন্নয়ন', en: 'Young Writer Development' },
      { bn: 'প্রতিযোগিতা', en: 'Competitions' },
      { bn: 'মেন্টরশিপ', en: 'Mentorship' }
    ],
    image: '/images/gallery-4.jpg'
  }
]

const upcomingEvents = [
  {
    title: { bn: 'বার্ষিক সাহিত্য উৎসব ২০২৫', en: 'Annual Literary Festival 2025' },
    date: { bn: '১৫-১৭ মার্চ, ২০২৫', en: 'March 15-17, 2025' },
    location: { bn: 'শ্রীমঙ্গল, মৌলভীবাজার', en: 'Sreemangal, Moulvibazar' },
    type: { bn: 'উৎসব', en: 'Festival' }
  },
  {
    title: { bn: 'কবিতা লেখা কর্মশালা', en: 'Poetry Writing Workshop' },
    date: { bn: '২৫ জানুয়ারি, ২০২৫', en: 'January 25, 2025' },
    location: { bn: 'কমলগঞ্জ, মৌলভীবাজার', en: 'Kamalganj, Moulvibazar' },
    type: { bn: 'কর্মশালা', en: 'Workshop' }
  },
  {
    title: { bn: 'সম্প্রদায় সংলাপ: চা শ্রমিকের অধিকার', en: 'Community Dialogue: Tea Worker Rights' },
    date: { bn: '১০ ফেব্রুয়ারি, ২০২৫', en: 'February 10, 2025' },
    location: { bn: 'সিলেট শহর', en: 'Sylhet City' },
    type: { bn: 'সংলাপ', en: 'Dialogue' }
  }
]

function ProgramsContent() {
  const { language, t } = useLanguage()

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block text-gold font-medium text-sm uppercase tracking-wider mb-4">
              {t('কার্যক্রম', 'Programs')}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-6 text-balance">
              {t('আমাদের কার্যক্রম', 'Our Programs & Activities')}
            </h1>
            <p className="text-charcoal-light text-lg md:text-xl leading-relaxed">
              {t(
                'চা জনগোষ্ঠীর সাহিত্য ও সংস্কৃতি বিকাশে আমাদের বিভিন্ন কার্যক্রম।',
                'Our various initiatives for developing the literature and culture of the tea community.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Programs List */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {programs.map((program, index) => {
              const Icon = program.icon
              const isEven = index % 2 === 0
              return (
                <div key={program.id} className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={isEven ? '' : 'lg:order-2'}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-tea-green/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-tea-green" />
                      </div>
                      <h2 className="font-serif text-2xl md:text-3xl text-charcoal">
                        {language === 'bn' ? program.title.bn : program.title.en}
                      </h2>
                    </div>
                    <p className="text-charcoal-light leading-relaxed mb-6">
                      {language === 'bn' ? program.description.bn : program.description.en}
                    </p>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {program.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-charcoal-light">
                          <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                          <span>{language === 'bn' ? feature.bn : feature.en}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href={`/programs/${program.id}`}
                      className="inline-flex items-center gap-2 text-tea-green font-medium hover:text-tea-green-dark transition-colors"
                    >
                      {t('বিস্তারিত জানুন', 'Learn More')}
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                  <div className={isEven ? '' : 'lg:order-1'}>
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                      <Image
                        src={program.image}
                        alt={language === 'bn' ? program.title.bn : program.title.en}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 md:py-24 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-gold font-medium text-sm uppercase tracking-wider mb-4">
              {t('আসন্ন অনুষ্ঠান', 'Upcoming Events')}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
              {t('আমাদের আসন্ন কার্যক্রম', 'Our Upcoming Activities')}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-card p-6 rounded-lg border border-border hover:border-tea-green/30 transition-colors">
                <span className="inline-block bg-tea-green/10 text-tea-green text-xs font-medium px-2 py-1 rounded mb-4">
                  {language === 'bn' ? event.type.bn : event.type.en}
                </span>
                <h3 className="font-serif text-xl text-charcoal mb-3">
                  {language === 'bn' ? event.title.bn : event.title.en}
                </h3>
                <div className="space-y-2 text-sm text-charcoal-light">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-gold" />
                    <span>{language === 'bn' ? event.date.bn : event.date.en}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-gold" />
                    <span>{language === 'bn' ? event.location.bn : event.location.en}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
            {t('অংশ নিতে চান?', 'Want to Participate?')}
          </h2>
          <p className="text-charcoal-light text-lg max-w-2xl mx-auto mb-8">
            {t(
              'আমাদের কার্যক্রমে অংশ নিতে বা স্বেচ্ছাসেবক হিসেবে যোগ দিতে যোগাযোগ করুন।',
              'Contact us to participate in our activities or join as a volunteer.'
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/join"
              className="inline-flex items-center gap-2 px-8 py-4 bg-tea-green text-cream font-medium rounded hover:bg-tea-green-dark transition-colors"
            >
              {t('স্বেচ্ছাসেবক হন', 'Become a Volunteer')}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-tea-green text-tea-green font-medium rounded hover:bg-tea-green hover:text-cream transition-colors"
            >
              {t('যোগাযোগ করুন', 'Contact Us')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default function ProgramsPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <ProgramsContent />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}
