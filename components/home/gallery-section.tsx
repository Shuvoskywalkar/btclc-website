"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { ArrowRight } from 'lucide-react'

const galleryImages = [
  { src: '/images/gallery-1.jpg', alt: { bn: 'চা বাগানের শ্রমিক', en: 'Tea garden workers' } },
  { src: '/images/gallery-2.jpg', alt: { bn: 'বই ও পাণ্ডুলিপি', en: 'Books and manuscripts' } },
  { src: '/images/gallery-3.jpg', alt: { bn: 'সম্প্রদায় সমাবেশ', en: 'Community gathering' } },
  { src: '/images/gallery-4.jpg', alt: { bn: 'চা প্রক্রিয়াকরণ', en: 'Tea processing' } },
]

export function GallerySection() {
  const { language, t } = useLanguage()

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
          <div>
            <span className="inline-block text-gold font-medium text-sm uppercase tracking-wider mb-4">
              {t('গ্যালারি', 'Gallery')}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal text-balance">
              {t('আমাদের গ্যালারি', 'Our Gallery')}
            </h2>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-tea-green font-medium hover:text-tea-green-dark transition-colors"
          >
            {t('সম্পূর্ণ গ্যালারি', 'Full Gallery')}
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <Link
              key={index}
              href="/gallery"
              className="group relative aspect-square rounded-lg overflow-hidden"
            >
              <Image
                src={image.src}
                alt={language === 'bn' ? image.alt.bn : image.alt.en}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-300"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
