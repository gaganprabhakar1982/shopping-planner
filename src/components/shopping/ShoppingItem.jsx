import { Minus, Plus, Trash2 } from 'lucide-react'
import Checkbox from '../ui/Checkbox'

function getStep(unit) {
  switch (unit) {
    case 'g': return 50
    case 'kg': return 0.25
    case 'L': return 0.25
    case 'ml': return 50
    default: return 1
  }
}

function getMinQty(unit) {
  switch (unit) {
    case 'g': return 50
    case 'kg': return 0.25
    case 'L': return 0.25
    case 'ml': return 50
    default: return 1
  }
}

function formatQty(qty, unit) {
  if (unit === 'kg' || unit === 'L') {
    return qty % 1 === 0 ? qty : qty.toFixed(2).replace(/0$/, '')
  }
  return qty
}

export default function ShoppingItem({ item, onToggle, onEdit, onDelete, onUpdateQty }) {
  const unit = item.unit || 'pcs'
  const step = getStep(unit)
  const minQty = getMinQty(unit)
  const canDecrement = item.qty > minQty
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
          {formatQty(item.qty, unit)} {unit}
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
          onClick={() => onUpdateQty(item.id, Math.max(minQty, parseFloat((item.qty - step).toFixed(2))))}
          disabled={!canDecrement}
          style={{
            width: 26,
            height: 26,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: !canDecrement ? 'not-allowed' : 'pointer',
            background: !canDecrement ? '#F3F4F6' : '#FFFFFF',
            color: !canDecrement ? '#D1D5DB' : '#6B7280',
            boxShadow: !canDecrement ? 'none' : '0 1px 3px rgba(0,0,0,0.1)',
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
          {formatQty(item.qty, unit)}
        </span>

        <button
          onClick={() => onUpdateQty(item.id, parseFloat((item.qty + step).toFixed(2)))}
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
