import { NextRequest, NextResponse } from 'next/server'

const CP_CHARGE_URL = 'https://api.cloudpayments.ru/payments/cards/charge'
const REQUEST_TIMEOUT_MS = 10_000

export async function POST(req: NextRequest) {
  const body = (await req.json()) as {
    cryptogram: string
    amount: number
    email: string
    isMonthly: boolean
  }

  const { cryptogram, email, isMonthly } = body
  const amount = Number(body.amount)

  if (!Number.isFinite(amount) || amount < 1 || amount > 500_000) {
    return NextResponse.json({ success: false, message: 'Некорректная сумма' }, { status: 400 })
  }

  if (!cryptogram || typeof cryptogram !== 'string') {
    return NextResponse.json({ success: false, message: 'Некорректный запрос' }, { status: 400 })
  }

  const publicId = process.env.NEXT_PUBLIC_CLOUDPAYMENTS_PUBLIC_ID
  const apiSecret = process.env.CLOUDPAYMENTS_API_SECRET

  if (!publicId || !apiSecret) {
    return NextResponse.json({ success: false, message: 'Платёжный сервис не настроен' }, { status: 500 })
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    '127.0.0.1'

  const credentials = Buffer.from(`${publicId}:${apiSecret}`).toString('base64')

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const cpRes = await fetch(CP_CHARGE_URL, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Amount: amount,
        Currency: 'RUB',
        IpAddress: ip,
        CardCryptogramPacket: cryptogram,
        Email: email || undefined,
        AccountId: email || undefined,
        Description: 'Добровольное ежемесячное пожертвование для АНО «Коллективный Иммунитет»',
        ...(isMonthly && { Interval: 'Month', Period: 1 }),
      }),
    })

    const data = (await cpRes.json()) as {
      Success: boolean
      Message?: string
      Model?: { SubscriptionId?: string; TransactionId?: number }
    }

    if (data.Success) {
      if (isMonthly && data.Model?.SubscriptionId) {
        console.info('[pay] subscription created:', data.Model.SubscriptionId)
      }
      return NextResponse.json({ success: true })
    }

    return NextResponse.json(
      { success: false, message: data.Message ?? 'Ошибка оплаты' },
      { status: 400 },
    )
  } catch (err) {
    const isTimeout = err instanceof Error && err.name === 'AbortError'
    console.error('[pay] CloudPayments request failed:', err)
    return NextResponse.json(
      { success: false, message: isTimeout ? 'Сервис недоступен, попробуйте позже' : 'Ошибка оплаты' },
      { status: 502 },
    )
  } finally {
    clearTimeout(timeout)
  }
}
