export const SOURCE_CAPTION =
  'Структурированная информация с сайта Государственного реестра лекарственных средств'

export const SUPPORT_HREF = '/support'

export const SUPPORT_BUTTON_LABEL = 'Поддержать проект'

/** Короткий текст кнопки в mobile drawer */
export const MOBILE_SUPPORT_BUTTON_LABEL = 'Помощь проекту'

export const SUPPORT_LABEL_BY_VARIANT = {
  desktop: SUPPORT_BUTTON_LABEL,
  tablet: SUPPORT_BUTTON_LABEL,
  mobile: MOBILE_SUPPORT_BUTTON_LABEL,
} as const

/** Планшет: пункты меню и кнопка — Inter Tight 400, 14px, line-height 130% */
export const SIDE_MENU_TABLET_LABEL_CLASS =
  'text-[14px] font-normal leading-[1.3] tracking-normal'

/** Десктоп: пункты меню — Inter Tight 400, 16px, line-height 20px */
export const SIDE_MENU_DESKTOP_NAV_CLASS =
  'text-[16px] font-normal leading-5 tracking-normal'

/** Mobile drawer: пункты меню */
export const SIDE_MENU_MOBILE_NAV_LINK_CLASS =
  'flex items-center gap-2 rounded-xl bg-card px-4 py-2 text-[14px] font-normal leading-[1.3] text-fg outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page'

export const SIDE_MENU_NAV_ICON_COLOR = '#323335'

export const SIDE_MENU_NAV_ICON_BASE_CLASS =
  'flex size-6 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ease-out'

export const SIDE_MENU_NAV_ICON_IDLE_CLASS = 'bg-subtle text-[#323335]'

export const SIDE_MENU_NAV_ICON_HIGHLIGHTED_CLASS = 'bg-accent text-white'

export const SIDE_MENU_FOCUS_RING_PAGE_CLASS =
  'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page'

export const SIDE_MENU_FOCUS_RING_CARD_CLASS =
  'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card'

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
  if (pathname === href) {
    return true
  }
  return pathname.startsWith(`${href}/`)
}
