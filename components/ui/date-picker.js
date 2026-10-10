import * as React from "react"
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

function DatePicker({
  value,
  onChange,
  placeholder = "Selecione uma data...",
  label,
  helperText,
  errorMessage,
  disabled,
  className,
}) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [currentDate, setCurrentDate] = React.useState(
    value ? new Date(value) : new Date(),
  )
  const containerRef = React.useRef(null)

  const selectedDate = value ? new Date(value) : null

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

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]
  const weekDays = ["SEG", "TER", "QUA", "QUI", "SEX", "SÁB", "DOM"]

  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const days = []
  for (let i = 0; i < firstDayIndex; i++) {
    days.push(null)
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d)
  }

  function handlePrevMonth(e) {
    e.stopPropagation()
    setCurrentDate(new Date(year, month - 1, 1))
  }

  function handleNextMonth(e) {
    e.stopPropagation()
    setCurrentDate(new Date(year, month + 1, 1))
  }

  function handleSelectDay(day) {
    if (!day || disabled) return
    const picked = new Date(year, month, day)
    onChange?.(picked)
    setIsOpen(false)
  }

  const isToday = (d) => {
    if (!d) return false
    const today = new Date()
    return (
      today.getDate() === d &&
      today.getMonth() === month &&
      today.getFullYear() === year
    )
  }

  const isSelected = (d) => {
    if (!d || !selectedDate) return false
    return (
      selectedDate.getDate() === d &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year
    )
  }

  const formattedDisplay = selectedDate
    ? selectedDate.toLocaleDateString("pt-BR")
    : ""

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
          errorMessage && "border-[#E05E4D]",
          disabled &&
            "bg-[#ECEEEF] border-[#D4D6DA] opacity-80 cursor-not-allowed text-[#A2ABB0]",
        )}
      >
        <span
          className={formattedDisplay ? "text-[#162235]" : "text-[#A2ABB0]"}
        >
          {formattedDisplay || placeholder}
        </span>
        <CalendarIcon className="w-4 h-4 text-[#7B878E]" />
      </button>

      {isOpen && !disabled && (
        <div className="absolute top-[calc(100%+6px)] left-0 z-50 w-72 bg-white border border-[#E7E9EA] rounded-2xl shadow-xl p-4 animate-in fade-in zoom-in-95 duration-100">
          {/* Calendar Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#F4F5F6] mb-3">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1 rounded-lg hover:bg-[#EEF3FF] text-[#59656C] hover:text-[#3266F1] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-bold text-[#162235]">
              {monthNames[month]} {year}
            </span>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1 rounded-lg hover:bg-[#EEF3FF] text-[#59656C] hover:text-[#3266F1] transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {weekDays.map((wd) => (
              <span
                key={wd}
                className="text-[10px] font-semibold text-[#A2ABB0] py-1"
              >
                {wd}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {days.map((d, index) => {
              if (d === null) {
                return <div key={`empty-${index}`} className="h-8 w-8" />
              }

              const active = isSelected(d)
              const today = isToday(d)

              return (
                <button
                  type="button"
                  key={d}
                  onClick={() => handleSelectDay(d)}
                  className={cn(
                    "h-8 w-8 rounded-full text-xs font-medium flex items-center justify-center transition-all cursor-pointer",
                    active
                      ? "bg-[#3266F1] text-white font-bold shadow-sm"
                      : today
                        ? "border border-[#3266F1] text-[#3266F1] font-semibold hover:bg-[#EEF3FF]"
                        : "text-[#162235] hover:bg-[#EEF3FF] hover:text-[#3266F1]",
                  )}
                >
                  {d}
                </button>
              )
            })}
          </div>
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

export { DatePicker }
