import { Check, Plus } from 'lucide-react'

export default function MasterItem({ item, isInList, onAdd }) {
  return (
    <div className="flex items-center px-4 py-3.5 gap-3 transition-colors hover:bg-white">
      <span
        className={`flex-1 text-[14px] font-medium ${
          isInList ? 'text-emerald-600' : 'text-slate-700'
        }`}
      >
        {item.name}
      </span>

      {/* Add/Added Toggle Button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          if (!isInList) onAdd(item)
        }}
        disabled={isInList}
        className={`
          w-8 h-8
          rounded-xl
          flex items-center justify-center
          transition-all duration-200
          flex-shrink-0
          active:scale-90
          ${isInList
            ? 'bg-emerald-500 text-white cursor-default shadow-sm'
            : 'border-2 border-slate-200 bg-white text-slate-400 hover:border-teal-400 hover:bg-teal-50 hover:text-teal-500'
          }
        `}
      >
        {isInList ? (
          <Check className="w-3.5 h-3.5" strokeWidth={3} />
        ) : (
          <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
        )}
      </button>
    </div>
  )
}
