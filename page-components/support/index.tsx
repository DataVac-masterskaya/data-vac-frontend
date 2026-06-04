import { FAQSection } from "./ui/FAQSection";

export default function SupportPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-fg mb-6">Поддержать проект</h1>

      <div className="bg-card rounded-2xl p-6 mb-6">
        <p className="text-sm text-fg-secondary mb-4">
          DataVac — бесплатная база знаний о вакцинах для всех. Если проект полезен для вас, вы можете поддержать его развитие.
        </p>
        <div className="flex flex-col gap-3">
          <div className="bg-subtle rounded-xl p-4">
            <div className="text-xs text-fg-secondary mb-1">Банковская карта</div>
            <div className="text-sm text-fg font-medium">— (скоро)</div>
          </div>
          <div className="bg-subtle rounded-xl p-4">
            <div className="text-xs text-fg-secondary mb-1">СБП</div>
            <div className="text-sm text-fg font-medium">— (скоро)</div>
          </div>
          <div className="bg-subtle rounded-xl p-4">
            <div className="text-xs text-fg-secondary mb-1">Крипто</div>
            <div className="text-sm text-fg font-medium">— (скоро)</div>
          </div>
        </div>
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
