'use client'

import { useState } from 'react'
import { DonationAmountPicker, type DonationData, type DonationAmountPickerItemPresets } from '@/shared/ui/DonationAmountPicker'
import { CardPaymentModal } from '@/shared/ui/CardPaymentModal'

interface SupportDonationProps {
  presets: DonationAmountPickerItemPresets[]
}

export function SupportDonation({ presets }: SupportDonationProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [donationAmount, setDonationAmount] = useState<number | null>(null)
  const [donationIsMonthly, setDonationIsMonthly] = useState(false)
  // Фиксируем параметры в момент открытия, чтобы они не менялись пока модал открыт
  const [lockedAmount, setLockedAmount] = useState(0)
  const [lockedIsMonthly, setLockedIsMonthly] = useState(false)

  const handleDonationDataChange = (data: DonationData) => {
    setDonationAmount(data.isValid && data.amount ? data.amount : null)
    setDonationIsMonthly(data.isMonthly)
  }

  const handleOpenModal = () => {
    if (donationAmount) {
      setLockedAmount(donationAmount)
      setLockedIsMonthly(donationIsMonthly)
      setIsModalOpen(true)
    }
  }

  return (
    <>
      <DonationAmountPicker
        presets={presets}
        onDataChange={handleDonationDataChange}
        onSubmit={handleOpenModal}
        onCancelSubscription={() => window.open('https://my.cloudpayments.ru/', '_blank', 'noopener,noreferrer')}
      />
      <CardPaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        amount={lockedAmount}
        isMonthly={lockedIsMonthly}
      />
    </>
  )
}
