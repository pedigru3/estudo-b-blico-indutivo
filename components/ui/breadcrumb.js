import * as React from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

function Breadcrumb({ items = [], separator = "/", className }) {
  return (
    <nav
      className={cn(
        "flex items-center text-sm font-medium text-[#7B878E]",
        className,
      )}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center gap-2 flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={index} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-[#3266F1] hover:underline transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    isLast ? "text-[#162235] font-semibold" : "text-[#7B878E]",
                  )}
                >
                  {item.label}
                </span>
              )}

              {!isLast && (
                <span className="text-[#D4D6DA] select-none text-xs">
                  {typeof separator === "string" ? (
                    separator
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5" />
                  )}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export { Breadcrumb }
