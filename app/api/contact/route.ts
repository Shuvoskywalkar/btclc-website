import { NextResponse } from 'next/server'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { COLLECTIONS } from '@/lib/types'

export async function POST(request: Request) {
  try {
    if (!db) {
      return NextResponse.json(
        { error: 'Database is not configured' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Please fill in all required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Store contact submission in Firestore
    const contactRef = collection(db, COLLECTIONS.CONTACT_SUBMISSIONS)
    await addDoc(contactRef, {
      name,
      email,
      phone: phone || '',
      subject,
      message,
      createdAt: Timestamp.now(),
      read: false,
    })

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon.'
    })
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}
