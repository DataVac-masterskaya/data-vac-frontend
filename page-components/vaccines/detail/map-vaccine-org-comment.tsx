import Link from 'next/link'
import type { ReactNode } from 'react'
import type { Vaccine } from '@/shared/types/api'
import { INFANRIX_DEMO_ID } from './constants'

export function mapVaccineToOrgComment(vaccine: Vaccine): ReactNode | undefined {
  // TODO: когда API будет готов — маппить vaccine.org_comment (rich text / markdown)
  // if (!vaccine.org_comment) return undefined

  if (vaccine.id !== INFANRIX_DEMO_ID) {
    return undefined
  }

  return (
    <>
      Критика или что-то вроде / зарубежная практика и комментарии, где мы могли бы указать своё
      мнение: к примеру, в РФ противопоказано при ГВ, а в другом мире нет; должна быть
      возможность вставить ссылки, например на{' '}
      <Link href="https://www.who.int/" className="text-accent underline">
        ВОЗ
      </Link>
      .
    </>
  )
}
