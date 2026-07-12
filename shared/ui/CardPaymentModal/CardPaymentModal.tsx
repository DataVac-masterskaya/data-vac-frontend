'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import { Drawer, Button, Label, Input } from '@datavac/ui-kit'
import { validateEmail } from '@/shared/lib/validateEmail'

interface CardForm {
  cardNumber: string
  expiry: string
  cvv: string
  email: string
}

type Field = keyof CardForm
type Errors = Record<Field, string | null>
type Touched = Record<Field, boolean>

const INITIAL_FORM: CardForm = { cardNumber: '', expiry: '', cvv: '', email: '' }
const INITIAL_ERRORS: Errors = { cardNumber: null, expiry: null, cvv: null, email: null }
const INITIAL_TOUCHED: Touched = { cardNumber: false, expiry: false, cvv: false, email: false }

function fmtCard(v: string) {
  return v
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, '$1 ')
}

function fmtExpiry(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 4)
  return d.length >= 3 ? d.slice(0, 2) + '/' + d.slice(2) : d
}

function luhn(num: string) {
  const d = num.replace(/\D/g, '')
  let s = 0
  let alt = false
  for (let i = d.length - 1; i >= 0; i--) {
    let n = parseInt(d[i], 10)
    if (alt) {
      n *= 2
      if (n > 9) n -= 9
    }
    s += n
    alt = !alt
  }
  return s % 10 === 0
}

function vCard(v: string) {
  const d = v.replace(/\D/g, '')
  if (!d) return 'Введите номер карты'
  if (d.length < 13 || d.length > 19) return 'Некорректный номер карты'
  if (!luhn(d)) return 'Некорректный номер карты'
  return null
}

function vExpiry(v: string) {
  const d = v.replace(/\D/g, '')
  if (d.length < 4) return 'Введите ММ/ГГ'
  const m = +d.slice(0, 2)
  const y = +d.slice(2, 4)
  if (m < 1 || m > 12) return 'Некорректный месяц'
  const now = new Date()
  const cy = now.getFullYear() % 100
  const cm = now.getMonth() + 1
  if (y < cy || (y === cy && m < cm)) return 'Карта просрочена'
  return null
}

function vCvv(v: string) {
  return v.replace(/\D/g, '').length < 3 ? 'Введите CVV' : null
}

const validators: Record<Field, (v: string) => string | null> = {
  cardNumber: vCard,
  expiry: vExpiry,
  cvv: vCvv,
  email: validateEmail,
}

interface CardPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  amount: number
  isMonthly?: boolean
}

type PayStatus = 'idle' | 'loading' | 'success' | 'error'

