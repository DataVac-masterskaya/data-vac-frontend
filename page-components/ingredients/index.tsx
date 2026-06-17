import { fetchIngredients } from "@/shared/api/ingredients";
import { BackLink } from "@/shared/ui/back-link";
import { Separator } from "@/shared/ui/separator";
import { sideMenuFont } from "@/shared/ui/SideMenu/side-menu-font";
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

function resultsLabel(count: number) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return `${count} результат`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return `${count} результата`;
  }
  return `${count} результатов`;
}

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
      <BackLink href="/" />

      <h1
        className={`${sideMenuFont.className} pt-4 pb-4 text-2xl font-normal text-fg`}
      >
        Компоненты
      </h1>

      <div className="flex min-h-8 flex-wrap items-center justify-between gap-4">
        <IngredientsFilter activeType={type} sort={sortValue} q={q} />
        <p className="shrink-0 text-xs font-normal text-fg-muted">
          {resultsLabel(results.length)}
        </p>
      </div>

      <Separator className="mt-4" />

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
