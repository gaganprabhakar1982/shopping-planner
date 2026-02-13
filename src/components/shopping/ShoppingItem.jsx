import { Pencil, Trash2 } from 'lucide-react'
import Checkbox from '../ui/Checkbox'

export default function ShoppingItem({ item, onToggle, onEdit, onDelete }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3.5 transition-all duration-300 fade-in ${
        item.checked ? 'opacity-50' : ''
      }`}
    >
      <Checkbox
        checked={item.checked}
        onChange={() => onToggle(item.id, item.checked)}
      />

      <div className="flex-1 min-w-0">
        <p
          className={`text-[15px] font-medium truncate transition-all duration-200 ${
            item.checked
              ? 'line-through text-gray-400 decoration-gray-300'
              : 'text-gray-900'
          }`}
        >
          {item.name}
        </p>
      </div>

      <div className="flex items-center gap-1.5 flex-shrink-0">
        <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg">
          {item.qty} x {item.packets}
        </span>
      </div>

      {!item.checked && (
        <div className="flex items-center gap-0.5 flex-shrink-0 ml-1">
          <button
            onClick={() => onEdit(item)}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors active:scale-90"
          >
            <Pencil className="w-4 h-4 text-gray-400" />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="p-2 rounded-xl hover:bg-red-50 transition-colors active:scale-90"
          >
            <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
          </button>
        </div>
      )}
    </div>
  )
}
