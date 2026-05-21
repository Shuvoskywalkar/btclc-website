"use client"

import Link from 'next/link'
import { useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const { language, setLanguage, t } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { href: '/', label: { bn: 'হোম', en: 'Home' } },
    { href: '/about', label: { bn: 'পরিচিতি', en: 'About' } },
    { href: '/publications', label: { bn: 'প্রকাশনা', en: 'Publications' } },
    { href: '/programs', label: { bn: 'কার্যক্রম', en: 'Programs' } },
    { href: '/archive', label: { bn: 'সংগ্রহশালা', en: 'Archive' } },
    { href: '/contact', label: { bn: 'যোগাযোগ', en: 'Contact' } },
  ]

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-tea-green rounded-full flex items-center justify-center">
              <span className="text-cream font-serif text-lg md:text-xl font-bold">চা</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-serif text-tea-green text-sm md:text-base font-semibold leading-tight">
                {t('বাংলাদেশ চা জনগোষ্ঠী', 'Bangladesh Tea Community')}
              </p>
              <p className="font-serif text-tea-green text-xs md:text-sm leading-tight">
                {t('সাহিত্য পরিষদ', 'Literature Council')}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-charcoal hover:text-tea-green transition-colors text-sm font-medium"
              >
                {language === 'bn' ? item.label.bn : item.label.en}
              </Link>
            ))}
          </div>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
              className="px-3 py-1.5 text-sm font-medium border border-tea-green text-tea-green hover:bg-tea-green hover:text-cream transition-colors rounded"
            >
              {language === 'bn' ? 'EN' : 'বাংলা'}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-charcoal hover:text-tea-green transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-charcoal hover:text-tea-green transition-colors text-base font-medium py-2"
                >
                  {language === 'bn' ? item.label.bn : item.label.en}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
