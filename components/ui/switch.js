import * as React from "react"
import { cn } from "@/lib/utils"

const Switch = React.forwardRef(
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
          "inline-flex items-center gap-3 select-none",
          disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
          className,
        )}
      >
        <button
          type="button"
          role="switch"
          aria-checked={isChecked}
          disabled={disabled}
          onClick={handleClick}
          ref={ref}
          className={cn(
            "relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3266F1] focus-visible:ring-offset-2",
            isChecked
              ? disabled
                ? "bg-[#C6D8FF]"
                : "bg-[#3266F1]"
              : disabled
                ? "bg-[#ECEEEF]"
                : "bg-[#D4D6DA] hover:bg-[#A2ABB0]",
          )}
          {...props}
        >
          <span
            className={cn(
              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out mt-0.5",
              isChecked ? "translate-x-5" : "translate-x-0.5",
            )}
          />
        </button>
        {label && (
          <span className="text-sm font-medium text-[#162235]">{label}</span>
        )}
      </label>
    )
  },
)

Switch.displayName = "Switch"

export { Switch }
