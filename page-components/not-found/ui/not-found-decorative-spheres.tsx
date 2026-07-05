import { DECORATIVE_SHAPES } from '@/shared/ui/decorative-shapes'
import {
  NOT_FOUND_SPHERE_CONFIGS,
  NOT_FOUND_SPHERE_Z_INDEX,
} from './not-found-layout'

export function NotFoundDecorativeSpheres() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-visible"
      aria-hidden
    >
      {NOT_FOUND_SPHERE_CONFIGS.map(({ id, className }) => (
        <img
          key={id}
          src={DECORATIVE_SHAPES[id].src}
          alt=""
          className={className}
          style={{ zIndex: NOT_FOUND_SPHERE_Z_INDEX[id] }}
        />
      ))}
    </div>
  )
}
