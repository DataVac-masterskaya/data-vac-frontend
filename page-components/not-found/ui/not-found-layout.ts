import type { DecorativeShapeId } from '@/shared/ui/decorative-shapes'

export type NotFoundSphereLayout = {
  id: DecorativeShapeId
  size: number
  className: string
}

export const NOT_FOUND_SPHERE_LAYOUT: NotFoundSphereLayout[] = [
  // слева, крупный кластер — 344px
  {
    id: 'cluster',
    size: 344,
    className: 'top-1/2 -translate-y-1/2 -left-[120px] md:-left-[80px] sm:hidden md:block',
  },
  // в «0» числа 404 — 157px
  {
    id: 'bumpy',
    size: 157,
    className: 'top-1/2 left-1/2 -translate-x-[12%] -translate-y-[45%]',
  },
  // справа — 210px
  {
    id: 'layered',
    size: 210,
    className: 'top-[38%] right-[8%] md:right-[12%]',
  },
  // снизу, пористый — 574px
  {
    id: 'porous',
    size: 574,
    className: 'bottom-[-180px] left-1/2 -translate-x-1/2',
  },
]
