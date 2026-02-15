import { useState, useEffect, useCallback } from 'react'
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuth } from '../context/AuthContext'

export function useLists() {
  const { user } = useAuth()
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeListId, setActiveListId] = useState(null)

  useEffect(() => {
    if (!user) {
      setLists([])
      setLoading(false)
      return
    }

    const q = query(
      collection(db, 'users', user.uid, 'lists'),
      orderBy('createdAt', 'desc')
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const result = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setLists(result)
      setLoading(false)
    }, (error) => {
      console.error('Lists listener error:', error)
      setLoading(false)
    })

    return unsubscribe
  }, [user])

  // Auto-select first list if none active or active list was deleted
  useEffect(() => {
    if (loading) return
    if (lists.length === 0) {
      setActiveListId(null)
      return
    }
    if (!activeListId || !lists.find((l) => l.id === activeListId)) {
      setActiveListId(lists[0].id)
    }
  }, [lists, loading, activeListId])

  const createList = useCallback(async (name) => {
    if (!user) return null
    const ref = await addDoc(collection(db, 'users', user.uid, 'lists'), {
      name,
      createdAt: serverTimestamp(),
      order: lists.length,
    })
    setActiveListId(ref.id)
    return ref.id
  }, [user, lists.length])

  const renameList = useCallback(async (id, name) => {
    if (!user) return
    await updateDoc(doc(db, 'users', user.uid, 'lists', id), { name })
  }, [user])

  const deleteList = useCallback(async (id) => {
    if (!user) return
    await deleteDoc(doc(db, 'users', user.uid, 'lists', id))
    if (activeListId === id) {
      setActiveListId(null)
    }
  }, [user, activeListId])

  return {
    lists,
    loading,
    activeListId,
    setActiveListId,
    createList,
    renameList,
    deleteList,
  }
}
