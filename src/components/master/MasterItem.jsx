import { Check, Plus } from 'lucide-react'

export default function MasterItem({ item, isInList, onAdd }) {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 border-b border-gray-50">
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900 truncate">{item.name}</p>
        <p className="text-xs text-gray-400">
          Qty: {item.defaultQty} | Packets: {item.defaultPackets}
        </p>
      </div>
      <button
        onClick={() => onAdd(item)}
        disabled={isInList}
        className={`p-1.5 rounded-full transition-colors flex-shrink-0 ${
          isInList
            ? 'bg-orange-100 text-orange-500'
            : 'bg-gray-100 text-gray-500 hover:bg-orange-100 hover:text-orange-500'
        }`}
      >
        {isInList ? (
          <Check className="w-4 h-4" />
        ) : (
          <Plus className="w-4 h-4" />
        )}
      </button>
    </div>
  )
}
