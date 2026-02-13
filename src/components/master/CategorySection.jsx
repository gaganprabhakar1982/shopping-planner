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
    <div className="bg-white rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.04)] border border-[#E5E7EB] overflow-hidden slide-up">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center px-4 py-4 hover:bg-[#FAFBFC] transition-colors"
      >
        {/* Emoji Icon */}
        <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-xl mr-3.5 flex-shrink-0">
          {categoryEmojis[category] || '📦'}
        </div>

        {/* Name + Preview */}
        <div className="flex-1 min-w-0 text-left">
          <div className="text-[15px] font-semibold text-[#1A1D21] mb-0.5">{category}</div>
          <div className="text-xs text-gray-400 truncate">
            {categoryPreviews[category] || 'Items...'}
          </div>
        </div>

        {/* Meta: added badge + count + chevron */}
        <div className="flex items-center gap-2.5 ml-2">
          {addedCount > 0 && (
            <span className="text-[11px] font-semibold text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-full">
              {addedCount} added
            </span>
          )}
          <span className="text-[13px] font-semibold text-gray-400 bg-[#F4F6F8] px-2.5 py-1 rounded-full">
            {items.length}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
              expanded ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {expanded && (
        <div className="border-t border-[#E5E7EB] bg-[#FAFBFC]">
          {items.map((item, i) => (
            <div
              key={item.id}
              className={i < items.length - 1 ? 'border-b border-[#E5E7EB]' : ''}
            >
              <MasterItem
                item={item}
                isInList={shoppingListNames.has(item.name.toLowerCase())}
                onAdd={onAddToList}
              />
            </div>
          ))}
          <button
            onClick={(e) => { e.stopPropagation(); onAddCustom(category) }}
            className="flex items-center gap-2 px-4 py-3.5 text-sm font-medium text-orange-500 hover:bg-orange-50 w-full transition-colors border-t border-[#E5E7EB]"
          >
            <Plus className="w-4 h-4" />
            Add custom item
          </button>
        </div>
      )}
    </div>
  )
}
