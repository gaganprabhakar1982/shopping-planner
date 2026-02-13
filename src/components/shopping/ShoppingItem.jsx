import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import Checkbox from '../ui/Checkbox'

export default function ShoppingItem({ item, onToggle, onEdit, onDelete }) {
  const [swiping, setSwiping] = useState(false)

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 transition-all duration-300 ${
        item.checked ? 'opacity-60' : ''
      } ${swiping ? 'translate-x-[-60px]' : ''}`}
    >
      <Checkbox
        checked={item.checked}
        onChange={() => onToggle(item.id, item.checked)}
      />

      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium truncate transition-all duration-200 ${
            item.checked
              ? 'line-through text-gray-400'
              : 'text-gray-900'
          }`}
        >
          {item.name}
        </p>
        <p className="text-xs text-gray-400">
          {item.category}
        </p>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-500 flex-shrink-0">
        <span className="bg-gray-100 px-2 py-0.5 rounded">
          Qty: {item.qty}
        </span>
        <span className="bg-gray-100 px-2 py-0.5 rounded">
          Pkt: {item.packets}
        </span>
      </div>

      {!item.checked && (
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={() => onEdit(item)}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Pencil className="w-3.5 h-3.5 text-gray-400" />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="p-1.5 rounded-full hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5 text-gray-400 hover:text-red-500" />
          </button>
        </div>
      )}
    </div>
  )
}
