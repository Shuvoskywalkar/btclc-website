import type { 
  HeroSection, 
  AboutSection, 
  Program, 
  SiteSettings,
  Voice,
  Event
} from './types'

export const defaultHero: HeroSection = {
  tagline: { bn: 'প্রতিষ্ঠিত ২০২৬', en: 'Established 2026' },
  title: {
    bn: 'প্রান্তের কণ্ঠকে সাহিত্যের মূলধারায়',
    en: 'Bringing Marginal Voices to the Literary Mainstream'
  },
  description: {
    bn: 'বাংলাদেশ চা-জনগোষ্ঠী সাহিত্য পরিষদ (BTCLC) একটি অরাজনৈতিক, অলাভজনক ও স্বেচ্ছাসেবী সংগঠন যা চা-জনগোষ্ঠীর মধ্যে সাহিত্যচর্চা, সাংস্কৃতিক বিকাশ এবং সামাজিক সচেতনতা বৃদ্ধির উদ্দেশ্যে কাজ করে।',
    en: 'Bangladesh Tea Community Literature Council (BTCLC) is a non-political, non-profit, and volunteer organization working to promote literature, cultural development, and social awareness among the tea community.'
  },
  primaryButtonText: { bn: 'আমাদের সম্পর্কে', en: 'Explore BTCLC' },
  secondaryButtonText: { bn: 'উৎকর্ষ পড়ুন', en: 'Read "উৎকর্ষ"' },
  image: '/images/tea-flower-hero.jpg',
  imageAlt: { bn: 'চা ফুল - চা গাছের সাদা ফুল', en: 'Tea flower - white blossoms of the tea plant' }
}

export const defaultAbout: AboutSection = {
  tagline: { bn: 'পরিচিতি', en: 'About Us' },
  title: {
    bn: 'চা জনগোষ্ঠীর সাহিত্যিক জাগরণের পথিক',
    en: 'Pioneers of the Tea Community\'s Literary Heritage'
  },
  description: {
    bn: 'বাংলাদেশ চা-জনগোষ্ঠী সাহিত্য পরিষদ একটি অরাজনৈতিক, অলাভজনক ও স্বেচ্ছাসেবী সংগঠন যা চা-জনগোষ্ঠীর মধ্যে সাহিত্য, সংস্কৃতি ও সামাজিক সচেতনতার চর্চাকে প্রাতিষ্ঠানিকীকরণ করতে এবং তাদের জ্ঞানভিত্তিক সক্ষমতা, সাংস্কৃতিক পরিচয় ও সামাজিক অংশগ্রহণকে সুসংহত করতে কাজ করে।',
    en: 'Bangladesh Tea Community Literature Council is a non-political, non-profit, and volunteer organization working to institutionalize the practice of literature, culture, and social awareness among the tea community, and to consolidate their knowledge-based capacity, cultural identity, and social participation.'
  }
}

export const defaultSettings: SiteSettings = {
  contactEmail: 'btclc.official@gmail.com',
  contactPhone: '+880 1791-751501',
  address: {
    bn: 'সাত্তার মঞ্জিল, উকিলবাড়ী রোড(আ/এ), শ্রীমঙ্গল, মৌলভীবাজার',
    en: 'Sattar Monjil, Ukilbari Road (A/A), Sreemangal, Moulvibazar'
  },
  tagline: {
    bn: 'প্রান্তের কণ্ঠকে সাহিত্যের মূলধারায়',
    en: 'Bringing Marginal Voices to the Literary Mainstream'
  },
  socialLinks: {
    facebook: 'https://facebook.com/btclc.official',
    youtube: '',
    twitter: '',
    instagram: ''
  }
}

