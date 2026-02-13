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
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
          <ShoppingBag className="w-8 h-8 text-orange-500" />
        </div>
        <p className="text-gray-500 text-center">
          No items yet. Tap + to add items or browse the Master List.
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Active items grouped by category */}
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <div className="px-4 py-2 bg-gray-50">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {category}
            </span>
          </div>
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
      ))}

      {/* Completed section */}
      {completedItems.length > 0 && (
        <div className="mt-2">
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <span className="text-sm font-medium text-gray-500">
              Completed ({completedItems.length})
            </span>
            {showCompleted ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </button>
          {showCompleted &&
            completedItems.map((item) => (
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
  )
}
