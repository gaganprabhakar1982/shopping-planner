import { Minus, Plus } from 'lucide-react'
import Checkbox from '../ui/Checkbox'

export default function ShoppingItem({ item, onToggle, onEdit, onDelete, onUpdateQty }) {
  return (
    <div
      className={`flex items-center px-4 py-4 gap-3.5 transition-all duration-200 cursor-pointer hover:bg-[#FAFBFC] active:scale-[0.99] ${
        item.checked ? '' : ''
      }`}
      onClick={() => onToggle(item.id, item.checked)}
    >
      <Checkbox
        checked={item.checked}
        onChange={(e) => { e.stopPropagation(); onToggle(item.id, item.checked) }}
      />

      <div className="flex-1 min-w-0">
        <p
          className={`text-[15px] font-medium transition-all duration-200 ${
            item.checked
              ? 'line-through text-gray-400'
              : 'text-[#1A1D21]'
          }`}
        >
          {item.name}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">
          {item.packets > 1 ? `${item.qty} x ${item.packets} packets` : `${item.qty} pack`}
        </p>
      </div>

      <div
        className="flex items-center gap-2 bg-[#FAFBFC] px-2.5 py-1.5 rounded-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => onUpdateQty(item.id, Math.max(1, item.qty - 1))}
          className="w-[26px] h-[26px] rounded-full bg-white flex items-center justify-center text-gray-500 shadow-sm hover:bg-orange-500 hover:text-white transition-all active:scale-90"
        >
          <Minus className="w-3.5 h-3.5" strokeWidth={2} />
        </button>
        <span className="text-sm font-semibold text-[#1A1D21] min-w-[20px] text-center tabular-nums">
          {item.qty}
        </span>
        <button
          onClick={() => onUpdateQty(item.id, item.qty + 1)}
          className="w-[26px] h-[26px] rounded-full bg-white flex items-center justify-center text-gray-500 shadow-sm hover:bg-orange-500 hover:text-white transition-all active:scale-90"
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={2} />
        </button>
      </div>
    </div>
  )
}
