"use client"

import { LanguageProvider, useLanguage } from '@/lib/language-context'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Heart, BookOpen, Users, Megaphone, ArrowRight } from 'lucide-react'

const volunteerRoles = [
  {
    icon: BookOpen,
    title: { bn: 'লেখক/কবি', en: 'Writer/Poet' },
    description: { 
      bn: 'উৎকর্ষ পত্রিকায় ও অন্যান্য প্রকাশনায় লেখা অবদান রাখুন।', 
      en: 'Contribute writings to Utkorsha magazine and other publications.' 
    }
  },
  {
    icon: Users,
    title: { bn: 'ইভেন্ট সমন্বয়কারী', en: 'Event Coordinator' },
    description: { 
      bn: 'সাহিত্য উৎসব ও কর্মশালা পরিচালনায় সহায়তা করুন।', 
      en: 'Help organize literary festivals and workshops.' 
    }
  },
  {
    icon: Megaphone,
    title: { bn: 'প্রচার ও যোগাযোগ', en: 'Outreach & Communications' },
    description: { 
      bn: 'সামাজিক মাধ্যম ও প্রচার কার্যক্রমে অংশ নিন।', 
      en: 'Participate in social media and promotional activities.' 
    }
  },
  {
    icon: Heart,
    title: { bn: 'সম্প্রদায় সেবক', en: 'Community Volunteer' },
    description: { 
      bn: 'মাঠ পর্যায়ে সম্প্রদায়ের সাথে কাজ করুন।', 
      en: 'Work with the community at the grassroots level.' 
    }
  }
]

function JoinContent() {
  const { language, t } = useLanguage()

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-tea-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block text-gold font-medium text-sm uppercase tracking-wider mb-4">
              {t('যোগ দিন', 'Join Us')}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-cream mb-6 text-balance">
              {t('আমাদের সাথে যুক্ত হন', 'Become Part of Our Community')}
            </h1>
            <p className="text-cream/80 text-lg md:text-xl leading-relaxed">
              {t(
                'চা জনগোষ্ঠীর সাহিত্য ও সংস্কৃতি সংরক্ষণে আপনার অবদান রাখুন। স্বেচ্ছাসেবক হিসেবে যোগ দিন এবং একটি অর্থবহ পরিবর্তনের অংশ হন।',
                'Contribute to preserving the literature and culture of the tea community. Join as a volunteer and be part of meaningful change.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Volunteer Roles */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
              {t('স্বেচ্ছাসেবার সুযোগ', 'Volunteer Opportunities')}
            </h2>
            <p className="text-charcoal-light text-lg max-w-2xl mx-auto">
              {t(
                'আপনার দক্ষতা ও আগ্রহ অনুযায়ী বিভিন্ন ক্ষেত্রে অবদান রাখতে পারেন।',
                'You can contribute in various areas according to your skills and interests.'
              )}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {volunteerRoles.map((role, index) => {
              const Icon = role.icon
              return (
                <div key={index} className="bg-card p-6 rounded-lg border border-border text-center">
                  <div className="w-14 h-14 bg-tea-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-tea-green" />
                  </div>
                  <h3 className="font-serif text-xl text-charcoal mb-2">
                    {language === 'bn' ? role.title.bn : role.title.en}
                  </h3>
                  <p className="text-charcoal-light text-sm">
                    {language === 'bn' ? role.description.bn : role.description.en}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 md:py-24 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
                {t('আবেদন করুন', 'Apply Now')}
              </h2>
              <p className="text-charcoal-light">
                {t(
                  'নিচের ফর্মটি পূরণ করুন। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।',
                  'Fill out the form below. We will contact you soon.'
                )}
              </p>
            </div>

            <form className="bg-card p-6 md:p-8 rounded-lg border border-border">
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                    {t('পূর্ণ নাম', 'Full Name')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-background border border-input rounded focus:outline-none focus:ring-2 focus:ring-tea-green/50 focus:border-tea-green transition-colors"
                    placeholder={t('আপনার পূর্ণ নাম', 'Your full name')}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                    {t('ইমেইল', 'Email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-background border border-input rounded focus:outline-none focus:ring-2 focus:ring-tea-green/50 focus:border-tea-green transition-colors"
                    placeholder={t('আপনার ইমেইল', 'Your email')}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-2">
                    {t('ফোন নম্বর', 'Phone Number')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 bg-background border border-input rounded focus:outline-none focus:ring-2 focus:ring-tea-green/50 focus:border-tea-green transition-colors"
                    placeholder={t('আপনার ফোন নম্বর', 'Your phone number')}
                  />
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-charcoal mb-2">
                    {t('অবস্থান', 'Location')}
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    className="w-full px-4 py-3 bg-background border border-input rounded focus:outline-none focus:ring-2 focus:ring-tea-green/50 focus:border-tea-green transition-colors"
                    placeholder={t('আপনার এলাকা', 'Your area')}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="role" className="block text-sm font-medium text-charcoal mb-2">
                  {t('আগ্রহের ক্ষেত্র', 'Area of Interest')} *
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  className="w-full px-4 py-3 bg-background border border-input rounded focus:outline-none focus:ring-2 focus:ring-tea-green/50 focus:border-tea-green transition-colors"
                >
                  <option value="">{t('নির্বাচন করুন', 'Select an option')}</option>
                  <option value="writer">{t('লেখক/কবি', 'Writer/Poet')}</option>
                  <option value="event">{t('ইভেন্ট সমন্বয়কারী', 'Event Coordinator')}</option>
                  <option value="outreach">{t('প্রচার ও যোগাযোগ', 'Outreach & Communications')}</option>
                  <option value="community">{t('সম্প্রদায় সেবক', 'Community Volunteer')}</option>
                  <option value="other">{t('অন্যান্য', 'Other')}</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="experience" className="block text-sm font-medium text-charcoal mb-2">
                  {t('অভিজ্ঞতা ও দক্ষতা', 'Experience & Skills')}
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  rows={3}
                  className="w-full px-4 py-3 bg-background border border-input rounded focus:outline-none focus:ring-2 focus:ring-tea-green/50 focus:border-tea-green transition-colors resize-none"
                  placeholder={t('আপনার প্রাসঙ্গিক অভিজ্ঞতা ও দক্ষতা সম্পর্কে লিখুন...', 'Tell us about your relevant experience and skills...')}
                ></textarea>
              </div>

              <div className="mb-6">
                <label htmlFor="motivation" className="block text-sm font-medium text-charcoal mb-2">
                  {t('কেন যোগ দিতে চান?', 'Why do you want to join?')} *
                </label>
                <textarea
                  id="motivation"
                  name="motivation"
                  rows={4}
                  required
                  className="w-full px-4 py-3 bg-background border border-input rounded focus:outline-none focus:ring-2 focus:ring-tea-green/50 focus:border-tea-green transition-colors resize-none"
                  placeholder={t('আপনার অনুপ্রেরণা ও লক্ষ্য সম্পর্কে লিখুন...', 'Tell us about your motivation and goals...')}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-tea-green text-cream font-medium rounded hover:bg-tea-green-dark transition-colors"
              >
                {t('আবেদন জমা দিন', 'Submit Application')}
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default function JoinPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <JoinContent />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}
