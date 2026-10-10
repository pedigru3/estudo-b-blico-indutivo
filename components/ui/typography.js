import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const headingVariants = cva("font-serif text-[#162235] tracking-tight", {
  variants: {
    level: {
      1: "text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.15]",
      2: "text-3xl sm:text-4xl font-bold leading-tight",
      3: "text-2xl sm:text-3xl font-bold leading-snug",
      4: "text-xl sm:text-2xl font-semibold leading-snug",
      5: "text-lg sm:text-xl font-semibold leading-normal",
      6: "text-base sm:text-lg font-semibold leading-normal",
    },
    color: {
      default: "text-[#162235]",
      primary: "text-[#3266F1]",
      muted: "text-[#59656C]",
      white: "text-white",
    },
  },
  defaultVariants: {
    level: 1,
    color: "default",
  },
})

function Heading({
  level = 1,
  color = "default",
  as,
  className,
  children,
  ...props
}) {
  const Component = as || `h${level}`
  return (
    <Component
      className={cn(headingVariants({ level, color }), className)}
      {...props}
    >
      {children}
    </Component>
  )
}

const textVariants = cva("font-sans", {
  variants: {
    variant: {
      body1: "text-lg sm:text-xl leading-[30px] font-medium",
      body2: "text-base sm:text-lg leading-[28px] font-medium",
      body3: "text-base leading-[26px] font-normal",
      body4: "text-sm leading-[24px] font-normal",
      body5: "text-xs leading-[22px] font-normal",
    },
    color: {
      default: "text-[#162235]",
      muted: "text-[#59656C]",
      subtle: "text-[#7B878E]",
      disabled: "text-[#A2ABB0]",
      primary: "text-[#3266F1]",
      white: "text-white",
    },
  },
  defaultVariants: {
    variant: "body4",
    color: "muted",
  },
})

function Text({
  variant = "body4",
  color = "muted",
  as: Component = "p",
  className,
  children,
  ...props
}) {
  return (
    <Component
      className={cn(textVariants({ variant, color }), className)}
      {...props}
    >
      {children}
    </Component>
  )
}

function SectionHeader({ title, className }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <h2 className="text-sm font-bold font-serif text-[#162235] uppercase tracking-wider">
        {title}
      </h2>
      <div className="w-8 h-px bg-[#162235]" />
    </div>
  )
}

export { Heading, Text, SectionHeader, headingVariants, textVariants }
