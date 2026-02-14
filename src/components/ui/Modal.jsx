import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm backdrop-fade" onClick={onClose} />
      <div className="relative bg-white w-full sm:max-w-md sm:rounded-[24px] rounded-t-[24px] max-h-[90vh] overflow-auto shadow-elevated sheet-up">
        {/* Drag handle for mobile feel */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1.5 bg-slate-200 rounded-full" />
        </div>
        <div className="sticky top-0 bg-white flex items-center justify-between px-6 py-3 sm:pt-6">
          <h2 className="text-lg font-bold text-slate-800">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 -mr-2 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>
        <div className="px-6 pb-7 pt-1">{children}</div>
      </div>
    </div>
  )
}
