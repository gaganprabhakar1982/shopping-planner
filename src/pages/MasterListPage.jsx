import { useState, useEffect, useMemo } from 'react'
import { Search, PackagePlus } from 'lucide-react'
import { useMasterList } from '../hooks/useMasterList'
import { useShoppingList } from '../hooks/useShoppingList'
import CategorySection from '../components/master/CategorySection'
import Modal from '../components/ui/Modal'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { categories } from '../data/defaultItems'

export default function MasterListPage() {
  const { items, loading, addMasterItem, initializeDefaults } = useMasterList()
  const { items: shoppingItems, addItem: addToShoppingList } = useShoppingList()
  const [search, setSearch] = useState('')
  const [showCustomModal, setShowCustomModal] = useState(false)
  const [customCategory, setCustomCategory] = useState('Other')
  const [customForm, setCustomForm] = useState({
    name: '',
    defaultQty: 1,
    defaultPackets: 1,
  })
  const [initialized, setInitialized] = useState(false)

  // Initialize defaults if master list is empty
  useEffect(() => {
    if (!loading && items.length === 0 && !initialized) {
      setInitialized(true)
      initializeDefaults()
    }
  }, [loading, items.length, initialized, initializeDefaults])

  // Set of shopping list item names (lowercase) for quick lookup
  const shoppingListNames = useMemo(() => {
    return new Set(shoppingItems.map((item) => item.name.toLowerCase()))
  }, [shoppingItems])

  // Group by category and filter by search
  const groupedItems = useMemo(() => {
    const filtered = search
      ? items.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      : items

    return categories.reduce((acc, cat) => {
      const catItems = filtered.filter((item) => item.category === cat)
      if (catItems.length > 0) {
        acc[cat] = catItems
      }
      return acc
    }, {})
  }, [items, search])

  async function handleAddToList(masterItem) {
    await addToShoppingList({
      name: masterItem.name,
      category: masterItem.category,
      qty: masterItem.defaultQty,
      packets: masterItem.defaultPackets,
    })
  }

  function openCustomModal(category) {
    setCustomCategory(category)
    setCustomForm({ name: '', defaultQty: 1, defaultPackets: 1 })
    setShowCustomModal(true)
  }

  async function handleAddCustom(e) {
    e.preventDefault()
    if (!customForm.name.trim()) return
    await addMasterItem({
      name: customForm.name.trim(),
      category: customCategory,
      defaultQty: Number(customForm.defaultQty),
      defaultPackets: Number(customForm.defaultPackets),
    })
    setShowCustomModal(false)
  }

  if (loading) {
    return <LoadingSpinner className="mt-20" size="lg" />
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 border-b border-gray-200">
        <div className="px-4 pt-12 pb-3">
          <h1 className="text-xl font-bold text-gray-900">Master List</h1>
          <p className="text-sm text-gray-500">
            {items.length} items across {Object.keys(groupedItems).length} categories
          </p>
        </div>
        {/* Search */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-0 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
      </div>

      {/* Category sections */}
      <div>
        {Object.keys(groupedItems).length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <PackagePlus className="w-12 h-12 text-gray-300 mb-3" />
            <p className="text-gray-400 text-sm text-center">
              {search ? 'No items match your search' : 'No items in master list'}
            </p>
          </div>
        ) : (
          Object.entries(groupedItems).map(([category, catItems]) => (
            <CategorySection
              key={category}
              category={category}
              items={catItems}
              shoppingListNames={shoppingListNames}
              onAddToList={handleAddToList}
              onAddCustom={openCustomModal}
            />
          ))
        )}
      </div>

      {/* Custom item modal */}
      <Modal
        isOpen={showCustomModal}
        onClose={() => setShowCustomModal(false)}
        title={`Add to ${customCategory}`}
      >
        <form onSubmit={handleAddCustom} className="space-y-4">
          <Input
            label="Item Name"
            placeholder="e.g. Coconut Milk"
            value={customForm.name}
            onChange={(e) =>
              setCustomForm((f) => ({ ...f, name: e.target.value }))
            }
            required
            autoFocus
          />
          <div className="flex gap-4">
            <Input
              label="Default Qty"
              type="number"
              min="1"
              value={customForm.defaultQty}
              onChange={(e) =>
                setCustomForm((f) => ({ ...f, defaultQty: e.target.value }))
              }
            />
            <Input
              label="Default Packets"
              type="number"
              min="1"
              value={customForm.defaultPackets}
              onChange={(e) =>
                setCustomForm((f) => ({
                  ...f,
                  defaultPackets: e.target.value,
                }))
              }
            />
          </div>
          <Button type="submit" className="w-full" size="lg">
            Add Item
          </Button>
        </form>
      </Modal>
    </div>
  )
}
