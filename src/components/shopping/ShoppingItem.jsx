import { Minus, Plus, Trash2 } from 'lucide-react'
import Checkbox from '../ui/Checkbox'

export default function ShoppingItem({ item, onToggle, onEdit, onDelete, onUpdateQty }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '14px 16px',
        gap: 14,
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
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
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: 15,
            fontWeight: 500,
            color: item.checked ? '#9CA3AF' : '#1A1D21',
            textDecoration: item.checked ? 'line-through' : 'none',
            transition: 'all 0.2s',
          }}
        >
          {item.name}
        </p>
        <p style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>
          {item.qty} {item.unit || 'pcs'}
        </p>
      </div>

      {/* Delete Button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onDelete(item.id)
        }}
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          background: '#FEF2F2',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.15s',
        }}
      >
        <Trash2 style={{ width: 15, height: 15, color: '#EF4444' }} strokeWidth={2} />
      </button>

      {/* Quantity Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 10px',
          borderRadius: 999,
          background: item.checked ? '#F3F4F6' : '#F3F4F6',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => onUpdateQty(item.id, Math.max(1, item.qty - 1))}
          disabled={item.qty <= 1}
          style={{
            width: 26,
            height: 26,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: item.qty <= 1 ? 'not-allowed' : 'pointer',
            background: item.qty <= 1 ? '#F3F4F6' : '#FFFFFF',
            color: item.qty <= 1 ? '#D1D5DB' : '#6B7280',
            boxShadow: item.qty <= 1 ? 'none' : '0 1px 3px rgba(0,0,0,0.1)',
            transition: 'all 0.15s',
          }}
        >
          <Minus style={{ width: 14, height: 14 }} strokeWidth={2} />
        </button>

        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            minWidth: 20,
            textAlign: 'center',
            color: item.checked ? '#9CA3AF' : '#1A1D21',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {item.qty}
        </span>

        <button
          onClick={() => onUpdateQty(item.id, item.qty + 1)}
          style={{
            width: 26,
            height: 26,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer',
            background: '#FFFFFF',
            color: '#6B7280',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            transition: 'all 0.15s',
          }}
        >
          <Plus style={{ width: 14, height: 14 }} strokeWidth={2} />
        </button>
      </div>
    </div>
  )
}
