import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 font-medium transition-colors select-none",
  {
    variants: {
      variant: {
        blue: "bg-[#EEF3FF] text-[#3266F1] border border-[#C6D8FF]",
        teal: "bg-[#E7FDFD] text-[#205F70] border border-[#BDF3F4]",
        green: "bg-[#F3FFCD]/50 text-[#207043] border border-[#C6FA86]",
        purple: "bg-[#ECEFFB] text-[#4A3DBF] border border-[#C2BDF7]",
        pink: "bg-[#F5DEE6] text-[#A72775] border border-[#F2B4C8]",
        red: "bg-[#FCF1F2] text-[#C7332A] border border-[#EFAAA8]",
        orange: "bg-[#FDF5EC] text-[#DE4C19] border border-[#F2C387]",
        neutral: "bg-[#ECEEEF] text-[#35404F] border border-[#D4D6DA]",
        solidBlue: "bg-[#3266F1] text-white border-transparent",
        solidNavy: "bg-[#161B2C] text-white border-transparent",
      },
      size: {
        sm: "px-2 py-0.5 text-xs rounded-full",
        md: "px-2.5 py-1 text-xs rounded-full",
        lg: "px-3.5 py-1.5 text-sm rounded-full",
      },
    },
    defaultVariants: {
      variant: "blue",
      size: "md",
    },
  },
)

function Badge({ className, variant, size, dot, children, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full bg-current shrink-0"
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  )
}

export { Badge, badgeVariants }
