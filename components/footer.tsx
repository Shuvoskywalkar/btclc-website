"use client"

import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  const { language, t } = useLanguage()

  const quickLinks = [
    { href: '/about', label: { bn: 'আমাদের সম্পর্কে', en: 'About Us' } },
    { href: '/publications', label: { bn: 'প্রকাশনা', en: 'Publications' } },
    { href: '/programs', label: { bn: 'কার্যক্রম', en: 'Programs' } },
    { href: '/archive', label: { bn: 'সংগ্রহশালা', en: 'Archive' } },
    { href: '/gallery', label: { bn: 'গ্যালারি', en: 'Gallery' } },
    { href: '/join', label: { bn: 'যোগ দিন', en: 'Join Us' } },
  ]

  return (
    <footer className="bg-charcoal text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-tea-green rounded-full flex items-center justify-center">
                <span className="text-cream font-serif text-xl font-bold">চা</span>
              </div>
              <div>
                <p className="font-serif text-cream text-base font-semibold leading-tight">
                  {t('বাংলাদেশ চা জনগোষ্ঠী সাহিত্য পরিষদ', 'Bangladesh Tea Community Literature Council')}
                </p>
              </div>
            </div>
            <p className="text-cream/70 text-sm leading-relaxed max-w-md mb-6">
              {t(
                'চা জনগোষ্ঠীর সাহিত্যিক ও সাংস্কৃতিক পরিচয় সংরক্ষণ, বিকাশ ও বিস্তারে নিবেদিত।',
                'Dedicated to preserving, developing, and amplifying the literary and cultural identity of the tea community.'
              )}
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-cream/10 hover:bg-tea-green rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-cream/10 hover:bg-tea-green rounded-full flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="mailto:info@btclc.org"
                className="w-10 h-10 bg-cream/10 hover:bg-tea-green rounded-full flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-gold text-lg font-semibold mb-4">
              {t('দ্রুত লিংক', 'Quick Links')}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/70 hover:text-cream transition-colors text-sm"
                  >
                    {language === 'bn' ? link.label.bn : link.label.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-gold text-lg font-semibold mb-4">
              {t('যোগাযোগ', 'Contact')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-cream/70 text-sm">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>{t('শ্রীমঙ্গল, মৌলভীবাজার, সিলেট, বাংলাদেশ', 'Sreemangal, Moulvibazar, Sylhet, Bangladesh')}</span>
              </li>
              <li className="flex items-center gap-3 text-cream/70 text-sm">
                <Phone size={16} className="shrink-0" />
                <span>+880 1XXX-XXXXXX</span>
              </li>
              <li className="flex items-center gap-3 text-cream/70 text-sm">
                <Mail size={16} className="shrink-0" />
                <span>info@btclc.org</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-cream/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-cream/50 text-sm">
              {t(
                '© ২০২৪ বাংলাদেশ চা জনগোষ্ঠী সাহিত্য পরিষদ। সর্বস্বত্ব সংরক্ষিত।',
                '© 2024 Bangladesh Tea Community Literature Council. All rights reserved.'
              )}
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-cream/50 hover:text-cream text-sm transition-colors">
                {t('গোপনীয়তা নীতি', 'Privacy Policy')}
              </Link>
              <Link href="/terms" className="text-cream/50 hover:text-cream text-sm transition-colors">
                {t('শর্তাবলী', 'Terms of Service')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
