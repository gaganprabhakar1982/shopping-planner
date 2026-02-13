import { useState, useEffect, useMemo } from 'react'
import { Search, Plus, Check } from 'lucide-react'
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
    <div className="relative min-h-screen bg-[#FAFBFC]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#FAFBFC] px-6 pt-5 pb-0">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-[#1A1D21] tracking-tight">
            Master List
          </h1>
          {/* Items count badge */}
          <div className="flex items-center gap-1.5 bg-teal-50 px-3.5 py-2 rounded-full">
            <Check className="w-4 h-4 text-teal-500" strokeWidth={2.5} />
            <span className="text-[13px] font-semibold text-teal-500">
              {items.length} items
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-5">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-[#E5E7EB] rounded-2xl text-[15px] text-[#1A1D21] placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-[3px] focus:ring-orange-500/10 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
          />
        </div>
      </header>

      {/* Category sections */}
      <div className="px-6 pb-32 space-y-3">
        {Object.keys(groupedItems).length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-4 text-3xl empty-icon">
              📋
            </div>
            <p className="text-base font-semibold text-[#1A1D21] mb-1">
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

      {/* FAB */}
      <button
        onClick={() => openCustomModal('Other')}
        className="fixed bottom-24 right-5 w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-700 text-white rounded-2xl shadow-[0_8px_24px_rgba(20,184,166,0.4)] flex items-center justify-center hover:scale-105 hover:shadow-[0_12px_32px_rgba(20,184,166,0.5)] active:scale-95 transition-all duration-200 z-30"
      >
        <Plus className="w-6 h-6" strokeWidth={2.5} />
      </button>

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
