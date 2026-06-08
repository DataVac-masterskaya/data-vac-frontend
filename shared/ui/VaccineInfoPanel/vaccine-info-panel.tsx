import { Drawer } from "@datavac/ui-kit"
import { ReactNode } from "react"

interface VaccineInfoPanelProps {
  trigger: ReactNode
  title: string
  question?: string
  explanation: string
}

export function VaccineInfoPanel({
  trigger,
  title,
  question,
  explanation
}: VaccineInfoPanelProps) {
  return (
    <Drawer
      trigger={trigger}
      title={title}
    >
      <div className="flex flex-col gap-y-5">
        <p className="font-medium text-[16px] leading-[1.25] text-fg-secondary">
            {question}
        </p>
        <p className="font-regular text-[16px] leading-[1.25] text-fg">
          {explanation}
        </p>
      </div>
    </Drawer>
  )
}