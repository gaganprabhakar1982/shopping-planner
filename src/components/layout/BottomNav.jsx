import { NavLink } from 'react-router-dom'
import { ShoppingCart, List, Settings } from 'lucide-react'

const tabs = [
  { path: '/', label: 'Shopping', icon: ShoppingCart },
  { path: '/master-list', label: 'Master List', icon: List },
  { path: '/settings', label: 'Settings', icon: Settings },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] shadow-[0_-4px_20px_rgba(0,0,0,0.04)] z-40">
      <div className="max-w-lg mx-auto flex justify-around px-6 pt-3 pb-7">
        {tabs.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-5 py-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-orange-50 text-orange-500'
                  : 'text-gray-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
                <span className={`text-[11px] font-semibold ${isActive ? 'text-orange-500' : 'text-gray-400'}`}>
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
