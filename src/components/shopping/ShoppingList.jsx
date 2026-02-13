import { useState } from 'react'
import { ChevronDown, ChevronUp, ShoppingBag } from 'lucide-react'
import ShoppingItem from './ShoppingItem'
import { categoryEmojis } from '../../data/defaultItems'

export default function ShoppingList({
  activeItems,
  completedItems,
  onToggle,
  onEdit,
  onDelete,
  onUpdateQty,
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
        <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-4 text-3xl">
          🛒
        </div>
        <p className="text-base font-semibold text-[#1A1D21] mb-1">No items yet</p>
        <p className="text-sm text-gray-400 text-center leading-relaxed">
          Tap + to add items or browse the Master List
        </p>
      </div>
    )
  }

  return (
    <div className="px-5 pb-8">
      {/* Active items grouped by category */}
      {Object.entries(grouped).map(([category, items], idx) => (
        <section key={category} className="mb-6 slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-orange-50 rounded-lg flex items-center justify-center text-sm">
                {categoryEmojis[category] || '📦'}
              </div>
              <span className="text-sm font-semibold text-[#1A1D21] tracking-tight">
                {category}
              </span>
            </div>
            <span className="text-xs font-medium text-gray-400 bg-[#F4F6F8] px-2.5 py-1 rounded-full">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          <div className="bg-white rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.04)] border border-[#E5E7EB] overflow-hidden">
            {items.map((item, i) => (
              <div key={item.id} className={i < items.length - 1 ? 'border-b border-[#E5E7EB]' : ''}>
                <ShoppingItem
                  item={item}
                  onToggle={onToggle}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onUpdateQty={onUpdateQty}
                />
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Completed section */}
      {completedItems.length > 0 && (
        <section className="mt-8 slide-up">
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="flex items-center gap-2 mb-3 px-1"
          >
            <span className="text-[13px] font-semibold text-emerald-500 uppercase tracking-wide">
              Completed
            </span>
            <span className="text-xs font-semibold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">
              {completedItems.length}
            </span>
            {showCompleted ? (
              <ChevronUp className="w-4 h-4 text-emerald-400 ml-auto" />
            ) : (
              <ChevronDown className="w-4 h-4 text-emerald-400 ml-auto" />
            )}
          </button>
          {showCompleted && (
            <div className="bg-[#F4F6F8] rounded-2xl overflow-hidden">
              {completedItems.map((item, i) => (
                <div key={item.id} className={i < completedItems.length - 1 ? 'border-b border-[#E5E7EB]' : ''}>
                  <ShoppingItem
                    item={item}
                    onToggle={onToggle}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onUpdateQty={onUpdateQty}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  )
}
