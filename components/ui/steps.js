import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

function Steps({ steps = [], currentStep = 1, onStepChange, className }) {
  return (
    <div className={cn("w-full flex items-center justify-between", className)}>
      {steps.map((step, index) => {
        const stepNumber = index + 1
        const isCompleted = stepNumber < currentStep
        const isActive = stepNumber === currentStep
        const isLast = index === steps.length - 1
        const isClickable = !!onStepChange
        const StepIcon = step.icon

        return (
          <React.Fragment key={index}>
            <button
              type="button"
              disabled={!isClickable}
              onClick={() => onStepChange?.(stepNumber)}
              className={cn(
                "flex flex-col items-center gap-2 select-none group focus:outline-none",
                isClickable
                  ? "cursor-pointer"
                  : "cursor-default pointer-events-none",
              )}
            >
              {/* Step Circle */}
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                  isCompleted && "bg-[#47A46A] text-white shadow-sm",
                  isActive &&
                    "bg-[#3266F1] text-white shadow-md ring-4 ring-[#3266F1]/20",
                  !isCompleted &&
                    !isActive &&
                    "bg-[#EEF3FF] text-[#3266F1] border border-[#C6D8FF] group-hover:border-[#3266F1]",
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : StepIcon ? (
                  <StepIcon className="w-4 h-4" />
                ) : (
                  stepNumber
                )}
              </div>

              {/* Step Label */}
              <div className="text-center">
                <span
                  className={cn(
                    "text-xs font-medium block whitespace-nowrap transition-colors",
                    isActive
                      ? "text-[#162235] font-bold"
                      : "text-[#7B878E] group-hover:text-[#162235]",
                  )}
                >
                  {step.label}
                </span>
                {step.description && (
                  <span className="text-[10px] text-[#A2ABB0] block">
                    {step.description}
                  </span>
                )}
              </div>
            </button>

            {/* Connecting Line */}
            {!isLast && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-2 sm:mx-3 mb-6 transition-all",
                  isCompleted
                    ? "bg-[#47A46A]"
                    : isActive
                      ? "border-t border-dashed border-[#3266F1]"
                      : "border-t border-dashed border-[#D4D6DA]",
                )}
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export { Steps }
