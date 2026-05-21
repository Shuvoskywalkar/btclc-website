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
      title: { bn: 'সৃজনশীলতা উৎসাহিত', en: 'Encourage Creativity' },
      description: { bn: 'চা-জনগোষ্ঠীর মধ্যে সৃজনশীলতা ও সাহিত্যচর্চা উৎসাহিত করা।', en: 'Encouraging creativity and literary practice among the tea community.' }
    },
    {
      icon: Users,
      title: { bn: 'সাংস্কৃতিক বিকাশ', en: 'Cultural Development' },
      description: { bn: 'চা-জনগোষ্ঠীর সাংস্কৃতিক বিকাশ ও ঐতিহ্য সংরক্ষণ।', en: 'Cultural development and heritage preservation of the tea community.' }
    },
    {
      icon: BookOpen,
      title: { bn: 'সামাজিক সচেতনতা', en: 'Social Awareness' },
      description: { bn: 'কার্যক্রম, প্রচারণা ও কর্মশালার মাধ্যমে সামাজিক সচেতনতা বৃদ্ধি করা।', en: 'Raising social awareness through programs, campaigns and workshops.' }
    },
    {
      icon: Award,
      title: { bn: 'তরুণ নেতৃত্ব', en: 'Youth Leadership' },
      description: { bn: 'তরুণদের নেতৃত্ব ও দক্ষতা উন্নয়ন।', en: 'Developing leadership and skills among youth.' }
    }
  ]

  const timeline = [
    { year: '২০২৬', bn: 'পরিষদ প্রতিষ্ঠা', en: 'Council Founded' },
    { year: '২০২৬', bn: 'উৎকর্ষ পত্রিকা প্রথম সংখ্যা প্রকাশনার পরিকল্পনা', en: 'Planning First Issue of Utkorsha Magazine' },
    { year: '২০২৬', bn: 'চা-সাহিত্য উৎসব আয়োজনের পরিকল্পনা', en: 'Planning Tea Literature Festival' },
    { year: '২০২৬', bn: 'স্বেচ্ছাসেবক দক্ষতা উন্নয়ন কর্মসূচি', en: 'Volunteer Skill Development Program' },
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
                'আমরা একটি অরাজনৈতিক, অলাভজনক ও স্বেচ্ছাসেবী সংগঠন যা চা-জনগোষ্ঠীর মধ্যে সাহিত্যচর্চা, সাংস্কৃতিক বিকাশ এবং সামাজিক সচেতনতা বৃদ্ধির জন্য কাজ করে।',
                'We are a non-political, non-profit, and volunteer organization working to promote literature, cultural development, and social awareness among the tea community.'
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
                    'বাংলাদেশের চা-বাগানভিত্তিক জনগোষ্ঠী দীর্ঘদিন ধরে সামাজিক, শিক্ষাগত ও সাংস্কৃতিকভাবে প্রান্তিক অবস্থানে রয়েছে। এই জনগোষ্ঠীর নিজস্ব ভাষা, ঐতিহ্য ও সাংস্কৃতিক বৈচিত্র্য থাকা সত্ত্বেও তা প্রাতিষ্ঠানিকভাবে সংরক্ষণ, বিকাশ ও প্রচারের যথাযথ সুযোগ এখনো সীমিত।',
                    'The tea garden-based community of Bangladesh has been in a marginalized position socially, educationally, and culturally for a long time. Despite having their own language, traditions, and cultural diversity, the opportunity to preserve, develop, and promote it institutionally is still limited.'
                  )}
                </p>
                <p>
                  {t(
                    'এই বাস্তবতায়, "বাংলাদেশ চা-জনগোষ্ঠী সাহিত্য পরিষদ (BTCLC)" একটি নবগঠিত, অরাজনৈতিক ও অলাভজনক সংগঠন হিসেবে আত্মপ্রকাশ করেছে। সংগঠনটির লক্ষ্য হলো চা-জনগোষ্ঠীর ভিতরে সাহিত্যচর্চা, সাংস্কৃতিক বিকাশ এবং সামাজিক সচেতনতা বৃদ্ধির জন্য একটি অন্তর্ভুক্তিমূলক ও টেকসই প্ল্যাটফর্ম তৈরি করা।',
                    'In this reality, "Bangladesh Tea Community Literature Council (BTCLC)" has emerged as a newly formed, non-political and non-profit organization. The organization\'s goal is to create an inclusive and sustainable platform for promoting literature, cultural development, and social awareness within the tea community.'
                  )}
                </p>
                <p>
                  {t(
                    'BTCLC বিশ্বাস করে যে, সাহিত্য ও সংস্কৃতির মাধ্যমে একটি জনগোষ্ঠীর আত্মপরিচয় শক্তিশালী হয় এবং তাদের কণ্ঠস্বর মূলধারায় পৌঁছানোর সুযোগ তৈরি হয়।',
                    'BTCLC believes that through literature and culture, a community\'s identity is strengthened and the opportunity is created for their voice to reach the mainstream.'
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
                  'চা-জনগোষ্ঠীর মধ্যে সাহিত্য, সংস্কৃতি ও সামাজিক সচেতনতার চর্চাকে প্রাতিষ্ঠানিকীকরণ করা এবং তাদের জ্ঞানভিত্তিক সক্ষমতা, সাংস্কৃতিক পরিচয় ও সামাজিক অংশগ্রহণকে সুসংহত করা।',
                  'To institutionalize the practice of literature, culture, and social awareness among the tea community, and to consolidate their knowledge-based capacity, cultural identity, and social participation.'
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
