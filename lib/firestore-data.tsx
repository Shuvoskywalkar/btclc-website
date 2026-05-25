"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { collection, getDocs, doc, getDoc, query, orderBy, limit } from 'firebase/firestore'
import { db, isFirebaseConfigured } from './firebase'
import { COLLECTIONS } from './types'
import type { 
  HeroSection, 
  AboutSection, 
  Program, 
  Publication, 
  GalleryItem, 
  Event, 
  ArchiveItem, 
  Voice, 
  SiteSettings 
} from './types'

interface FirestoreData {
  hero: HeroSection | null
  about: AboutSection | null
  programs: Program[]
  publications: Publication[]
  gallery: GalleryItem[]
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
  loading: false,
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
    loading: isFirebaseConfigured,
  })

  useEffect(() => {
    if (!isFirebaseConfigured || !db) {
      setData(prev => ({ ...prev, loading: false }))
      return
    }

    async function fetchData() {
      if (!db) return
      
      try {
        // Fetch all data in parallel using correct collection paths
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
          getDoc(doc(db, COLLECTIONS.HERO, 'main')),
          getDoc(doc(db, COLLECTIONS.ABOUT, 'main')),
          getDocs(query(collection(db, COLLECTIONS.PROGRAMS), orderBy('order', 'asc'))),
          getDocs(query(collection(db, COLLECTIONS.PUBLICATIONS), orderBy('order', 'asc'))),
          getDocs(query(collection(db, COLLECTIONS.GALLERY), orderBy('order', 'asc'), limit(8))),
          getDocs(query(collection(db, COLLECTIONS.EVENTS), orderBy('date', 'desc'), limit(6))),
          getDocs(query(collection(db, COLLECTIONS.ARCHIVE), orderBy('order', 'asc'))),
          getDocs(query(collection(db, COLLECTIONS.VOICES), orderBy('order', 'asc'), limit(3))),
          getDoc(doc(db, COLLECTIONS.SITE_SETTINGS, 'main')),
        ])

        setData({
          hero: heroSnap.exists() ? (heroSnap.data() as HeroSection) : null,
          about: aboutSnap.exists() ? (aboutSnap.data() as AboutSection) : null,
          programs: programsSnap.docs.map(d => ({ id: d.id, ...d.data() } as Program)),
          publications: publicationsSnap.docs.map(d => ({ id: d.id, ...d.data() } as Publication)),
          gallery: gallerySnap.docs.map(d => ({ id: d.id, ...d.data() } as GalleryItem)),
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
