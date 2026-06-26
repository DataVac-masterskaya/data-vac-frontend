import { DECORATIVE_SHAPES } from '@/shared/ui/decorative-shapes'
import { NOT_FOUND_SPHERE_LAYOUT } from './not-found-layout'

export function NotFoundDecorativeSpheres() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {NOT_FOUND_SPHERE_LAYOUT.map(({ id, size, className }) => (
        <img
          key={id}
          src={DECORATIVE_SHAPES[id].src}
          alt=""
          width={size}
          height={size}
          className={`absolute object-contain ${className}`}
        />
      ))}
    </div>
  )
}
