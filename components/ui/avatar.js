import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const avatarVariants = cva(
  "relative inline-flex items-center justify-center rounded-full font-bold select-none shrink-0 overflow-hidden",
  {
    variants: {
      size: {
        sm: "h-6 w-6 text-[10px]",
        md: "h-10 w-10 text-xs",
        lg: "h-[54px] w-[54px] text-sm",
        xl: "h-16 w-16 text-base",
      },
      variant: {
        blue: "bg-[#3266F1] text-white",
        neutral: "bg-[#EEF3FF] text-[#3266F1]",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "blue",
    },
  },
)

const statusDotVariants = cva(
  "absolute bottom-0 right-0 rounded-full ring-2 ring-white",
  {
    variants: {
      status: {
        online: "bg-[#47A46A]",
        offline: "bg-[#A2ABB0]",
      },
      size: {
        sm: "h-1.5 w-1.5",
        md: "h-2.5 w-2.5",
        lg: "h-3.5 w-3.5",
        xl: "h-4 w-4",
      },
    },
    defaultVariants: {
      status: "online",
      size: "md",
    },
  },
)

function Avatar({
  src,
  alt = "",
  initials,
  size = "md",
  variant = "blue",
  status, // "online" | "offline"
  className,
  ...props
}) {
  const [imageError, setImageError] = React.useState(false)

  return (
    <div className="relative inline-block">
      <div
        className={cn(avatarVariants({ size, variant }), className)}
        {...props}
      >
        {src && !imageError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            onError={() => setImageError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <span>{initials || alt?.slice(0, 2)?.toUpperCase() || "SA"}</span>
        )}
      </div>

      {status && <span className={cn(statusDotVariants({ status, size }))} />}
    </div>
  )
}

function AvatarGroup({ users = [], max = 4, size = "md", className }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const containerRef = React.useRef(null)

  const visibleUsers = users.slice(0, max)
  const overflowCount = users.length - max

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

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative inline-flex items-center -space-x-2.5",
        isOpen && "z-40",
        className,
      )}
    >
      {visibleUsers.map((user, idx) => (
        <div key={idx} className="ring-2 ring-white rounded-full">
          <Avatar
            src={user.avatar}
            initials={user.initials}
            alt={user.name}
            size={size}
          />
        </div>
      ))}

      {overflowCount > 0 && (
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="ring-2 ring-white rounded-full h-10 w-10 bg-[#EEF3FF] text-[#3266F1] font-semibold text-xs flex items-center justify-center hover:bg-[#C6D8FF] transition-colors cursor-pointer"
          >
            +{overflowCount}
          </button>

          {isOpen && (
            <div className="absolute top-[calc(100%+6px)] left-0 z-50 w-56 bg-white border border-[#E7E9EA] rounded-2xl shadow-xl p-2 animate-in fade-in zoom-in-95 duration-100">
              <div className="text-[11px] font-semibold text-[#7B878E] px-3 py-1.5 uppercase tracking-wider">
                Membros
              </div>
              <div className="flex flex-col gap-1 max-h-48 overflow-y-auto">
                {users.slice(max).map((u, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-[#FAFAFB] text-xs text-[#162235]"
                  >
                    <Avatar
                      src={u.avatar}
                      initials={u.initials}
                      alt={u.name}
                      size="sm"
                    />
                    <span className="font-medium truncate">{u.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export { Avatar, AvatarGroup }
