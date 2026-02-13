import { useState } from 'react'
import { Plus, ShoppingCart } from 'lucide-react'
import { useShoppingList } from '../hooks/useShoppingList'
import ShoppingList from '../components/shopping/ShoppingList'
import Modal from '../components/ui/Modal'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { categories } from '../data/defaultItems'

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

  if (loading) {
    return <LoadingSpinner className="mt-20" size="lg" />
  }

  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <div className="bg-white px-5 pt-14 pb-5 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{monthYear}</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {totalItems === 0
                ? 'Your shopping list is empty'
                : `${completedItems.length} of ${totalItems} items done`}
            </p>
          </div>
          <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center">
            <ShoppingCart className="w-6 h-6 text-orange-500" />
          </div>
        </div>

        {/* Progress bar */}
        {totalItems > 0 && (
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs font-bold text-orange-500 tabular-nums">{progress}%</span>
          </div>
        )}
      </div>

      {/* List */}
      <ShoppingList
        activeItems={activeItems}
        completedItems={completedItems}
        onToggle={toggleItem}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      {/* FAB */}
      <button
        onClick={openAddModal}
        className="fixed bottom-24 right-5 w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-2xl shadow-lg shadow-orange-500/30 flex items-center justify-center hover:shadow-xl hover:shadow-orange-500/40 active:scale-90 transition-all duration-200 z-30"
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
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-400 focus:bg-white transition-all appearance-none"
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
