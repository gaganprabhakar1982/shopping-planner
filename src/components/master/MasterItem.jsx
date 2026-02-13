import { Check, Plus } from 'lucide-react'

export default function MasterItem({ item, isInList, onAdd }) {
  return (
    <div className="flex items-center px-4 py-3.5 gap-3 transition-colors hover:bg-white">
      <span
        className={`flex-1 text-sm font-medium ${
          isInList ? 'text-emerald-500' : 'text-[#1A1D21]'
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
          rounded-lg 
          border-2 
          flex items-center justify-center 
          transition-all duration-200 
          flex-shrink-0 
          active:scale-90
          ${isInList
            ? 'bg-emerald-500 border-emerald-500 text-white cursor-default'
            : 'border-[#E5E7EB] bg-white text-gray-400 hover:border-orange-400 hover:bg-orange-50 hover:text-orange-500'
          }
        `}
      >
        {isInList ? (
          <Check className="w-4 h-4" strokeWidth={2.5} />
        ) : (
          <Plus className="w-4 h-4" strokeWidth={2.5} />
        )}
      </button>
    </div>
  )
}
