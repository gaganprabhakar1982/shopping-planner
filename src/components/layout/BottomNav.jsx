import { NavLink } from 'react-router-dom'
import { ShoppingCart, List, Settings } from 'lucide-react'

const tabs = [
  { path: '/', label: 'Shopping', icon: ShoppingCart },
  { path: '/master-list', label: 'Master', icon: List },
  { path: '/settings', label: 'Settings', icon: Settings },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40">
      <div className="max-w-lg mx-auto px-4 pb-2">
        <div className="glass-strong rounded-2xl border border-white/60 shadow-nav mx-1 mb-1">
          <div className="flex justify-around px-2 py-2">
            {tabs.map(({ path, label, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-0.5 px-5 py-2.5 rounded-xl transition-all duration-300 active:scale-95 relative ${
                    isActive
                      ? 'bg-gradient-to-b from-orange-500 to-orange-600 shadow-[0_4px_12px_rgba(249,115,22,0.35)]'
                      : 'hover:bg-slate-100/60'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`w-[22px] h-[22px] transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-slate-400'
                      }`}
                      strokeWidth={isActive ? 2.5 : 1.8}
                    />
                    <span
                      className={`text-[10px] font-bold tracking-wide transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-slate-400'
                      }`}
                    >
                      {label}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
