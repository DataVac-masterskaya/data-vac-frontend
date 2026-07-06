'use client'

import { TagFilter } from '@datavac/ui-kit'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type Category = {
  value: string
  label: string
}

type ContraindicationsFilterProps = {
  activeCategory: string
  categories: Category[]
}

export function ContraindicationsFilter({ activeCategory, categories }: ContraindicationsFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const getLabelByValue = (value: string) => {
    return categories.find((cat) => cat.value === value)?.label ?? 'Все'
  }

  const activeLabel = getLabelByValue(activeCategory)

  const handleChange = (tag: string | null) => {
    const params = new URLSearchParams(searchParams.toString())

    if (!tag || tag === 'Все') {
      params.delete('category')
    } else {
      const category = categories.find((cat) => cat.label === tag)
      if (category) {
        params.set('category', category.value)
      }
    }

    router.replace(`${pathname}?${params.toString()}`)
  }

  const tags = categories.map((cat) => cat.label)

  return <TagFilter tags={tags} active={activeLabel} onChange={handleChange} />
}
