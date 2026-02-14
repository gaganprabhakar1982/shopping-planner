import { useState } from 'react'
import { Plus, ChevronDown, ShoppingBag } from 'lucide-react'
import { useShoppingList } from '../hooks/useShoppingList'
import ShoppingList from '../components/shopping/ShoppingList'
import Modal from '../components/ui/Modal'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { categories } from '../data/defaultItems'

function ProgressRing({ progress, size = 56, strokeWidth = 5 }) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
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
          stroke="rgba(255,255,255,0.25)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="white"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="progress-ring-fill"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[12px] font-bold text-white">
        {progress}%
      </span>
    </div>
  )
}

export default function ShoppingListPage() {
  const {
    activeItems,
    completedItems,
    loading,
    addItem,
    toggleItem,
    updateItem,
    deleteItem,
  } = useShoppingList()

  const [showAddModal, setShowAddModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    category: 'Other',
    qty: 1,
    packets: 1,
  })

  const totalItems = activeItems.length + completedItems.length
  const now = new Date()
  const monthYear = now.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })
  const progress = totalItems > 0 ? Math.round((completedItems.length / totalItems) * 100) : 0

  function openAddModal() {
    setEditingItem(null)
    setFormData({ name: '', category: 'Other', qty: 1, packets: 1 })
    setShowAddModal(true)
  }

  function openEditModal(item) {
    setEditingItem(item)
    setFormData({
      name: item.name,
      category: item.category,
      qty: item.qty,
      packets: item.packets,
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
        packets: Number(formData.packets),
      })
    } else {
      await addItem({
        name: formData.name.trim(),
        category: formData.category,
        qty: Number(formData.qty),
        packets: Number(formData.packets),
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

  if (loading) {
    return <LoadingSpinner className="mt-20" size="lg" />
  }

  return (
    <div className="relative min-h-screen">
      {/* Gradient Header */}
      <header className="relative bg-gradient-to-br from-orange-500 via-orange-500 to-amber-500 px-6 pt-6 pb-8 rounded-b-[28px] shadow-[0_8px_32px_rgba(249,115,22,0.2)]">
        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-4 left-4 w-20 h-20 bg-white/5 rounded-full" />

        {/* Top row */}
        <div className="relative flex items-center justify-between mb-5">
          <div>
            <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">Shopping List</p>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white tracking-tight">
                {monthYear}
              </h1>
              <ChevronDown className="w-4 h-4 text-white/60" />
            </div>
          </div>

          {/* Progress Ring */}
          <ProgressRing progress={progress} />
        </div>

        {/* Stats row */}
        <div className="relative flex gap-3">
          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-white/10">
            <ShoppingBag className="w-4 h-4 text-white/80" />
            <span className="text-[13px] font-bold text-white">{activeItems.length}</span>
            <span className="text-[13px] font-medium text-white/70">pending</span>
          </div>
          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-white/10">
            <span className="text-[13px] font-bold text-white">{completedItems.length}</span>
            <span className="text-[13px] font-medium text-white/70">done</span>
          </div>
        </div>
      </header>

      {/* List */}
      <div className="mt-5">
        <ShoppingList
          activeItems={activeItems}
          completedItems={completedItems}
          onToggle={toggleItem}
          onEdit={openEditModal}
          onDelete={handleDelete}
          onUpdateQty={handleUpdateQty}
        />
      </div>

      {/* FAB */}
      <button
        onClick={openAddModal}
        className="fixed bottom-24 right-5 w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl shadow-fab flex items-center justify-center hover:scale-110 hover:shadow-fab-hover active:scale-95 transition-all duration-300 z-30"
      >
        <Plus className="w-6 h-6" strokeWidth={2.5} />
      </button>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title={editingItem ? 'Edit Item' : 'Add Item'}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
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
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData((f) => ({ ...f, category: e.target.value }))
              }
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 focus:bg-white transition-all"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-4">
            <Input
              label="Quantity"
              type="number"
              min="1"
              value={formData.qty}
              onChange={(e) =>
                setFormData((f) => ({ ...f, qty: e.target.value }))
              }
            />
            <Input
              label="Packets"
              type="number"
              min="1"
              value={formData.packets}
              onChange={(e) =>
                setFormData((f) => ({ ...f, packets: e.target.value }))
              }
            />
          </div>
          <Button type="submit" className="w-full" size="lg">
            {editingItem ? 'Save Changes' : 'Add to List'}
          </Button>
        </form>
      </Modal>
    </div>
  )
}
