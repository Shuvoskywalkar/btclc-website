"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import {
  User,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db, isFirebaseConfigured } from '@/lib/firebase'

interface AuthContextType {
  user: User | null
  isAdmin: boolean
  loading: boolean
  isConfigured: boolean
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // If Firebase is not configured, just set loading to false
    if (!isFirebaseConfigured || !auth) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      
      if (user && db) {
        // Check if user is admin
        try {
          const adminDoc = await getDoc(doc(db, 'admins', user.email!))
          setIsAdmin(adminDoc.exists())
        } catch (error) {
          console.error('Error checking admin status:', error)
          setIsAdmin(false)
        }
      } else {
        setIsAdmin(false)
      }
      
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    if (!isFirebaseConfigured || !auth || !db) {
      return { success: false, error: 'Firebase is not configured. Please add your Firebase credentials.' }
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      
      // Check if user is admin
      const adminDoc = await getDoc(doc(db, 'admins', result.user.email!))
      if (!adminDoc.exists()) {
        await firebaseSignOut(auth)
        return { success: false, error: 'You do not have admin access.' }
      }
      
      return { success: true }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign in'
      return { success: false, error: errorMessage }
    }
  }

  const signOut = async () => {
    if (!auth) return
    
    try {
      await firebaseSignOut(auth)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, isConfigured: isFirebaseConfigured, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
