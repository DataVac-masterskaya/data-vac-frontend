"use client";

import { Suspense } from "react";
import { SearchBar, ThemeToggle } from "@datavac/ui-kit";
import { AppSearchBar } from "./app-search-bar";

export function AppHeader() {
  return (
    <header className="flex h-14 items-center gap-4 border-b border-border bg-card px-6">
      <div className="flex-1">
        <Suspense
          fallback={
            <SearchBar placeholder="Поиск вакцины, инфекции, ингредиента..." />
          }
        >
          <AppSearchBar />
        </Suspense>
      </div>
      <ThemeToggle />
    </header>
  );
}
