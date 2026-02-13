import { useState } from 'react'
import {
  User,
  LogOut,
  Trash2,
  RotateCcw,
  ListRestart,
  Settings,
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

  const initials = (user?.displayName || 'U').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white px-5 pt-14 pb-5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Settings</h1>
          <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center">
            <Settings className="w-6 h-6 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-sm shadow-orange-500/20">
              <span className="text-white text-lg font-bold">{initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-bold text-gray-900 truncate">
                {user?.displayName || 'User'}
              </p>
              <p className="text-sm text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* List Management */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">List Management</span>
          </div>
          <SettingsRow
            icon={ListRestart}
            label="Start New Month"
            description="Clear list and start fresh"
            onClick={() => setConfirmAction('startNewMonth')}
          />
          <SettingsRow
            icon={Trash2}
            label="Clear Completed"
            description={`Remove ${completedItems.length} checked items`}
            onClick={() => setConfirmAction('clearCompleted')}
            disabled={completedItems.length === 0}
            last
          />
        </div>

        {/* Master List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Master List</span>
          </div>
          <SettingsRow
            icon={RotateCcw}
            label="Reset to Defaults"
            description="Restore original items"
            onClick={() => setConfirmAction('resetMaster')}
            last
          />
        </div>

        {/* Account */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <SettingsRow
            icon={LogOut}
            label="Log Out"
            danger
            onClick={() => setConfirmAction('logout')}
            last
          />
        </div>

        {/* About */}
        <div className="flex items-center justify-center py-6 gap-2">
          <Package className="w-4 h-4 text-gray-300" />
          <span className="text-xs text-gray-300 font-medium">Shopping Planner v1.0.0</span>
        </div>
      </div>

      {/* Confirmation modal */}
      <Modal
        isOpen={!!confirmAction}
        onClose={() => setConfirmAction(null)}
        title={confirmAction ? confirmMessages[confirmAction]?.title : ''}
      >
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          {confirmAction ? confirmMessages[confirmAction]?.message : ''}
        </p>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            className="flex-1"
            size="lg"
            onClick={() => setConfirmAction(null)}
          >
            Cancel
          </Button>
          <Button
            variant={confirmAction === 'logout' ? 'danger' : 'primary'}
            className="flex-1"
            size="lg"
            onClick={handleAction}
            disabled={loading}
          >
            {loading ? 'Wait...' : 'Confirm'}
          </Button>
        </div>
      </Modal>
    </div>
  )
}

function SettingsRow({ icon: Icon, label, description, danger, disabled, onClick, last }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed active:bg-gray-100 ${
        !last ? 'border-b border-gray-100' : ''
      }`}
    >
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
        danger ? 'bg-red-50' : 'bg-gray-100'
      }`}>
        <Icon className={`w-[18px] h-[18px] ${danger ? 'text-red-500' : 'text-gray-500'}`} />
      </div>
      <div className="flex-1 text-left">
        <p className={`text-sm font-semibold ${danger ? 'text-red-500' : 'text-gray-800'}`}>
          {label}
        </p>
        {description && (
          <p className="text-xs text-gray-400 mt-0.5">{description}</p>
        )}
      </div>
    </button>
  )
}
