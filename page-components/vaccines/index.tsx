import { BackLink } from '@/shared/ui/back-link'
import { Separator } from '@/shared/ui/separator'
import { sideMenuFont } from '@/shared/ui/SideMenu/side-menu-font'
import { normalizeVaccineSort, vaccineSortToTable } from './model/sort'
import { VACCINE_PAGE_WIDTH_CLASS, VaccinesTable } from './ui/vaccines-table'
import type { VaccineData } from './model/types'

function resultsLabel(count: number) {
  const mod10 = count % 10
  const mod100 = count % 100
  if (mod10 === 1 && mod100 !== 11) return `${count} результат`
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return `${count} результата`
  }
  return `${count} результатов`
}

// TODO: заменить на данные из API
const MOCK_TITLE = 'Клещевого энцефалита (Чумакова)'

const MOCK_VACCINES: VaccineData[] = [
  {
    id: '1',
    name: 'Клещевого энцефалита (Чумакова)',
    infections: ['Клещевой энцефалит'],
    routes: ['intramuscularly'],
    ageRange: 'от 36 мес. (3 лет) до ∞',
    permissibility: 'allowed',
    pregnancyPermissibility: 'caution',
    contraindications: ['острое заболевание'],
  },
  {
    id: '2',
    name: 'Чумная (лиофилизат, 48 НИИ)',
    infections: ['Чума'],
    routes: ['subcutaneously'],
    ageRange: 'от 24 мес. (2 лет) до ∞',
    permissibility: 'allowed',
    pregnancyPermissibility: 'allowed',
    contraindications: ['острое заболевание'],
  },
  {
    id: '3',
    name: 'Спутник V',
    infections: ['Ковид'],
    routes: ['intramuscularly'],
    ageRange: 'от 18 лет до ∞',
    permissibility: 'allowed',
    pregnancyPermissibility: 'allowed',
    contraindications: ['гиперчувствительность к компонентам'],
  },
  {
    id: '4',
    name: 'Холерная',
    infections: ['Холера'],
    routes: ['drops'],
    ageRange: 'от 18 лет до ∞',
    permissibility: 'allowed',
    pregnancyPermissibility: 'allowed',
    contraindications: ['острое заболевание'],
  },
  {
    id: '5',
    name: 'Клещевого энцефалита (Чумакова)',
    infections: ['Гемофильная инфекция типа B'],
    routes: ['intramuscularly', 'subcutaneously', 'intradermally', 'cutaneously', 'drops', 'pills', 'intranasally'],
    ageRange: 'от 36 мес. (3 лет) до 17 лет',
    permissibility: 'forbidden',
    pregnancyPermissibility: 'forbidden',
    contraindications: ['ВИЧ-инфекция у матери или отсутствие обследования на ВИЧ-инфекцию'],
    isIncompatible: true,
  },
  {
    id: '6',
    name: 'Инфанрикс',
    infections: ['Столбняк', 'Дифтерия', 'Коклюш'],
    routes: ['intramuscularly', 'subcutaneously', 'intradermally', 'cutaneously', 'drops', 'pills', 'intranasally'],
    ageRange: 'от 2 мес. до 7 лет',
    permissibility: 'allowed',
    pregnancyPermissibility: 'caution',
    contraindications: ['гиперчувствительность к компонентам'],
  },
  {
    id: '7',
    name: 'Клещевого энцефалита (Чумакова)',
    infections: ['Клещевой энцефалит'],
    routes: ['intramuscularly'],
    ageRange: 'от 36 мес. (3 лет) до ∞',
    permissibility: 'allowed',
    pregnancyPermissibility: 'caution',
    contraindications: ['острое заболевание'],
  },
  {
    id: '8',
    name: 'Пентаксим',
    infections: ['Столбняк', 'Дифтерия', 'Коклюш', 'Полиомиелит'],
    routes: ['intramuscularly'],
    ageRange: 'от 2 мес. до 6 лет',
    permissibility: 'allowed',
    pregnancyPermissibility: 'caution',
    contraindications: ['гиперчувствительность к компонентам'],
  },
  {
    id: '9',
    name: 'Инфанрикс Гекса',
    infections: ['Столбняк', 'Дифтерия', 'Коклюш', 'Гепатит В', 'Полиомиелит'],
    routes: ['intramuscularly'],
    ageRange: 'от 2 мес. до 2 лет',
    permissibility: 'allowed',
    pregnancyPermissibility: 'forbidden',
    contraindications: ['гиперчувствительность к компонентам', 'энцефалопатия'],
  },
  {
    id: '10',
    name: 'Варилрикс',
    infections: ['Ветряная оспа'],
    routes: ['subcutaneously'],
    ageRange: 'от 9 мес. до ∞',
    permissibility: 'allowed',
    pregnancyPermissibility: 'forbidden',
    contraindications: ['беременность', 'острое заболевание'],
  },
  {
    id: '11',
    name: 'Энджерикс-В',
    infections: ['Гепатит В'],
    routes: ['intramuscularly'],
    ageRange: 'от 0 до ∞',
    permissibility: 'allowed',
    pregnancyPermissibility: 'caution',
    contraindications: ['гиперчувствительность к компонентам'],
  },
  {
    id: '12',
    name: 'Превенар 13',
    infections: ['Пневмококковая инфекция'],
    routes: ['intramuscularly'],
    ageRange: 'от 2 мес. до 17 лет',
    permissibility: 'allowed',
    pregnancyPermissibility: 'caution',
    contraindications: ['острое заболевание'],
  },
  {
    id: '13',
    name: 'Вактривир',
    infections: ['Корь', 'Краснуха', 'Паротит'],
    routes: ['subcutaneously'],
    ageRange: 'от 12 мес. до ∞',
    permissibility: 'allowed',
    pregnancyPermissibility: 'forbidden',
    contraindications: ['беременность', 'иммунодефицит', 'острое заболевание'],
  },
  {
    id: '14',
    name: 'Гриппол Плюс',
    infections: ['Грипп'],
    routes: ['intramuscularly', 'subcutaneously'],
    ageRange: 'от 6 мес. до ∞',
    permissibility: 'allowed',
    pregnancyPermissibility: 'allowed',
    contraindications: ['гиперчувствительность к куриному белку'],
  },
  {
    id: '15',
    name: 'Ультрикс Квадри',
    infections: ['Грипп'],
    routes: ['intramuscularly'],
    ageRange: 'от 18 лет до ∞',
    permissibility: 'allowed',
    pregnancyPermissibility: 'caution',
    contraindications: ['острое заболевание', 'гиперчувствительность к компонентам'],
  },
  {
    id: '16',
    name: 'Бубо-Кок',
    infections: ['Столбняк', 'Дифтерия', 'Коклюш', 'Гепатит В'],
    routes: ['intramuscularly'],
    ageRange: 'от 3 мес. до 4 лет',
    permissibility: 'allowed',
    pregnancyPermissibility: 'forbidden',
    contraindications: ['гиперчувствительность к компонентам', 'энцефалопатия'],
  },
  {
    id: '17',
    name: 'Акт-ХИБ',
    infections: ['Гемофильная инфекция типа B'],
    routes: ['intramuscularly', 'subcutaneously'],
    ageRange: 'от 2 мес. до 5 лет',
    permissibility: 'allowed',
    pregnancyPermissibility: 'caution',
    contraindications: ['острое заболевание'],
    isIncompatible: true,
  },
  {
    id: '18',
    name: 'Полимилекс',
    infections: ['Полиомиелит'],
    routes: ['intramuscularly'],
    ageRange: 'от 2 мес. до ∞',
    permissibility: 'allowed',
    pregnancyPermissibility: 'caution',
    contraindications: ['острое заболевание', 'гиперчувствительность к компонентам'],
  },
  {
    id: '19',
    name: 'Регевак В',
    infections: ['Гепатит В'],
    routes: ['intramuscularly'],
    ageRange: 'от 0 до ∞',
    permissibility: 'allowed',
    pregnancyPermissibility: 'caution',
    contraindications: ['гиперчувствительность к компонентам'],
  },
  {
    id: '20',
    name: 'Менактра',
    infections: ['Менингококковая инфекция'],
    routes: ['intramuscularly'],
    ageRange: 'от 9 мес. до ∞',
    permissibility: 'allowed',
    pregnancyPermissibility: 'caution',
    contraindications: ['острое заболевание', 'синдром Гийена-Барре'],
  },
  {
    id: '21',
    name: 'Гексаксим',
    infections: ['Столбняк', 'Дифтерия', 'Коклюш', 'Полиомиелит', 'Гепатит В'],
    routes: ['intramuscularly'],
    ageRange: 'от 6 нед. до 2 лет',
    permissibility: 'allowed',
    pregnancyPermissibility: 'forbidden',
    contraindications: ['гиперчувствительность к компонентам', 'энцефалопатия', 'острое заболевание'],
  },
  {
    id: '22',
    name: 'Церварикс',
    infections: ['Вирус папилломы человека'],
    routes: ['intramuscularly'],
    ageRange: 'от 9 лет до ∞',
    permissibility: 'allowed',
    pregnancyPermissibility: 'forbidden',
    contraindications: ['беременность', 'гиперчувствительность к компонентам'],
  },
  {
    id: '23',
    name: 'Гардасил 9',
    infections: ['Вирус папилломы человека'],
    routes: ['intramuscularly'],
    ageRange: 'от 9 лет до 45 лет',
    permissibility: 'allowed',
    pregnancyPermissibility: 'forbidden',
    contraindications: ['беременность', 'острое заболевание'],
  },
  {
    id: '24',
    name: 'Приорикс',
    infections: ['Корь', 'Краснуха', 'Паротит'],
    routes: ['subcutaneously', 'intramuscularly'],
    ageRange: 'от 9 мес. до ∞',
    permissibility: 'allowed',
    pregnancyPermissibility: 'forbidden',
    contraindications: ['беременность', 'иммунодефицит'],
  },
]

export default async function VaccinesPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>
}) {
  const { sort } = await searchParams
  const sortValue = normalizeVaccineSort(sort)
  const { sortField, sortDirection } = vaccineSortToTable(sortValue)

  return (
    <div className={`${VACCINE_PAGE_WIDTH_CLASS} flex flex-col`}>
      <BackLink href="/" />

      <div className="flex items-baseline justify-between pt-4 pb-4">
        <h1 className={`${sideMenuFont.className} text-2xl font-normal text-fg`}>
          {MOCK_TITLE}
        </h1>
        <p className="shrink-0 text-xs font-normal text-fg-muted">
          {resultsLabel(MOCK_VACCINES.length)}
        </p>
      </div>

      <Separator />

      <div className="mt-4">
        <VaccinesTable
          vaccines={MOCK_VACCINES}
          sortField={sortField}
          sortDirection={sortDirection}
        />
      </div>
    </div>
  )
}
