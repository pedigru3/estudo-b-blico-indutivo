import * as React from "react"
import { cn } from "@/lib/utils"

const Textarea = React.forwardRef(
  (
    {
      className,
      containerClassName,
      label,
      helperText,
      errorMessage,
      disabled,
      rows = 4,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn("w-full flex flex-col gap-1.5", containerClassName)}>
        {label && (
          <label className="text-xs font-medium text-[#35404F] select-none">
            {label}
          </label>
        )}

        <textarea
          rows={rows}
          className={cn(
            "w-full px-4 py-3 bg-white text-[#162235] placeholder:text-[#A2ABB0] text-sm border rounded-lg transition-all duration-150 focus:outline-none resize-y",
            errorMessage
              ? "border-[#E05E4D] focus:ring-2 focus:ring-[#E05E4D]/20 focus:border-[#C7332A]"
              : "border-[#E7E9EA] hover:border-[#3266F1] focus:border-[#3266F1] focus:ring-2 focus:ring-[#3266F1]/20",
            disabled &&
              "bg-[#ECEEEF] border-[#D4D6DA] opacity-80 cursor-not-allowed text-[#7B878E]",
            className,
          )}
          ref={ref}
          disabled={disabled}
          {...props}
        />

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
  },
)

Textarea.displayName = "Textarea"

export { Textarea }