export function CardPaymentModal({ isOpen, onClose, amount, isMonthly = false }: CardPaymentModalProps) {
  const [form, setForm] = useState<CardForm>(INITIAL_FORM)
  const [errors, setErrors] = useState<Errors>(INITIAL_ERRORS)
  const [touched, setTouched] = useState<Touched>(INITIAL_TOUCHED)
  const [status, setStatus] = useState<PayStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!isOpen) {
      setForm(INITIAL_FORM)
      setErrors(INITIAL_ERRORS)
      setTouched(INITIAL_TOUCHED)
      setStatus('idle')
      setErrorMessage('')
    }
  }, [isOpen])

  const set = useCallback(
    (field: Field, raw: string) => {
      setForm((p) => ({ ...p, [field]: raw }))
      if (touched[field]) setErrors((p) => ({ ...p, [field]: validators[field](raw) }))
    },
    [touched],
  )

  const blur = useCallback(
    (f: Field) => {
      setTouched((p) => ({ ...p, [f]: true }))
      setErrors((p) => ({ ...p, [f]: validators[f](form[f]) }))
    },
    [form],
  )

  const isValid = useMemo(
    () => (Object.keys(validators) as Field[]).every((k) => !validators[k](form[k])),
    [form],
  )

  const validateAll = useCallback(() => {
    const next = (Object.keys(validators) as Field[]).reduce(
      (acc, k) => ({ ...acc, [k]: validators[k](form[k]) }),
      {} as Errors,
    )
    setErrors(next)
    setTouched({ cardNumber: true, expiry: true, cvv: true, email: true })
    return !(Object.values(next) as (string | null)[]).some(Boolean)
  }, [form])

  const handlePay = useCallback(async () => {
    if (!validateAll()) return
    setStatus('loading')
    setErrorMessage('')

    try {
      if (!window.cp) {
        throw new Error('CloudPayments SDK not loaded')
      }

      const checkout = new window.cp.Checkout({
        publicId: process.env.NEXT_PUBLIC_CLOUDPAYMENTS_PUBLIC_ID!,
      })

      const [month, year] = form.expiry.split('/')
      const cryptoResult = await checkout.createCryptogramPacket({
        cvv: form.cvv,
        cardNumber: form.cardNumber.replace(/\s/g, ''),
        expDateMonth: month,
        expDateYear: year,
      })

      if (!cryptoResult.success) {
        setStatus('error')
        setErrorMessage('Проверьте данные карты')
        return
      }

      const res = await fetch('/api/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cryptogram: cryptoResult.packet, amount, email: form.email, isMonthly }),
      })

      const data = (await res.json()) as { success: boolean; message?: string }

      if (data.success) {
        setStatus('success')
      } else {
        setStatus('error')
        setErrorMessage(data.message ?? 'Ошибка оплаты')
      }
    } catch (err) {
      console.error('[CP] payment error:', err)
      setStatus('error')
      setErrorMessage('Произошла ошибка. Попробуйте ещё раз.')
    }
  }, [validateAll, form, amount, isMonthly])

  const rub = amount.toLocaleString('ru-RU')

  return (
    <Drawer open={isOpen} onOpenChange={(open) => { if (!open) onClose() }} title="">
        <h2 className="text-[22px] font-medium leading-tight">
          Добровольное ежемесячное пожертвование для АНО «Коллективный Иммунитет»
        </h2>

        {status === 'success' ? (
          <div className="flex flex-col gap-4 xl:mt-10 md:mt-16 mt-8">
            <p className="text-lg font-medium">Спасибо за пожертвование!</p>
            <p className="text-sm text-fg-secondary">
              Подтверждение отправлено на {form.email}
            </p>
            {isMonthly && (
              <p className="text-sm text-fg-secondary">
                Для управления регулярными платежами или отмены подписки перейдите на{' '}
                <a
                  href="https://my.cloudpayments.ru/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link hover:text-accent transition-colors"
                >
                  my.cloudpayments.ru
                </a>
              </p>
            )}
            <Button variant="primary" className="w-full h-14 rounded-full mt-2" onClick={onClose}>
              Закрыть
            </Button>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); void handlePay() }}
            noValidate
            className="flex flex-col xl:mt-10 md:mt-16 mt-8 gap-6"
          >
            <div>
              <Input
                variant="grey"
                type="text"
                inputMode="numeric"
                placeholder="Номер карты"
                value={form.cardNumber}
                onChange={(e) => set('cardNumber', fmtCard(e.target.value))}
                onBlur={() => blur('cardNumber')}
                autoComplete="cc-number"
                disabled={status === 'loading'}
              />
              {touched.cardNumber && errors.cardNumber && (
                <Label className="mt-1 pl-2 text-accent">{errors.cardNumber}</Label>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <Input
                  variant="grey"
                  type="text"
                  inputMode="numeric"
                  placeholder="ММ/ГГ"
                  value={form.expiry}
                  onChange={(e) => set('expiry', fmtExpiry(e.target.value))}
                  onBlur={() => blur('expiry')}
                  autoComplete="cc-exp"
                  disabled={status === 'loading'}
                />
                {touched.expiry && errors.expiry && (
                  <Label className="mt-1 pl-2 text-accent">{errors.expiry}</Label>
                )}
              </div>
              <div>
                <Input
                  variant="grey"
                  type="text"
                  inputMode="numeric"
                  placeholder="CVV"
                  value={form.cvv}
                  onChange={(e) => set('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                  onBlur={() => blur('cvv')}
                  autoComplete="cc-csc"
                  disabled={status === 'loading'}
                />
                {touched.cvv && errors.cvv && (
                  <Label className="mt-1 pl-2 text-accent">{errors.cvv}</Label>
                )}
              </div>
            </div>

            <div>
              <Input
                variant="grey"
                type="email"
                placeholder="Ваш e-mail"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                onBlur={() => blur('email')}
                autoComplete="email"
                disabled={status === 'loading'}
              />
              {touched.email && errors.email && (
                <Label className="mt-1 pl-2 text-accent">{errors.email}</Label>
              )}
            </div>

            {status === 'error' && (
              <p className="text-sm text-accent pl-2">{errorMessage}</p>
            )}

            <Button
              type="submit"
              variant="primary"
              disabled={!isValid || status === 'loading'}
              className="w-full h-14 text-sm font-semibold rounded-full"
            >
              {status === 'loading' ? 'Обработка...' : `Оплатить ${rub} ₽`}
            </Button>

            <p className="flex items-center gap-1.5 text-xs text-fg-muted">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Данные карты передаются напрямую в CloudPayments и не хранятся на нашем сайте
            </p>
          </form>
        )}
      </Drawer>
  )
}
