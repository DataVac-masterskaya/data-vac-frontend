'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import { DonationReasonCard } from '@/shared/ui/DonationReasonCard'

interface DonationReason {
  title: string
  description: string
}

interface DonationReasonsCarouselProps {
  reasons: DonationReason[]
}

export function DonationReasonsCarousel({ reasons }: DonationReasonsCarouselProps) {
  const [emblaRef] = useEmblaCarousel(
    { align: 'start', dragFree: true, loop: false },
    [WheelGesturesPlugin()],
  )

  return (
    <div ref={emblaRef} className="overflow-hidden">
      <div className="flex gap-4 items-stretch">
        {reasons.map((reason) => (
          <div
            key={reason.title}
            className="shrink-0 w-[80vw] sm:w-[calc(50%-8px)] lg:w-72 h-full"
          >
            <DonationReasonCard title={reason.title} description={reason.description} />
          </div>
        ))}
      </div>
    </div>
  )
}
