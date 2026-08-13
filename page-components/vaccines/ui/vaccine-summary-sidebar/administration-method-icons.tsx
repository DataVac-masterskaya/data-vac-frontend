'use client'

import { AdministrationIcon, type AdministrationMethod } from '@datavac/ui-kit'
import { AdministrationImagePanel } from '@/shared/ui/AdministrationImagePanel/AdministrationImagePanel'
import { getAdministrationImage } from '@/page-components/vaccines/lib/administration-method-images'
import type { AdministrationMethodEntry } from './types'

type AdministrationMethodIconsProps = {
  methods: AdministrationMethodEntry[]
}

const MAX_ICONS = 5

const METHOD_INFO: Record<AdministrationMethod, { label: string; caption: string }> = {
  intramuscularly: {
    label: 'Внутримышечно',
    caption: 'Вакцина вводится инъекцией в мышечную ткань — как правило, в плечо или бедро.',
  },
  subcutaneously: {
    label: 'Подкожно',
    caption: 'Вакцина вводится инъекцией под кожу, обычно в плечо или живот.',
  },
  cutaneously: {
    label: 'Накожно',
    caption: 'Вакцина наносится на поверхность кожи без прокола.',
  },
  intradermally: {
    label: 'Внутрикожно',
    caption: 'Вакцина вводится тонкой иглой в толщу кожи — между эпидермисом и дермой.',
  },
  drops: {
    label: 'Перорально: капли',
    caption: 'Вакцина принимается через рот в виде капель.',
  },
  pills: {
    label: 'Перорально: таблетки',
    caption: 'Вакцина принимается через рот в форме таблеток.',
  },
  intranasally: {
    label: 'Интраназально',
    caption: 'Вакцина вводится в виде спрея или капель в полость носа.',
  },
}

export function AdministrationMethodIcons({ methods }: AdministrationMethodIconsProps) {
  const visibleMethods = methods.slice(0, MAX_ICONS)

  if (visibleMethods.length === 0) {
    return null
  }

  return (
    <div className="flex items-center gap-2.5">
      {visibleMethods.map(({ method, note, ageGroup, detailImageUrl }, index) => {
        const { label } = METHOD_INFO[method]
        return (
          <AdministrationImagePanel
            key={`${method}-${index}`}
            trigger={<AdministrationIcon method={method} />}
            title={label}
            imageSrc={detailImageUrl ?? getAdministrationImage(method, note, ageGroup)}
            imageAlt={label}
            caption={note || undefined}
          />
        )
      })}
    </div>
  )
}
