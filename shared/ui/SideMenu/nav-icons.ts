import type { StaticImageData } from 'next/image'
import type { NavIconId } from './nav-config'
import contraindicationsIcon from './icons/contraindications.svg'
import infectionsIcon from './icons/infections.svg'
import ingredientsIcon from './icons/ingredients.svg'
import vaccinesIcon from './icons/vaccines.svg'

export const NAV_ICONS: Record<NavIconId, StaticImageData> = {
  vaccines: vaccinesIcon,
  infections: infectionsIcon,
  contraindications: contraindicationsIcon,
  ingredients: ingredientsIcon,
}
