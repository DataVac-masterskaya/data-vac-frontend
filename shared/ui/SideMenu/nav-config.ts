export const SOURCE_CAPTION =
  'Структурированная информация с сайта Государственного реестра лекарственных средств'

export const SUPPORT_BUTTON_LABEL = 'Поддержать проект'

export const MOBILE_SUPPORT_BUTTON_LABEL = 'Помощь проекту'

/** Планшет: пункты меню и кнопка — Inter Tight 400, 14px, line-height 130% */
export const SIDE_MENU_TABLET_LABEL_CLASS =
  'text-[14px] font-normal leading-[1.3] tracking-normal'

/** Десктоп: пункты меню — Inter Tight 400, 16px, line-height 20px */
export const SIDE_MENU_DESKTOP_NAV_CLASS =
  'text-[16px] font-normal leading-5 tracking-normal'

/** Десктоп: кнопка поддержки — Inter Tight 500, 16px, line-height 110% */
export const SIDE_MENU_DESKTOP_SUPPORT_BUTTON_CLASS =
  'text-center text-[16px] font-medium leading-[1.1] tracking-normal'

export const COPYRIGHT =
  'АНО «Коллективный иммунитет». Все права защищены'

export type NavIconId = 'vaccines' | 'infections' | 'contraindications' | 'ingredients'

export type NavItemConfig = {
  href: string
  label: string
  icon: NavIconId
}

export const NAV_ITEMS: NavItemConfig[] = [
  { href: '/vaccines', label: 'Вакцины', icon: 'vaccines' },
  { href: '/infections', label: 'Инфекции', icon: 'infections' },
  { href: '/contraindications', label: 'Противопоказания', icon: 'contraindications' },
  { href: '/ingredients', label: 'Ингредиенты', icon: 'ingredients' },
]

export function isNavItemActive(pathname: string, href: string): boolean {
  if (href === '/vaccines') {
    return pathname === '/vaccines' || pathname.startsWith('/vaccines/')
  }
  return pathname === href
}
