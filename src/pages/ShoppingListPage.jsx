import { useState } from 'react'
import { Plus } from 'lucide-react'
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
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 pt-12 pb-6">
        <h1 className="text-2xl font-bold">{monthYear}</h1>
        <p className="text-orange-100 text-sm mt-1">
          {totalItems === 0
            ? 'No items in your list'
            : `${completedItems.length}/${totalItems} items bought`}
        </p>
        {totalItems > 0 && (
          <div className="mt-3 h-2 bg-orange-400/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{
                width: `${(completedItems.length / totalItems) * 100}%`,
              }}
            />
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
        className="fixed bottom-20 right-4 w-14 h-14 bg-orange-500 text-white rounded-full shadow-lg shadow-orange-500/30 flex items-center justify-center hover:bg-orange-600 active:scale-95 transition-all z-30"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title={editingItem ? 'Edit Item' : 'Add Item'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData((f) => ({ ...f, category: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
