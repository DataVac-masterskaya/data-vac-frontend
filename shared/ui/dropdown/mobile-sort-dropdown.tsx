'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SortArrowsIcon } from '@/shared/ui/icons/sort-arrows-icon'

export type MobileSortDropdownOption = {
  value: string
  label: string
  href: string
}

type MobileSortDropdownProps = {
  value: string
  options: MobileSortDropdownOption[]
  ariaLabel?: string
}

function ChevronIcon({ up }: { up: boolean }) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      aria-hidden
      className={`shrink-0 text-fg-muted transition-transform ${up ? 'rotate-180' : ''}`}
    >
      <path
        d="M8 10.5 12 14.5l4-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function MobileSortDropdown({
  value,
  options,
  ariaLabel = 'Сортировка',
}: MobileSortDropdownProps) {
  const [open, setOpen] = useState(false)
  const activeLabel = options.find((option) => option.value === value)?.label ?? options[0]?.label ?? ''

  return (
    <div className="relative my-6 w-full md:hidden">
      <button
        type="button"
        className="flex h-12 w-full items-center gap-2 rounded-xl bg-card px-4 text-[#323335]"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen((prev) => !prev)}
      >
        <SortArrowsIcon className="h-6 w-6 shrink-0 text-[#E30C5C]" />
        <span className="min-w-0 flex-1 truncate text-left text-[14px] font-normal leading-[1.3]">
          {activeLabel}
        </span>
        <ChevronIcon up={open} />
      </button>

      {open ? (
        <>
          <button
            type="button"
            aria-label="Закрыть сортировку"
            className="fixed inset-0 z-10 bg-black/20"
            onClick={() => setOpen(false)}
          />
          <div className="absolute top-[calc(48px+4px)] z-20 h-[172px] w-full rounded-xl bg-card p-2">
            <ul className="flex flex-col gap-1">
              {options.map((option) => (
                <li key={option.value}>
                  <Link
                    href={option.href}
                    className="block h-9 rounded-lg px-2 text-[14px] font-normal leading-9 text-[#323335] transition-colors hover:bg-[#F3F3F3]"
                    onClick={() => setOpen(false)}
                  >
                    {option.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : null}
    </div>
  )
}
