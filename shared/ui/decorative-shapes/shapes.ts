import shapeCluster from './assets/shape.webp'
import shapeBumpy from './assets/shape-1.webp'
import shapeLayered from './assets/shape-2.webp'
import shapePorous from './assets/shape-3.webp'

export const DECORATIVE_SHAPE_IDS = [
  'cluster',
  'bumpy',
  'layered',
  'porous',
] as const

export type DecorativeShapeId = (typeof DECORATIVE_SHAPE_IDS)[number]

export const DECORATIVE_SHAPES: Record<
  DecorativeShapeId,
  { src: string }
> = {
  cluster: { src: shapeCluster.src },
  bumpy: { src: shapeBumpy.src },
  layered: { src: shapeLayered.src },
  porous: { src: shapePorous.src },
}
