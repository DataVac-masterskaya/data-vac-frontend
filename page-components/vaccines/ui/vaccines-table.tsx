"use client";

import { useRouter } from "next/navigation";
import type { SortDirection } from "@datavac/ui-kit";
import type { VaccineData } from "../model/types";
import { buildVaccinesPageHref, tableSortToVaccine } from "../model/sort";
import { VaccineTable } from "./VaccineTable/VaccineTable";

type VaccinesTableProps = {
  vaccines: VaccineData[];
  sortField: string;
  sortDirection: SortDirection;
  className?: string;
};

export function VaccinesTable({
  vaccines,
  sortField,
  sortDirection,
  className,
}: VaccinesTableProps) {
  const router = useRouter();

  return (
    <VaccineTable
      vaccines={vaccines}
      sortField={sortField}
      sortDirection={sortDirection}
      className={className}
      onSortChange={(field, direction) => {
        router.push(
          buildVaccinesPageHref({
            sort: tableSortToVaccine(field, direction),
          }),
        );
      }}
      onRowClick={(vaccine) => {
        router.push(`/vaccines/${vaccine.id}`);
      }}
    />
  );
}
