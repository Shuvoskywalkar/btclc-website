"use client"

import { useLanguage } from '@/lib/language-context'
import { useFirestoreData } from '@/lib/firestore-data'
import { Quote } from 'lucide-react'

// Default voices as fallback
const defaultVoices = [
  {
    quote: {
      bn: 'চা বাগানে জন্ম আমার, এই মাটিতেই আমার শিকড়। সাহিত্য পরিষদ আমাদের কণ্ঠস্বরকে পৃথিবীর কাছে পৌঁছে দিচ্ছে।',
      en: 'I was born in the tea garden, my roots are in this soil. The Literature Council is bringing our voices to the world.'
    },
    name: { bn: 'সুনীল রাজবংশী', en: 'Sunil Rajbanshi' },
    role: { bn: 'কবি ও চা শ্রমিক', en: 'Poet & Tea Worker' }
  },
  {
    quote: {
      bn: 'আমাদের পূর্বপুরুষদের গল্প, তাদের সংগ্রাম ও স্বপ্ন - এগুলো লিখে রাখা আমাদের দায়িত্ব। BTCLC সেই কাজে আমাদের পথ দেখাচ্ছে।',
      en: 'The stories of our ancestors, their struggles and dreams - it is our duty to document them. BTCLC is guiding us in this mission.'
    },
    name: { bn: 'মায়া দেবী', en: 'Maya Devi' },
    role: { bn: 'গল্পকার', en: 'Story Writer' }
  },
  {
    quote: {
      bn: 'উৎকর্ষ পত্রিকায় আমার প্রথম লেখা প্রকাশ হয়েছিল। সেই দিন থেকে আমি বিশ্বাস করি আমাদের সাহিত্যেরও একটি জায়গা আছে।',
      en: 'My first writing was published in Utkorsha magazine. From that day, I believe our literature has a place too.'
    },
    name: { bn: 'রবীন্দ্র কুর্মি', en: 'Rabindra Kurmi' },
    role: { bn: 'তরুণ লেখক', en: 'Young Writer' }
  }
]

export function VoicesSection() {
  const { language, t } = useLanguage()
  const { voices: firestoreVoices, loading } = useFirestoreData()

  // Use Firestore data if available, otherwise fallback to default
  const voices = firestoreVoices.length > 0 ? firestoreVoices : defaultVoices

  return (
    <section className="py-16 md:py-24 bg-tea-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-gold font-medium text-sm uppercase tracking-wider mb-4">
            {t('শুভাকাঙ্ক্ষীদের বাণী', 'Community Voices')}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-cream mb-4 text-balance">
            {t('চা জনগোষ্ঠীর কথা', 'Stories from the Tea Community')}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {voices.map((voice, index) => (
            <div
              key={voice.id || index}
              className="bg-cream/10 backdrop-blur-sm p-6 md:p-8 rounded-lg"
            >
              {voice.image ? (
                <div className="w-12 h-12 rounded-full overflow-hidden mb-4">
                  <img src={voice.image} alt="" className="w-full h-full object-cover" />
                </div>
              ) : (
                <Quote className="w-8 h-8 text-gold mb-4" />
              )}
              <blockquote className="text-cream/90 leading-relaxed mb-6 text-balance">
                {language === 'bn' ? voice.quote.bn : voice.quote.en}
              </blockquote>
              <div>
                <p className="font-serif text-cream font-medium">
                  {language === 'bn' ? voice.name.bn : voice.name.en}
                </p>
                <p className="text-cream/60 text-sm">
                  {language === 'bn' ? voice.role.bn : voice.role.en}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
