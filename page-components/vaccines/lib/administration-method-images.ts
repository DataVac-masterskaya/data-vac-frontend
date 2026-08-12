import type { AdministrationMethod } from '@datavac/ui-kit'

const NO_ILLUSTRATION = '/images/administration/no_illustration.png'
const BASE = '/images/administration'

type ImageRule = {
  noteIncludes?: string
  ageGroupIncludes?: string
  image: string
}

const RULES: Partial<Record<AdministrationMethod, ImageRule[]>> = {
  intramuscularly: [
    { noteIncludes: 'дельтовид', ageGroupIncludes: '4', image: 'intramuscularly_deltoid_4_5y.jpeg' },
    { noteIncludes: 'дельтовид', ageGroupIncludes: '5', image: 'intramuscularly_deltoid_4_5y.jpeg' },
    { noteIncludes: 'дельтовид', ageGroupIncludes: '6', image: 'intramuscularly_deltoid_6y_plus.jpg' },
    { noteIncludes: 'дельтовид',                        image: 'intramuscularly_deltoid.jpg' },
    {                                                    image: 'intramuscularly.jpg' },
  ],
  subcutaneously: [
    { noteIncludes: 'дельтовид', image: 'subcutaneously_deltoid.jpg' },
    { noteIncludes: 'бедр',      image: 'subcutaneously_thigh.jpg' },
    { noteIncludes: 'нижн',      image: 'subcutaneously_upper_arm.jpg' },
    { noteIncludes: 'верхн',     image: 'subcutaneously_upper_arm_third.jpeg' },
    {                            image: 'subcutaneously.jpg' },
  ],
}

export const ADMINISTRATION_METHOD_IMAGE: Record<AdministrationMethod, string> = {
  intramuscularly: `${BASE}/intramuscularly.jpg`,
  subcutaneously:  `${BASE}/subcutaneously.jpg`,
  intradermally:   `${BASE}/intradermally.jpg`,
  drops:           `${BASE}/drops.jpg`,
  intranasally:    NO_ILLUSTRATION,
  cutaneously:     NO_ILLUSTRATION,
  pills:           NO_ILLUSTRATION,
}

export function getAdministrationImage(
  method: AdministrationMethod,
  note?: string | null,
  ageGroup?: string | null,
): string {
  const rules = RULES[method]
  if (rules) {
    const n = (note ?? '').toLowerCase()
    const a = ageGroup ?? ''
    const match = rules.find(
      (r) =>
        (!r.noteIncludes || n.includes(r.noteIncludes)) &&
        (!r.ageGroupIncludes || a.includes(r.ageGroupIncludes)),
    )
    if (match) return `${BASE}/${match.image}`
  }
  return ADMINISTRATION_METHOD_IMAGE[method]
}
