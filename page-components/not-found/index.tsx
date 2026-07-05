import Link from 'next/link'
import { sideMenuFont } from '@/shared/ui/SideMenu/side-menu-font'
import { NotFoundDecorativeSpheres } from './ui/not-found-decorative-spheres'

export default function NotFoundPage() {
  return (
    <div className="relative mx-auto flex w-full max-w-[768px] min-[1600px]:max-w-[1000px] min-h-[503px] flex-col items-center overflow-visible pt-[83px] sm:pt-[75px] md:pt-[67px] lg:pt-[51px] text-center">
      <div className="relative inline-block overflow-visible">
        <NotFoundDecorativeSpheres />

        <p
          className={`relative z-10 font-medium leading-[1.196] text-accent text-[170px] min-[768px]:text-[280px] min-[1600px]:text-[360px] min-[1920px]:text-[420px] ${sideMenuFont.className}`}
        >
          404
        </p>
      </div>

      <p className="relative z-10 mt-6 text-xl font-normal text-fg">
        Страница не найдена, вернитесь на{' '}
        <Link href="/" className="text-accent hover:underline">
          главную
        </Link>
      </p>
    </div>
  )
}
