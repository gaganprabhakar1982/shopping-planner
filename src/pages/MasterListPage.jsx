import { useState, useEffect, useMemo } from 'react'
import { Search, Plus, Check } from 'lucide-react'
import { useMasterList } from '../hooks/useMasterList'
import { useShoppingList } from '../hooks/useShoppingList'
import CategorySection from '../components/master/CategorySection'
import Modal from '../components/ui/Modal'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { categories, units } from '../data/defaultItems'
import { useListContext } from '../context/ListContext'

export default function MasterListPage() {
  const { items, loading, addMasterItem, initializeDefaults } = useMasterList()
  const { activeListId } = useListContext()
  const { items: shoppingItems, addItem: addToShoppingList } = useShoppingList(activeListId)
  const [search, setSearch] = useState('')
  const [showCustomModal, setShowCustomModal] = useState(false)
  const [customCategory, setCustomCategory] = useState('Other')
  const [customForm, setCustomForm] = useState({
    name: '',
    defaultQty: 1,
    defaultUnit: 'pcs',
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
    if (!activeListId) return
    await addToShoppingList({
      name: masterItem.name,
      category: masterItem.category,
      qty: masterItem.defaultQty,
      unit: masterItem.defaultUnit || 'pcs',
    })
  }

  function openCustomModal(category) {
    setCustomCategory(category)
    setCustomForm({ name: '', defaultQty: 1, defaultUnit: 'pcs' })
    setShowCustomModal(true)
  }

  async function handleAddCustom(e) {
    e.preventDefault()
    if (!customForm.name.trim()) return
    await addMasterItem({
      name: customForm.name.trim(),
      category: customCategory,
      defaultQty: Number(customForm.defaultQty),
      defaultUnit: customForm.defaultUnit,
    })
    setShowCustomModal(false)
  }

  if (loading) {
    return <LoadingSpinner className="mt-20" size="lg" />
  }

  return (
    <div className="relative min-h-screen" style={{ background: '#F0F1F3' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-10"
        style={{ background: '#F0F1F3', padding: '20px 20px 0' }}
      >
        <div
          className="flex items-center justify-between"
          style={{ marginBottom: 16 }}
        >
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1A1D21', letterSpacing: '-0.02em' }}>
            Master List
          </h1>
          {/* Items count badge */}
          <div
            className="flex items-center"
            style={{
              gap: 6,
              background: '#ECFDF5',
              padding: '8px 14px',
              borderRadius: 999,
            }}
          >
            <Check style={{ width: 16, height: 16, color: '#10B981' }} strokeWidth={2.5} />
            <span style={{ fontSize: 13, fontWeight: 600, color: '#10B981' }}>
              {items.length} items
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative" style={{ marginBottom: 16 }}>
          <Search
            style={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 20,
              height: 20,
              color: '#9CA3AF',
              pointerEvents: 'none',
            }}
          />
          <input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              paddingLeft: 48,
              paddingRight: 16,
              paddingTop: 14,
              paddingBottom: 14,
              background: '#FFFFFF',
              border: '1px solid #D1D5DB',
              borderRadius: 16,
              fontSize: 15,
              color: '#1A1D21',
              outline: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              boxSizing: 'border-box',
            }}
          />
        </div>
      </header>

      {/* Category sections */}
      <div style={{ padding: '0 20px 128px' }}>
        {Object.keys(groupedItems).length === 0 ? (
          <div className="flex flex-col items-center justify-center" style={{ padding: '80px 16px' }}>
            <div
              className="flex items-center justify-center text-3xl"
              style={{ width: 64, height: 64, background: '#FFF7ED', borderRadius: 16, marginBottom: 16 }}
            >
              📋
            </div>
            <p style={{ fontSize: 16, fontWeight: 600, color: '#1A1D21', marginBottom: 4 }}>
              {search ? 'No results' : 'Empty list'}
            </p>
            <p style={{ fontSize: 14, color: '#9CA3AF', textAlign: 'center' }}>
              {search ? 'Try a different search term' : 'No items in master list'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {Object.entries(groupedItems).map(([category, catItems]) => (
              <CategorySection
                key={category}
                category={category}
                items={catItems}
                shoppingListNames={shoppingListNames}
                onAddToList={handleAddToList}
                onAddCustom={openCustomModal}
              />
            ))}
          </div>
        )}
      </div>

      {/* FAB */}
      <button
        onClick={() => openCustomModal('Other')}
        className="fixed flex items-center justify-center active:scale-95 transition-all duration-200 z-30"
        style={{
          bottom: 96,
          right: 20,
          width: 56,
          height: 56,
          background: 'linear-gradient(135deg, #14B8A6, #0F766E)',
          color: '#FFFFFF',
          borderRadius: 16,
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(20,184,166,0.4)',
        }}
      >
        <Plus style={{ width: 24, height: 24 }} strokeWidth={2.5} />
      </button>

      {/* Custom item modal */}
      <Modal
        isOpen={showCustomModal}
        onClose={() => setShowCustomModal(false)}
        title={`Add to ${customCategory}`}
      >
        <form onSubmit={handleAddCustom} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
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
          <div className="flex" style={{ gap: 16 }}>
            <Input
              label="Default Qty"
              type="number"
              min="1"
              value={customForm.defaultQty}
              onChange={(e) =>
                setCustomForm((f) => ({ ...f, defaultQty: e.target.value }))
              }
            />
            <div style={{ flex: 1 }}>
              <label
                style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 6 }}
              >
                Unit
              </label>
              <select
                value={customForm.defaultUnit}
                onChange={(e) =>
                  setCustomForm((f) => ({ ...f, defaultUnit: e.target.value }))
                }
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: '#F9FAFB',
                  border: '1px solid #E5E7EB',
                  borderRadius: 12,
                  color: '#1A1D21',
                  fontSize: 14,
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box',
                }}
              >
                {units.map((u) => (
                  <option key={u.value} value={u.value}>
                    {u.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Button type="submit" className="w-full" size="lg">
            Add Item
          </Button>
        </form>
      </Modal>
    </div>
  )
}
