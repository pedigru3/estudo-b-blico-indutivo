import * as React from "react"
import { cn } from "@/lib/utils"

function Slider({
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue = 50,
  onChange,
  disabled = false,
  className,
  label,
}) {
  const [internalVal, setInternalVal] = React.useState(defaultValue)
  const isControlled = value !== undefined
  const currentVal = isControlled ? value : internalVal

  const percentage = ((currentVal - min) / (max - min)) * 100

  function handleChange(e) {
    const val = Number(e.target.value)
    if (!isControlled) {
      setInternalVal(val)
    }
    onChange?.(val)
  }

  return (
    <div className={cn("w-full flex flex-col gap-2", className)}>
      {label && (
        <div className="flex items-center justify-between text-xs font-medium text-[#35404F]">
          <span>{label}</span>
          <span className="text-[#7B878E]">{currentVal}</span>
        </div>
      )}
      <div className="relative flex items-center w-full h-6 select-none touch-none">
        {/* Track Background */}
        <div className="absolute w-full h-1.5 bg-[#EEF3FF] rounded-full overflow-hidden">
          {/* Active Fill Track */}
          <div
            className={cn(
              "h-full rounded-full transition-all",
              disabled ? "bg-[#C6D8FF]" : "bg-[#3266F1]",
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Native range input for accessible dragging */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentVal}
          disabled={disabled}
          onChange={handleChange}
          className="absolute w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
        />

        {/* Visual Thumb */}
        <div
          className={cn(
            "absolute w-5 h-5 rounded-full bg-white border-2 shadow-sm transition-all pointer-events-none -ml-2.5",
            disabled
              ? "border-[#C6D8FF] bg-[#FAFAFB]"
              : "border-[#3266F1] shadow-[0_2px_8px_rgba(50,102,241,0.25)] hover:scale-110 focus-within:ring-4 focus-within:ring-[#3266F1]/20",
          )}
          style={{ left: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export { Slider }
