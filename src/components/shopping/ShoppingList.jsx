import { useState } from 'react'
import { ChevronDown, ChevronUp, ShoppingBag } from 'lucide-react'
import ShoppingItem from './ShoppingItem'

export default function ShoppingList({
  activeItems,
  completedItems,
  onToggle,
  onEdit,
  onDelete,
}) {
  const [showCompleted, setShowCompleted] = useState(true)

  // Group active items by category
  const grouped = activeItems.reduce((acc, item) => {
    const cat = item.category || 'Other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(item)
    return acc
  }, {})

  if (activeItems.length === 0 && completedItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6">
        <div className="w-20 h-20 bg-orange-50 rounded-3xl flex items-center justify-center mb-5">
          <ShoppingBag className="w-10 h-10 text-orange-400" />
        </div>
        <p className="text-lg font-semibold text-gray-900 mb-1">No items yet</p>
        <p className="text-sm text-gray-400 text-center">
          Tap + to add items or browse the Master List
        </p>
      </div>
    )
  }

  return (
    <div className="px-4 space-y-3 mt-4">
      {/* Active items grouped by category */}
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-2.5">
            <span className="text-[11px] font-bold text-orange-500 uppercase tracking-widest">
              {category}
            </span>
          </div>
          <div className="divide-y divide-gray-100">
            {items.map((item) => (
              <ShoppingItem
                key={item.id}
                item={item}
                onToggle={onToggle}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Completed section */}
      {completedItems.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition-colors"
          >
            <span className="text-sm font-semibold text-gray-400">
              Completed ({completedItems.length})
            </span>
            {showCompleted ? (
              <ChevronUp className="w-4 h-4 text-gray-300" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-300" />
            )}
          </button>
          {showCompleted && (
            <div className="divide-y divide-gray-50">
              {completedItems.map((item) => (
                <ShoppingItem
                  key={item.id}
                  item={item}
                  onToggle={onToggle}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
