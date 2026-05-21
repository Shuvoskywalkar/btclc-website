"use client"

import { LanguageProvider, useLanguage } from '@/lib/language-context'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import Link from 'next/link'
import { Target, Eye, Heart, Users, BookOpen, Award, ArrowRight } from 'lucide-react'

function AboutContent() {
  const { t } = useLanguage()

  const values = [
    {
      icon: Heart,
      title: { bn: 'ঐতিহ্য সংরক্ষণ', en: 'Heritage Preservation' },
      description: { bn: 'চা জনগোষ্ঠীর সমৃদ্ধ সাংস্কৃতিক ও সাহিত্যিক ঐতিহ্য সংরক্ষণ করা।', en: 'Preserving the rich cultural and literary heritage of the tea community.' }
    },
    {
      icon: Users,
      title: { bn: 'সম্প্রদায় ঐক্য', en: 'Community Unity' },
      description: { bn: 'সাহিত্যের মাধ্যমে সম্প্রদায়ের মধ্যে ঐক্য ও সংহতি তৈরি করা।', en: 'Building unity and solidarity within the community through literature.' }
    },
    {
      icon: BookOpen,
      title: { bn: 'জ্ঞান বিস্তার', en: 'Knowledge Sharing' },
      description: { bn: 'সাহিত্য ও সংস্কৃতি বিষয়ক জ্ঞান ছড়িয়ে দেওয়া।', en: 'Spreading knowledge about literature and culture.' }
    },
    {
      icon: Award,
      title: { bn: 'উৎকর্ষ সাধন', en: 'Excellence' },
      description: { bn: 'সাহিত্যিক উৎকর্ষতা অর্জনে সচেষ্ট থাকা।', en: 'Striving for literary excellence in all endeavors.' }
    }
  ]

  const timeline = [
    { year: '২০১৮', bn: 'পরিষদ প্রতিষ্ঠা', en: 'Council Founded' },
    { year: '২০১৯', bn: 'উৎকর্ষ পত্রিকা প্রথম প্রকাশ', en: 'First Issue of Utkorsha Published' },
    { year: '২০২০', bn: 'প্রথম সাহিত্য উৎসব', en: 'First Literary Festival' },
    { year: '২০২১', bn: 'যুব কার্যক্রম শুরু', en: 'Youth Programs Launched' },
    { year: '২০২২', bn: 'সম্প্রদায় সংলাপ উদ্যোগ', en: 'Community Dialogue Initiative' },
    { year: '২০২৩', bn: '৫০০+ সদস্য অর্জন', en: 'Reached 500+ Members' },
    { year: '২০২৪', bn: 'ডিজিটাল সংগ্রহশালা চালু', en: 'Digital Archive Launched' },
  ]

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block text-gold font-medium text-sm uppercase tracking-wider mb-4">
              {t('পরিচিতি', 'About Us')}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-6 text-balance">
              {t('বাংলাদেশ চা জনগোষ্ঠী সাহিত্য পরিষদ', 'Bangladesh Tea Community Literature Council')}
            </h1>
            <p className="text-charcoal-light text-lg md:text-xl leading-relaxed">
              {t(
                'আমরা চা জনগোষ্ঠীর সাহিত্যিক ও সাংস্কৃতিক পরিচয় সংরক্ষণ, বিকাশ ও বিস্তারে নিবেদিত একটি অলাভজনক সংগঠন।',
                'We are a non-profit organization dedicated to preserving, developing, and amplifying the literary and cultural identity of the tea community.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-6">
                {t('আমাদের গল্প', 'Our Story')}
              </h2>
              <div className="space-y-4 text-charcoal-light leading-relaxed">
                <p>
                  {t(
                    'বাংলাদেশের চা বাগানগুলোতে বসবাসকারী জনগোষ্ঠীর একটি সমৃদ্ধ সাংস্কৃতিক ও সাহিত্যিক ঐতিহ্য রয়েছে। কিন্তু এই ঐতিহ্য দীর্ঘদিন ধরে অবহেলিত ছিল, মূলধারার সাহিত্য জগতে তাদের কণ্ঠস্বর শোনা যেত না।',
                    'The community living in the tea gardens of Bangladesh has a rich cultural and literary heritage. However, this heritage has been neglected for a long time, and their voices were not heard in the mainstream literary world.'
                  )}
                </p>
                <p>
                  {t(
                    '২০১৮ সালে একদল উৎসাহী তরুণ ও অভিজ্ঞ লেখক মিলে গড়ে তোলেন বাংলাদেশ চা জনগোষ্ঠী সাহিত্য পরিষদ। লক্ষ্য ছিল একটাই - প্রান্তের কণ্ঠকে সাহিত্যের মূলধারায় নিয়ে আসা।',
                    'In 2018, a group of enthusiastic young people and experienced writers came together to form the Bangladesh Tea Community Literature Council. The goal was singular - to bring marginal voices into the literary mainstream.'
                  )}
                </p>
                <p>
                  {t(
                    'আজ আমরা ৫০০+ সদস্যের একটি পরিবার। আমাদের প্রকাশনা, কর্মশালা, সাহিত্য উৎসব এবং সম্প্রদায় সংলাপের মাধ্যমে আমরা চা জনগোষ্ঠীর সাহিত্যিক ও সাংস্কৃতিক পরিচয়কে জাতীয় ও আন্তর্জাতিক পরিসরে তুলে ধরছি।',
                    'Today we are a family of 500+ members. Through our publications, workshops, literary festivals, and community dialogues, we are bringing the literary and cultural identity of the tea community to national and international prominence.'
                  )}
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="/images/literary-event.jpg"
                  alt={t('সাহিত্য অনুষ্ঠান', 'Literary Event')}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gold/20 rounded-full blur-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card p-8 md:p-10 rounded-lg border border-border">
              <div className="w-14 h-14 bg-tea-green/10 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-tea-green" />
              </div>
              <h3 className="font-serif text-2xl text-charcoal mb-4">
                {t('আমাদের লক্ষ্য', 'Our Mission')}
              </h3>
              <p className="text-charcoal-light leading-relaxed">
                {t(
                  'চা জনগোষ্ঠীর সাহিত্যিক ও সাংস্কৃতিক ঐতিহ্য সংরক্ষণ, বিকাশ ও প্রচারের মাধ্যমে তাদের পরিচয়কে জাতীয় ও আন্তর্জাতিক পরিসরে তুলে ধরা এবং নতুন প্রজন্মের মধ্যে সাহিত্যিক চেতনা জাগ্রত করা।',
                  'To preserve, develop, and promote the literary and cultural heritage of the tea community, bringing their identity to national and international prominence, while awakening literary consciousness among the new generation.'
                )}
              </p>
            </div>
            <div className="bg-card p-8 md:p-10 rounded-lg border border-border">
              <div className="w-14 h-14 bg-tea-green/10 rounded-lg flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-tea-green" />
              </div>
              <h3 className="font-serif text-2xl text-charcoal mb-4">
                {t('আমাদের দর্শন', 'Our Vision')}
              </h3>
              <p className="text-charcoal-light leading-relaxed">
                {t(
                  'এমন একটি সমাজ গঠন করা যেখানে চা জনগোষ্ঠীর সাহিত্য ও সংস্কৃতি মূলধারায় স্বীকৃত এবং সম্মানিত, এবং যেখানে প্রতিটি সম্প্রদায়ের কণ্ঠস্বর সমানভাবে শোনা যায়।',
                  'To build a society where the literature and culture of the tea community is recognized and respected in the mainstream, and where the voice of every community is heard equally.'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
              {t('আমাদের মূল্যবোধ', 'Our Core Values')}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="text-center p-6">
                  <div className="w-16 h-16 bg-tea-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-tea-green" />
                  </div>
                  <h3 className="font-serif text-xl text-charcoal mb-2">
                    {t(value.title.bn, value.title.en)}
                  </h3>
                  <p className="text-charcoal-light text-sm leading-relaxed">
                    {t(value.description.bn, value.description.en)}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-tea-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-cream mb-4">
              {t('আমাদের পথচলা', 'Our Journey')}
            </h2>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-cream/30"></div>
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center gap-4 md:gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-cream/10 backdrop-blur-sm p-4 rounded-lg inline-block">
                      <span className="text-gold font-bold text-lg">{item.year}</span>
                      <p className="text-cream mt-1">{t(item.bn, item.en)}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex w-4 h-4 bg-gold rounded-full shrink-0 relative z-10"></div>
                  <div className="flex-1 hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
            {t('আমাদের সাথে যুক্ত হন', 'Join Our Journey')}
          </h2>
          <p className="text-charcoal-light text-lg max-w-2xl mx-auto mb-8">
            {t(
              'চা জনগোষ্ঠীর সাহিত্য ও সংস্কৃতি সংরক্ষণে আপনার অবদান রাখুন',
              'Contribute to preserving the literature and culture of the tea community'
            )}
          </p>
          <Link
            href="/join"
            className="inline-flex items-center gap-2 px-8 py-4 bg-tea-green text-cream font-medium rounded hover:bg-tea-green-dark transition-colors"
          >
            {t('স্বেচ্ছাসেবক হন', 'Become a Volunteer')}
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}

export default function AboutPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <AboutContent />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}
