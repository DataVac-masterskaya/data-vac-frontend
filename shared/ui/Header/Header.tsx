'use client';

import { Suspense } from 'react';
import { SearchBar, ThemeToggle } from '@datavac/ui-kit';
import { DataVacLogo } from '@/shared/ui/Logo';
import { AppSearchBar } from '@/shared/ui/app-search-bar';
import { useSideMenuMode } from '@/shared/ui/SideMenu/use-side-menu-mode';

const SEARCH_PLACEHOLDER =
  'Для поиска введите название вакцины, противопоказания, инфекции';

function HeaderSearchBar() {
  return (
    <Suspense fallback={<SearchBar placeholder={SEARCH_PLACEHOLDER} />}>
      <AppSearchBar />
    </Suspense>
  );
}

export function Header() {
  const mode = useSideMenuMode();

  if (mode === 'desktop') {
    return (
      <header className="h-14 bg-page flex items-center justify-between w-full">
        <div className="max-w-[572px] w-full">
          <HeaderSearchBar />
        </div>
        <ThemeToggle />
      </header>
    );
  }

  if (mode === 'tablet') {
    return (
      <header className="h-14 bg-page flex items-center gap-7 w-full">
        <DataVacLogo placement="sidebar" showText={true} />
        <div className="flex-1">
          <HeaderSearchBar />
        </div>
        <ThemeToggle />
      </header>
    );
  }

  return (
    <header>
      <div className="h-14 bg-page flex items-center justify-between gap-4 w-full">
        <DataVacLogo placement="sidebar" showText={true} />
        <ThemeToggle />
      </div>
      <div className="bg-page pt-4">
        <HeaderSearchBar />
      </div>
    </header>
  );
}
