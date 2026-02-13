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
import { useShoppingList } from '../hooks/useShoppingList'
import { useMasterList } from '../hooks/useMasterList'
import Modal from '../components/ui/Modal'

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const { clearCompleted, clearAll, completedItems, activeItems } = useShoppingList()
  const { items: masterItems, resetToDefaults } = useMasterList()
  const [confirmAction, setConfirmAction] = useState(null)
  const [loading, setLoading] = useState(false)

  const now = new Date()
  const currentMonth = now.toLocaleDateString('en-US', { month: 'short' })

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
      title: 'Clear Completed?',
      message: `Remove ${completedItems.length} completed items from your list? This cannot be undone.`,
      icon: Trash2,
      iconColor: 'bg-orange-50 text-orange-500',
      buttonLabel: 'Clear Items',
    },
    startNewMonth: {
      title: 'Start New Month?',
      message: 'This will clear your current shopping list and start fresh. Your master list won\'t be affected.',
      icon: Calendar,
      iconColor: 'bg-orange-50 text-orange-500',
      buttonLabel: 'Start Fresh',
    },
    resetMaster: {
      title: 'Reset Master List?',
      message: 'This will replace your master list with the default items. Custom items will be lost.',
      icon: RotateCcw,
      iconColor: 'bg-purple-50 text-purple-500',
      buttonLabel: 'Reset',
    },
    logout: {
      title: 'Log Out?',
      message: 'Are you sure you want to sign out of your account?',
      icon: LogOut,
      iconColor: 'bg-red-50 text-red-500',
      buttonLabel: 'Log Out',
    },
  }

  const initials = (user?.displayName || 'U').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className="relative min-h-screen bg-[#FAFBFC]">
      {/* Header */}
      <header className="px-5 pt-4 pb-5 bg-[#FAFBFC]">
        <h1 className="text-2xl font-bold text-[#1A1D21] tracking-tight mb-5">Settings</h1>

        {/* Profile Card */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-[20px] px-5 py-5 flex items-center gap-4 shadow-[0_8px_24px_rgba(249,115,22,0.25)] slide-up">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
            <span className="text-2xl font-bold text-white">{initials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-lg font-bold text-white mb-0.5">
              {user?.displayName || 'User'}
            </p>
            <p className="text-[13px] text-white/80 truncate">{user?.email}</p>
          </div>
          <button className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors">
            <Edit3 className="w-5 h-5 text-white" />
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="px-5 pb-32">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-7 slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="bg-white rounded-2xl p-4 border border-[#E5E7EB] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center mb-3">
              <Calendar className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-[#1A1D21] mb-0.5">{currentMonth}</p>
            <p className="text-xs font-medium text-gray-400">Current Month</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-[#E5E7EB] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center mb-3">
              <Check className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="text-2xl font-bold text-[#1A1D21] mb-0.5">{completedItems.length}</p>
            <p className="text-xs font-medium text-gray-400">Items Bought</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-[#E5E7EB] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <div className="w-9 h-9 bg-purple-50 rounded-xl flex items-center justify-center mb-3">
              <BarChart3 className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-2xl font-bold text-[#1A1D21] mb-0.5">{activeItems.length}</p>
            <p className="text-xs font-medium text-gray-400">Pending</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-[#E5E7EB] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center mb-3">
              <List className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-2xl font-bold text-[#1A1D21] mb-0.5">{masterItems.length}</p>
            <p className="text-xs font-medium text-gray-400">Master Items</p>
          </div>
        </div>

        {/* List Management */}
        <Section title="List Management" delay="0.2s">
          <MenuItem
            icon={Calendar}
            iconColor="teal"
            title="Start New Month"
            subtitle="Clear list and start fresh"
            onClick={() => setConfirmAction('startNewMonth')}
          />
          <MenuItem
            icon={Trash2}
            iconColor="orange"
            title="Clear Completed"
            subtitle={`Remove ${completedItems.length} checked items`}
            onClick={() => setConfirmAction('clearCompleted')}
            disabled={completedItems.length === 0}
            last
          />
        </Section>

        {/* Master List */}
        <Section title="Master List" delay="0.25s">
          <MenuItem
            icon={RotateCcw}
            iconColor="purple"
            title="Reset to Defaults"
            subtitle="Restore original items"
            onClick={() => setConfirmAction('resetMaster')}
          />
          <MenuItem
            icon={Upload}
            iconColor="blue"
            title="Export List"
            subtitle="Share as text or PDF"
            last
          />
        </Section>

        {/* Preferences */}
        <Section title="Preferences" delay="0.3s">
          <MenuItem
            icon={Moon}
            iconColor="teal"
            title="Dark Mode"
            subtitle="Easier on the eyes"
            toggle
          />
          <MenuItem
            icon={Bell}
            iconColor="orange"
            title="Reminders"
            subtitle="Get notified to shop"
            toggle
            toggleActive
            last
          />
        </Section>

        {/* Account */}
        <Section title="Account" delay="0.35s">
          <MenuItem
            icon={LogOut}
            iconColor="red"
            title="Log Out"
            subtitle="Sign out of your account"
            danger
            onClick={() => setConfirmAction('logout')}
            last
          />
        </Section>

        {/* App Version */}
        <div className="text-center py-5 text-[13px] text-gray-400 slide-up" style={{ animationDelay: '0.4s' }}>
          <span className="font-semibold text-gray-500">Shopping Planner</span> v1.0.0
        </div>
      </main>

      {/* Confirmation Modal */}
      {confirmAction && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-5 modal-scale"
          onClick={() => setConfirmAction(null)}
        >
          <div className="fixed inset-0 bg-black/50" />
          <div
            className="relative bg-white rounded-[20px] p-6 w-full max-w-[320px] modal-scale"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icon */}
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${confirmMessages[confirmAction].iconColor}`}>
              {(() => {
                const IconComp = confirmMessages[confirmAction].icon
                return <IconComp className="w-7 h-7" />
              })()}
            </div>
            <h3 className="text-lg font-bold text-[#1A1D21] text-center mb-2">
              {confirmMessages[confirmAction].title}
            </h3>
            <p className="text-sm text-gray-500 text-center leading-relaxed mb-6">
              {confirmMessages[confirmAction].message}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmAction(null)}
                className="flex-1 py-3.5 bg-[#F4F6F8] text-gray-500 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors active:scale-[0.97]"
              >
                Cancel
              </button>
              <button
                onClick={handleAction}
                disabled={loading}
                className={`flex-1 py-3.5 rounded-xl text-sm font-semibold text-white transition-colors active:scale-[0.97] disabled:opacity-50 ${
                  confirmAction === 'logout'
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-orange-500 hover:bg-orange-600'
                }`}
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

function Section({ title, delay, children }) {
  return (
    <div className="mb-6 slide-up" style={{ animationDelay: delay }}>
      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.08em] mb-3 pl-1">
        {title}
      </div>
      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden">
        {children}
      </div>
    </div>
  )
}

function MenuItem({ icon: Icon, iconColor, title, subtitle, danger, disabled, onClick, last, toggle, toggleActive }) {
  const [isActive, setIsActive] = useState(toggleActive || false)

  const iconColorMap = {
    teal: 'bg-teal-50 text-teal-500',
    orange: 'bg-orange-50 text-orange-500',
    purple: 'bg-purple-50 text-purple-500',
    blue: 'bg-blue-50 text-blue-500',
    red: 'bg-red-50 text-red-500',
  }

  return (
    <button
      onClick={toggle ? () => setIsActive(!isActive) : onClick}
      disabled={disabled}
      className={`w-full flex items-center gap-3.5 px-4 py-4 hover:bg-[#FAFBFC] transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.99] ${
        !last ? 'border-b border-[#E5E7EB]' : ''
      }`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconColorMap[iconColor]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 text-left min-w-0">
        <p className={`text-[15px] font-semibold mb-0.5 ${danger ? 'text-red-500' : 'text-[#1A1D21]'}`}>
          {title}
        </p>
        {subtitle && (
          <p className="text-xs text-gray-400">{subtitle}</p>
        )}
      </div>
      {toggle ? (
        <div
          className={`w-12 h-7 rounded-full relative transition-colors duration-300 flex-shrink-0 ${
            isActive ? 'bg-emerald-500' : 'bg-[#E5E7EB]'
          }`}
        >
          <div
            className={`absolute w-[22px] h-[22px] bg-white rounded-full top-[3px] shadow-[0_2px_4px_rgba(0,0,0,0.15)] transition-all duration-300 ${
              isActive ? 'left-[23px]' : 'left-[3px]'
            }`}
          />
        </div>
      ) : (
        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
      )}
    </button>
  )
}
