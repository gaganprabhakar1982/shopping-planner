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

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          {expanded ? (
            <ChevronDown className="w-4 h-4 text-orange-500" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-400" />
          )}
          <span className="text-sm font-semibold text-gray-800">{category}</span>
        </div>
        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
          {items.length}
        </span>
      </button>

      {expanded && (
        <div className="bg-white">
          {items.map((item) => (
            <MasterItem
              key={item.id}
              item={item}
              isInList={shoppingListNames.has(item.name.toLowerCase())}
              onAdd={onAddToList}
            />
          ))}
          <button
            onClick={() => onAddCustom(category)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm text-orange-500 hover:bg-orange-50 w-full transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add custom item
          </button>
        </div>
      )}
    </div>
  )
}
