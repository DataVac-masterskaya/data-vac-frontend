export type NotFoundSphereId = 'bumpy' | 'porous' | 'layered'

export const NOT_FOUND_SPHERE_Z_INDEX: Record<NotFoundSphereId, number> = {
  bumpy: 20,
  layered: 0,
  porous: 20,
}

/**
 * Tailwind v4: max-[Npx] = not(min-width:Npx) → width < N.
 * Не использовать unscoped top/left — они перебивают min-[*] по порядку в CSS.
 * Классы — литеральные строки (Tailwind JIT не видит динамически собранные utilities).
 */
export type NotFoundSphereConfig = {
  id: NotFoundSphereId
  className: string
}

export const NOT_FOUND_SPHERE_CONFIGS: NotFoundSphereConfig[] = [
  {
    id: 'bumpy',
    className: [
      'absolute object-contain',
      'max-[768px]:top-[-27px] max-[768px]:left-[-78px]',
      'max-[768px]:w-[143px] max-[768px]:h-[143px]',
      'min-[768px]:max-[1280px]:top-[-43px] min-[768px]:max-[1280px]:left-[-98px]',
      'min-[768px]:max-[1280px]:w-[228px] min-[768px]:max-[1280px]:h-[228px]',
      'min-[1280px]:max-[1600px]:top-[-43px] min-[1280px]:max-[1600px]:left-[-116px]',
      'min-[1280px]:max-[1600px]:w-[228px] min-[1280px]:max-[1600px]:h-[228px]',
      'min-[1600px]:max-[1920px]:top-[-56px] min-[1600px]:max-[1920px]:left-[-151px]',
      'min-[1600px]:max-[1920px]:w-[297px] min-[1600px]:max-[1920px]:h-[297px]',
      'min-[1920px]:top-[-64px] min-[1920px]:left-[-175px]',
      'min-[1920px]:w-[344px] min-[1920px]:h-[344px]',
    ].join(' '),
  },
  {
    id: 'porous',
    className: [
      'absolute object-contain',
      'max-[768px]:top-[73px] max-[768px]:left-[93px]',
      'max-[768px]:w-[65px] max-[768px]:h-[65px]',
      'min-[768px]:max-[1280px]:top-[117px] min-[768px]:max-[1280px]:left-[157px]',
      'min-[768px]:max-[1280px]:w-[104px] min-[768px]:max-[1280px]:h-[104px]',
      'min-[1280px]:max-[1600px]:top-[117px] min-[1280px]:max-[1600px]:left-[159px]',
      'min-[1280px]:max-[1600px]:w-[104px] min-[1280px]:max-[1600px]:h-[104px]',
      'min-[1600px]:max-[1920px]:top-[152px] min-[1600px]:max-[1920px]:left-[207px]',
      'min-[1600px]:max-[1920px]:w-[136px] min-[1600px]:max-[1920px]:h-[136px]',
      'min-[1920px]:top-[176px] min-[1920px]:left-[240px]',
      'min-[1920px]:w-[157px] min-[1920px]:h-[157px]',
    ].join(' '),
  },
  {
    id: 'layered',
    className: [
      'absolute object-contain',
      'max-[768px]:top-[-10px] max-[768px]:right-[-37px]',
      'max-[768px]:left-auto',
      'max-[768px]:w-[87px] max-[768px]:h-[87px]',
      'min-[768px]:max-[1280px]:top-[-15px] min-[768px]:max-[1280px]:right-[-74px]',
      'min-[768px]:max-[1280px]:left-auto',
      'min-[768px]:max-[1280px]:w-[139px] min-[768px]:max-[1280px]:h-[139px]',
      'min-[1280px]:max-[1600px]:top-[-15px] min-[1280px]:max-[1600px]:right-[-56px]',
      'min-[1280px]:max-[1600px]:left-auto',
      'min-[1280px]:max-[1600px]:w-[139px] min-[1280px]:max-[1600px]:h-[139px]',
      'min-[1600px]:max-[1920px]:top-[-20px] min-[1600px]:max-[1920px]:right-[-82px]',
      'min-[1600px]:max-[1920px]:left-auto',
      'min-[1600px]:max-[1920px]:w-[181px] min-[1600px]:max-[1920px]:h-[181px]',
      'min-[1920px]:top-[-23px] min-[1920px]:right-[-89px]',
      'min-[1920px]:left-auto',
      'min-[1920px]:w-[210px] min-[1920px]:h-[210px]',
    ].join(' '),
  },
]

export const NOT_FOUND_CONTAINER_CLASSNAME = [
  'relative mx-auto overflow-visible',
  'max-[768px]:w-[311px] max-[768px]:min-h-[208px]',
  'min-[768px]:max-[1600px]:w-[512px] min-[768px]:max-[1600px]:min-h-[333px]',
  'min-[1600px]:max-[1920px]:w-[658px] min-[1600px]:max-[1920px]:min-h-[435px]',
  'min-[1920px]:w-[768px] min-[1920px]:min-h-[503px]',
].join(' ')

/** mt по Figma; -mt компенсирует py PageLayout (TODO: отдельный PR) */
export const NOT_FOUND_CONTAINER_OFFSET_CLASSNAME = [
  'max-[768px]:-mt-4 max-[768px]:mt-[55px]',
  'min-[768px]:max-[1280px]:-mt-8 min-[768px]:max-[1280px]:mt-[190px]',
  'min-[1280px]:max-[1600px]:-mt-12 min-[1280px]:max-[1600px]:mt-[99px]',
  'min-[1600px]:max-[1920px]:-mt-12 min-[1600px]:max-[1920px]:mt-[156px]',
  'min-[1920px]:-mt-12 min-[1920px]:mt-[170px]',
].join(' ')

/** Inter Tight 400, absolute left/bottom по Figma */
export const NOT_FOUND_SUBTITLE_CLASSNAME = [
  'absolute z-10 font-normal text-fg',
  'max-[768px]:text-[14px] max-[768px]:left-[14px] max-[768px]:bottom-[6px]',
  'min-[768px]:max-[1600px]:text-[14px]',
  'min-[768px]:max-[1600px]:left-[115px] min-[768px]:max-[1600px]:bottom-[20px]',
  'min-[1600px]:max-[1920px]:text-[20px]',
  'min-[1600px]:max-[1920px]:left-[127px] min-[1600px]:max-[1920px]:bottom-[24px]',
  'min-[1920px]:text-[20px] min-[1920px]:left-[183px] min-[1920px]:bottom-[40px]',
].join(' ')

/** «404»: Inter Tight Medium, accent, кегль по Figma */
export const NOT_FOUND_HEADING_CLASSNAME = [
  'relative z-10 font-medium leading-[1.196] text-accent',
  'text-[170px] min-[768px]:text-[280px] min-[1600px]:text-[360px] min-[1920px]:text-[420px]',
].join(' ')

/** Default: fg + underline; hover/focus: accent, без подчёркивания */
export const NOT_FOUND_SUBTITLE_LINK_CLASSNAME = [
  'text-fg underline decoration-fg underline-offset-2 transition-colors',
  'hover:text-accent hover:no-underline',
  'focus-visible:text-accent focus-visible:no-underline',
].join(' ')
