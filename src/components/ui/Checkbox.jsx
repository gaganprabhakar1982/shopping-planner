import { Check } from 'lucide-react'

export default function Checkbox({ checked, onChange, className = '' }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onChange}
      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
        checked
          ? 'bg-green-500 border-green-500'
          : 'border-gray-300 hover:border-orange-400'
      } ${className}`}
    >
      {checked && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
    </button>
  )
}
