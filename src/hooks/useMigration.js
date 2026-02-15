import { useEffect, useRef } from 'react'
import {
  collection,
  getDocs,
  query,
  where,
  writeBatch,
  doc,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuth } from '../context/AuthContext'

export function useMigration(createList, activeListId, listsLoading) {
  const { user } = useAuth()
  const migrated = useRef(false)

  useEffect(() => {
    if (!user || migrated.current || listsLoading) return

    async function migrate() {
      migrated.current = true

      try {
        // Check for orphan items (no listId field)
        const shoppingRef = collection(db, 'users', user.uid, 'shoppingList')
        const snapshot = await getDocs(shoppingRef)
        const orphans = snapshot.docs.filter((d) => !d.data().listId)

        if (orphans.length === 0) return

        // Create a default list
        const now = new Date()
        const monthName = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        const listRef = await addDoc(collection(db, 'users', user.uid, 'lists'), {
          name: monthName,
          createdAt: serverTimestamp(),
          order: 0,
        })

        // Batch-update all orphan items with the new listId
        const batch = writeBatch(db)
        orphans.forEach((orphan) => {
          batch.update(doc(db, 'users', user.uid, 'shoppingList', orphan.id), {
            listId: listRef.id,
          })
        })
        await batch.commit()
      } catch (error) {
        console.error('Migration error:', error)
        migrated.current = false
      }
    }

    migrate()
  }, [user, listsLoading])
}
