import { useState } from 'react'
import { ChevronDown, Plus } from 'lucide-react'
import MasterItem from './MasterItem'
import { categoryEmojis, categoryPreviews } from '../../data/defaultItems'

export default function CategorySection({
  category,
  items,
  shoppingListNames,
  onAddToList,
  onAddCustom,
  onEditItem,
}) {
  const [expanded, setExpanded] = useState(false)
  const addedCount = items.filter(i => shoppingListNames.has(i.name.toLowerCase())).length

  return (
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
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '14px 16px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        {/* Emoji Icon */}
        <div
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: 40,
            height: 40,
            background: '#FFF7ED',
            borderRadius: 12,
            fontSize: 20,
            marginRight: 14,
          }}
        >
          {categoryEmojis[category] || '📦'}
        </div>

        {/* Name + Preview */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1D21', marginBottom: 2 }}>
            {category}
          </div>
          <div style={{ fontSize: 12, color: '#9CA3AF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {categoryPreviews[category] || 'Items...'}
          </div>
        </div>

        {/* Meta: added badge + count + chevron */}
        <div className="flex items-center" style={{ gap: 10, marginLeft: 8 }}>
          {addedCount > 0 && (
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: '#10B981',
                background: '#ECFDF5',
                padding: '4px 10px',
                borderRadius: 999,
              }}
            >
              {addedCount} added
            </span>
          )}
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: '#9CA3AF',
              background: '#F3F4F6',
              padding: '4px 10px',
              borderRadius: 999,
            }}
          >
            {items.length}
          </span>
          <ChevronDown
            style={{
              width: 20,
              height: 20,
              color: '#9CA3AF',
              transition: 'transform 0.3s',
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </div>
      </button>

      {/* Expanded Items */}
      {expanded && (
        <div style={{ borderTop: '1px solid #E5E7EB', background: '#FAFBFC' }}>
          {items.map((item, i) => (
            <div
              key={item.id}
              style={i < items.length - 1 ? { borderBottom: '1px solid #E5E7EB' } : {}}
            >
              <MasterItem
                item={item}
                isInList={shoppingListNames.has(item.name.toLowerCase())}
                onAdd={onAddToList}
                onEdit={onEditItem}
              />
            </div>
          ))}

          {/* Add Custom Item Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onAddCustom(category)
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '14px 16px',
              fontSize: 14,
              fontWeight: 500,
              color: '#F97316',
              background: 'none',
              border: 'none',
              borderTop: '1px solid #E5E7EB',
              width: '100%',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <Plus style={{ width: 16, height: 16 }} />
            Add custom item
          </button>
        </div>
      )}
    </div>
  )
}
