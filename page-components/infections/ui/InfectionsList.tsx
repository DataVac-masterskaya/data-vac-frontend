'use client'

import { useRouter } from 'next/navigation'
import { InfectionCard } from './InfectionCard'

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
    <ul className="grid grid-cols-1 gap-1 md:grid-cols-2 md:!gap-2">
      {infections.map((infection) => (
        <li key={infection.id}>
          <InfectionCard
            name={infection.name}
            category={infection.categoryLabel}
            onClick={() => router.push(`/vaccines/search?infection_id=${infection.id}`)}
          />
        </li>
      ))}
    </ul>
  )
}
