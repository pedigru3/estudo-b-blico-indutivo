import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:bg-[#ECEEEF] disabled:text-[#A2ABB0] disabled:border-transparent select-none cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-[#3266F1] text-white hover:bg-[#0D48D7] active:bg-[#04257E] shadow-sm focus-visible:ring-[#3266F1]",
        secondary:
          "bg-[#EEF3FF] text-[#3266F1] hover:bg-[#C6D8FF] hover:text-[#0D48D7] active:bg-[#638EFF] focus-visible:ring-[#3266F1]",
        navy: "bg-[#161B2C] text-white hover:bg-[#35404F] active:bg-[#162235] focus-visible:ring-[#161B2C]",
        outline:
          "border border-[#E7E9EA] bg-white text-[#162235] hover:bg-[#FAFAFB] hover:border-[#3266F1] hover:text-[#3266F1] focus-visible:ring-[#3266F1]",
        ghost:
          "bg-transparent text-[#59656C] hover:bg-[#EEF3FF] hover:text-[#3266F1] focus-visible:ring-[#3266F1]",
        danger:
          "bg-[#E05E4D] text-white hover:bg-[#C7332A] active:bg-[#9E1421] focus-visible:ring-[#E05E4D]",
        success:
          "bg-[#47A46A] text-white hover:bg-[#207043] focus-visible:ring-[#47A46A]",
      },
      size: {
        sm: "h-9 px-3 text-xs rounded-md",
        md: "h-12 px-5 text-sm rounded-lg",
        lg: "h-14 px-7 text-base rounded-xl font-semibold",
        icon: "h-12 w-12 rounded-lg p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
)

const Button = React.forwardRef(
  (
    {
      className,
      variant,
      size,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      isLoading,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1" />
        ) : (
          LeftIcon && <LeftIcon className="w-4 h-4 shrink-0" />
        )}
        {children}
        {!isLoading && RightIcon && <RightIcon className="w-4 h-4 shrink-0" />}
      </button>
    )
  },
)

Button.displayName = "Button"

export { Button, buttonVariants }
