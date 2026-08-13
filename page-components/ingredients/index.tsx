import { fetchIngredients } from "@/shared/api/ingredients";
import type { Ingredient } from "@/shared/types/api";
import { ResultsHeader } from "@/shared/ui/ResultsHeader";
import { PaginationControl } from "@/shared/ui/PaginationControl";
import {
  buildIngredientsPageHref,
  ingredientSortToTable,
  normalizeIngredientSort,
} from "./model/sort";
import {
  INGREDIENT_TABLE_WIDTH_CLASS,
  IngredientsTable,
} from "./ui/ingredients-table";
import { IngredientsFilter } from "./ui/ingredients-filter";

const PAGE_SIZE = 20

export default async function IngredientsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; sort?: string; q?: string; page?: string }>;
}) {
  const { type, sort, q, page: pageParam } = await searchParams;
  const page = pageParam ? Math.max(1, Number(pageParam)) : 1
  const sortValue = normalizeIngredientSort(sort);
  const { results, count } = await fetchIngredients({
    sort: sortValue,
    type: type || undefined,
    q: q || undefined,
    limit: PAGE_SIZE,
    offset: (page - 1) * PAGE_SIZE,
  }).catch(() => ({ results: [] as Ingredient[], count: 0 }));
  const { sortField, sortDirection } = ingredientSortToTable(sortValue);
  const totalPages = count ? Math.ceil(count / PAGE_SIZE) : 1

  return (
    <div className={`${INGREDIENT_TABLE_WIDTH_CLASS} flex flex-col`}>
      <ResultsHeader
        title="Ингредиенты"
        count={count}
        filters={<IngredientsFilter activeType={type} sort={sortValue} q={q} />}
      />

      <div className="mt-4">
        {results.length === 0 ? (
          <div className="mt-4 bg-card rounded-2xl p-10 text-center text-fg-secondary">
            Ничего не найдено
          </div>
        ) : (
          <IngredientsTable
            ingredients={results}
            sortField={sortField}
            sortDirection={sortDirection}
            type={type}
            q={q}
          />
        )}
      </div>
      <PaginationControl page={page} totalPages={totalPages} />
    </div>
  );
}
