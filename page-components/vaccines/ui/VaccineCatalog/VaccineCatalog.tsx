"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { DataTable, SortDirection } from "@datavac/ui-kit";
import { vaccineCatalogColumns } from "./vaccineCatalogColumns";

//мок данные
const DEMO_ROWS: VaccineCatalogItem[] = [
  {
    id: '1',
    name: 'Инфанрикс Гекса',
    officialName: 'Инфанрикс® Гекса (Вакцина для профилактики дифтерии, столбняка, коклюша (бесклеточная), полиомиелита (инактивированная), гепатита B комбинированная, адсорбированная в комплекте с вакциной для профилактики инфекции, вызываемой Haemophilus influenzae тип b конъюгированной, адсорбированной)',
    infections: ['Столбняк'],
    isAvailable: true,
  },
  {
    id: '2',
    name: 'Гемофильная (ростовский НИИ)',
    officialName: 'Вакцина гемофильная тип b конъюгированная',
    infections: ['Гемофильная инфекция типа b'],
    isAvailable: true,
  },
  {
    id: '3',
    name: 'Вактривир',
    officialName: 'ВАКТРИВИР Комбинированная вакцина против кори, краснухи и паротита культуральная живая',
    infections: ['Корь', 'Краснуха', 'Паротит'],
    isAvailable: true,
  },
  {
    id: '4',
    name: 'Хиберикс',
    officialName: null,
    infections: ['Гемофильная инфекция типа b'],
    isAvailable: false,
  },
]

export function VaccineCatalog() {
  const router = useRouter()
  const [sortField, setSortField] = useState('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  const sortedVaccines = useMemo(() => {
    const rows = [...DEMO_ROWS]

    // Сортировка по имени
    if (sortField === 'name') {
      rows.sort((a, b) =>
        sortDirection === 'asc'
          ? a.name.localeCompare(b.name, 'ru')
          : b.name.localeCompare(a.name, 'ru')
      );
    }
    // Сортировка по официальному названию
    else if (sortField === 'officialName') {
      rows.sort((a, b) => {
        const nameA = a.officialName;
        const nameB = b.officialName;

        // null значения всегда внизу
        if (nameA === null && nameB === null) return 0;
        if (nameA === null) return 1;
        if (nameB === null) return -1;

        // Оба не null - сортируем по алфавиту
        return sortDirection === 'asc'
          ? nameA.localeCompare(nameB, 'ru')
          : nameB.localeCompare(nameA, 'ru');
      });
    }

    return rows
  }, [sortField, sortDirection])

  const handleRowClick = (row: VaccineCatalogItem) => {
    router.push(`/vaccines/${row.id}`)
  }

  return (
    <DataTable
      columns={vaccineCatalogColumns}
      rows={sortedVaccines}
      getRowKey={(row) => row.id}
      isRowDisabled={(row) => !row.isAvailable}
      sortField={sortField}
      sortDirection={sortDirection}
      onSortChange={(field, direction) => {
        setSortField(field)
        setSortDirection(direction)
      }}
      onRowClick={handleRowClick}
      className={'gap-6'}
    />
  )
}
