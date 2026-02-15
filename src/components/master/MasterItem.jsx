import { Check, Plus } from 'lucide-react'

export default function MasterItem({ item, isInList, onAdd }) {
  return (
    <div
      className="flex items-center"
      style={{ padding: '12px 16px', gap: 12 }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <span
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: isInList ? '#10B981' : '#1A1D21',
          }}
        >
          {item.name}
        </span>
        <span
          style={{
            fontSize: 12,
            color: '#9CA3AF',
            marginLeft: 6,
          }}
        >
          {item.defaultQty} {item.defaultUnit || 'pcs'}
        </span>
      </div>

      {/* Add/Added Toggle Button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          if (!isInList) onAdd(item)
        }}
        disabled={isInList}
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          border: isInList ? '2px solid #10B981' : '2px solid #E5E7EB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          background: isInList ? '#10B981' : '#FFFFFF',
          color: isInList ? '#FFFFFF' : '#9CA3AF',
          cursor: isInList ? 'default' : 'pointer',
          transition: 'all 0.2s',
        }}
      >
        {isInList ? (
          <Check style={{ width: 16, height: 16 }} strokeWidth={2.5} />
        ) : (
          <Plus style={{ width: 16, height: 16 }} strokeWidth={2.5} />
        )}
      </button>
    </div>
  )
}
