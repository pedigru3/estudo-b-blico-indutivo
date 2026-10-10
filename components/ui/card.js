import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border border-[#E7E9EA] bg-white text-[#162235] shadow-[0_4px_20px_rgba(22,34,53,0.04)] transition-all duration-200",
      className,
    )}
    {...props}
  >
    {children}
  </div>
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col space-y-1.5 p-6 border-b border-[#F4F5F6]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-bold leading-none tracking-tight text-[#162235]",
      className,
    )}
    {...props}
  >
    {children}
  </h3>
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-[#7B878E] mt-1 leading-relaxed", className)}
      {...props}
    >
      {children}
    </p>
  ),
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("p-6", className)} {...props}>
      {children}
    </div>
  ),
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center p-6 pt-0 border-t border-[#F4F5F6] mt-4 pt-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
