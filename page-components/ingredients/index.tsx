import { fetchIngredients } from "@/shared/api/ingredients";
import { ResultsHeader } from "@/shared/ui/ResultsHeader";
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

export default async function IngredientsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; sort?: string; q?: string }>;
}) {
  const { type, sort, q } = await searchParams;
  const sortValue = normalizeIngredientSort(sort);
  const { results } = await fetchIngredients({
    sort: sortValue,
    type: type || undefined,
    q: q || undefined,
  });
  const { sortField, sortDirection } = ingredientSortToTable(sortValue);

  return (
    <div className={`${INGREDIENT_TABLE_WIDTH_CLASS} flex flex-col`}>
      <ResultsHeader
        title="Компоненты"
        count={results.length}
        filters={<IngredientsFilter activeType={type} sort={sortValue} q={q} />}
      />

      <div className="mt-4">
        <IngredientsTable
          ingredients={results}
          sortField={sortField}
          sortDirection={sortDirection}
          type={type}
          q={q}
        />
      </div>
    </div>
  );
}
