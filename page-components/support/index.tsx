import { FAQSection } from "./ui/FAQSection";
import { DonationAmountPicker } from "@/shared/ui/DonationAmountPicker";
import { QRPaymentBlock } from "@/shared/ui/QRPaymentBlock";

const DONATION_PRESETS = [
  { sum: 100, popular: false },
  { sum: 200, popular: false },
  { sum: 300, popular: false },
  { sum: 500, popular: true },
  { sum: 1000, popular: false },
  { sum: 2000, popular: false },
  { sum: 5000, popular: false },
  { sum: 10000, popular: false },
]

export default function SupportPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-fg mb-6">Поддержать проект</h1>

      <div className="mb-6">
        <p className="text-sm text-fg-secondary mb-6">
          DataVac — бесплатная база знаний о вакцинах для всех. Если проект полезен для вас, вы можете поддержать его развитие.
        </p>
        <DonationAmountPicker presets={DONATION_PRESETS} />
      </div>

      <div className="bg-card rounded-2xl p-6 mb-6">
        <QRPaymentBlock qrSrc="/qr-payment.png" />
      </div>

      <div className="bg-card rounded-2xl p-6">
        <h2 className="text-base font-semibold text-fg mb-3">Связаться с нами</h2>
        <p className="text-sm text-fg-secondary">
          Нашли ошибку или хотите предложить улучшение? Напишите на{' '}
          <span className="text-accent">info@datavac.ru</span>
        </p>
      </div>

      <FAQSection/>
    </div>
  )
}
