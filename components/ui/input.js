import * as React from "react"
import { cva } from "class-variance-authority"
import { AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

const inputContainerVariants = cva(
  "flex items-center w-full transition-all duration-150 bg-white border rounded-lg focus-within:ring-2 focus-within:ring-offset-1",
  {
    variants: {
      status: {
        default:
          "border-[#E7E9EA] hover:border-[#3266F1] focus-within:border-[#3266F1] focus-within:ring-[#3266F1]/20",
        success:
          "border-[#66C873] focus-within:border-[#47A46A] focus-within:ring-[#66C873]/20",
        error:
          "border-[#E05E4D] focus-within:border-[#C7332A] focus-within:ring-[#E05E4D]/20",
        warning:
          "border-[#F5AF45] focus-within:border-[#ED7B37] focus-within:ring-[#F5AF45]/20",
      },
      inputSize: {
        sm: "h-9 px-3 text-xs",
        md: "h-12 px-4 text-sm",
        lg: "h-14 px-5 text-base",
      },
      disabled: {
        true: "bg-[#ECEEEF] border-[#D4D6DA] opacity-80 cursor-not-allowed hover:border-[#D4D6DA]",
      },
    },
    defaultVariants: {
      status: "default",
      inputSize: "md",
      disabled: false,
    },
  },
)

const Input = React.forwardRef(
  (
    {
      className,
      containerClassName,
      type = "text",
      status = "default",
      inputSize = "md",
      label,
      helperText,
      errorMessage,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      actionButton,
      disabled,
      ...props
    },
    ref,
  ) => {
    const currentStatus = errorMessage ? "error" : status

    return (
      <div className={cn("w-full flex flex-col gap-1.5", containerClassName)}>
        {label && (
          <label className="text-xs font-medium text-[#35404F] select-none">
            {label}
          </label>
        )}

        <div
          className={cn(
            inputContainerVariants({
              status: currentStatus,
              inputSize,
              disabled,
            }),
            className,
          )}
        >
          {LeftIcon && (
            <div className="text-[#7B878E] mr-2 shrink-0">
              <LeftIcon className="w-4 h-4" />
            </div>
          )}

          <input
            type={type}
            className="w-full h-full bg-transparent text-[#162235] placeholder:text-[#A2ABB0] text-sm focus:outline-none disabled:cursor-not-allowed disabled:text-[#7B878E]"
            ref={ref}
            disabled={disabled}
            {...props}
          />

          {currentStatus === "success" && (
            <div className="text-[#47A46A] ml-2 shrink-0">
              <CheckCircle2 className="w-4 h-4 fill-[#47A46A] text-white" />
            </div>
          )}

          {currentStatus === "error" && (
            <div className="text-[#E05E4D] ml-2 shrink-0">
              <AlertCircle className="w-4 h-4" />
            </div>
          )}

          {currentStatus === "warning" && (
            <div className="text-[#F5AF45] ml-2 shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
          )}

          {!errorMessage && RightIcon && currentStatus === "default" && (
            <div className="text-[#7B878E] ml-2 shrink-0">
              <RightIcon className="w-4 h-4" />
            </div>
          )}

          {actionButton && <div className="ml-2 shrink-0">{actionButton}</div>}
        </div>

        {(errorMessage || helperText) && (
          <p
            className={cn(
              "text-xs mt-0.5",
              currentStatus === "error"
                ? "text-[#E05E4D]"
                : currentStatus === "success"
                  ? "text-[#47A46A]"
                  : currentStatus === "warning"
                    ? "text-[#ED7B37]"
                    : "text-[#7B878E]",
            )}
          >
            {errorMessage || helperText}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = "Input"

export { Input, inputContainerVariants }
