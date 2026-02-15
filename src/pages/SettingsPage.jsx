import { useState } from 'react'
import {
  LogOut,
  Trash2,
  RotateCcw,
  Calendar,
  Check,
  BarChart3,
  List,
  ChevronRight,
  Edit3,
  Upload,
  Moon,
  Bell,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useListContext } from '../context/ListContext'
import { useShoppingList } from '../hooks/useShoppingList'
import { useMasterList } from '../hooks/useMasterList'

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const { activeListId, lists, createList } = useListContext()
  const { clearCompleted, clearAll, completedItems, activeItems } = useShoppingList(activeListId)
  const { items: masterItems, resetToDefaults } = useMasterList()
  const [confirmAction, setConfirmAction] = useState(null)
  const [loading, setLoading] = useState(false)

  const activeList = lists.find((l) => l.id === activeListId)
  const listName = activeList ? activeList.name : 'None'

  async function handleAction() {
    setLoading(true)
    try {
      switch (confirmAction) {
        case 'clearCompleted':
          await clearCompleted()
          break
        case 'createNewList': {
          const now = new Date()
          const name = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
          await createList(name)
          break
        }
        case 'resetMaster':
          await resetToDefaults()
          break
        case 'logout':
          await logout()
          break
      }
    } catch (err) {
      console.error('Settings action error:', err)
    } finally {
      setLoading(false)
      setConfirmAction(null)
    }
  }

  const confirmMessages = {
    clearCompleted: {
      title: 'Clear Completed?',
      message: `Remove ${completedItems.length} completed items from your list? This cannot be undone.`,
      icon: Trash2,
      iconBg: '#FFF7ED',
      iconColor: '#F97316',
      buttonLabel: 'Clear Items',
    },
    createNewList: {
      title: 'Create New List?',
      message: 'This will create a new shopping list. You can switch between lists at any time.',
      icon: Calendar,
      iconBg: '#FFF7ED',
      iconColor: '#F97316',
      buttonLabel: 'Create',
    },
    resetMaster: {
      title: 'Reset Master List?',
      message: 'This will replace your master list with the default items. Custom items will be lost.',
      icon: RotateCcw,
      iconBg: '#F3E8FF',
      iconColor: '#A855F7',
      buttonLabel: 'Reset',
    },
    logout: {
      title: 'Log Out?',
      message: 'Are you sure you want to sign out of your account?',
      icon: LogOut,
      iconBg: '#FEF2F2',
      iconColor: '#EF4444',
      buttonLabel: 'Log Out',
    },
  }

  const initials = (user?.displayName || 'U').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className="relative min-h-screen" style={{ background: '#F0F1F3' }}>
      {/* Header */}
      <header style={{ padding: '20px 20px 20px', background: '#F0F1F3' }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1A1D21', letterSpacing: '-0.02em', marginBottom: 20 }}>
          Settings
        </h1>

        {/* Profile Card */}
        <div
          className="flex items-center"
          style={{
            background: 'linear-gradient(135deg, #F97316, #C2410C)',
            borderRadius: 20,
            padding: '20px',
            gap: 16,
            boxShadow: '0 8px 24px rgba(249,115,22,0.25)',
          }}
        >
          <div
            className="flex items-center justify-center flex-shrink-0"
            style={{ width: 56, height: 56, background: 'rgba(255,255,255,0.2)', borderRadius: 16 }}
          >
            <span style={{ fontSize: 24, fontWeight: 700, color: '#FFFFFF' }}>{initials}</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 18, fontWeight: 700, color: '#FFFFFF', marginBottom: 2 }}>
              {user?.displayName || 'User'}
            </p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.email}
            </p>
          </div>
          <button
            className="flex items-center justify-center"
            style={{
              width: 40,
              height: 40,
              background: 'rgba(255,255,255,0.2)',
              borderRadius: 12,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <Edit3 style={{ width: 20, height: 20, color: '#FFFFFF' }} />
          </button>
        </div>
      </header>

      {/* Content */}
      <main style={{ padding: '0 20px 128px' }}>
        {/* Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
            marginBottom: 28,
          }}
        >
          <StatCard icon={Calendar} iconBg="#EFF6FF" iconColor="#3B82F6" value={lists.length} label="Lists" />
          <StatCard icon={Check} iconBg="#ECFDF5" iconColor="#10B981" value={completedItems.length} label="Items Bought" />
          <StatCard icon={BarChart3} iconBg="#F3E8FF" iconColor="#A855F7" value={activeItems.length} label="Pending" />
          <StatCard icon={List} iconBg="#FFF7ED" iconColor="#F97316" value={masterItems.length} label="Master Items" />
        </div>

        {/* List Management */}
        <Section title="List Management">
          <MenuItem
            icon={Calendar} iconBg="#F0FDFA" iconColor="#14B8A6"
            title="Create New List" subtitle="Start a new shopping list"
            onClick={() => setConfirmAction('createNewList')}
          />
          <MenuItem
            icon={Trash2} iconBg="#FFF7ED" iconColor="#F97316"
            title="Clear Completed" subtitle={`Remove ${completedItems.length} checked items`}
            onClick={() => setConfirmAction('clearCompleted')}
            disabled={completedItems.length === 0}
            last
          />
        </Section>

        {/* Master List */}
        <Section title="Master List">
          <MenuItem
            icon={RotateCcw} iconBg="#F3E8FF" iconColor="#A855F7"
            title="Reset to Defaults" subtitle="Restore original items"
            onClick={() => setConfirmAction('resetMaster')}
          />
          <MenuItem
            icon={Upload} iconBg="#EFF6FF" iconColor="#3B82F6"
            title="Export List" subtitle="Share as text or PDF"
            last
          />
        </Section>

        {/* Preferences */}
        <Section title="Preferences">
          <MenuItem
            icon={Moon} iconBg="#F0FDFA" iconColor="#14B8A6"
            title="Dark Mode" subtitle="Easier on the eyes"
            toggle
          />
          <MenuItem
            icon={Bell} iconBg="#FFF7ED" iconColor="#F97316"
            title="Reminders" subtitle="Get notified to shop"
            toggle toggleActive
            last
          />
        </Section>

        {/* Account */}
        <Section title="Account">
          <MenuItem
            icon={LogOut} iconBg="#FEF2F2" iconColor="#EF4444"
            title="Log Out" subtitle="Sign out of your account"
            danger
            onClick={() => setConfirmAction('logout')}
            last
          />
        </Section>

        {/* App Version */}
        <div style={{ textAlign: 'center', padding: '20px 0', fontSize: 13, color: '#9CA3AF' }}>
          <span style={{ fontWeight: 600, color: '#6B7280' }}>Shopping Planner</span> v1.0.0
        </div>
      </main>

      {/* Confirmation Modal */}
      {confirmAction && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
          onClick={() => setConfirmAction(null)}
        >
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              background: '#FFFFFF',
              borderRadius: 20,
              padding: 24,
              width: '100%',
              maxWidth: 320,
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            }}
          >
            {/* Icon */}
            <div
              className="flex items-center justify-center"
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: confirmMessages[confirmAction].iconBg,
                margin: '0 auto 16px',
              }}
            >
              {(() => {
                const IconComp = confirmMessages[confirmAction].icon
                return <IconComp style={{ width: 28, height: 28, color: confirmMessages[confirmAction].iconColor }} />
              })()}
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1A1D21', textAlign: 'center', marginBottom: 8 }}>
              {confirmMessages[confirmAction].title}
            </h3>
            <p style={{ fontSize: 14, color: '#6B7280', textAlign: 'center', lineHeight: 1.6, marginBottom: 24 }}>
              {confirmMessages[confirmAction].message}
            </p>
            <div className="flex" style={{ gap: 12 }}>
              <button
                onClick={() => setConfirmAction(null)}
                style={{
                  flex: 1,
                  padding: '14px 0',
                  background: '#F3F4F6',
                  color: '#6B7280',
                  borderRadius: 12,
                  fontSize: 14,
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAction}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '14px 0',
                  background: confirmAction === 'logout' ? '#EF4444' : '#F97316',
                  color: '#FFFFFF',
                  borderRadius: 12,
                  fontSize: 14,
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  opacity: loading ? 0.5 : 1,
                }}
              >
                {loading ? 'Wait...' : confirmMessages[confirmAction].buttonLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function StatCard({ icon: Icon, iconBg, iconColor, value, label }) {
  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        border: '1px solid #D1D5DB',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      <div
        className="flex items-center justify-center"
        style={{ width: 36, height: 36, borderRadius: 12, background: iconBg, marginBottom: 12 }}
      >
        <Icon style={{ width: 20, height: 20, color: iconColor }} />
      </div>
      <p style={{ fontSize: 24, fontWeight: 700, color: '#1A1D21', marginBottom: 2 }}>{value}</p>
      <p style={{ fontSize: 12, fontWeight: 500, color: '#9CA3AF' }}>{label}</p>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: '#9CA3AF',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: 12,
          paddingLeft: 4,
        }}
      >
        {title}
      </div>
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: 16,
          border: '1px solid #D1D5DB',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
    </div>
  )
}

