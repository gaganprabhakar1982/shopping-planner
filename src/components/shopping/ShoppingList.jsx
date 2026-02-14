import { useState } from 'react'
import { ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react'
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
        <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-amber-50 rounded-[20px] flex items-center justify-center mb-5 text-4xl empty-icon shadow-soft">
          🛒
        </div>
        <p className="text-lg font-bold text-slate-800 mb-1.5">No items yet</p>
        <p className="text-sm text-slate-400 text-center leading-relaxed max-w-[240px]">
          Tap + to add items or browse the Master List
        </p>
      </div>
    )
  }

  return (
    <div className="px-5 pb-8">
      {/* Active items grouped by category */}
      {Object.entries(grouped).map(([category, items], idx) => (
        <section
          key={category}
          className="mb-4 slide-up"
          style={{ animationDelay: `${idx * 0.08}s` }}
        >
          <div className="bg-white rounded-[18px] shadow-soft border border-slate-100 overflow-hidden">
            {/* Category Header */}
            <div className="flex items-center px-4 py-3 bg-gradient-to-r from-slate-50 to-white">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl flex items-center justify-center text-[15px] mr-3 flex-shrink-0">
                {categoryEmojis[category] || '📦'}
              </div>
              <span className="text-[14px] font-bold text-slate-800 tracking-tight">
                {category}
              </span>
              <span className="ml-auto text-[11px] font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">
                {items.length}
              </span>
            </div>

            {/* Items */}
            {items.map((item, i) => (
              <div
                key={item.id}
                className={i < items.length - 1 ? 'border-b border-slate-100' : ''}
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

      {/* Completed section */}
      {completedItems.length > 0 && (
        <section className="mt-6 slide-up">
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="flex items-center gap-2.5 mb-3 px-1 w-full"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-500" strokeWidth={2.5} />
            <span className="text-[13px] font-bold text-emerald-600 uppercase tracking-[0.06em]">
              Completed
            </span>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
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

          {showCompleted && (
            <div className="bg-slate-50/80 rounded-[18px] overflow-hidden border border-slate-100">
              {completedItems.map((item, i) => (
                <div
                  key={item.id}
                  className={i < completedItems.length - 1 ? 'border-b border-slate-100' : ''}
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
