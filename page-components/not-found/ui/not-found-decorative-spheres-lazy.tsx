'use client'

import dynamic from 'next/dynamic'

export const NotFoundDecorativeSpheres = dynamic(
  () => import('./not-found-decorative-spheres').then((mod) => mod.NotFoundDecorativeSpheres),
  { ssr: false },
)
