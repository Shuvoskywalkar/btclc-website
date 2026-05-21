"use client"

import { useLanguage } from '@/lib/language-context'
import { ArrowRight } from 'lucide-react'

export function JoinSection() {
  const { t } = useLanguage()

  return (
    <section className="py-16 md:py-24 bg-cream-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-gold font-medium text-sm uppercase tracking-wider mb-4">
              {t('আমাদের সাথে যুক্ত হন', 'Join Us')}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4 text-balance">
              {t('স্বেচ্ছাসেবক হিসেবে যোগ দিন', 'Become a Volunteer')}
            </h2>
            <p className="text-charcoal-light text-lg">
              {t(
                'চা জনগোষ্ঠীর সাহিত্য ও সংস্কৃতি সংরক্ষণে আপনার অবদান রাখুন',
                'Contribute to preserving the literature and culture of the tea community'
              )}
            </p>
          </div>

          <form className="bg-card p-6 md:p-8 rounded-lg border border-border">
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                  {t('নাম', 'Name')} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-background border border-input rounded focus:outline-none focus:ring-2 focus:ring-tea-green/50 focus:border-tea-green transition-colors"
                  placeholder={t('আপনার নাম', 'Your name')}
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

            <div className="mb-6">
              <label htmlFor="interest" className="block text-sm font-medium text-charcoal mb-2">
                {t('আগ্রহের ক্ষেত্র', 'Area of Interest')}
              </label>
              <select
                id="interest"
                name="interest"
                className="w-full px-4 py-3 bg-background border border-input rounded focus:outline-none focus:ring-2 focus:ring-tea-green/50 focus:border-tea-green transition-colors"
              >
                <option value="">{t('নির্বাচন করুন', 'Select an option')}</option>
                <option value="writing">{t('লেখালেখি', 'Writing')}</option>
                <option value="editing">{t('সম্পাদনা', 'Editing')}</option>
                <option value="events">{t('ইভেন্ট ব্যবস্থাপনা', 'Event Management')}</option>
                <option value="outreach">{t('প্রচার ও যোগাযোগ', 'Outreach')}</option>
                <option value="documentation">{t('ডকুমেন্টেশন', 'Documentation')}</option>
                <option value="other">{t('অন্যান্য', 'Other')}</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
                {t('বার্তা', 'Message')}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-4 py-3 bg-background border border-input rounded focus:outline-none focus:ring-2 focus:ring-tea-green/50 focus:border-tea-green transition-colors resize-none"
                placeholder={t('আপনার বার্তা লিখুন...', 'Write your message...')}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-tea-green text-cream font-medium rounded hover:bg-tea-green-dark transition-colors"
            >
              {t('জমা দিন', 'Submit')}
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
