"use client";

import { useRouter } from "next/navigation";
import { DataTable } from "@datavac/ui-kit";
import type { Ingredient } from "@/shared/types/api";
import { buildIngredientsPageHref, tableSortToIngredient } from "../model/sort";
import type { SortDirection } from "@datavac/ui-kit";
import { getIngredientColumns } from "./ingredient-card/ingredient-columns";

export const INGREDIENT_TABLE_WIDTH_CLASS =
  "w-full max-w-[720px] xl:max-w-[1016px] min-[1920px]:max-w-[1312px]";

type Props = {
  ingredients: Ingredient[];
  sortField: string;
  sortDirection: SortDirection;
  type?: string;
  q?: string;
  className?: string;
};

export function IngredientsTable({
  ingredients,
  sortField,
  sortDirection,
  type,
  q,
  className,
}: Props) {
  const router = useRouter();

  return (
    <DataTable
      className={className}
      columns={getIngredientColumns()}
      rows={ingredients}
      getRowKey={(row) => String(row.id)}
      sortField={sortField}
      sortDirection={sortDirection}
      onSortChange={(field, dir) => {
        router.push(
          buildIngredientsPageHref({
            type,
            sort: tableSortToIngredient(field, dir),
            q,
          }),
        );
      }}
    />
  );
}
