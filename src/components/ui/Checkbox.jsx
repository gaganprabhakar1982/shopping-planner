import { Check } from 'lucide-react'

export default function Checkbox({ checked, onChange, className = '' }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onChange}
      className={`
        w-[22px] h-[22px]
        rounded-lg
        border-2
        flex items-center justify-center
        flex-shrink-0
        transition-all duration-200
        ${checked
          ? 'bg-emerald-500 border-emerald-500 check-pop shadow-sm shadow-emerald-500/25'
          : 'border-slate-300 bg-white hover:border-orange-400 hover:bg-orange-50/50'
        }
        ${className}
      `}
    >
      {checked && (
        <Check
          className="w-3 h-3 text-white"
          strokeWidth={3.5}
        />
      )}
    </button>
  )
}
