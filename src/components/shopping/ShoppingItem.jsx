import { Minus, Plus } from 'lucide-react'
import Checkbox from '../ui/Checkbox'

export default function ShoppingItem({ item, onToggle, onEdit, onDelete, onUpdateQty }) {
  return (
    <div
      className={`
        flex items-center
        px-4 py-3.5
        gap-3.5
        transition-all duration-200
        cursor-pointer
        hover:bg-slate-50/50
        active:scale-[0.995]
      `}
      onClick={() => onToggle(item.id, item.checked)}
    >
      {/* Checkbox */}
      <Checkbox
        checked={item.checked}
        onChange={(e) => {
          e.stopPropagation()
          onToggle(item.id, item.checked)
        }}
      />

      {/* Item Info */}
      <div className="flex-1 min-w-0">
        <p
          className={`
            text-[15px] font-medium
            transition-all duration-200
            ${item.checked
              ? 'line-through text-slate-400'
              : 'text-slate-800'
            }
          `}
        >
          {item.name}
        </p>
        <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
          {item.packets > 1
            ? `${item.qty} × ${item.packets} packets`
            : item.qty === 1
              ? '1 pack'
              : `${item.qty} packs`
          }
        </p>
      </div>

      {/* Quantity Controls */}
      <div
        className={`
          flex items-center gap-1.5
          px-2 py-1.5
          rounded-xl
          transition-all duration-200
          ${item.checked
            ? 'bg-slate-100/60'
            : 'bg-slate-50'
          }
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => onUpdateQty(item.id, Math.max(1, item.qty - 1))}
          disabled={item.qty <= 1}
          className={`
            w-[26px] h-[26px]
            rounded-lg
            flex items-center justify-center
            transition-all duration-150
            active:scale-90
            ${item.qty <= 1
              ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
              : 'bg-white text-slate-500 shadow-sm hover:bg-orange-500 hover:text-white hover:shadow-md'
            }
          `}
        >
          <Minus className="w-3 h-3" strokeWidth={2.5} />
        </button>

        <span className={`
          text-[13px] font-bold
          min-w-[22px]
          text-center
          tabular-nums
          ${item.checked ? 'text-slate-400' : 'text-slate-700'}
        `}>
          {item.qty}
        </span>

        <button
          onClick={() => onUpdateQty(item.id, item.qty + 1)}
          className="
            w-[26px] h-[26px]
            rounded-lg
            bg-white
            flex items-center justify-center
            text-slate-500
            shadow-sm
            hover:bg-orange-500 hover:text-white hover:shadow-md
            transition-all duration-150
            active:scale-90
          "
        >
          <Plus className="w-3 h-3" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  )
}
