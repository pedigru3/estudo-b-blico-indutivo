import * as React from "react"
import { cn } from "@/lib/utils"

function Tabs({
  items = [],
  value,
  onChange,
  variant = "primary", // "primary" | "secondary"
  className,
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 select-none",
        variant === "secondary" && "border-b border-[#E7E9EA] gap-4",
        className,
      )}
    >
      {items.map((item) => {
        const isSelected = item.value === value
        const Icon = item.icon

        if (variant === "secondary") {
          return (
            <button
              key={item.value}
              type="button"
              disabled={item.disabled}
              onClick={() => onChange?.(item.value)}
              className={cn(
                "pb-3 pt-1 px-1 flex items-center gap-2 text-sm font-medium border-b-2 transition-all -mb-px cursor-pointer",
                isSelected
                  ? "border-[#3266F1] text-[#3266F1] font-semibold"
                  : "border-transparent text-[#7B878E] hover:text-[#162235] hover:border-[#D4D6DA]",
                item.disabled &&
                  "opacity-50 cursor-not-allowed pointer-events-none text-[#A2ABB0]",
              )}
            >
              {Icon && <Icon className="w-4 h-4" />}
              <span>{item.label}</span>
            </button>
          )
        }

        // Primary pill style
        return (
          <button
            key={item.value}
            type="button"
            disabled={item.disabled}
            onClick={() => onChange?.(item.value)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all cursor-pointer",
              isSelected
                ? "bg-[#3266F1] text-white shadow-sm font-semibold"
                : "text-[#59656C] hover:bg-[#EEF3FF] hover:text-[#3266F1]",
              item.disabled &&
                "opacity-40 cursor-not-allowed pointer-events-none text-[#A2ABB0]",
            )}
          >
            {Icon && <Icon className="w-4 h-4" />}
            <span>{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export { Tabs }
