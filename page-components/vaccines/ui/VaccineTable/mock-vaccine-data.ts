import type { VaccineData } from '../../model/types'

export const MOCK_VACCINE_DATA_ROWS: VaccineData[] = [
  {
    id: '1',
    name: 'Пентаксим',
    infections: [
      { id: 1, name: 'Дифтерия' },
      { id: 2, name: 'Столбняк' },
      { id: 3, name: 'Коклюш' },
      { id: 4, name: 'Полиомиелит' },
    ],
    routes: [
      { code: 'intramuscularly', knownMethod: 'intramuscularly', listIconUrl: null },
      { code: 'subcutaneously', knownMethod: 'subcutaneously', listIconUrl: null },
      { code: 'intradermally', knownMethod: 'intradermally', listIconUrl: null },
      { code: 'cutaneously', knownMethod: 'cutaneously', listIconUrl: null },
      { code: 'intranasally', knownMethod: 'intranasally', listIconUrl: null },
    ],
    contraindications: [
      'Острое заболевание с температурой',
      'Гиперчувствительность к компонентам',
      'Беременность',
      'Иммунодефицитные состояния',
      'ОНМК',
      'Судороги в анамнезе',
      'Неврологические заболевания',
      'Лихорадка',
      'Аллергия на антибиотики',
    ],
    ageRange: 'от 2 мес. до ∞',
    permissibility: 'caution',
    pregnancyPermissibility: 'forbidden',
  },
  {
    id: '6',
    name: 'Энджерикс Б',
    infections: [{ id: 6, name: 'Гепатит B' }],
    routes: [
      { code: 'intramuscularly', knownMethod: 'intramuscularly', listIconUrl: null },
      { code: 'subcutaneously', knownMethod: 'subcutaneously', listIconUrl: null },
    ],
    contraindications: [],
    ageRange: 'от 0 мес. до ∞',
    permissibility: 'allowed',
    pregnancyPermissibility: 'allowed',
  },
  {
    id: 'blocked',
    name: 'Недоступная вакцина',
    infections: [{ id: 11, name: 'Клещевой энцефалит' }],
    routes: [],
    contraindications: [],
    ageRange: '—',
    permissibility: 'forbidden',
    pregnancyPermissibility: 'forbidden',
    isIncompatible: true,
  },
]
