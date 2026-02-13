import { Check } from 'lucide-react'

export default function Checkbox({ checked, onChange, className = '' }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onChange}
      className={`
        w-6 h-6 
        rounded-lg 
        border-2 
        flex items-center justify-center 
        flex-shrink-0 
        transition-all duration-200
        ${checked
          ? 'bg-emerald-500 border-emerald-500 check-pop'
          : 'border-[#E5E7EB] bg-white hover:border-orange-400 hover:bg-orange-50/50'
        } 
        ${className}
      `}
    >
      {checked && (
        <Check 
          className="w-3.5 h-3.5 text-white" 
          strokeWidth={3} 
        />
      )}
    </button>
  )
}
