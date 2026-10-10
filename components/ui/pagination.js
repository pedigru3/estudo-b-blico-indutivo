import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

function Pagination({
  currentPage = 1,
  totalPages = 10,
  onPageChange,
  className,
}) {
  const pages = []

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, "...", totalPages)
    } else if (currentPage >= totalPages - 3) {
      pages.push(
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      )
    } else {
      pages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      )
    }
  }

  return (
    <nav
      className={cn("flex items-center gap-1.5 select-none", className)}
      aria-label="Paginação"
    >
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange?.(currentPage - 1)}
        className="h-9 w-9 rounded-lg flex items-center justify-center text-[#59656C] hover:bg-[#EEF3FF] hover:text-[#3266F1] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
        aria-label="Página anterior"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((p, idx) => {
        if (p === "...") {
          return (
            <span
              key={`dots-${idx}`}
              className="h-9 w-9 flex items-center justify-center text-xs text-[#A2ABB0]"
            >
              ...
            </span>
          )
        }

        const isSelected = p === currentPage

        return (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange?.(p)}
            className={cn(
              "h-9 w-9 rounded-full text-xs font-semibold flex items-center justify-center transition-all cursor-pointer",
              isSelected
                ? "bg-[#3266F1] text-white shadow-sm"
                : "text-[#59656C] hover:bg-[#EEF3FF] hover:text-[#3266F1]",
            )}
          >
            {p}
          </button>
        )
      })}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange?.(currentPage + 1)}
        className="h-9 w-9 rounded-lg flex items-center justify-center text-[#59656C] hover:bg-[#EEF3FF] hover:text-[#3266F1] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
        aria-label="Próxima página"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  )
}

export { Pagination }
