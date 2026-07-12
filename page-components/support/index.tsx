import Image from 'next/image'
import { DECORATIVE_SHAPES } from '@/shared/ui/decorative-shapes'
import { FAQSection } from './ui/FAQSection'
import { SupportTabs } from './ui/SupportTabs'
import { DonationReasonsCarousel } from './ui/DonationReasonsCarousel'

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

const DONATION_REASONS = [
  {
    title: 'Контент',
    description:
      'Поскольку инструкции к вакцинам меняются, нам необходимо регулярно отслеживать эти изменения. К сожалению, на данный момент это ручной труд.',
  },
  {
    title: 'Развитие',
    description:
      'Для более чем сотни вакцин мы обработали четыре ключевых параметра: инфекции, возраст, противопоказания и способы введения. Но мы хотим сделать приложение еще удобнее и насыщеннее — для этого нам нужно обработать другие разделы инструкций, а также изменить дизайн и механизм приложения.',
  },
  {
    title: 'Техническое усовершенствование',
    description:
      'С целью экономии наше приложение было создано в «Битриксе». Но это неоптимальный вариант, и мы бы хотели использовать более современный стек.',
  },
  {
    title: 'Техническое обеспечение',
    description:
      'Домен, хостинг, база, оплата человеческого труда по минимальной поддержке работоспособности приложения.',
  },
]

export default function SupportPage() {
  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      <section className="relative bg-card rounded-2xl px-4 pt-6 pb-[108px] md:p-8 xl:px-10 xl:py-8">
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:justify-between md:items-start md:gap-8">
          <h1 className="text-[32px] font-medium leading-[1.125] text-accent shrink-0 md:w-[240px]">
            Поддержите
            <br />
            нашу работу
          </h1>
          <div className="flex flex-col gap-6 md:gap-8 md:flex-1 xl:max-w-[824px]">
            <div className="flex flex-col gap-2 text-sm text-fg xl:flex-row xl:gap-6">
              <p className="xl:flex-1">
                Мы не зависим от государственных компаний или фармокологических корпораций — мы
                объединились как неравнодушные родители, которые хотят, чтобы они и их дети жили в
                безопасном обществе, защищенном от вакциноуправляемых инфекций
              </p>
              <p className="xl:flex-1">
                Мы создали первый в мире каталог вакцин с подробной разметкой, специфичной именно
                для вакцин. Мы хотим помочь родителям и пациентам сделать правильный выбор, а также
                стать подспорьем в работе медиков
              </p>
            </div>
            <p className="text-xl font-medium text-fg">
              Станьте частью этого образовательного и просветительского проекта! Поддержите DataVac!
            </p>
          </div>
        </div>
        <div
          className="hidden md:block absolute left-[28px] size-[199px] top-[136px] xl:top-[112px] pointer-events-none"
          aria-hidden
        >
          <Image
            src={DECORATIVE_SHAPES.coube.src}
            alt=""
            fill
            sizes="199px"
            className="object-contain"
          />
        </div>
      </section>

      <SupportTabs presets={DONATION_PRESETS} />

      <section>
        <h2 className="text-2xl text-fg mb-6">Зачем нам пожертования?</h2>
        <DonationReasonsCarousel reasons={DONATION_REASONS} />
      </section>

      <FAQSection />
    </div>
  )
}
