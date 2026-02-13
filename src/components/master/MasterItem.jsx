import { Check, Plus } from 'lucide-react'

export default function MasterItem({ item, isInList, onAdd }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
        <p className="text-xs text-gray-400 mt-0.5">
          Qty: {item.defaultQty} | Pkt: {item.defaultPackets}
        </p>
      </div>
      <button
        onClick={() => onAdd(item)}
        disabled={isInList}
        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 flex-shrink-0 active:scale-90 ${
          isInList
            ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/20'
            : 'bg-gray-100 text-gray-500 hover:bg-orange-50 hover:text-orange-500'
        }`}
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
