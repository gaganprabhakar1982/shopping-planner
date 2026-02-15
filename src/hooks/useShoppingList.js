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
  where,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuth } from '../context/AuthContext'

export function useShoppingList(listId) {
  const { user } = useAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user || !listId) {
      setItems([])
      setLoading(false)
      return
    }

    const q = query(
      collection(db, 'users', user.uid, 'shoppingList'),
      where('listId', '==', listId),
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
      console.error('Shopping list listener error:', error)
      setLoading(false)
    })

    return unsubscribe
  }, [user, listId])

  const activeItems = items.filter((item) => !item.checked)
  const completedItems = items.filter((item) => item.checked)

  async function addItem(itemData) {
    if (!user || !listId) return
    await addDoc(collection(db, 'users', user.uid, 'shoppingList'), {
      name: itemData.name,
      category: itemData.category || 'Other',
      qty: itemData.qty || 1,
      unit: itemData.unit || 'pcs',
      checked: false,
      checkedAt: null,
      addedAt: serverTimestamp(),
      order: items.length,
      listId,
    })
  }

  async function toggleItem(itemId, currentChecked) {
    if (!user) return
    await updateDoc(doc(db, 'users', user.uid, 'shoppingList', itemId), {
      checked: !currentChecked,
      checkedAt: !currentChecked ? serverTimestamp() : null,
    })
  }

  async function updateItem(itemId, updates) {
    if (!user) return
    await updateDoc(doc(db, 'users', user.uid, 'shoppingList', itemId), updates)
  }

  async function deleteItem(itemId) {
    if (!user) return
    await deleteDoc(doc(db, 'users', user.uid, 'shoppingList', itemId))
  }

  async function clearCompleted() {
    if (!user) return
    const batch = writeBatch(db)
    completedItems.forEach((item) => {
      batch.delete(doc(db, 'users', user.uid, 'shoppingList', item.id))
    })
    await batch.commit()
  }

  async function clearAll() {
    if (!user) return
    const batch = writeBatch(db)
    items.forEach((item) => {
      batch.delete(doc(db, 'users', user.uid, 'shoppingList', item.id))
    })
    await batch.commit()
  }

  return {
    items,
    activeItems,
    completedItems,
    loading,
    addItem,
    toggleItem,
    updateItem,
    deleteItem,
    clearCompleted,
    clearAll,
  }
}
