'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { DataTable, SortDirection } from '@datavac/ui-kit';
import { vaccineCatalogColumns } from './vaccineCatalogColumns';
import { VaccineCatalogItem } from '../../model/catalogTypes';

interface VaccineCatalogProps {
  data: VaccineCatalogItem[];
}

export function VaccineCatalog({
  data,
}: VaccineCatalogProps) {
  const router = useRouter();
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const sortedVaccines = useMemo(() => {
    const rows = [...data];

    // Сортировка по имени
    if (sortField === 'name') {
      rows.sort((a, b) =>
        sortDirection === 'asc'
          ? a.name.localeCompare(b.name, 'ru')
          : b.name.localeCompare(a.name, 'ru'),
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

    return rows;
  }, [data, sortField, sortDirection]);

  const handleRowClick = (row: VaccineCatalogItem) => {
    router.push(`/vaccines/${row.id}`);
  };

  return (
    <DataTable
      columns={vaccineCatalogColumns}
      rows={sortedVaccines}
      getRowKey={(row) => row.id}
      isRowDisabled={(row) => !row.isAvailable}
      sortField={sortField}
      sortDirection={sortDirection}
      onSortChange={(field, direction) => {
        setSortField(field);
        setSortDirection(direction);
      }}
      onRowClick={handleRowClick}
      disabledTooltip={
        <div className="max-w-[180px]">
          <p className="font-semibold">Об этой вакцине нет сведений.</p>
          <p className="italic opacity-60">Нажмите, чтобы прочитать полную информацию</p>
        </div>
      }
      className="gap-6"
    />
  );
}
