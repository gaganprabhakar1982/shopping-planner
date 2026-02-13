import { useState } from 'react'
import { ChevronDown, ChevronRight, Plus } from 'lucide-react'
import MasterItem from './MasterItem'

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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition-colors active:bg-gray-100"
      >
        <div className="flex items-center gap-3">
          {expanded ? (
            <ChevronDown className="w-4 h-4 text-orange-500" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-400" />
          )}
          <span className="text-sm font-semibold text-gray-800">{category}</span>
        </div>
        <div className="flex items-center gap-2">
          {addedCount > 0 && (
            <span className="text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full">
              {addedCount} added
            </span>
          )}
          <span className="text-xs font-medium text-gray-400 bg-gray-100 w-7 h-7 rounded-full flex items-center justify-center">
            {items.length}
          </span>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-gray-100">
          <div className="divide-y divide-gray-50">
            {items.map((item) => (
              <MasterItem
                key={item.id}
                item={item}
                isInList={shoppingListNames.has(item.name.toLowerCase())}
                onAdd={onAddToList}
              />
            ))}
          </div>
          <button
            onClick={() => onAddCustom(category)}
            className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-orange-500 hover:bg-orange-50 w-full transition-colors border-t border-gray-100"
          >
            <Plus className="w-4 h-4" />
            Add custom item
          </button>
        </div>
      )}
    </div>
  )
}
