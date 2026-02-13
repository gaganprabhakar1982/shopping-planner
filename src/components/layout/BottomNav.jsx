import { NavLink } from 'react-router-dom'
import { ShoppingCart, ClipboardList, Settings } from 'lucide-react'

const tabs = [
  { path: '/', label: 'Shopping', icon: ShoppingCart },
  { path: '/master-list', label: 'Master List', icon: ClipboardList },
  { path: '/settings', label: 'Settings', icon: Settings },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="max-w-lg mx-auto flex">
        {tabs.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center py-2 px-1 text-xs font-medium transition-colors ${
                isActive
                  ? 'text-orange-500'
                  : 'text-gray-400 hover:text-gray-600'
              }`
            }
          >
            <Icon className="w-5 h-5 mb-0.5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
