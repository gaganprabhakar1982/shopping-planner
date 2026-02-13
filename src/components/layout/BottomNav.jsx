import { NavLink } from 'react-router-dom'
import { ShoppingCart, ClipboardList, Settings } from 'lucide-react'

const tabs = [
  { path: '/', label: 'Shopping', icon: ShoppingCart },
  { path: '/master-list', label: 'Master List', icon: ClipboardList },
  { path: '/settings', label: 'Settings', icon: Settings },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-200/60 z-40 safe-bottom">
      <div className="max-w-lg mx-auto flex items-center h-16">
        {tabs.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center gap-0.5 py-1 transition-all duration-200 ${
                isActive
                  ? 'text-orange-500'
                  : 'text-gray-400 active:text-gray-500'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-1.5 rounded-2xl transition-all duration-200 ${isActive ? 'bg-orange-50' : ''}`}>
                  <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={`text-[10px] font-medium ${isActive ? 'font-semibold' : ''}`}>
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
