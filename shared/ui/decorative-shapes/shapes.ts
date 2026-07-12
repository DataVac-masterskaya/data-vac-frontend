import cluster from './assets/cluster.webp'
import bumpy from './assets/bumpy.webp'
import layered from './assets/layered.webp'
import porous from './assets/porous.webp'
import honeycomb from './assets/honeycomb.webp'
import coube from './assets/coube.webp'

export const DECORATIVE_SHAPE_IDS = [
  'cluster',
  'bumpy',
  'layered',
  'porous',
  'honeycomb',
  'coube',
] as const

export type DecorativeShapeId = (typeof DECORATIVE_SHAPE_IDS)[number]

export const DECORATIVE_SHAPES: Record<
  DecorativeShapeId,
  { src: string }
> = {
  cluster: { src: cluster.src },
  bumpy: { src: bumpy.src },
  layered: { src: layered.src },
  porous: { src: porous.src },
  honeycomb: { src: honeycomb.src },
  coube: { src: coube.src },
}