function MenuItem({ icon: Icon, iconBg, iconColor, title, subtitle, danger, disabled, onClick, last, toggle, toggleActive }) {
  const [isActive, setIsActive] = useState(toggleActive || false)

  return (
    <button
      onClick={toggle ? () => setIsActive(!isActive) : onClick}
      disabled={disabled}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '14px 16px',
        background: 'none',
        border: 'none',
        borderBottom: !last ? '1px solid #E5E7EB' : 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.3 : 1,
        textAlign: 'left',
        transition: 'all 0.2s',
      }}
    >
      <div
        className="flex items-center justify-center flex-shrink-0"
        style={{ width: 40, height: 40, borderRadius: 12, background: iconBg }}
      >
        <Icon style={{ width: 20, height: 20, color: iconColor }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: danger ? '#EF4444' : '#1A1D21', marginBottom: 2 }}>
          {title}
        </p>
        {subtitle && (
          <p style={{ fontSize: 12, color: '#9CA3AF' }}>{subtitle}</p>
        )}
      </div>
      {toggle ? (
        <div
          style={{
            width: 48,
            height: 28,
            borderRadius: 999,
            position: 'relative',
            transition: 'background 0.3s',
            flexShrink: 0,
            background: isActive ? '#10B981' : '#E5E7EB',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: 22,
              height: 22,
              background: '#FFFFFF',
              borderRadius: '50%',
              top: 3,
              left: isActive ? 23 : 3,
              boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
              transition: 'all 0.3s',
            }}
          />
        </div>
      ) : (
        <ChevronRight style={{ width: 20, height: 20, color: '#9CA3AF', flexShrink: 0 }} />
      )}
    </button>
  )
}
