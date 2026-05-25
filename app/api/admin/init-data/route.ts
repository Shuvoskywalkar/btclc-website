import { NextResponse } from 'next/server'
import { doc, setDoc, collection, addDoc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { COLLECTIONS } from '@/lib/types'
import {
  defaultHero,
  defaultAbout,
  defaultSettings,
  defaultPrograms,
  defaultVoices,
  defaultEvents
} from '@/lib/default-content'

export async function POST() {
  try {
    if (!db) {
      return NextResponse.json(
        { error: 'Firebase is not configured' },
        { status: 500 }
      )
    }

    const results: Record<string, string> = {}

    // Initialize hero section
    const heroRef = doc(db, COLLECTIONS.HERO, 'main')
    const heroSnap = await getDoc(heroRef)
    if (!heroSnap.exists()) {
      await setDoc(heroRef, defaultHero)
      results.hero = 'created'
    } else {
      results.hero = 'already exists'
    }

    // Initialize about section
    const aboutRef = doc(db, COLLECTIONS.ABOUT, 'main')
    const aboutSnap = await getDoc(aboutRef)
    if (!aboutSnap.exists()) {
      await setDoc(aboutRef, defaultAbout)
      results.about = 'created'
    } else {
      results.about = 'already exists'
    }

    // Initialize site settings
    const settingsRef = doc(db, COLLECTIONS.SITE_SETTINGS, 'main')
    const settingsSnap = await getDoc(settingsRef)
    if (!settingsSnap.exists()) {
      await setDoc(settingsRef, defaultSettings)
      results.settings = 'created'
    } else {
      results.settings = 'already exists'
    }

    // Initialize programs
    const programsRef = collection(db, COLLECTIONS.PROGRAMS)
    for (const program of defaultPrograms) {
      await addDoc(programsRef, program)
    }
    results.programs = `added ${defaultPrograms.length} programs`

    // Initialize voices
    const voicesRef = collection(db, COLLECTIONS.VOICES)
    for (const voice of defaultVoices) {
      await addDoc(voicesRef, voice)
    }
    results.voices = `added ${defaultVoices.length} voices`

    // Initialize events
    const eventsRef = collection(db, COLLECTIONS.EVENTS)
    for (const event of defaultEvents) {
      await addDoc(eventsRef, event)
    }
    results.events = `added ${defaultEvents.length} events`

    return NextResponse.json({
      success: true,
      message: 'Initial data created successfully',
      results
    })
  } catch (error) {
    console.error('Error initializing data:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to initialize data' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Use POST request to initialize data',
    warning: 'This will create default content in Firestore if it does not exist'
  })
}
