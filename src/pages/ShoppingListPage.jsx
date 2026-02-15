import { useState } from 'react'
import { Plus, ChevronDown } from 'lucide-react'
import { useShoppingList } from '../hooks/useShoppingList'
import { useListContext } from '../context/ListContext'
import { useMigration } from '../hooks/useMigration'
import ShoppingList from '../components/shopping/ShoppingList'
import ListSelectorSheet from '../components/shopping/ListSelectorSheet'
import Modal from '../components/ui/Modal'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { categories, units } from '../data/defaultItems'

function ProgressRing({ progress, size = 48, strokeWidth = 4 }) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        style={{ transform: 'rotate(-90deg)' }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#10B981"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-emerald-500">
        {progress}%
      </span>
    </div>
  )
}

export default function ShoppingListPage() {
  const {
    lists,
    activeListId,
    setActiveListId,
    createList,
    renameList,
    deleteList,
    loading: listsLoading,
  } = useListContext()

  const { migrating } = useMigration(listsLoading)

  const {
    activeItems,
    completedItems,
    loading,
    addItem,
    toggleItem,
    updateItem,
    deleteItem,
  } = useShoppingList(activeListId)

  const [showAddModal, setShowAddModal] = useState(false)
  const [showListSelector, setShowListSelector] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    category: 'Other',
    qty: 1,
    unit: 'pcs',
  })

  const totalItems = activeItems.length + completedItems.length
  const progress = totalItems > 0 ? Math.round((completedItems.length / totalItems) * 100) : 0

  const activeList = lists.find((l) => l.id === activeListId)
  const listName = activeList ? activeList.name : 'No List'

  function openAddModal() {
    setEditingItem(null)
    setFormData({ name: '', category: 'Other', qty: 1, unit: 'pcs' })
    setShowAddModal(true)
  }

  function openEditModal(item) {
    setEditingItem(item)
    setFormData({
      name: item.name,
      category: item.category,
      qty: item.qty,
      unit: item.unit || 'pcs',
    })
    setShowAddModal(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!formData.name.trim()) return

    if (editingItem) {
      await updateItem(editingItem.id, {
        name: formData.name.trim(),
        category: formData.category,
        qty: Number(formData.qty),
        unit: formData.unit,
      })
    } else {
      await addItem({
        name: formData.name.trim(),
        category: formData.category,
        qty: Number(formData.qty),
        unit: formData.unit,
      })
    }
    setShowAddModal(false)
  }

  async function handleDelete(itemId) {
    await deleteItem(itemId)
  }

  async function handleUpdateQty(itemId, newQty) {
    await updateItem(itemId, { qty: newQty })
  }

  if (loading || listsLoading || migrating) {
    return <LoadingSpinner className="mt-20" size="lg" />
  }

  // No lists state - prompt to create one
  if (lists.length === 0) {
    return (
      <div className="relative min-h-screen" style={{ background: '#F0F1F3' }}>
        <div className="flex flex-col items-center justify-center" style={{ padding: '120px 32px' }}>
          <div
            className="flex items-center justify-center text-3xl"
            style={{ width: 64, height: 64, background: '#FFF7ED', borderRadius: 16, marginBottom: 16 }}
          >
            📋
          </div>
          <p style={{ fontSize: 18, fontWeight: 700, color: '#1A1D21', marginBottom: 8 }}>
            Create Your First List
          </p>
          <p style={{ fontSize: 14, color: '#9CA3AF', textAlign: 'center', marginBottom: 24 }}>
            Get started by creating a shopping list
          </p>
          <button
            onClick={async () => {
              const now = new Date()
              const name = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
              await createList(name)
            }}
            style={{
              padding: '14px 32px',
              background: 'linear-gradient(135deg, #F97316, #C2410C)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 12,
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(249,115,22,0.4)',
            }}
          >
            Create List
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen" style={{ background: '#F0F1F3' }}>
      {/* Header */}
      <header className="sticky top-0 z-10" style={{ background: '#F0F1F3', padding: '20px 20px 20px 20px' }}>
        {/* Top row: List selector + Progress ring */}
        <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
          <button
            onClick={() => setShowListSelector(true)}
            className="flex items-center gap-2 rounded-full"
            style={{
              background: '#fff',
              padding: '10px 16px',
              border: '1px solid #D1D5DB',
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            }}
          >
            <h1 className="text-[15px] font-semibold tracking-tight" style={{ color: '#1A1D21' }}>
              {listName}
            </h1>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
          <ProgressRing progress={progress} />
        </div>

        {/* Stats Pills */}
        <div className="flex" style={{ gap: 10 }}>
          <div
            className="flex items-center gap-1.5 rounded-full"
            style={{
              background: '#fff',
              padding: '8px 14px',
              border: '1px solid #D1D5DB',
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            }}
          >
            <span className="text-[13px] font-bold text-orange-500">{activeItems.length}</span>
            <span className="text-[13px] font-medium text-gray-500">pending</span>
          </div>
          <div
            className="flex items-center gap-1.5 rounded-full"
            style={{
              background: '#fff',
              padding: '8px 14px',
              border: '1px solid #D1D5DB',
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            }}
          >
            <span className="text-[13px] font-bold text-emerald-500">{completedItems.length}</span>
            <span className="text-[13px] font-medium text-gray-500">done</span>
          </div>
        </div>
      </header>

      {/* List */}
      <ShoppingList
        activeItems={activeItems}
        completedItems={completedItems}
        onToggle={toggleItem}
        onEdit={openEditModal}
        onDelete={handleDelete}
        onUpdateQty={handleUpdateQty}
      />

      {/* FAB */}
      <button
        onClick={openAddModal}
        className="fixed bottom-24 right-5 w-14 h-14 text-white rounded-2xl flex items-center justify-center active:scale-95 transition-all duration-200 z-30"
        style={{
          background: 'linear-gradient(135deg, #F97316, #C2410C)',
          boxShadow: '0 8px 24px rgba(249,115,22,0.4)',
        }}
      >
        <Plus className="w-6 h-6" strokeWidth={2.5} />
      </button>

      {/* List Selector Sheet */}
      <ListSelectorSheet
        isOpen={showListSelector}
        onClose={() => setShowListSelector(false)}
        lists={lists}
        activeListId={activeListId}
        onSelect={setActiveListId}
        onCreate={createList}
        onRename={renameList}
        onDelete={deleteList}
      />

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title={editingItem ? 'Edit Item' : 'Add Item'}
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Input
            label="Item Name"
            placeholder="e.g. Milk"
            value={formData.name}
            onChange={(e) =>
              setFormData((f) => ({ ...f, name: e.target.value }))
            }
            required
            autoFocus
          />
          <div>
            <label
              style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 6 }}
            >
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData((f) => ({ ...f, category: e.target.value }))
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
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <Input
                label="Quantity"
                type="number"
                min="1"
                value={formData.qty}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, qty: e.target.value }))
                }
              />
            </div>
            <div style={{ flex: 1 }}>
              <label
                style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 6 }}
              >
                Unit
              </label>
              <select
                value={formData.unit}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, unit: e.target.value }))
                }
                style={{
                  width: '100%',
                  height: 46,
                  padding: '0 16px',
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
            {editingItem ? 'Save Changes' : 'Add to List'}
          </Button>
        </form>
      </Modal>
    </div>
  )
}
