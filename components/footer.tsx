"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/language-context'
import { Facebook, Mail, Phone, MapPin } from 'lucide-react'

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
              <Image
                src="/images/btclc-logo.png"
                alt="BTCLC Logo"
                width={48}
                height={48}
                className="w-12 h-12"
              />
              <div>
                <p className="font-serif text-cream text-base font-semibold leading-tight">
                  {t('বাংলাদেশ চা-জনগোষ্ঠী সাহিত্য পরিষদ', 'Bangladesh Tea Community Literature Council')}
                </p>
                <p className="text-cream/60 text-xs mt-0.5">
                  {t('অরাজনৈতিক | অলাভজনক | স্বেচ্ছাসেবী', 'Non-Political | Non-Profit | Volunteer')}
                </p>
              </div>
            </div>
            <p className="text-cream/70 text-sm leading-relaxed max-w-md mb-6">
              {t(
                'চা-জনগোষ্ঠীর মধ্যে সাহিত্যচর্চা, সাংস্কৃতিক বিকাশ এবং সামাজিক সচেতনতা বৃদ্ধির জন্য একটি অন্তর্ভুক্তিমূলক ও টেকসই প্ল্যাটফর্ম।',
                'An inclusive and sustainable platform for literature, cultural development, and social awareness among the tea community.'
              )}
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com/btclc.official"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-cream/10 hover:bg-tea-green rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="mailto:btclc.official@gmail.com"
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
                <span>{t('সাত্তার মঞ্জিল, উকিলবাড়ী রোড, শ্রীমঙ্গল, মৌলভীবাজার', 'Sattar Monjil, Ukilbari Road, Sreemangal, Moulvibazar')}</span>
              </li>
              <li className="flex items-center gap-3 text-cream/70 text-sm">
                <Phone size={16} className="shrink-0" />
                <span>+880 1791-751501</span>
              </li>
              <li className="flex items-center gap-3 text-cream/70 text-sm">
                <Mail size={16} className="shrink-0" />
                <span>btclc.official@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-cream/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-cream/50 text-sm">
              {t(
                '© ২০২৬ বাংলাদেশ চা-জনগোষ্ঠী সাহিত্য পরিষদ। সর্বস্বত্ব সংরক্ষিত।',
                '© 2026 Bangladesh Tea Community Literature Council. All rights reserved.'
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
