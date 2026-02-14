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
  Settings2,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useShoppingList } from '../hooks/useShoppingList'
import { useMasterList } from '../hooks/useMasterList'

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
      iconColor: 'bg-orange-100 text-orange-500',
      buttonLabel: 'Clear Items',
    },
    startNewMonth: {
      title: 'Start New Month?',
      message: 'This will clear your current shopping list and start fresh. Your master list won\'t be affected.',
      icon: Calendar,
      iconColor: 'bg-orange-100 text-orange-500',
      buttonLabel: 'Start Fresh',
    },
    resetMaster: {
      title: 'Reset Master List?',
      message: 'This will replace your master list with the default items. Custom items will be lost.',
      icon: RotateCcw,
      iconColor: 'bg-violet-100 text-violet-500',
      buttonLabel: 'Reset',
    },
    logout: {
      title: 'Log Out?',
      message: 'Are you sure you want to sign out of your account?',
      icon: LogOut,
      iconColor: 'bg-red-100 text-red-500',
      buttonLabel: 'Log Out',
    },
  }

  const initials = (user?.displayName || 'U').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className="relative min-h-screen">
      {/* Gradient Header */}
      <header className="relative bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 px-6 pt-6 pb-8 rounded-b-[28px] shadow-[0_8px_32px_rgba(15,23,42,0.3)]">
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/[0.03] rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-6 left-6 w-20 h-20 bg-orange-500/10 rounded-full blur-xl" />

        <div className="relative">
          <div className="flex items-center gap-2 mb-5">
            <Settings2 className="w-5 h-5 text-white/50" />
            <p className="text-white/50 text-xs font-semibold uppercase tracking-wider">Settings</p>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-4 slide-up">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-[0_4px_16px_rgba(249,115,22,0.35)]">
              <span className="text-xl font-bold text-white">{initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-lg font-bold text-white mb-0.5">
                {user?.displayName || 'User'}
              </p>
              <p className="text-[13px] text-white/50 truncate">{user?.email}</p>
            </div>
            <button className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors active:scale-95 border border-white/5">
              <Edit3 className="w-4.5 h-4.5 text-white/70" />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-5 pb-32 pt-5">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6 slide-up" style={{ animationDelay: '0.1s' }}>
          <StatCard
            icon={Calendar}
            iconColor="bg-blue-100 text-blue-500"
            value={currentMonth}
            label="Current Month"
          />
          <StatCard
            icon={Check}
            iconColor="bg-emerald-100 text-emerald-500"
            value={completedItems.length}
            label="Items Bought"
          />
          <StatCard
            icon={BarChart3}
            iconColor="bg-violet-100 text-violet-500"
            value={activeItems.length}
            label="Pending"
          />
          <StatCard
            icon={List}
            iconColor="bg-orange-100 text-orange-500"
            value={masterItems.length}
            label="Master Items"
          />
        </div>

        {/* List Management */}
        <Section title="List Management" delay="0.15s">
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
        <Section title="Master List" delay="0.2s">
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
        <Section title="Preferences" delay="0.25s">
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
        <Section title="Account" delay="0.3s">
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
        <div className="text-center py-5 text-[13px] text-slate-400 slide-up" style={{ animationDelay: '0.35s' }}>
          <span className="font-bold text-slate-500">Shopping Planner</span> v1.0.0
        </div>
      </main>

      {/* Confirmation Modal */}
      {confirmAction && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-5 backdrop-fade"
          onClick={() => setConfirmAction(null)}
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-[24px] p-7 w-full max-w-[320px] modal-scale shadow-elevated"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icon */}
            <div className={`w-16 h-16 rounded-[18px] flex items-center justify-center mx-auto mb-5 ${confirmMessages[confirmAction].iconColor}`}>
              {(() => {
                const IconComp = confirmMessages[confirmAction].icon
                return <IconComp className="w-7 h-7" />
              })()}
            </div>
            <h3 className="text-lg font-bold text-slate-800 text-center mb-2">
              {confirmMessages[confirmAction].title}
            </h3>
            <p className="text-sm text-slate-500 text-center leading-relaxed mb-6">
              {confirmMessages[confirmAction].message}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmAction(null)}
                className="flex-1 py-3.5 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-colors active:scale-[0.97]"
              >
                Cancel
              </button>
              <button
                onClick={handleAction}
                disabled={loading}
                className={`flex-1 py-3.5 rounded-xl text-sm font-bold text-white transition-all active:scale-[0.97] disabled:opacity-50 shadow-sm ${
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

function StatCard({ icon: Icon, iconColor, value, label }) {
  return (
    <div className="bg-white rounded-[16px] p-4 border border-slate-100 shadow-soft">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${iconColor}`}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-2xl font-bold text-slate-800 mb-0.5">{value}</p>
      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">{label}</p>
    </div>
  )
}

function Section({ title, delay, children }) {
  return (
    <div className="mb-5 slide-up" style={{ animationDelay: delay }}>
      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.08em] mb-2.5 pl-1">
        {title}
      </div>
      <div className="bg-white rounded-[18px] border border-slate-100 shadow-soft overflow-hidden">
        {children}
      </div>
    </div>
  )
}

function MenuItem({ icon: Icon, iconColor, title, subtitle, danger, disabled, onClick, last, toggle, toggleActive }) {
  const [isActive, setIsActive] = useState(toggleActive || false)

  const iconColorMap = {
    teal: 'bg-teal-100 text-teal-600',
    orange: 'bg-orange-100 text-orange-500',
    purple: 'bg-violet-100 text-violet-600',
    blue: 'bg-blue-100 text-blue-500',
    red: 'bg-red-100 text-red-500',
  }

  return (
    <button
      onClick={toggle ? () => setIsActive(!isActive) : onClick}
      disabled={disabled}
      className={`w-full flex items-center gap-3.5 px-4 py-3.5 hover:bg-slate-50/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.99] ${
        !last ? 'border-b border-slate-100' : ''
      }`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconColorMap[iconColor]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 text-left min-w-0">
        <p className={`text-[15px] font-semibold mb-0.5 ${danger ? 'text-red-500' : 'text-slate-800'}`}>
          {title}
        </p>
        {subtitle && (
          <p className="text-[11px] text-slate-400 font-medium">{subtitle}</p>
        )}
      </div>
      {toggle ? (
        <div
          className={`w-12 h-7 rounded-full relative transition-colors duration-300 flex-shrink-0 ${
            isActive ? 'bg-emerald-500' : 'bg-slate-200'
          }`}
        >
          <div
            className={`absolute w-[22px] h-[22px] bg-white rounded-full top-[3px] shadow-[0_2px_4px_rgba(0,0,0,0.15)] transition-all duration-300 ${
              isActive ? 'left-[23px]' : 'left-[3px]'
            }`}
          />
        </div>
      ) : (
        <ChevronRight className="w-5 h-5 text-slate-300 flex-shrink-0" />
      )}
    </button>
  )
}
