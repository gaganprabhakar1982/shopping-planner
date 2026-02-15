import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import ShoppingItem from './ShoppingItem'
import { categoryEmojis } from '../../data/defaultItems'

export default function ShoppingList({
  activeItems,
  completedItems,
  onToggle,
  onEdit,
  onDelete,
  onUpdateQty,
}) {
  const [showCompleted, setShowCompleted] = useState(true)

  // Group active items by category
  const grouped = activeItems.reduce((acc, item) => {
    const cat = item.category || 'Other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(item)
    return acc
  }, {})

  if (activeItems.length === 0 && completedItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center" style={{ padding: '80px 32px' }}>
        <div
          className="flex items-center justify-center text-3xl"
          style={{ width: 64, height: 64, background: '#FFF7ED', borderRadius: 16, marginBottom: 16 }}
        >
          🛒
        </div>
        <p className="text-base font-semibold mb-1" style={{ color: '#1A1D21' }}>No items yet</p>
        <p className="text-sm text-gray-400 text-center leading-relaxed">
          Tap + to add items or browse the Master List
        </p>
      </div>
    )
  }

  return (
    <div style={{ padding: '0 20px 160px' }}>
      {/* Active items grouped by category */}
      {Object.entries(grouped).map(([category, items], idx) => (
        <section key={category} style={{ marginBottom: 20 }}>
          {/* Category Card */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 16,
              border: '1px solid #D1D5DB',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              overflow: 'hidden',
            }}
          >
            {/* Category Header */}
            <div
              className="flex items-center"
              style={{ padding: '12px 16px', borderBottom: '1px solid #E5E7EB' }}
            >
              <div
                className="flex items-center justify-center text-sm flex-shrink-0"
                style={{ width: 28, height: 28, background: '#FFF7ED', borderRadius: 8, marginRight: 10 }}
              >
                {categoryEmojis[category] || '📦'}
              </div>
              <span className="text-sm font-semibold" style={{ color: '#1A1D21' }}>
                {category}
              </span>
              <span
                className="ml-auto text-xs font-medium"
                style={{ color: '#9CA3AF', background: '#F3F4F6', padding: '4px 10px', borderRadius: 999 }}
              >
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            {/* Items */}
            {items.map((item, i) => (
              <div
                key={item.id}
                style={i < items.length - 1 ? { borderBottom: '1px solid #E5E7EB' } : {}}
              >
                <ShoppingItem
                  item={item}
                  onToggle={onToggle}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onUpdateQty={onUpdateQty}
                />
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Completed section */}
      {completedItems.length > 0 && (
        <section style={{ marginTop: 28 }}>
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="flex items-center gap-2 w-full"
            style={{ marginBottom: 12, paddingLeft: 4 }}
          >
            <span
              className="text-[13px] font-semibold uppercase"
              style={{ color: '#10B981', letterSpacing: '0.05em' }}
            >
              Completed
            </span>
            <span
              className="text-xs font-semibold"
              style={{ color: '#10B981', background: '#ECFDF5', padding: '4px 10px', borderRadius: 999 }}
            >
              {completedItems.length}
            </span>
            <div className="ml-auto">
              {showCompleted ? (
                <ChevronUp className="w-4 h-4" style={{ color: '#6EE7B7' }} />
              ) : (
                <ChevronDown className="w-4 h-4" style={{ color: '#6EE7B7' }} />
              )}
            </div>
          </button>

          {showCompleted && (
            <div
              style={{
                background: '#F3F4F6',
                borderRadius: 16,
                border: '1px solid #E5E7EB',
                overflow: 'hidden',
              }}
            >
              {completedItems.map((item, i) => (
                <div
                  key={item.id}
                  style={i < completedItems.length - 1 ? { borderBottom: '1px solid #E5E7EB' } : {}}
                >
                  <ShoppingItem
                    item={item}
                    onToggle={onToggle}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onUpdateQty={onUpdateQty}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  )
}
