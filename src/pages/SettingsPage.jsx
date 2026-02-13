import { useState } from 'react'
import {
  User,
  LogOut,
  Trash2,
  RotateCcw,
  ListRestart,
  ChevronRight,
  Info,
  Package,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useShoppingList } from '../hooks/useShoppingList'
import { useMasterList } from '../hooks/useMasterList'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const { clearCompleted, clearAll, completedItems } = useShoppingList()
  const { resetToDefaults } = useMasterList()
  const [confirmAction, setConfirmAction] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleAction() {
    setLoading(true)
    try {
      switch (confirmAction) {
        case 'clearCompleted':
          await clearCompleted()
          break
        case 'startNewMonth':
          await clearAll()
          break
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
      title: 'Clear Completed Items',
      message: `Remove ${completedItems.length} completed items from your list?`,
    },
    startNewMonth: {
      title: 'Start New Month',
      message:
        'This will clear your entire shopping list so you can start fresh. This cannot be undone.',
    },
    resetMaster: {
      title: 'Reset Master List',
      message:
        'This will replace your master list with the default items. Custom items will be lost.',
    },
    logout: {
      title: 'Log Out',
      message: 'Are you sure you want to log out?',
    },
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="px-4 pt-12 pb-4">
        <h1 className="text-xl font-bold text-gray-900">Settings</h1>
      </div>

      {/* Account */}
      <Section title="Account">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-orange-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">
              {user?.displayName || 'User'}
            </p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
        <SettingsRow
          icon={LogOut}
          label="Log Out"
          danger
          onClick={() => setConfirmAction('logout')}
        />
      </Section>

      {/* List Management */}
      <Section title="List Management">
        <SettingsRow
          icon={ListRestart}
          label="Start New Month"
          description="Archive current list and start fresh"
          onClick={() => setConfirmAction('startNewMonth')}
        />
        <SettingsRow
          icon={Trash2}
          label="Clear Completed Items"
          description={`Remove ${completedItems.length} checked items`}
          onClick={() => setConfirmAction('clearCompleted')}
          disabled={completedItems.length === 0}
        />
      </Section>

      {/* Master List */}
      <Section title="Master List">
        <SettingsRow
          icon={RotateCcw}
          label="Reset to Defaults"
          description="Restore original master list items"
          onClick={() => setConfirmAction('resetMaster')}
        />
      </Section>

      {/* About */}
      <Section title="About">
        <div className="px-4 py-3 flex items-center gap-3">
          <Package className="w-5 h-5 text-gray-400" />
          <div className="flex-1">
            <p className="text-sm text-gray-700">Shopping Planner</p>
            <p className="text-xs text-gray-400">Version 1.0.0</p>
          </div>
        </div>
      </Section>

      {/* Confirmation modal */}
      <Modal
        isOpen={!!confirmAction}
        onClose={() => setConfirmAction(null)}
        title={confirmAction ? confirmMessages[confirmAction]?.title : ''}
      >
        <p className="text-sm text-gray-600 mb-4">
          {confirmAction ? confirmMessages[confirmAction]?.message : ''}
        </p>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => setConfirmAction(null)}
          >
            Cancel
          </Button>
          <Button
            variant={confirmAction === 'logout' ? 'danger' : 'primary'}
            className="flex-1"
            onClick={handleAction}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Confirm'}
          </Button>
        </div>
      </Modal>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="mb-4">
      <h2 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
        {title}
      </h2>
      <div className="bg-white">{children}</div>
    </div>
  )
}

function SettingsRow({ icon: Icon, label, description, danger, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center gap-3 px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed`}
    >
      <Icon
        className={`w-5 h-5 ${danger ? 'text-red-500' : 'text-gray-400'}`}
      />
      <div className="flex-1 text-left">
        <p
          className={`text-sm ${
            danger ? 'text-red-500' : 'text-gray-700'
          }`}
        >
          {label}
        </p>
        {description && (
          <p className="text-xs text-gray-400">{description}</p>
        )}
      </div>
      <ChevronRight className="w-4 h-4 text-gray-300" />
    </button>
  )
}
