"use client"

import { useState, useEffect, useCallback } from 'react'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  DocumentData,
  Timestamp,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'

// Convert Firestore timestamps to dates
function convertTimestamps<T>(data: DocumentData): T {
  const converted: Record<string, unknown> = { ...data }
  for (const key in converted) {
    if (converted[key] instanceof Timestamp) {
      converted[key] = (converted[key] as Timestamp).toDate()
    }
  }
  return converted as T
}

// Hook for fetching a single document
export function useDocument<T>(collectionName: string, docId?: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    if (!docId) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const docRef = doc(db, collectionName, docId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setData(convertTimestamps<T>(docSnap.data()))
      } else {
        setData(null)
      }
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch document')
    } finally {
      setLoading(false)
    }
  }, [collectionName, docId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const update = async (newData: Partial<T>) => {
    if (!docId) return

    try {
      const docRef = doc(db, collectionName, docId)
      await setDoc(docRef, newData, { merge: true })
      setData((prev) => (prev ? { ...prev, ...newData } : (newData as T)))
      return { success: true }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Failed to update' }
    }
  }

  return { data, loading, error, refetch: fetchData, update }
}

// Hook for fetching a collection
export function useCollection<T extends { id?: string }>(
  collectionName: string,
  orderByField?: string
) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const collectionRef = collection(db, collectionName)
      const q = orderByField
        ? query(collectionRef, orderBy(orderByField))
        : collectionRef
      const querySnapshot = await getDocs(q)

      const items: T[] = []
      querySnapshot.forEach((doc) => {
        items.push({
          id: doc.id,
          ...convertTimestamps<T>(doc.data()),
        })
      })

      setData(items)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch collection')
    } finally {
      setLoading(false)
    }
  }, [collectionName, orderByField])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const add = async (newData: Omit<T, 'id'>) => {
    try {
      const collectionRef = collection(db, collectionName)
      const docRef = await addDoc(collectionRef, newData)
      const newItem = { id: docRef.id, ...newData } as T
      setData((prev) => [...prev, newItem])
      return { success: true, id: docRef.id }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Failed to add' }
    }
  }

  const update = async (id: string, newData: Partial<T>) => {
    try {
      const docRef = doc(db, collectionName, id)
      await updateDoc(docRef, newData as DocumentData)
      setData((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...newData } : item))
      )
      return { success: true }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Failed to update' }
    }
  }

  const remove = async (id: string) => {
    try {
      const docRef = doc(db, collectionName, id)
      await deleteDoc(docRef)
      setData((prev) => prev.filter((item) => item.id !== id))
      return { success: true }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Failed to delete' }
    }
  }

  return { data, loading, error, refetch: fetchData, add, update, remove }
}

// Hook for managing admins
export function useAdmins() {
  const [admins, setAdmins] = useState<Array<{ email: string; name: string; createdAt: Date; addedBy: string }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAdmins = useCallback(async () => {
    try {
      setLoading(true)
      const collectionRef = collection(db, 'admins')
      const querySnapshot = await getDocs(collectionRef)

      const items: Array<{ email: string; name: string; createdAt: Date; addedBy: string }> = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        items.push({
          email: doc.id,
          name: data.name || '',
          createdAt: data.createdAt?.toDate() || new Date(),
          addedBy: data.addedBy || '',
        })
      })

      setAdmins(items)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch admins')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAdmins()
  }, [fetchAdmins])

  const addAdmin = async (email: string, name: string, addedBy: string) => {
    try {
      const docRef = doc(db, 'admins', email)
      await setDoc(docRef, {
        email,
        name,
        createdAt: new Date(),
        addedBy,
      })
      await fetchAdmins()
      return { success: true }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Failed to add admin' }
    }
  }

  const removeAdmin = async (email: string) => {
    try {
      const docRef = doc(db, 'admins', email)
      await deleteDoc(docRef)
      setAdmins((prev) => prev.filter((admin) => admin.email !== email))
      return { success: true }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Failed to remove admin' }
    }
  }

  return { admins, loading, error, refetch: fetchAdmins, addAdmin, removeAdmin }
}
