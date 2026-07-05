import type { DecorativeShapeId } from '@/shared/ui/decorative-shapes'

export type NotFoundSpherePosition = {
  size: number
  zIndex: number
  top?: number
  left?: number
  right?: number
}

/** Относительно блока «404», Figma frame 1600 */
export const NOT_FOUND_SPHERES_AT_1600 = {
  bumpy: { size: 297, zIndex: 20, top: -56, left: -151 },
  porous: { size: 136, zIndex: 5, top: 152, left: 207 },
  layered: { size: 181, zIndex: 0, top: -20, right: -82 },
} as const satisfies Record<string, NotFoundSpherePosition>

/** Относительно блока «404», Figma frame 1920 */
export const NOT_FOUND_SPHERES_AT_1920 = {
  bumpy: { size: 344, zIndex: 20, top: -64, left: -175 },
  porous: { size: 157, zIndex: 5, top: 176, left: 240 },
  layered: { size: 210, zIndex: 0, top: -23, right: -89 },
} as const satisfies Record<string, NotFoundSpherePosition>

export type NotFoundSphereConfig = {
  id: DecorativeShapeId
  className: string
}

/** bumpy, porous, layered — от блока «404» */
export const NOT_FOUND_SPHERE_CONFIGS: NotFoundSphereConfig[] = [
  {
    id: 'bumpy',
    className: [
      'absolute object-contain max-md:hidden',
      'max-[1599px]:min-[768px]:top-[8%] max-[1599px]:min-[768px]:left-[16%]',
      'max-[1599px]:min-[768px]:-translate-x-1/2 max-[1599px]:min-[768px]:-translate-y-1/2',
      'max-[1599px]:min-[768px]:!w-[228px] max-[1599px]:min-[768px]:!h-[228px]',
      'min-[1600px]:max-[1919px]:top-[-56px] min-[1600px]:max-[1919px]:left-[-151px]',
      'min-[1600px]:max-[1919px]:!w-[297px] min-[1600px]:max-[1919px]:!h-[297px]',
      'min-[1600px]:max-[1919px]:translate-x-0 min-[1600px]:max-[1919px]:translate-y-0',
      'min-[1920px]:top-[-64px] min-[1920px]:left-[-175px]',
      'min-[1920px]:!w-[344px] min-[1920px]:!h-[344px]',
    ].join(' '),
  },
  {
    id: 'porous',
    className: [
      'absolute object-contain',
      'max-[1599px]:top-1/2 max-[1599px]:left-1/2',
      'max-[1599px]:-translate-x-[53%] max-[1599px]:-translate-y-1/2',
      'max-[1599px]:!w-[104px] max-[1599px]:!h-[104px]',
      'min-[1600px]:max-[1919px]:top-[152px] min-[1600px]:max-[1919px]:left-[207px]',
      'min-[1600px]:max-[1919px]:!w-[136px] min-[1600px]:max-[1919px]:!h-[136px]',
      'min-[1600px]:max-[1919px]:translate-x-0 min-[1600px]:max-[1919px]:translate-y-0',
      'min-[1920px]:top-[176px] min-[1920px]:left-[240px]',
      'min-[1920px]:!w-[157px] min-[1920px]:!h-[157px]',
    ].join(' '),
  },
  {
    id: 'layered',
    className: [
      'absolute object-contain',
      'max-[1599px]:top-[6%] max-[1599px]:left-[78%]',
      'max-[1599px]:-translate-x-1/2 max-[1599px]:-translate-y-1/2',
      'max-[1599px]:!w-[139px] max-[1599px]:!h-[139px]',
      'min-[1600px]:max-[1919px]:top-[-20px] min-[1600px]:max-[1919px]:right-[-82px]',
      'min-[1600px]:max-[1919px]:left-auto',
      'min-[1600px]:max-[1919px]:!w-[181px] min-[1600px]:max-[1919px]:!h-[181px]',
      'min-[1600px]:max-[1919px]:translate-x-0 min-[1600px]:max-[1919px]:translate-y-0',
      'min-[1920px]:top-[-23px] min-[1920px]:right-[-89px]',
      'min-[1920px]:!w-[210px] min-[1920px]:!h-[210px]',
    ].join(' '),
  },
]

export const NOT_FOUND_SPHERE_Z_INDEX: Record<DecorativeShapeId, number> = {
  cluster: 0,
  bumpy: 20,
  layered: 0,
  porous: 5,
}
