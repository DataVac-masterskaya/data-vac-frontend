'use client';

import Link from 'next/link';
import { useSideMenuMode } from '@/shared/ui/SideMenu/use-side-menu-mode';

// TODO: заменить href: '#' на реальные пути после создания соответствующих страниц

const TABLET_FOOTER_LINKS = [
  { href: '#', label: 'АНО «Коллективный иммунитет»' },
  { href: '#', label: 'Политика конфиденциальности' },
  { href: '#', label: 'Все права защищены' },
];

const MOBILE_FOOTER_LINKS = [
  { href: '#', label: 'Структурированная информация с сайта Государственного реестра лекарственных средств' },
  { href: '#', label: 'Политика конфиденциальности' },
  { href: '#', label: 'АНО «Коллективный иммунитет»' },
  { href: '#', label: 'Все права защищены' },
];

export function Footer() {
  const mode = useSideMenuMode();

  if (mode === 'tablet') {
    return (
      <footer className="flex justify-between items-center text-xs text-fg-secondary">
       <div className="flex gap-6">
          <Link href={TABLET_FOOTER_LINKS[0].href}>
            {TABLET_FOOTER_LINKS[0].label}
          </Link>
          <Link href={TABLET_FOOTER_LINKS[1].href}>
            {TABLET_FOOTER_LINKS[1].label}
          </Link>
        </div>
        <Link href={TABLET_FOOTER_LINKS[2].href}>
          {TABLET_FOOTER_LINKS[2].label}
        </Link>
      </footer>
    );
  }

  if (mode === 'mobile') {
    return (
      <footer className="flex flex-col gap-2 text-xs text-fg-secondary text-center">
        {MOBILE_FOOTER_LINKS.map(({ href, label }) => (
          <Link key={label} href={href}>
            {label}
          </Link>
        ))}
      </footer>
    );
  }

  return null;
}
