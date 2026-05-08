'use client'
import { SearchBar, ThemeToggle } from '@datavac/ui-kit'

export function AppHeader() {
  return (
    <header className="h-14 bg-white border-b border-[#E4E4E4] px-6 flex items-center gap-4">
      <div className="flex-1">
        <SearchBar placeholder="Поиск вакцины, инфекции, ингредиента..." />
      </div>
      <ThemeToggle />
    </header>
  )
}
