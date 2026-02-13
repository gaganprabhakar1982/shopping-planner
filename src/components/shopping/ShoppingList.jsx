import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
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
      <div className="flex flex-col items-center justify-center py-20 px-8">
        <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-4 text-3xl empty-icon">
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
    <div className="px-6 pb-8">
      {/* Active items grouped by category - CARD BASED */}
      {Object.entries(grouped).map(([category, items], idx) => (
        <section 
          key={category} 
          className="mb-6 slide-up" 
          style={{ animationDelay: `${idx * 0.1}s` }}
        >
          {/* Category Card Container */}
          <div className="bg-white rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.04)] border border-[#E5E7EB] overflow-hidden">
            {/* Category Header - Inside the card */}
            <div className="flex items-center px-4 py-3 border-b border-[#E5E7EB]">
              <div className="w-7 h-7 bg-orange-50 rounded-lg flex items-center justify-center text-sm mr-2.5 flex-shrink-0">
                {categoryEmojis[category] || '📦'}
              </div>
              <span className="text-sm font-semibold text-[#1A1D21] tracking-tight">
                {category}
              </span>
              <span className="ml-auto text-xs font-medium text-gray-400 bg-[#F4F6F8] px-2.5 py-1 rounded-full">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            
            {/* Items inside the card */}
            {items.map((item, i) => (
              <div 
                key={item.id} 
                className={i < items.length - 1 ? 'border-b border-[#E5E7EB]' : ''}
              >
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

      {/* Completed section - Gray card container */}
      {completedItems.length > 0 && (
        <section className="mt-8 slide-up">
          {/* Completed Header */}
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="flex items-center gap-2 mb-3 px-1 w-full"
          >
            <span className="text-[13px] font-semibold text-emerald-500 uppercase tracking-[0.05em]">
              Completed
            </span>
            <span className="text-xs font-semibold text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-full">
              {completedItems.length}
            </span>
            <div className="ml-auto">
              {showCompleted ? (
                <ChevronUp className="w-4 h-4 text-emerald-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-emerald-400" />
              )}
            </div>
          </button>
          
          {/* Completed Items - Gray background card */}
          {showCompleted && (
            <div className="bg-[#F4F6F8] rounded-2xl overflow-hidden">
              {completedItems.map((item, i) => (
                <div 
                  key={item.id} 
                  className={i < completedItems.length - 1 ? 'border-b border-[#E5E7EB]' : ''}
                >
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
