'use client'

import { useState } from 'react'
import { Tabs } from '@datavac/ui-kit'
import { QRPaymentBlock } from '@/shared/ui/QRPaymentBlock'
import { BankRequisitesBlock, type RequisiteItem } from '@/shared/ui/BankRequisitesBlock'
import type { DonationAmountPickerItemPresets } from '@/shared/ui/DonationAmountPicker'
import { SupportDonation } from './SupportDonation'

const BANK_REQUISITES: RequisiteItem[] = [
  { label: 'Организация', value: 'АНО «Коллективный Иммунитет»' },
  { label: 'ИНН / КПП', value: '7814772190 / 781401001' },
  { label: 'Расчетный счет', value: '40703810403500000396' },
  { label: 'Банк', value: 'ТОЧКА ПАО БАНКА "ФК ОТКРЫТИЕ"' },
  { label: 'БИК банка получателя', value: '044525999' },
  { label: 'Город', value: 'Москва' },
  { label: 'Корреспондентский счет', value: '30101810845250000999' },
  { label: 'Назначение платежа', value: 'добровольное пожертвование на уставную деятельность АНО «Коллективный Иммунитет»' },
]

type TabId = 'card' | 'qr' | 'requisites'

interface SupportTabsProps {
  presets: DonationAmountPickerItemPresets[]
}

export function SupportTabs({ presets }: SupportTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>('card')

  const tabs = [
    {
      id: 'card',
      label: 'Картой',
      content: (
        <div className="flex justify-center pt-4">
          <SupportDonation presets={presets} />
        </div>
      ),
    },
    {
      id: 'qr',
      label: 'Перевод по QR-коду',
      content: (
        <div className="flex flex-col items-center gap-8 pt-4">
          <QRPaymentBlock qrSrc="/qr-payment.png" />
          <button
            type="button"
            onClick={() =>
              window.open('https://my.cloudpayments.ru/', '_blank', 'noopener,noreferrer')
            }
            className="rounded-full border border-border bg-card text-fg text-sm font-semibold px-6 py-3 transition-colors hover:bg-subtle"
          >
            Изменить условия или отменить подписку
          </button>
        </div>
      ),
    },
    {
      id: 'requisites',
      label: 'По реквизитам',
      content: (
        <div className="flex justify-center pt-4">
          <BankRequisitesBlock requisites={BANK_REQUISITES} />
        </div>
      ),
    },
  ]

  return (
    <Tabs
      tabs={tabs}
      activeId={activeTab}
      onChange={(id) => setActiveTab(id as TabId)}
      className="gap-2"
      listClassName="flex gap-2 flex-wrap justify-center"
      tabClassName="rounded-full px-3 py-1 text-base text-fg bg-white aria-selected:bg-[#4f5153] aria-selected:text-white transition-colors cursor-pointer"
    />
  )
}
