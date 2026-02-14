import { useState } from 'react'
import { ChevronDown, Plus } from 'lucide-react'
import MasterItem from './MasterItem'
import { categoryEmojis, categoryPreviews } from '../../data/defaultItems'

export default function CategorySection({
  category,
  items,
  shoppingListNames,
  onAddToList,
  onAddCustom,
}) {
  const [expanded, setExpanded] = useState(false)
  const addedCount = items.filter(i => shoppingListNames.has(i.name.toLowerCase())).length

  return (
    <div className="bg-white rounded-[18px] shadow-soft border border-slate-100 overflow-hidden slide-up">
      {/* Category Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center px-4 py-4 hover:bg-slate-50/50 transition-colors"
      >
        {/* Emoji Icon */}
        <div className="w-11 h-11 bg-gradient-to-br from-orange-100 to-amber-50 rounded-[14px] flex items-center justify-center text-xl mr-3.5 flex-shrink-0 shadow-sm">
          {categoryEmojis[category] || '📦'}
        </div>

        {/* Name + Preview */}
        <div className="flex-1 min-w-0 text-left">
          <div className="text-[15px] font-bold text-slate-800 mb-0.5">
            {category}
          </div>
          <div className="text-[11px] text-slate-400 truncate font-medium">
            {categoryPreviews[category] || 'Items...'}
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-2 ml-2">
          {addedCount > 0 && (
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
              {addedCount} added
            </span>
          )}
          <span className="text-[12px] font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">
            {items.length}
          </span>
          <ChevronDown
            className={`w-4.5 h-4.5 text-slate-400 transition-transform duration-300 ${
              expanded ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {/* Expanded Items */}
      {expanded && (
        <div className="border-t border-slate-100 bg-slate-50/50">
          {items.map((item, i) => (
            <div
              key={item.id}
              className={i < items.length - 1 ? 'border-b border-slate-100' : ''}
            >
              <MasterItem
                item={item}
                isInList={shoppingListNames.has(item.name.toLowerCase())}
                onAdd={onAddToList}
              />
            </div>
          ))}

          {/* Add Custom Item Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onAddCustom(category)
            }}
            className="flex items-center gap-2 px-4 py-3.5 text-sm font-semibold text-orange-500 hover:bg-orange-50/50 w-full transition-colors border-t border-slate-100"
          >
            <Plus className="w-4 h-4" />
            Add custom item
          </button>
        </div>
      )}
    </div>
  )
}