export const defaultPrograms: Omit<Program, 'id'>[] = [
  {
    icon: 'book-open',
    title: { bn: 'উৎকর্ষ পত্রিকা', en: 'Utkorsha Magazine' },
    description: {
      bn: 'চা-বাগানে সৃজনশীলতা ও রচনাত্মক প্রতিভার বিকাশ ঘটাতে বার্ষিক সাহিত্য পত্রিকা।',
      en: 'Annual literary magazine to develop creativity and writing talent in tea gardens.'
    },
    href: '/publications/utkorsha',
    order: 1
  },
  {
    icon: 'graduation-cap',
    title: { bn: 'চা-সাহিত্য উৎসব', en: 'Tea Literature Festival' },
    description: {
      bn: 'চা-বাগানে সৃজনশীলতা ও রচনাত্মক প্রতিভার বিকাশ ঘটাতে বার্ষিক সাহিত্য প্রতিযোগিতা।',
      en: 'Annual literary competition to develop creativity and writing talent in tea gardens.'
    },
    href: '/programs/literary-festival',
    order: 2
  },
  {
    icon: 'message-circle',
    title: { bn: 'সচেতনতামূলক কার্যক্রম', en: 'Awareness Programs' },
    description: {
      bn: 'প্রত্যন্ত চা-বাগান অঞ্চলে সচেতনতামূলক আলোচনা, সংলাপ ও ক্যাম্পেইন।',
      en: 'Awareness discussions, dialogues and campaigns in remote tea garden areas.'
    },
    href: '/programs/dialogue',
    order: 3
  },
  {
    icon: 'users',
    title: { bn: 'দক্ষতা উন্নয়ন', en: 'Skill Development' },
    description: {
      bn: 'স্বেচ্ছাসেবকদের দক্ষতা উন্নয়ন ও তরুণ নেতৃত্ব গঠন কর্মসূচি।',
      en: 'Volunteer skill development and youth leadership building programs.'
    },
    href: '/programs/youth',
    order: 4
  }
]

export const defaultVoices: Omit<Voice, 'id'>[] = [
  {
    quote: {
      bn: 'চা বাগানে জন্ম আমার, এই মাটিতেই আমার শিকড়। সাহিত্য পরিষদ আমাদের কণ্ঠস্বরকে পৃথিবীর কাছে পৌঁছে দিচ্ছে।',
      en: 'I was born in the tea garden, my roots are in this soil. The Literature Council is bringing our voices to the world.'
    },
    name: { bn: 'সুনীল রাজবংশী', en: 'Sunil Rajbanshi' },
    role: { bn: 'কবি ও চা শ্রমিক', en: 'Poet & Tea Worker' },
    order: 1
  },
  {
    quote: {
      bn: 'আমাদের পূর্বপুরুষদের গল্প, তাদের সংগ্রাম ও স্বপ্ন - এগুলো লিখে রাখা আমাদের দায়িত্ব। BTCLC সেই কাজে আমাদের পথ দেখাচ্ছে।',
      en: 'The stories of our ancestors, their struggles and dreams - it is our duty to document them. BTCLC is guiding us in this mission.'
    },
    name: { bn: 'মায়া দেবী', en: 'Maya Devi' },
    role: { bn: 'গল্পকার', en: 'Story Writer' },
    order: 2
  },
  {
    quote: {
      bn: 'উৎকর্ষ পত্রিকায় আমার প্রথম লেখা প্রকাশ হয়েছিল। সেই দিন থেকে আমি বিশ্বাস করি আমাদের সাহিত্যেরও একটি জায়গা আছে।',
      en: 'My first writing was published in Utkorsha magazine. From that day, I believe our literature has a place too.'
    },
    name: { bn: 'রবীন্দ্র কুর্মি', en: 'Rabindra Kurmi' },
    role: { bn: 'তরুণ লেখক', en: 'Young Writer' },
    order: 3
  }
]

export const defaultEvents: Omit<Event, 'id'>[] = [
  {
    title: {
      bn: 'চা-সাহিত্য উৎসব ২০২৬',
      en: 'Tea Literature Festival 2026'
    },
    description: {
      bn: 'বার্ষিক সাহিত্য প্রতিযোগিতা ও সাংস্কৃতিক অনুষ্ঠান',
      en: 'Annual literary competition and cultural program'
    },
    date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    location: {
      bn: 'শ্রীমঙ্গল, মৌলভীবাজার',
      en: 'Sreemangal, Moulvibazar'
    },
    imageUrl: '',
    status: 'upcoming'
  }
]
