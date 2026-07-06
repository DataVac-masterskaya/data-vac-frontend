export type NotFoundSphereId = 'bumpy' | 'porous' | 'layered'

export type NotFoundSphereConfig = {
  id: NotFoundSphereId
  className: string
  parallax: { x: number; y: number }
}

export const NOT_FOUND_SPHERE_CONFIGS: NotFoundSphereConfig[] = [
  {
    id: 'bumpy',
    className: [
      'absolute z-20 object-contain',
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
    parallax: { x: -18, y: -14 },
  },
  {
    id: 'porous',
    className: [
      'absolute z-20 object-contain',
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
    parallax: { x: 30, y: 24 },
  },
  {
    id: 'layered',
    className: [
      'absolute z-0 object-contain',
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
    parallax: { x: -16, y: 10 },
  },
]

export const NOT_FOUND_HONEYCOMB_IMAGE_CLASSNAME = [
  'fixed -z-10 object-contain max-[768px]:hidden',
  'min-[768px]:max-[1280px]:right-[120px] min-[768px]:max-[1280px]:bottom-[-164px]',
  'min-[768px]:max-[1280px]:w-[380px] min-[768px]:max-[1280px]:h-[380px]',
  'min-[1280px]:max-[1600px]:right-[180px] min-[1280px]:max-[1600px]:bottom-[-246px]',
  'min-[1280px]:max-[1600px]:w-[380px] min-[1280px]:max-[1600px]:h-[380px]',
  'min-[1600px]:max-[1920px]:right-[260px] min-[1600px]:max-[1920px]:bottom-[-336px]',
  'min-[1600px]:max-[1920px]:w-[496px] min-[1600px]:max-[1920px]:h-[496px]',
  'min-[1920px]:right-[320px] min-[1920px]:bottom-[-388px]',
  'min-[1920px]:w-[574px] min-[1920px]:h-[574px]',
].join(' ')

export const NOT_FOUND_HONEYCOMB_PARALLAX = { x: 10, y: -8 }

export const NOT_FOUND_CONTAINER_CLASSNAME = [
  'relative mx-auto overflow-visible',
  'max-[768px]:w-[311px]',
  'min-[768px]:max-[1600px]:w-[512px]',
  'min-[1600px]:max-[1920px]:w-[658px]',
  'min-[1920px]:w-[768px]',
].join(' ')

export const NOT_FOUND_CONTAINER_OFFSET_CLASSNAME = [
  'max-[768px]:mt-[55px]',
  'min-[768px]:max-[1280px]:mt-[190px]',
  'min-[1280px]:max-[1600px]:mt-[99px]',
  'min-[1600px]:max-[1920px]:mt-[156px]',
  'min-[1920px]:mt-[170px]',
].join(' ')

export const NOT_FOUND_SUBTITLE_CLASSNAME = [
  'mt-2 text-center font-normal text-fg',
  'max-[768px]:text-[14px]',
  'min-[768px]:max-[1600px]:text-[14px]',
  'min-[1600px]:text-[20px]',
].join(' ')

export const NOT_FOUND_HEADING_CLASSNAME = [
  'relative z-10 font-medium leading-[0.85] text-accent',
  'text-[170px] min-[768px]:text-[280px] min-[1600px]:text-[360px] min-[1920px]:text-[420px]',
].join(' ')

export const NOT_FOUND_SUBTITLE_LINK_CLASSNAME = [
  'text-fg underline decoration-fg underline-offset-2 transition-colors',
  'hover:text-accent hover:no-underline',
  'focus-visible:text-accent focus-visible:no-underline',
].join(' ')
