"use client";

import { DataTable } from "@datavac/ui-kit";
import type { SortDirection } from "@datavac/ui-kit";
import type { VaccineData } from "../../model/types";
import { useVaccineTableColumns } from "./vaccineColumns";

export type VaccineTableProps = {
  vaccines: VaccineData[];
  sortField: string;
  sortDirection: SortDirection;
  onSortChange: (field: string, direction: SortDirection) => void;
  onRowClick: (vaccine: VaccineData) => void;
  className?: string;
};

export function VaccineTable({
  vaccines,
  sortField,
  sortDirection,
  onSortChange,
  onRowClick,
  className,
}: VaccineTableProps) {
  const { layout, columns, maxWidthPx } = useVaccineTableColumns();

  return (
    <div className="w-full" style={{ maxWidth: maxWidthPx }}>
      <DataTable
        className={className ?? "w-full"}
        columns={columns}
        rows={vaccines}
        getRowKey={(row) => row.id}
        isRowDisabled={(row) => !!row.isIncompatible}
        onRowClick={onRowClick}
        sortField={sortField}
        sortDirection={sortDirection}
        onSortChange={onSortChange}
        desktopBreakpoint="lg"
        tabletColumns={3}
        mobileActionLabel="Подробнее"
        mobileDisabledLabel="Нет сведений"
      />
    </div>
  );
}
