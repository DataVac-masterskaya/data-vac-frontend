import type {
  Contraindication,
  Infection,
  Ingredient,
  VaccineListItem,
} from '@/shared/types/api';

export const MOCK_VACCINES: VaccineListItem[] = [
  {
    id: 1,
    name: 'Пентаксим',
    official_name: null,
    infections: [
      { id: 1, name: 'Дифтерия' },
      { id: 2, name: 'Столбняк' },
      { id: 3, name: 'Коклюш' },
      { id: 4, name: 'Полиомиелит' },
      { id: 5, name: 'Гемофильная инфекция' },
    ],
    is_available_in_rf: false,
    popularity: 95,
  },
  {
    id: 2,
    name: 'Инфанрикс Гекса',
    official_name:
      'Инфанрикс® Гекса (Вакцина для профилактики дифтерии, столбняка, коклюша (бесклеточная), полиомиелита (инактивированная), гепатита B комбинированная, адсорбированная в комплекте с вакциной для профилактики инфекции, вызываемой Haemophilus influenzae тип b конъюгированной, адсорбированной)',
    infections: [
      { id: 1, name: 'Дифтерия' },
      { id: 2, name: 'Столбняк' },
      { id: 3, name: 'Коклюш' },
      { id: 6, name: 'Гепатит B' },
      { id: 4, name: 'Полиомиелит' },
      { id: 7, name: 'Хиб' },
    ],
    is_available_in_rf: true,
    popularity: 90,
  },
  {
    id: 3,
    name: 'Приорикс',
    official_name: null,
    infections: [
      { id: 5, name: 'Корь' },
      { id: 6, name: 'Краснуха' },
      { id: 7, name: 'Паротит' },
    ],
    is_available_in_rf: false,
    popularity: 88,
  },
  {
    id: 4,
    name: 'Варилрикс',
    official_name: null,
    infections: [{ id: 9, name: 'Ветряная оспа' }],
    is_available_in_rf: false,
    popularity: 75,
  },
  {
    id: 5,
    name: 'Гардасил',
    official_name: null,
    infections: [{ id: 10, name: 'Вирус папилломы человека' }],
    is_available_in_rf: false,
    popularity: 72,
  },
  {
    id: 6,
    name: 'Энджерикс Б',
    official_name: null,
    infections: [{ id: 6, name: 'Гепатит B' }],
    is_available_in_rf: false,
    popularity: 70,
  },
  {
    id: 7,
    name: 'Ультрикс',
    official_name: null,
    infections: [{ id: 10, name: 'Грипп' }],
    is_available_in_rf: false,
    popularity: 65,
  },
  {
    id: 8,
    name: 'Превенар 13',
    official_name: null,
    infections: [{ id: 11, name: 'Пневмококковая инфекция' }],
    is_available_in_rf: false,
    popularity: 60,
  },
];

export const MOCK_INFECTIONS: Infection[] = [
  { id: 1, name: 'Дифтерия', category: 'national_calendar', popularity: 90 },
  { id: 2, name: 'Столбняк', category: 'national_calendar', popularity: 88 },
  { id: 3, name: 'Коклюш', category: 'national_calendar', popularity: 85 },
  { id: 4, name: 'Полиомиелит', category: 'national_calendar', popularity: 83 },
  { id: 5, name: 'Корь', category: 'national_calendar', popularity: 80 },
  { id: 6, name: 'Краснуха', category: 'national_calendar', popularity: 78 },
  { id: 7, name: 'Паротит', category: 'national_calendar', popularity: 76 },
  { id: 8, name: 'Гепатит B', category: 'national_calendar', popularity: 74 },
  { id: 9, name: 'Ветряная оспа', category: 'extended', popularity: 72 },
  { id: 10, name: 'Грипп', category: 'extended', popularity: 70 },
];

export const MOCK_INGREDIENTS: Ingredient[] = [
  { id: 1, name: 'Алюминия гидроксид', type: 'Адъювант', popularity: 95 },
  { id: 2, name: 'Тиомерсал', type: 'Консервант', popularity: 80 },
  { id: 3, name: 'Формальдегид', type: 'Инактиватор', popularity: 75 },
  { id: 4, name: 'Полисорбат 80', type: 'Стабилизатор', popularity: 70 },
  { id: 5, name: 'Дрожжевой белок', type: 'Субстрат', popularity: 65 },
  { id: 6, name: 'Неомицин', type: 'Антибиотик', popularity: 60 },
  { id: 7, name: 'Желатин', type: 'Стабилизатор', popularity: 55 },
  { id: 8, name: 'Яичный белок', type: 'Субстрат', popularity: 50 },
];

