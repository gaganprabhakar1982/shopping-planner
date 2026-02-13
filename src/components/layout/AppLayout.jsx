import { Outlet } from 'react-router-dom'
import BottomNav from './BottomNav'

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-lg mx-auto pb-16">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  )
}
