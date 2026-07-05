import Link from 'next/link'
import { sideMenuFont } from '@/shared/ui/SideMenu/side-menu-font'
import { NotFoundDecorativeSpheres } from './ui/not-found-decorative-spheres'
import {
  NOT_FOUND_CONTAINER_CLASSNAME,
  NOT_FOUND_CONTAINER_OFFSET_CLASSNAME,
  NOT_FOUND_HEADING_CLASSNAME,
  NOT_FOUND_SUBTITLE_CLASSNAME,
  NOT_FOUND_SUBTITLE_LINK_CLASSNAME,
} from './ui/not-found-layout'

export default function NotFoundPage() {
  return (
    <div className={NOT_FOUND_CONTAINER_OFFSET_CLASSNAME}>
      <div className={NOT_FOUND_CONTAINER_CLASSNAME}>
        <div className="flex flex-col items-center overflow-visible text-center">
          <div className="relative inline-block overflow-visible">
            <NotFoundDecorativeSpheres />

            <p className={`${NOT_FOUND_HEADING_CLASSNAME} ${sideMenuFont.className}`}>
              404
            </p>
          </div>
        </div>

        <p className={`${NOT_FOUND_SUBTITLE_CLASSNAME} ${sideMenuFont.className}`}>
          Страница не найдена, вернитесь на{' '}
          <Link href="/" className={NOT_FOUND_SUBTITLE_LINK_CLASSNAME}>
            главную
          </Link>
        </p>
      </div>
    </div>
  )
}
