import * as React from "react"
import { ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"

function Select({
  options = [],
  value,
  onChange,
  placeholder = "Selecione uma opção...",
  label,
  helperText,
  errorMessage,
  disabled,
  className,
}) {
  const [isOpen, setIsOpen] = React.useState(false)
  const containerRef = React.useRef(null)

  const selectedOption = options.find((opt) => opt.value === value)

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  function handleSelect(optValue) {
    if (disabled) return
    onChange?.(optValue)
    setIsOpen(false)
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full flex flex-col gap-1.5 relative",
        isOpen && "z-40",
        className,
      )}
    >
      {label && (
        <label className="text-xs font-medium text-[#35404F] select-none">
          {label}
        </label>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full h-12 px-4 flex items-center justify-between text-left text-sm bg-white border rounded-lg transition-all duration-150 cursor-pointer select-none",
          isOpen
            ? "border-[#3266F1] ring-2 ring-[#3266F1]/20"
            : "border-[#E7E9EA] hover:border-[#3266F1]",
          errorMessage &&
            "border-[#E05E4D] focus:ring-[#E05E4D]/20 focus:border-[#C7332A]",
          disabled &&
            "bg-[#ECEEEF] border-[#D4D6DA] opacity-80 cursor-not-allowed text-[#A2ABB0]",
        )}
      >
        <span
          className={cn(selectedOption ? "text-[#162235]" : "text-[#A2ABB0]")}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-[#7B878E] transition-transform duration-150",
            isOpen && "rotate-180 text-[#3266F1]",
          )}
        />
      </button>

      {isOpen && !disabled && (
        <div className="absolute top-[calc(100%+4px)] left-0 w-full z-50 bg-white border border-[#E7E9EA] rounded-xl shadow-lg max-h-60 overflow-y-auto p-1.5 animate-in fade-in zoom-in-95 duration-100">
          {options.map((option) => {
            const isSelected = option.value === value
            return (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-colors",
                  isSelected
                    ? "bg-[#EEF3FF] text-[#3266F1] font-medium"
                    : "text-[#162235] hover:bg-[#FAFAFB]",
                )}
              >
                <span>{option.label}</span>
                {isSelected && <Check className="w-4 h-4 text-[#3266F1]" />}
              </div>
            )
          })}
        </div>
      )}

      {(errorMessage || helperText) && (
        <p
          className={cn(
            "text-xs mt-0.5",
            errorMessage ? "text-[#E05E4D]" : "text-[#7B878E]",
          )}
        >
          {errorMessage || helperText}
        </p>
      )}
    </div>
  )
}

export { Select }
