"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { collection, getDocs, doc, getDoc, query, orderBy, limit, where } from 'firebase/firestore'
import { db, isFirebaseConfigured } from './firebase'
import type { 
  HeroContent, 
  AboutContent, 
  Program, 
  Publication, 
  GalleryImage, 
  Event, 
  ArchiveItem, 
  Voice, 
  SiteSettings 
} from './types'

interface FirestoreData {
  hero: HeroContent | null
  about: AboutContent | null
  programs: Program[]
  publications: Publication[]
  gallery: GalleryImage[]
  events: Event[]
  archive: ArchiveItem[]
  voices: Voice[]
  settings: SiteSettings | null
  loading: boolean
}

const FirestoreDataContext = createContext<FirestoreData>({
  hero: null,
  about: null,
  programs: [],
  publications: [],
  gallery: [],
  events: [],
  archive: [],
  voices: [],
  settings: null,
  loading: false, // Default to false when Firebase isn't configured
})

export function useFirestoreData() {
  return useContext(FirestoreDataContext)
}

export function FirestoreDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<FirestoreData>({
    hero: null,
    about: null,
    programs: [],
    publications: [],
    gallery: [],
    events: [],
    archive: [],
    voices: [],
    settings: null,
    loading: isFirebaseConfigured, // Only show loading if Firebase is configured
  })

  useEffect(() => {
    // Skip fetching if Firebase is not configured - components will use fallback data
    if (!isFirebaseConfigured || !db) {
      setData(prev => ({ ...prev, loading: false }))
      return
    }

    async function fetchData() {
      if (!db) return
      
      try {
        // Fetch all data in parallel
        const [
          heroSnap,
          aboutSnap,
          programsSnap,
          publicationsSnap,
          gallerySnap,
          eventsSnap,
          archiveSnap,
          voicesSnap,
          settingsSnap,
        ] = await Promise.all([
          getDoc(doc(db, 'content', 'hero')),
          getDoc(doc(db, 'content', 'about')),
          getDocs(query(collection(db, 'programs'), orderBy('order', 'asc'))),
          getDocs(query(collection(db, 'publications'), where('isPublished', '==', true), orderBy('publishDate', 'desc'))),
          getDocs(query(collection(db, 'gallery'), where('isPublished', '==', true), orderBy('order', 'asc'), limit(8))),
          getDocs(query(collection(db, 'events'), where('isPublished', '==', true), orderBy('date', 'desc'), limit(6))),
          getDocs(query(collection(db, 'archive'), where('isPublished', '==', true), orderBy('order', 'asc'))),
          getDocs(query(collection(db, 'voices'), where('isPublished', '==', true), orderBy('order', 'asc'), limit(3))),
          getDoc(doc(db, 'content', 'settings')),
        ])

        setData({
          hero: heroSnap.exists() ? (heroSnap.data() as HeroContent) : null,
          about: aboutSnap.exists() ? (aboutSnap.data() as AboutContent) : null,
          programs: programsSnap.docs.map(d => ({ id: d.id, ...d.data() } as Program)),
          publications: publicationsSnap.docs.map(d => ({ id: d.id, ...d.data() } as Publication)),
          gallery: gallerySnap.docs.map(d => ({ id: d.id, ...d.data() } as GalleryImage)),
          events: eventsSnap.docs.map(d => ({ id: d.id, ...d.data() } as Event)),
          archive: archiveSnap.docs.map(d => ({ id: d.id, ...d.data() } as ArchiveItem)),
          voices: voicesSnap.docs.map(d => ({ id: d.id, ...d.data() } as Voice)),
          settings: settingsSnap.exists() ? (settingsSnap.data() as SiteSettings) : null,
          loading: false,
        })
      } catch (error) {
        console.error('Error fetching Firestore data:', error)
        setData(prev => ({ ...prev, loading: false }))
      }
    }

    fetchData()
  }, [])

  return (
    <FirestoreDataContext.Provider value={data}>
      {children}
    </FirestoreDataContext.Provider>
  )
}
