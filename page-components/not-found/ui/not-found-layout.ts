export type NotFoundSphereId = 'bumpy' | 'porous' | 'layered'

export type NotFoundSpherePosition = {
  size: number
  zIndex: number
  top?: number
  left?: number
  right?: number
}

/** Относительно блока «404», Figma frame 360 */
export const NOT_FOUND_SPHERES_AT_360 = {
  bumpy: { size: 143, zIndex: 20, top: -27, left: -78 },
  porous: { size: 65, zIndex: 20, top: 73, left: 93 },
  layered: { size: 87, zIndex: 0, top: -10, right: -37 },
} as const satisfies Record<NotFoundSphereId, NotFoundSpherePosition>

/** Относительно блока «404», Figma frame 768 */
export const NOT_FOUND_SPHERES_AT_768 = {
  bumpy: { size: 228, zIndex: 20, top: -43, left: -98 },
  porous: { size: 104, zIndex: 20, top: 117, left: 157 },
  layered: { size: 139, zIndex: 0, top: -15, right: -74 },
} as const satisfies Record<NotFoundSphereId, NotFoundSpherePosition>

/** Относительно блока «404», Figma frame 1280 */
export const NOT_FOUND_SPHERES_AT_1280 = {
  bumpy: { size: 228, zIndex: 20, top: -43, left: -116 },
  porous: { size: 104, zIndex: 20, top: 117, left: 159 },
  layered: { size: 139, zIndex: 0, top: -15, right: -56 },
} as const satisfies Record<NotFoundSphereId, NotFoundSpherePosition>

/** Относительно блока «404», Figma frame 1600 */
export const NOT_FOUND_SPHERES_AT_1600 = {
  bumpy: { size: 297, zIndex: 20, top: -56, left: -151 },
  porous: { size: 136, zIndex: 20, top: 152, left: 207 },
  layered: { size: 181, zIndex: 0, top: -20, right: -82 },
} as const satisfies Record<NotFoundSphereId, NotFoundSpherePosition>

/** Относительно блока «404», Figma frame 1920 */
export const NOT_FOUND_SPHERES_AT_1920 = {
  bumpy: { size: 344, zIndex: 20, top: -64, left: -175 },
  porous: { size: 157, zIndex: 20, top: 176, left: 240 },
  layered: { size: 210, zIndex: 0, top: -23, right: -89 },
} as const satisfies Record<NotFoundSphereId, NotFoundSpherePosition>

export type NotFoundSphereConfig = {
  id: NotFoundSphereId
  className: string
}

/**
 * Tailwind v4: max-[Npx] = not(min-width:Npx) → width < N.
 * Не использовать unscoped top/left — они перебивают min-[*] по порядку в CSS.
 */
