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
  title: 'বাংলাদেশ চা জনগোষ্ঠী সাহিত্য পরিষদ | Bangladesh Tea Community Literature Council',
  description: 'BTCLC works to preserve and amplify the literary and cultural identity of the tea community through publications, dialogue, and collective engagement.',
  keywords: ['BTCLC', 'Bangladesh', 'Tea Community', 'Literature', 'Culture', 'চা জনগোষ্ঠী', 'সাহিত্য'],
  authors: [{ name: 'BTCLC' }],
  openGraph: {
    title: 'Bangladesh Tea Community Literature Council',
    description: 'Preserving and amplifying the literary and cultural identity of the tea community',
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
