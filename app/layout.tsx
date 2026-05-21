import type { Metadata } from 'next'
import { Inter, Noto_Serif_Bengali, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
})

const notoSerifBengali = Noto_Serif_Bengali({ 
  subsets: ["bengali"],
  variable: "--font-noto-serif-bengali",
  weight: ["400", "500", "600", "700"],
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: 'বাংলাদেশ চা-জনগোষ্ঠী সাহিত্য পরিষদ | Bangladesh Tea Community Literature Council',
  description: 'BTCLC - একটি অরাজনৈতিক, অলাভজনক ও স্বেচ্ছাসেবী সংগঠন যা চা-জনগোষ্ঠীর মধ্যে সাহিত্যচর্চা, সাংস্কৃতিক বিকাশ এবং সামাজিক সচেতনতা বৃদ্ধির জন্য কাজ করে। A non-political, non-profit organization promoting literature and cultural development among the tea community.',
  keywords: ['BTCLC', 'Bangladesh', 'Tea Community', 'Literature', 'Culture', 'চা-জনগোষ্ঠী', 'সাহিত্য পরিষদ', 'শ্রীমঙ্গল', 'উৎকর্ষ'],
  authors: [{ name: 'BTCLC - Bangladesh Tea Community Literature Council' }],
  openGraph: {
    title: 'বাংলাদেশ চা-জনগোষ্ঠী সাহিত্য পরিষদ | BTCLC',
    description: 'প্রান্তের কণ্ঠকে সাহিত্যের মূলধারায় - Bringing Marginal Voices to the Literary Mainstream',
    type: 'website',
    locale: 'bn_BD',
    alternateLocale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="bn" className={`${inter.variable} ${notoSerifBengali.variable} ${playfairDisplay.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
