import { SideMenu } from './side-menu'

type ResponsiveSideMenuSlotProps = {
  slot: 'desktop' | 'tablet' | 'mobile'
}

export function ResponsiveSideMenuSlot({ slot }: ResponsiveSideMenuSlotProps) {
  if (slot === 'mobile') {
    return (
      <div className="md:hidden">
        <SideMenu mode="mobile" />
      </div>
    )
  }

  if (slot === 'desktop') {
    return (
      <>
        <div className="max-xl:hidden">
          <SideMenu mode="desktop" />
        </div>
        <div className="max-xl:hidden w-[216px] shrink-0" aria-hidden />
      </>
    )
  }

  return (
    <div className="max-md:hidden xl:hidden">
      <SideMenu mode="tablet" />
    </div>
  )
}
