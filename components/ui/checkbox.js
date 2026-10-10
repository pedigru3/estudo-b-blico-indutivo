import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef(
  ({ className, checked, onChange, disabled, label, ...props }, ref) => {
    const isControlled = checked !== undefined
    const [internalChecked, setInternalChecked] = React.useState(false)
    const isChecked = isControlled ? checked : internalChecked

    function handleClick() {
      if (disabled) return
      if (!isControlled) {
        setInternalChecked(!internalChecked)
      }
      onChange?.(!isChecked)
    }

    return (
      <label
        className={cn(
          "inline-flex items-center gap-2.5 select-none",
          disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
          className,
        )}
      >
        <button
          type="button"
          role="checkbox"
          aria-checked={isChecked}
          disabled={disabled}
          onClick={handleClick}
          ref={ref}
          className={cn(
            "h-5 w-5 rounded-md border flex items-center justify-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3266F1] focus-visible:ring-offset-1",
            isChecked
              ? disabled
                ? "bg-[#D4D6DA] border-[#D4D6DA] text-white"
                : "bg-[#3266F1] border-[#3266F1] text-white"
              : disabled
                ? "bg-[#ECEEEF] border-[#D4D6DA]"
                : "bg-white border-[#D4D6DA] hover:border-[#3266F1]",
          )}
          {...props}
        >
          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </button>
        {label && (
          <span className="text-sm font-medium text-[#162235]">{label}</span>
        )}
      </label>
    )
  },
)

Checkbox.displayName = "Checkbox"

export { Checkbox }
