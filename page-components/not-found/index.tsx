import Link from 'next/link'
import { NotFoundDecorativeSpheres } from './ui/not-found-decorative-spheres'

export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-[60vh] flex-col items-center justify-center text-center">
      <NotFoundDecorativeSpheres />

      <p
        className="relative z-10 font-medium leading-none text-accent"
        style={{ fontSize: 'clamp(120px, 22vw, 420px)' }}
      >
        404
      </p>

      <p className="relative z-10 mt-6 text-xl font-normal text-fg">
        Страница не найдена, вернитесь на{' '}
        <Link href="/" className="text-accent hover:underline">
          главную
        </Link>
      </p>
    </div>
  )
}