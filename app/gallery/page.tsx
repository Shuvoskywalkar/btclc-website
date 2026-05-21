"use client"

import { useState } from 'react'
import { LanguageProvider, useLanguage } from '@/lib/language-context'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import { X } from 'lucide-react'

const galleryItems = [
  {
    id: 1,
    src: '/images/tea-garden-hero.jpg',
    alt: { bn: 'চা বাগানের দৃশ্য', en: 'Tea garden landscape' },
    category: { bn: 'চা বাগান', en: 'Tea Gardens' }
  },
  {
    id: 2,
    src: '/images/literary-event.jpg',
    alt: { bn: 'সাহিত্য অনুষ্ঠান', en: 'Literary event' },
    category: { bn: 'অনুষ্ঠান', en: 'Events' }
  },
  {
    id: 3,
    src: '/images/gallery-1.jpg',
    alt: { bn: 'চা বাগানের শ্রমিক', en: 'Tea garden workers' },
    category: { bn: 'সম্প্রদায়', en: 'Community' }
  },
  {
    id: 4,
    src: '/images/gallery-2.jpg',
    alt: { bn: 'বই ও পাণ্ডুলিপি', en: 'Books and manuscripts' },
    category: { bn: 'প্রকাশনা', en: 'Publications' }
  },
  {
    id: 5,
    src: '/images/gallery-3.jpg',
    alt: { bn: 'সম্প্রদায় সমাবেশ', en: 'Community gathering' },
    category: { bn: 'অনুষ্ঠান', en: 'Events' }
  },
  {
    id: 6,
    src: '/images/gallery-4.jpg',
    alt: { bn: 'চা প্রক্রিয়াকরণ', en: 'Tea processing' },
    category: { bn: 'সংস্কৃতি', en: 'Culture' }
  },
  {
    id: 7,
    src: '/images/utkorsha-magazine.jpg',
    alt: { bn: 'উৎকর্ষ পত্রিকা', en: 'Utkorsha magazine' },
    category: { bn: 'প্রকাশনা', en: 'Publications' }
  },
  {
    id: 8,
    src: '/images/tea-garden-hero.jpg',
    alt: { bn: 'চা বাগানের সকাল', en: 'Morning in tea garden' },
    category: { bn: 'চা বাগান', en: 'Tea Gardens' }
  }
]

const categories = [
  { bn: 'সব', en: 'All' },
  { bn: 'চা বাগান', en: 'Tea Gardens' },
  { bn: 'অনুষ্ঠান', en: 'Events' },
  { bn: 'সম্প্রদায়', en: 'Community' },
  { bn: 'প্রকাশনা', en: 'Publications' },
  { bn: 'সংস্কৃতি', en: 'Culture' }
]

function GalleryContent() {
  const { language, t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null)

  const filteredItems = activeCategory === 'All' || activeCategory === 'সব'
    ? galleryItems
    : galleryItems.filter(item => 
        item.category.en === activeCategory || item.category.bn === activeCategory
      )

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block text-gold font-medium text-sm uppercase tracking-wider mb-4">
              {t('গ্যালারি', 'Gallery')}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-6 text-balance">
              {t('আমাদের গ্যালারি', 'Our Gallery')}
            </h1>
            <p className="text-charcoal-light text-lg md:text-xl leading-relaxed">
              {t(
                'চা বাগান, সাহিত্য অনুষ্ঠান এবং সম্প্রদায়ের জীবনের মুহূর্তগুলো।',
                'Moments from tea gardens, literary events, and community life.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat, index) => {
              const isActive = (language === 'bn' ? cat.bn : cat.en) === activeCategory || 
                              (activeCategory === 'All' && cat.en === 'All')
              return (
                <button
                  key={index}
                  onClick={() => setActiveCategory(language === 'bn' ? cat.bn : cat.en)}
                  className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                    isActive
                      ? 'bg-tea-green text-cream'
                      : 'bg-cream-dark text-charcoal hover:bg-tea-green/10'
                  }`}
                >
                  {language === 'bn' ? cat.bn : cat.en}
                </button>
              )
            })}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className="group relative aspect-square rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-tea-green"
              >
                <Image
                  src={item.src}
                  alt={language === 'bn' ? item.alt.bn : item.alt.en}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors duration-300 flex items-end">
                  <div className="p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-cream text-sm font-medium">
                      {language === 'bn' ? item.alt.bn : item.alt.en}
                    </p>
                    <p className="text-cream/70 text-xs">
                      {language === 'bn' ? item.category.bn : item.category.en}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-charcoal/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-cream hover:text-gold transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            <X size={32} />
          </button>
          <div 
            className="relative max-w-4xl max-h-[80vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.src}
              alt={language === 'bn' ? selectedImage.alt.bn : selectedImage.alt.en}
              width={1200}
              height={800}
              className="object-contain w-full h-full rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-charcoal/80 to-transparent rounded-b-lg">
              <p className="text-cream text-lg font-medium">
                {language === 'bn' ? selectedImage.alt.bn : selectedImage.alt.en}
              </p>
              <p className="text-cream/70 text-sm">
                {language === 'bn' ? selectedImage.category.bn : selectedImage.category.en}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default function GalleryPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <GalleryContent />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}
