'use client';

import Link from 'next/link';
import { useSideMenuMode } from '@/shared/ui/SideMenu/use-side-menu-mode';
import { PrivacyPolicyPanel } from '@/shared/ui/PrivacyPolicyPanel/privacy-policy-panel'

// TODO: заменить href: '#' на реальные пути после создания соответствующих страниц

const TABLET_FOOTER_LINKS = [
  { href: '#', label: 'АНО «Коллективный иммунитет»' },
  { href: '#', label: 'Все права защищены' },
];

const MOBILE_FOOTER_LINKS = [
  { href: '#', label: 'Структурированная информация с сайта Государственного реестра лекарственных средств' },
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
          <PrivacyPolicyPanel trigger={<button className='w-fit cursor-pointer' type='button' children='Политика конфиденциальности'/>}/>
        </div>
        <Link href={TABLET_FOOTER_LINKS[1].href}>
          {TABLET_FOOTER_LINKS[1].label}
        </Link>
      </footer>
    );
  }

  if (mode === 'mobile') {
    return (
      <footer className="flex flex-col gap-2 text-xs text-fg-secondary text-center items-center mb-20">
        {MOBILE_FOOTER_LINKS.map(({ href, label }) => (
          <Link key={label} href={href}>
            {label}
          </Link>
        ))}
        <PrivacyPolicyPanel trigger={<button className='w-fit cursor-pointer' type='button' children='Политика конфиденциальности'/>}/>
      </footer>
    );
  }

  return null;
}
