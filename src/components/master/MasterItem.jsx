import { Check, Plus, Edit3 } from 'lucide-react'

export default function MasterItem({ item, isInList, onAdd, onEdit }) {
  return (
    <div
      className="flex items-center"
      style={{ padding: '12px 16px', gap: 12 }}
    >
      <div
        onClick={() => onEdit(item)}
        style={{ flex: 1, minWidth: 0, cursor: 'pointer' }}
      >
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

      {/* Edit Button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onEdit(item)
        }}
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          background: '#F3F4F6',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.15s',
        }}
      >
        <Edit3 style={{ width: 14, height: 14, color: '#6B7280' }} />
      </button>

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
