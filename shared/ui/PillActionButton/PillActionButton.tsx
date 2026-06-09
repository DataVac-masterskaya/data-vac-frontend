import { cn } from '@datavac/ui-kit'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type PillActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'default' | 'copied'
  /** `false` — задать вес через `className` (например PDF: font-medium / summary-wide:font-normal). */
  textWeight?: 'medium' | 'normal' | false
}

const sizeClasses = 'text-[14px] summary-wide:text-[16px]'

export function PillActionButton({
  children,
  className,
  variant = 'default',
  textWeight = 'medium',
  ...props
}: PillActionButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'h-8 shrink-0 cursor-pointer whitespace-nowrap rounded-full px-3',
        sizeClasses,
        variant === 'copied'
          ? 'bg-fg-muted text-white hover:text-white'
          : 'bg-subtle text-fg hover:text-accent',
        textWeight === false ? undefined : textWeight === 'normal' ? 'font-normal' : 'font-medium',
        'transition-[background-color,color] duration-300 ease-out disabled:cursor-not-allowed disabled:hover:text-fg',
        className,
      )}
    >
      {children}
    </button>
  )
}
