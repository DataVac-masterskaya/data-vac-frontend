'use client';

import { Suspense, type ReactNode } from 'react';
import { cn, SearchBar, ThemeToggle } from '@datavac/ui-kit';
import { DataVacLogo } from '@/shared/ui/Logo';
import { AppSearchBar } from '@/shared/ui/app-search-bar';
import { useSideMenuMode } from '@/shared/ui/SideMenu/use-side-menu-mode';
import { HeaderNavRow } from './header-nav-row';
import { useStickyHeader } from './use-sticky-header';

const SEARCH_PLACEHOLDER =
  'Для поиска введите название вакцины, противопоказания, инфекции';

const STICKY_HEADER_CLASS =
  'sticky top-0 z-40 w-full bg-[rgba(243,243,243,0.7)] backdrop-blur-[6px]';

function HeaderSearchBar() {
  return (
    <Suspense fallback={<SearchBar placeholder={SEARCH_PLACEHOLDER} />}>
      <AppSearchBar />
    </Suspense>
  );
}

function CollapsibleRow({
  hidden,
  children,
  className,
}: {
  hidden: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'overflow-hidden transition-all duration-200 ease-out',
        hidden ? 'max-h-0 opacity-0 pointer-events-none' : 'max-h-24 opacity-100',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Header() {
  const mode = useSideMenuMode();
  const variant = useStickyHeader();
  const isCompact = variant === 'compact';

  if (mode === 'desktop') {
    return (
      <header
        className={cn(
          STICKY_HEADER_CLASS,
          'flex h-14 items-center justify-between',
        )}
      >
        <CollapsibleRow hidden={isCompact} className="max-w-[572px] w-full flex-1">
          <div className="h-14 flex items-center">
            <HeaderSearchBar />
          </div>
        </CollapsibleRow>
        <ThemeToggle />
      </header>
    );
  }

  if (mode === 'tablet') {
    return (
      <header
        className={cn(
          STICKY_HEADER_CLASS,
          isCompact ? 'h-16' : 'pb-4',
        )}
      >
        <CollapsibleRow hidden={isCompact}>
          <div className="flex h-14 items-center gap-7 w-full">
            <DataVacLogo placement="sidebar" showText={true} />
            <div className="flex-1 min-w-0">
              <HeaderSearchBar />
            </div>
            <ThemeToggle />
          </div>
        </CollapsibleRow>
        <HeaderNavRow />
      </header>
    );
  }

  return (
    <header className={STICKY_HEADER_CLASS}>
      <div className="flex h-14 items-center justify-between gap-4 w-full">
        <DataVacLogo placement="sidebar" showText={true} />
        <ThemeToggle />
      </div>
      <CollapsibleRow hidden={isCompact} className="pt-4">
        <HeaderSearchBar />
      </CollapsibleRow>
    </header>
  );
}
