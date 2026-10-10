import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Padrão de Ícones Estudo Bíblico
 * - Grid: 24x24 px
 * - Traço (Line Stroke): 1.5px centralizado
 * - Formas suaves e elegantes (Outline e Filled)
 */

function createIcon(displayName, outlinePaths, filledPaths) {
  const Icon = React.forwardRef(
    (
      {
        size = 24,
        variant = "outline", // "outline" | "filled"
        className,
        color = "currentColor",
        strokeWidth = 1.5,
        ...props
      },
      ref,
    ) => {
      const isFilled = variant === "filled"

      return (
        <svg
          ref={ref}
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={isFilled ? color : "none"}
          stroke={isFilled ? "none" : color}
          strokeWidth={isFilled ? 0 : strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn("shrink-0 transition-colors", className)}
          {...props}
        >
          {isFilled ? filledPaths || outlinePaths : outlinePaths}
        </svg>
      )
    },
  )

  Icon.displayName = displayName
  return Icon
}

// ✦ Ícone Estrela de 4 Pontas Curvada (Identidade Visual do Topo)
export const SparkleStar = createIcon(
  "SparkleStar",
  <path d="M12 2C12 7.52285 16.4772 12 22 12C16.4772 12 12 16.4772 12 22C12 16.4772 7.52285 12 2 12C7.52285 12 12 7.52285 12 2Z" />,
  <path d="M12 2C12 7.52285 16.4772 12 22 12C16.4772 12 12 16.4772 12 22C12 16.4772 7.52285 12 2 12C7.52285 12 12 7.52285 12 2Z" />
)

// 👤 User / Usuário (Modelo de Referência 24x24 com 1.5px stroke)
export const UserIcon = createIcon(
  "UserIcon",
  <>
    <circle cx="12" cy="7" r="4" />
    <path d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20" />
  </>,
  <>
    <circle cx="12" cy="7" r="4" />
    <path d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20H4Z" />
  </>
)

// 📖 Livro Aberto / Bíblia
export const BibleIcon = createIcon(
  "BibleIcon",
  <>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <path d="M9 7h6" />
    <path d="M9 11h4" />
  </>,
  <>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20v5H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v15H6.5A2.5 2.5 0 0 0 4 19.5z" />
  </>
)

// ⬆️ 1. Olhe para cima (Deus & Caráter)
export const LookUpIcon = createIcon(
  "LookUpIcon",
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 16V8" />
    <path d="M8.5 11.5L12 8l3.5 3.5" />
  </>,
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16V8" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.5 11.5L12 8l3.5 3.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </>
)

// ⬇️ 2. Olhe para baixo (Humanidade & Fragilidades)
export const LookDownIcon = createIcon(
  "LookDownIcon",
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v8" />
    <path d="M15.5 12.5L12 16l-3.5-3.5" />
  </>,
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v8" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15.5 12.5L12 16l-3.5-3.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </>
)

// ❓ 3. O que não entendi (Dúvidas & Aprofundamento)
export const QuestionIcon = createIcon(
  "QuestionIcon",
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2 2-2 3" />
    <circle cx="12.25" cy="16.25" r="0.75" fill="currentColor" />
  </>,
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2 2-2 3" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12.25" cy="16.25" r="0.75" fill="#FFFFFF" />
  </>
)

// 💡 4. Insights (Destaques & Revelações)
export const InsightIcon = createIcon(
  "InsightIcon",
  <>
    <path d="M9 18h6" />
    <path d="M10 21h4" />
    <path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.7 3.5 5.8V17a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-2.2C17.5 13.7 19 11.5 19 9a7 7 0 0 0-7-7z" />
  </>,
  <>
    <path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.7 3.5 5.8V17a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-2.2C17.5 13.7 19 11.5 19 9a7 7 0 0 0-7-7z" />
    <path d="M9 19h6" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10 21.5h4" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
  </>
)

// ➡️ 5. Aplicação (Vida Prática & Ação)
export const ApplyIcon = createIcon(
  "ApplyIcon",
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12h8" />
    <path d="M12.5 8.5L16 12l-3.5 3.5" />
  </>,
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12h8" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12.5 8.5L16 12l-3.5 3.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </>
)

// 🔍 Search
export const SearchIcon = createIcon(
  "SearchIcon",
  <>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-4-4" />
  </>,
  <>
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.5-4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </>
)

// 📋 Copy
export const CopyIcon = createIcon(
  "CopyIcon",
  <>
    <rect x="8" y="8" width="12" height="12" rx="2" />
    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
  </>,
  <>
    <rect x="8" y="8" width="12" height="12" rx="2" />
    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" fill="currentColor" />
  </>
)

// ✅ Check
export const CheckIcon = createIcon(
  "CheckIcon",
  <path d="M5 12l5 5L20 7" />,
  <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
)

// 🔗 Share
export const ShareIcon = createIcon(
  "ShareIcon",
  <>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="M8.59 13.51l6.83 3.98" />
    <path d="M15.41 6.51L8.59 10.49" />
  </>,
  <>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="M8.59 13.51l6.83 3.98" stroke="currentColor" strokeWidth="1.5" />
    <path d="M15.41 6.51L8.59 10.49" stroke="currentColor" strokeWidth="1.5" />
  </>
)

// 🏷️ Bookmark
export const BookmarkIcon = createIcon(
  "BookmarkIcon",
  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />,
  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
)

// ☀️ Sun
export const SunIcon = createIcon(
  "SunIcon",
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="M4.93 4.93l1.41 1.41" />
    <path d="M17.66 17.66l1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="M4.93 19.07l1.41-1.41" />
    <path d="M17.66 6.34l1.41-1.41" />
  </>,
  <>
    <circle cx="12" cy="12" r="5" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </>
)

// 🌙 Moon
export const MoonIcon = createIcon(
  "MoonIcon",
  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
)

// 🔒 Lock
export const LockIcon = createIcon(
  "LockIcon",
  <>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </>,
  <>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="1.5" />
  </>
)

// 🔔 Bell
export const BellIcon = createIcon(
  "BellIcon",
  <>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </>,
  <>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" fill="currentColor" />
  </>
)

// ⚡ Bolt / Raio
export const BoltIcon = createIcon(
  "BoltIcon",
  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
)

// 🛡️ Shield
export const ShieldIcon = createIcon(
  "ShieldIcon",
  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
)

// 💎 Diamond
export const DiamondIcon = createIcon(
  "DiamondIcon",
  <path d="M6 3h12l4 6-10 12L2 9l4-6z" />,
  <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
)
