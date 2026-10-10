import * as React from "react"
import { cn } from "@/lib/utils"

const RadioGroupContext = React.createContext({
  value: undefined,
  onChange: () => {},
  name: "",
  disabled: false,
})

function RadioGroup({
  value,
  defaultValue,
  onChange,
  name,
  disabled = false,
  className,
  children,
  ...props
}) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  function handleChange(val) {
    if (disabled) return
    if (!isControlled) {
      setInternalValue(val)
    }
    onChange?.(val)
  }

  return (
    <RadioGroupContext.Provider
      value={{ value: currentValue, onChange: handleChange, name, disabled }}
    >
      <div className={cn("flex flex-col gap-2.5", className)} {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
}

const RadioGroupItem = React.forwardRef(
  ({ className, value, label, disabled: itemDisabled, ...props }, ref) => {
    const context = React.useContext(RadioGroupContext)
    const isSelected = context.value === value
    const disabled = context.disabled || itemDisabled

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
          role="radio"
          aria-checked={isSelected}
          disabled={disabled}
          onClick={() => context.onChange(value)}
          ref={ref}
          className={cn(
            "h-5 w-5 rounded-full border flex items-center justify-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3266F1] focus-visible:ring-offset-1",
            isSelected
              ? disabled
                ? "border-[#D4D6DA] bg-white"
                : "border-[#3266F1] bg-white"
              : disabled
                ? "border-[#D4D6DA] bg-[#ECEEEF]"
                : "border-[#D4D6DA] bg-white hover:border-[#3266F1]",
          )}
          {...props}
        >
          {isSelected && (
            <span
              className={cn(
                "h-2.5 w-2.5 rounded-full",
                disabled ? "bg-[#D4D6DA]" : "bg-[#3266F1]",
              )}
            />
          )}
        </button>
        {label && (
          <span className="text-sm font-medium text-[#162235]">{label}</span>
        )}
      </label>
    )
  },
)

RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
