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

export type NotFoundContainerLayout = {
  width: number
  height: number
}

/** Figma frame контейнера 404 */
export const NOT_FOUND_CONTAINER_AT_360 = {
  width: 311,
  height: 208,
} as const satisfies NotFoundContainerLayout

export const NOT_FOUND_CONTAINER_AT_768 = {
  width: 512,
  height: 333,
} as const satisfies NotFoundContainerLayout

export const NOT_FOUND_CONTAINER_AT_1280 = NOT_FOUND_CONTAINER_AT_768

export const NOT_FOUND_CONTAINER_AT_1600 = {
  width: 658,
  height: 435,
} as const satisfies NotFoundContainerLayout

export const NOT_FOUND_CONTAINER_AT_1920 = {
  width: 768,
  height: 503,
} as const satisfies NotFoundContainerLayout

export const NOT_FOUND_CONTAINER_CLASSNAME = [
  'relative mx-auto overflow-visible',
  'max-[768px]:w-[311px] max-[768px]:min-h-[208px]',
  'min-[768px]:max-[1600px]:w-[512px] min-[768px]:max-[1600px]:min-h-[333px]',
  'min-[1600px]:max-[1920px]:w-[658px] min-[1600px]:max-[1920px]:min-h-[435px]',
  'min-[1920px]:w-[768px] min-[1920px]:min-h-[503px]',
].join(' ')

export type NotFoundContainerOffset = {
  top: number
}

/** Вертикальный отступ контейнера на странице (Figma); горизонталь — mx-auto */
export const NOT_FOUND_CONTAINER_OFFSET_AT_360 = {
  top: 55,
} as const satisfies NotFoundContainerOffset

export const NOT_FOUND_CONTAINER_OFFSET_AT_768 = {
  top: 190,
} as const satisfies NotFoundContainerOffset

export const NOT_FOUND_CONTAINER_OFFSET_AT_1280 = {
  top: 99,
} as const satisfies NotFoundContainerOffset

export const NOT_FOUND_CONTAINER_OFFSET_AT_1600 = {
  top: 156,
} as const satisfies NotFoundContainerOffset

export const NOT_FOUND_CONTAINER_OFFSET_AT_1920 = {
  top: 170,
} as const satisfies NotFoundContainerOffset

/** mt по Figma; -mt компенсирует py обёртки PageLayout. Горизонталь — mx-auto на контейнере. */
export const NOT_FOUND_CONTAINER_OFFSET_CLASSNAME = [
  'max-[768px]:-mt-4 max-[768px]:mt-[55px]',
  'min-[768px]:max-[1280px]:-mt-8 min-[768px]:max-[1280px]:mt-[190px]',
  'min-[1280px]:max-[1600px]:-mt-12 min-[1280px]:max-[1600px]:mt-[99px]',
  'min-[1600px]:max-[1920px]:-mt-12 min-[1600px]:max-[1920px]:mt-[156px]',
  'min-[1920px]:-mt-12 min-[1920px]:mt-[170px]',
].join(' ')

export type NotFoundSubtitleLayout = {
  fontSize: number
  left: number
  bottom: number
}

/** Подпись под «404», от контейнера страницы */
export const NOT_FOUND_SUBTITLE_AT_360 = {
  fontSize: 14,
  left: 14,
  bottom: 6,
} as const satisfies NotFoundSubtitleLayout

export const NOT_FOUND_SUBTITLE_AT_768 = {
  fontSize: 14,
  left: 115,
  bottom: 20,
} as const satisfies NotFoundSubtitleLayout

export const NOT_FOUND_SUBTITLE_AT_1280 = NOT_FOUND_SUBTITLE_AT_768

export const NOT_FOUND_SUBTITLE_AT_1600 = {
  fontSize: 20,
  left: 127,
  bottom: 24,
} as const satisfies NotFoundSubtitleLayout

export const NOT_FOUND_SUBTITLE_AT_1920 = {
  fontSize: 20,
  left: 183,
  bottom: 40,
} as const satisfies NotFoundSubtitleLayout

/** Inter Tight 400, absolute left/bottom по Figma */
export const NOT_FOUND_SUBTITLE_CLASSNAME = [
  'absolute z-10 font-normal text-fg',
  // 360
  'max-[768px]:text-[14px] max-[768px]:left-[14px] max-[768px]:bottom-[6px]',
  // 768–1599
  'min-[768px]:max-[1600px]:text-[14px]',
  'min-[768px]:max-[1600px]:left-[115px] min-[768px]:max-[1600px]:bottom-[20px]',
  // 1600–1919
  'min-[1600px]:max-[1920px]:text-[20px]',
  'min-[1600px]:max-[1920px]:left-[127px] min-[1600px]:max-[1920px]:bottom-[24px]',
  // 1920+
  'min-[1920px]:text-[20px] min-[1920px]:left-[183px] min-[1920px]:bottom-[40px]',
].join(' ')

/** Default: fg + underline; hover/focus: accent, без подчёркивания */
export const NOT_FOUND_SUBTITLE_LINK_CLASSNAME = [
  'text-fg underline decoration-fg underline-offset-2 transition-colors',
  'hover:text-accent hover:no-underline',
  'focus-visible:text-accent focus-visible:no-underline',
].join(' ')
