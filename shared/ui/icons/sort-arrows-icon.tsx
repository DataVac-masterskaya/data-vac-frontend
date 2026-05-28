import type { SVGProps } from 'react'

type SortArrowsIconProps = SVGProps<SVGSVGElement>

export function SortArrowsIcon({ className, ...props }: SortArrowsIconProps) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
      {...props}
    >
      <path
        d="M8 4v16m0 0-3-3m3 3 3-3"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 20V4m0 0-3 3m3-3 3 3"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