export const MOCK_CONTRAINDICATIONS: Contraindication[] = [
  // Гиперчувствительность — одиночная строка (ContraIndicationRow)
  {
    id: 1,
    name: 'Гиперчувствительность к компонентам вакцины',
    category: { id: 1, name: 'Гиперчувствительность' },
    subcategory: null,
    popularity: 95,
  },

  // Хронические заболевания → подгруппа «Хронические заболевания печени»
  {
    id: 2,
    name: 'Хроническое заболевание желудочно-кишечного тракта',
    category: { id: 5, name: 'Хронические заболевания' },
    subcategory: 'Хронические заболевания печени',
    popularity: 90,
  },
  {
    id: 3,
    name: 'Хроническое заболевание эндокринной системы',
    category: { id: 5, name: 'Хронические заболевания' },
    subcategory: 'Хронические заболевания печени',
    popularity: 88,
  },
  {
    id: 4,
    name: 'Хроническое заболевание печени',
    category: { id: 5, name: 'Хронические заболевания' },
    subcategory: 'Хронические заболевания печени',
    popularity: 86,
  },
  {
    id: 5,
    name: 'Хроническое заболевание почек',
    category: { id: 5, name: 'Хронические заболевания' },
    subcategory: 'Хронические заболевания печени',
    popularity: 84,
  },

  // Хронические заболевания → подгруппа «Хронические заболевания сердца»
  {
    id: 6,
    name: 'Хроническое заболевание желудочно-кишечного тракта',
    category: { id: 5, name: 'Хронические заболевания' },
    subcategory: 'Хронические заболевания сердца',
    popularity: 82,
  },
  {
    id: 7,
    name: 'Хроническое заболевание эндокринной системы',
    category: { id: 5, name: 'Хронические заболевания' },
    subcategory: 'Хронические заболевания сердца',
    popularity: 80,
  },
  {
    id: 8,
    name: 'Хроническое заболевание печени',
    category: { id: 5, name: 'Хронические заболевания' },
    subcategory: 'Хронические заболевания сердца',
    popularity: 78,
  },
  {
    id: 9,
    name: 'Хроническое заболевание почек',
    category: { id: 5, name: 'Хронические заболевания' },
    subcategory: 'Хронические заболевания сердца',
    popularity: 76,
  },

  // Острые заболевания
  {
    id: 10,
    name: 'Острое инфекционное заболевание с лихорадкой',
    category: { id: 2, name: 'Острые заболевания' },
    subcategory: null,
    popularity: 80,
  },
  {
    id: 11,
    name: 'Обострение хронического заболевания',
    category: { id: 2, name: 'Острые заболевания' },
    subcategory: null,
    popularity: 75,
  },

  // Аллергии
  {
    id: 12,
    name: 'Тяжелые аллергические реакции',
    category: { id: 3, name: 'Аллергии' },
    subcategory: null,
    popularity: 75,
  },
  {
    id: 13,
    name: 'Аллергия на дрожжи',
    category: { id: 3, name: 'Аллергии' },
    subcategory: null,
    popularity: 70,
  },
  {
    id: 14,
    name: 'Аллергия на формальдегид',
    category: { id: 3, name: 'Аллергии' },
    subcategory: null,
    popularity: 65,
  },
  {
    id: 15,
    name: 'Аллергия на куриный белок',
    category: { id: 3, name: 'Аллергии' },
    subcategory: null,
    popularity: 60,
  },

  // Иммунодефициты
  {
    id: 16,
    name: 'ВИЧ',
    category: { id: 8, name: 'Иммунодефициты' },
    subcategory: null,
    popularity: 70,
  },
  {
    id: 17,
    name: 'ВИЧ у матери',
    category: { id: 8, name: 'Иммунодефициты' },
    subcategory: null,
    popularity: 65,
  },
  {
    id: 18,
    name: 'Иммунодефицит у родственников',
    category: { id: 8, name: 'Иммунодефициты' },
    subcategory: null,
    popularity: 60,
  },
];
