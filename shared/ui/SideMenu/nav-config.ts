export const SOURCE_CAPTION =
  'Структурированная информация с сайта Государственного реестра лекарственных средств'

export const SUPPORT_BUTTON_LABEL = 'Поддержать проект'

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
