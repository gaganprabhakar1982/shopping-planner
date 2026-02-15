import { useState, useEffect } from 'react'
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  writeBatch,
} from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuth } from '../context/AuthContext'
import { defaultMasterItems } from '../data/defaultItems'

export function useMasterList() {
  const { user } = useAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setItems([])
      setLoading(false)
      return
    }

    const q = query(
      collection(db, 'users', user.uid, 'masterList'),
      orderBy('order', 'asc')
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setItems(list)
      setLoading(false)
    }, (error) => {
      console.error('Master list listener error:', error)
      setLoading(false)
    })

    return unsubscribe
  }, [user])

  async function addMasterItem(itemData) {
    if (!user) return
    await addDoc(collection(db, 'users', user.uid, 'masterList'), {
      name: itemData.name,
      category: itemData.category || 'Other',
      defaultQty: itemData.defaultQty || 1,
      defaultUnit: itemData.defaultUnit || 'pcs',
      order: items.length,
    })
  }

  async function updateMasterItem(itemId, updates) {
    if (!user) return
    await updateDoc(doc(db, 'users', user.uid, 'masterList', itemId), updates)
  }

  async function deleteMasterItem(itemId) {
    if (!user) return
    await deleteDoc(doc(db, 'users', user.uid, 'masterList', itemId))
  }

  async function initializeDefaults() {
    if (!user) return
    const batch = writeBatch(db)
    defaultMasterItems.forEach((item, index) => {
      const ref = doc(collection(db, 'users', user.uid, 'masterList'))
      batch.set(ref, { ...item, order: index })
    })
    await batch.commit()
  }

  async function resetToDefaults() {
    if (!user) return
    // Delete existing items
    const batch1 = writeBatch(db)
    items.forEach((item) => {
      batch1.delete(doc(db, 'users', user.uid, 'masterList', item.id))
    })
    await batch1.commit()
    // Add defaults
    await initializeDefaults()
  }

  return {
    items,
    loading,
    addMasterItem,
    updateMasterItem,
    deleteMasterItem,
    initializeDefaults,
    resetToDefaults,
  }
}
