'use client'

import { Pagination } from '@datavac/ui-kit'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export function PaginationControl({
  page,
  totalPages,
}: {
  page: number
  totalPages: number
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handlePageChange = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams.toString())
      if (newPage <= 1) {
        params.delete('page')
      } else {
        params.set('page', String(newPage))
      }
      const qs = params.toString()
      router.push(qs ? `?${qs}` : '?')
    },
    [router, searchParams],
  )

  if (totalPages <= 1) return null

  return (
    <div className="flex justify-center mt-6 pb-4">
      <Pagination mode="pages" page={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  )
}
