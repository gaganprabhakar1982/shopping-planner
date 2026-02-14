import { useState, useEffect, useMemo } from 'react'
import { Search, Plus, Check, Package } from 'lucide-react'
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
    <div className="relative min-h-screen">
      {/* Gradient Header */}
      <header className="relative bg-gradient-to-br from-teal-500 via-teal-500 to-emerald-500 px-6 pt-6 pb-6 rounded-b-[28px] shadow-[0_8px_32px_rgba(20,184,166,0.2)]">
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />

        <div className="relative flex items-center justify-between mb-5">
          <div>
            <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">Browse Items</p>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Master List
            </h1>
          </div>
          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-white/10">
            <Package className="w-4 h-4 text-white/80" />
            <span className="text-[13px] font-bold text-white">
              {items.length}
            </span>
            <span className="text-[13px] font-medium text-white/70">items</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none z-10" />
          <input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white/95 backdrop-blur-sm border-0 rounded-2xl text-[15px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all shadow-soft"
          />
        </div>
      </header>

      {/* Category sections */}
      <div className="px-5 pb-32 pt-5 space-y-3">
        {Object.keys(groupedItems).length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-emerald-50 rounded-[20px] flex items-center justify-center mb-5 text-4xl empty-icon shadow-soft">
              📋
            </div>
            <p className="text-lg font-bold text-slate-800 mb-1.5">
              {search ? 'No results' : 'Empty list'}
            </p>
            <p className="text-sm text-slate-400 text-center">
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
        className="fixed bottom-24 right-5 w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-2xl shadow-fab-teal flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 z-30"
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
