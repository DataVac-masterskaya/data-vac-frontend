import type { Infection } from '@/shared/types/api';

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
