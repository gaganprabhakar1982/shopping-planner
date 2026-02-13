import { useState } from 'react'
import { Plus, ChevronDown } from 'lucide-react'
import { useShoppingList } from '../hooks/useShoppingList'
import ShoppingList from '../components/shopping/ShoppingList'
import Modal from '../components/ui/Modal'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { categories } from '../data/defaultItems'

function ProgressRing({ progress, size = 52, strokeWidth = 4 }) {
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
          className="progress-ring-fill"
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
    <div className="relative min-h-screen bg-[#FAFBFC]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#FAFBFC] px-5 pt-4 pb-5">
        {/* Top row: Month selector + Progress ring */}
        <div className="flex items-center justify-between mb-5">
          {/* Month Selector - Pill button with shadow */}
          <button className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.04)] border border-[#E5E7EB] hover:shadow-md transition-shadow">
            <h1 className="text-[15px] font-semibold text-[#1A1D21] tracking-tight">
              {monthYear}
            </h1>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
          
          {/* Progress Ring */}
          <ProgressRing progress={progress} />
        </div>

        {/* Stats Pills */}
        <div className="flex gap-3">
          <div className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.04)] border border-[#E5E7EB]">
            <span className="text-[13px] font-bold text-orange-500">{activeItems.length}</span>
            <span className="text-[13px] font-medium text-gray-500">pending</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.04)] border border-[#E5E7EB]">
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
        className="fixed bottom-24 right-5 w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-700 text-white rounded-2xl shadow-[0_8px_24px_rgba(249,115,22,0.4)] flex items-center justify-center hover:scale-105 hover:shadow-[0_12px_32px_rgba(249,115,22,0.5)] active:scale-95 transition-all duration-200 z-30"
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
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData((f) => ({ ...f, category: e.target.value }))
              }
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[#1A1D21] text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 focus:bg-white transition-all"
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
