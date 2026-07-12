import type { ProcessedSection } from './ui/vaccine-detail-screen-processed.types'

// TODO: заменить на данные из API когда будет готов контракт.
// Полный demo-набор для id=2 (Инфанрикс Гекса); инфекции и беременность
// подмешиваются из vaccine в get-mock-processed-sections.ts.
// Для остальных id — короткий набор из полей Vaccine.
export const MOCK_PROCESSED_SECTIONS: ProcessedSection[] = [
  {
    kind: 'text',
    title: 'Полное название вакцины',
    text:
      'Инфанрикс® Гекса (Вакцина для профилактики дифтерии, столбняка, коклюша (бесклеточная), полиомиелита (инактивированная), гепатита B комбинированная, адсорбированная в комплекте с вакциной для профилактики инфекции, вызываемой Haemophilus influenzae тип b конъюгированной, адсорбированной)',
    note:
      'Используется в двух случаях:\n' +
      '1. На тех территориях, где показатель заболеваемости туберкулеза превышает 80 случаев на 100 000 населения;\n' +
      '2. Если в окружении новорожденного есть больной туберкулезом.',
  },
  {
    kind: 'linkList',
    title: 'Инфекция',
    // items подставляются из vaccine в getMockProcessedSections
    items: [],
    note: 'Текст важного примечания',
  },
  {
    kind: 'administration',
    title: 'Способы введения',
    rows: [
      {
        ageRange: 'от 6 месяцев до 11 месяцев',
        description: 'Внутримышечно - дельтовидная мышца (плечо)',
      },
      {
        ageRange: 'от 12 месяцев до 11 месяцев',
        description: 'Внутримышечно - дельтовидная мышца (плечо)',
      },
      {
        ageRange: 'от 6 месяцев до 11 месяцев',
        description: 'Внутримышечно - дельтовидная мышца (плечо)',
      },
      {
        ageRange: 'от 6 месяцев до 11 месяцев',
        description: 'Внутримышечно - дельтовидная мышца (плечо)',
      },
    ],
    note: 'Текст важного примечания',
  },
  {
    kind: 'groupedLinkList',
    title: 'Противопоказания',
    groups: [
      {
        label: 'Абсолютные',
        items: [
          {
            label: 'Гиперчувствительность к компонентам вакцины',
            href: '/contraindications/1',
            note: 'Текст важного примечания',
          },
          { label: 'Острое заболевание', href: '/contraindications/2' },
          {
            label: 'ВИЧ-инфекция у матери или отсутствие обследования на ВИЧ-инфекцию',
            href: '/contraindications/3',
          },
          {
            label: 'Невыясненная энцефалопатия в течение 7 дней после вакцинации',
            href: '/contraindications/4',
            note: 'Текст важного примечания',
          },
          { label: 'Недоношенность', href: '/contraindications/5' },
        ],
      },
      {
        label: 'Временные',
        items: [
          { label: 'Гиперчувствительность к компонентам вакцины', href: '/contraindications/1' },
          {
            label: 'Острое заболевание',
            href: '/contraindications/2',
            note: 'Текст важного примечания',
          },
          {
            label: 'ВИЧ-инфекция у матери или отсутствие обследования на ВИЧ-инфекцию',
            href: '/contraindications/3',
            note: 'Текст важного примечания',
          },
          {
            label: 'Невыясненная энцефалопатия в течение 7 дней после вакцинации',
            href: '/contraindications/4',
          },
          { label: 'Недоношенность', href: '/contraindications/5' },
        ],
      },
    ],
    note: 'Текст важного примечания',
  },
  {
    kind: 'groupedLinkList',
    title: 'Ингредиенты',
    groups: [
      {
        label: 'Действующее вещество',
        items: [{ label: 'Микробные клетки Mycobacterium bovis', href: '/ingredients/1' }],
      },
      {
        label: 'Вспомогательное вещество',
        items: [
          { label: 'Глутамат натрия', href: '/ingredients/2' },
          { label: 'Хлорид натрия', href: '/ingredients/3' },
          { label: 'Вода для инъекций', href: '/ingredients/4' },
        ],
      },
      {
        label: 'Антибиотик',
        items: [{ label: 'Вода для инъекций', href: '/ingredients/4' }],
      },
    ],
  },
  {
    kind: 'status',
    title: 'Применение при беременности и грудном вскармливании',
    icon: 'attention',
    text: 'Не разрешена',
  },
  {
    kind: 'status',
    title: 'Взаимодействие с препаратами',
    icon: 'incompatible',
    text: 'Несовместимо с:',
    items: [
      { label: 'Инфанрикс', href: '/vaccines/2' },
      { label: 'Приорикс Тетра', href: '/vaccines/3' },
      { label: 'Паротитная (Микроген)', href: '/vaccines/4' },
    ],
  },
  {
    kind: 'status',
    title: 'Одновременное введение с другими вакцинами',
    icon: 'neutral',
    text: 'Исследований не проводилось',
  },
  {
    kind: 'text',
    title: 'Хранение',
    text: '— от 2 до 8°С,\n— не замораживать,\n— вне доступа детей.',
  },
]
