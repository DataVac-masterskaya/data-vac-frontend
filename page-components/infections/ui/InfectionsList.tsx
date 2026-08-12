'use client'

import { useRouter } from 'next/navigation'
import { InfectionCard } from './InfectionCard'
import { buildVaccinesPageHref } from '@/page-components/vaccines/model/sort'

type Infection = {
  id: number
  name: string
  categoryLabel: string
}

type InfectionsListProps = {
  infections: Infection[]
}

export function InfectionsList({ infections }: InfectionsListProps) {
  const router = useRouter()

  return (
    <ul className="grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-2">
      {infections.map((infection) => (
        <li key={infection.id}>
          <InfectionCard
            name={infection.name}
            category={infection.categoryLabel}
            onClick={() => router.push(buildVaccinesPageHref({ infectionId: infection.id, label: infection.name }))}
          />
        </li>
      ))}
    </ul>
  )
}
