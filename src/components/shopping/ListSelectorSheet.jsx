import { useState } from 'react'
import { Plus, Check, Edit3, Trash2, X } from 'lucide-react'

export default function ListSelectorSheet({
  isOpen,
  onClose,
  lists,
  activeListId,
  onSelect,
  onCreate,
  onRename,
  onDelete,
}) {
  const [showCreate, setShowCreate] = useState(false)
  const [newName, setNewName] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editName, setEditName] = useState('')

  if (!isOpen) return null

  function handleCreate() {
    if (!newName.trim()) return
    onCreate(newName.trim())
    setNewName('')
    setShowCreate(false)
  }

  function handleRename(id) {
    if (!editName.trim()) return
    onRename(id, editName.trim())
    setEditingId(null)
    setEditName('')
  }

  function handleDelete(id) {
    onDelete(id)
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50 }} onClick={onClose}>
      {/* Backdrop */}
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)' }} />

      {/* Sheet */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: '#FFFFFF',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          maxHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.15)',
        }}
      >
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px' }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: '#D1D5DB' }} />
        </div>

        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 20px 16px',
          }}
        >
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1A1D21' }}>
            Your Lists
          </h2>
          <button
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              background: '#F3F4F6',
              cursor: 'pointer',
            }}
          >
            <X style={{ width: 16, height: 16, color: '#6B7280' }} />
          </button>
        </div>

        {/* List items */}
        <div style={{ overflowY: 'auto', flex: 1, padding: '0 20px' }}>
          {lists.map((list) => (
            <div
              key={list.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '14px 0',
                borderBottom: '1px solid #F3F4F6',
              }}
            >
              {editingId === list.id ? (
                /* Edit mode */
                <div style={{ flex: 1, display: 'flex', gap: 8 }}>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleRename(list.id)}
                    autoFocus
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      border: '1px solid #E5E7EB',
                      borderRadius: 8,
                      fontSize: 14,
                      outline: 'none',
                    }}
                  />
                  <button
                    onClick={() => handleRename(list.id)}
                    style={{
                      padding: '8px 12px',
                      background: '#10B981',
                      color: '#FFF',
                      border: 'none',
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    style={{
                      padding: '8px 12px',
                      background: '#F3F4F6',
                      color: '#6B7280',
                      border: 'none',
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                /* Normal mode */
                <>
                  <button
                    onClick={() => {
                      onSelect(list.id)
                      onClose()
                    }}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      padding: 0,
                    }}
                  >
                    {activeListId === list.id && (
                      <div
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 6,
                          background: '#10B981',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Check style={{ width: 14, height: 14, color: '#FFF' }} strokeWidth={2.5} />
                      </div>
                    )}
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: activeListId === list.id ? 600 : 500,
                        color: activeListId === list.id ? '#10B981' : '#1A1D21',
                      }}
                    >
                      {list.name}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setEditingId(list.id)
                      setEditName(list.name)
                    }}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: 'none',
                      background: '#F3F4F6',
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                  >
                    <Edit3 style={{ width: 14, height: 14, color: '#6B7280' }} />
                  </button>

                  {lists.length > 1 && (
                    <button
                      onClick={() => handleDelete(list.id)}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 'none',
                        background: '#FEF2F2',
                        cursor: 'pointer',
                        flexShrink: 0,
                      }}
                    >
                      <Trash2 style={{ width: 14, height: 14, color: '#EF4444' }} />
                    </button>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Create new list */}
        <div style={{ padding: '16px 20px 24px', borderTop: '1px solid #F3F4F6' }}>
          {showCreate ? (
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="text"
                placeholder="List name..."
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                autoFocus
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  border: '1px solid #E5E7EB',
                  borderRadius: 12,
                  fontSize: 14,
                  outline: 'none',
                }}
              />
              <button
                onClick={handleCreate}
                style={{
                  padding: '12px 20px',
                  background: 'linear-gradient(135deg, #F97316, #C2410C)',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: 12,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Create
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowCreate(true)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '14px 0',
                background: '#F3F4F6',
                border: 'none',
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 600,
                color: '#6B7280',
                cursor: 'pointer',
              }}
            >
              <Plus style={{ width: 18, height: 18 }} strokeWidth={2} />
              Create New List
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