export const NOT_FOUND_SPHERE_CONFIGS: NotFoundSphereConfig[] = [
  {
    id: 'bumpy',
    className: [
      'absolute object-contain',
      // <768 (Figma 360)
      'max-[768px]:top-[-27px] max-[768px]:left-[-78px]',
      'max-[768px]:!w-[143px] max-[768px]:!h-[143px]',
      'max-[768px]:translate-x-0 max-[768px]:translate-y-0',
      // 768–1279 (Figma 768)
      'min-[768px]:max-[1280px]:top-[-43px] min-[768px]:max-[1280px]:left-[-98px]',
      'min-[768px]:max-[1280px]:!w-[228px] min-[768px]:max-[1280px]:!h-[228px]',
      'min-[768px]:max-[1280px]:translate-x-0 min-[768px]:max-[1280px]:translate-y-0',
      // 1280–1599 (Figma 1280)
      'min-[1280px]:max-[1600px]:top-[-43px] min-[1280px]:max-[1600px]:left-[-116px]',
      'min-[1280px]:max-[1600px]:!w-[228px] min-[1280px]:max-[1600px]:!h-[228px]',
      'min-[1280px]:max-[1600px]:translate-x-0 min-[1280px]:max-[1600px]:translate-y-0',
      // 1600–1919 (Figma 1600)
      'min-[1600px]:max-[1920px]:top-[-56px] min-[1600px]:max-[1920px]:left-[-151px]',
      'min-[1600px]:max-[1920px]:!w-[297px] min-[1600px]:max-[1920px]:!h-[297px]',
      'min-[1600px]:max-[1920px]:translate-x-0 min-[1600px]:max-[1920px]:translate-y-0',
      // 1920+
      'min-[1920px]:top-[-64px] min-[1920px]:left-[-175px]',
      'min-[1920px]:!w-[344px] min-[1920px]:!h-[344px]',
      'min-[1920px]:translate-x-0 min-[1920px]:translate-y-0',
    ].join(' '),
  },
  {
    id: 'porous',
    className: [
      'absolute object-contain',
      // <768 (Figma 360)
      'max-[768px]:top-[73px] max-[768px]:left-[93px]',
      'max-[768px]:!w-[65px] max-[768px]:!h-[65px]',
      'max-[768px]:translate-x-0 max-[768px]:translate-y-0',
      // 768–1279 (Figma 768)
      'min-[768px]:max-[1280px]:top-[117px] min-[768px]:max-[1280px]:left-[157px]',
      'min-[768px]:max-[1280px]:!w-[104px] min-[768px]:max-[1280px]:!h-[104px]',
      'min-[768px]:max-[1280px]:translate-x-0 min-[768px]:max-[1280px]:translate-y-0',
      // 1280–1599 (Figma 1280)
      'min-[1280px]:max-[1600px]:top-[117px] min-[1280px]:max-[1600px]:left-[159px]',
      'min-[1280px]:max-[1600px]:!w-[104px] min-[1280px]:max-[1600px]:!h-[104px]',
      'min-[1280px]:max-[1600px]:translate-x-0 min-[1280px]:max-[1600px]:translate-y-0',
      // 1600–1919 (Figma 1600)
      'min-[1600px]:max-[1920px]:top-[152px] min-[1600px]:max-[1920px]:left-[207px]',
      'min-[1600px]:max-[1920px]:!w-[136px] min-[1600px]:max-[1920px]:!h-[136px]',
      'min-[1600px]:max-[1920px]:translate-x-0 min-[1600px]:max-[1920px]:translate-y-0',
      // 1920+
      'min-[1920px]:top-[176px] min-[1920px]:left-[240px]',
      'min-[1920px]:!w-[157px] min-[1920px]:!h-[157px]',
      'min-[1920px]:translate-x-0 min-[1920px]:translate-y-0',
    ].join(' '),
  },
  {
    id: 'layered',
    className: [
      'absolute object-contain',
      // <768 (Figma 360)
      'max-[768px]:top-[-10px] max-[768px]:right-[-37px]',
      'max-[768px]:left-auto',
      'max-[768px]:!w-[87px] max-[768px]:!h-[87px]',
      'max-[768px]:translate-x-0 max-[768px]:translate-y-0',
      // 768–1279 (Figma 768)
      'min-[768px]:max-[1280px]:top-[-15px] min-[768px]:max-[1280px]:right-[-74px]',
      'min-[768px]:max-[1280px]:left-auto',
      'min-[768px]:max-[1280px]:!w-[139px] min-[768px]:max-[1280px]:!h-[139px]',
      'min-[768px]:max-[1280px]:translate-x-0 min-[768px]:max-[1280px]:translate-y-0',
      // 1280–1599 (Figma 1280)
      'min-[1280px]:max-[1600px]:top-[-15px] min-[1280px]:max-[1600px]:right-[-56px]',
      'min-[1280px]:max-[1600px]:left-auto',
      'min-[1280px]:max-[1600px]:!w-[139px] min-[1280px]:max-[1600px]:!h-[139px]',
      'min-[1280px]:max-[1600px]:translate-x-0 min-[1280px]:max-[1600px]:translate-y-0',
      // 1600–1919 (Figma 1600)
      'min-[1600px]:max-[1920px]:top-[-20px] min-[1600px]:max-[1920px]:right-[-82px]',
      'min-[1600px]:max-[1920px]:left-auto',
      'min-[1600px]:max-[1920px]:!w-[181px] min-[1600px]:max-[1920px]:!h-[181px]',
      'min-[1600px]:max-[1920px]:translate-x-0 min-[1600px]:max-[1920px]:translate-y-0',
      // 1920+
      'min-[1920px]:top-[-23px] min-[1920px]:right-[-89px]',
      'min-[1920px]:left-auto',
      'min-[1920px]:!w-[210px] min-[1920px]:!h-[210px]',
      'min-[1920px]:translate-x-0 min-[1920px]:translate-y-0',
    ].join(' '),
  },
]

export const NOT_FOUND_SPHERE_Z_INDEX: Record<NotFoundSphereId, number> = {
  bumpy: 20,
  layered: 0,
  porous: 20,
}
