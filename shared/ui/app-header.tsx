'use client'
import { SearchBar, ThemeToggle } from '@datavac/ui-kit'

export function AppHeader() {
  return (
    <header className="flex h-14 items-center gap-4 border-b border-border bg-card px-6">
      <div className="flex-1">
        <SearchBar placeholder="Поиск вакцины, инфекции, ингредиента..." />
      </div>
      <ThemeToggle />
    </header>
  )
}
