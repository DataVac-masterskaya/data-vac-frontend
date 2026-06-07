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
    <ul className="flex flex-col gap-1">
      {infections.map((infection) => (
        <li key={infection.id}>
          <InfectionCard
            name={infection.name}
            category={infection.categoryLabel}
            onClick={() => router.push(`/vaccines?infection_id=${infection.id}`)}
          />
        </li>
      ))}
    </ul>
  )
}
