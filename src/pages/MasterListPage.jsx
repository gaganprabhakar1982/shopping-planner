import { useState, useEffect, useMemo } from 'react'
import { Search, PackagePlus, ClipboardList } from 'lucide-react'
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

  useEffect(() => {
    if (!loading && items.length === 0 && !initialized) {
      setInitialized(true)
      initializeDefaults()
    }
  }, [loading, items.length, initialized, initializeDefaults])

  const shoppingListNames = useMemo(() => {
    return new Set(shoppingItems.map((item) => item.name.toLowerCase()))
  }, [shoppingItems])

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
      <div className="bg-white sticky top-0 z-10">
        <div className="px-5 pt-14 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Master List</h1>
              <p className="text-sm text-gray-400 mt-0.5">
                {items.length} items in {Object.keys(groupedItems).length} categories
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center">
              <ClipboardList className="w-6 h-6 text-orange-500" />
            </div>
          </div>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-100 border-0 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:bg-white focus:shadow-sm transition-all"
            />
          </div>
        </div>
        <div className="h-px bg-gray-100" />
      </div>

      {/* Category sections */}
      <div className="px-4 py-4 space-y-3">
        {Object.keys(groupedItems).length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mb-5">
              <PackagePlus className="w-10 h-10 text-gray-300" />
            </div>
            <p className="text-lg font-semibold text-gray-900 mb-1">
              {search ? 'No results' : 'Empty list'}
            </p>
            <p className="text-sm text-gray-400 text-center">
              {search ? 'Try a different search term' : 'No items in master list'}
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
        <form onSubmit={handleAddCustom} className="space-y-5">
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
