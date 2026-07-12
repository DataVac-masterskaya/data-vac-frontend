interface CPCheckoutOptions {
  publicId: string
}

interface CPCryptogramInput {
  cvv: string
  cardNumber: string
  expDateMonth: string
  expDateYear: string
  name?: string
}

type CPCryptogramResult =
  | { success: true; packet: string }
  | { success: false; messages: Record<string, string> }

interface CPCheckout {
  createCryptogramPacket(input: CPCryptogramInput): Promise<CPCryptogramResult>
}

interface CPWidgetOptions {
  publicId: string
  description: string
  amount: number
  currency: string
  email?: string
  accountId?: string
  skin?: string
}

interface CPWidget {
  pay(
    action: 'charge' | 'auth',
    options: CPWidgetOptions,
    callbacks?: {
      onSuccess?: (options: CPWidgetOptions) => void
      onFail?: (reason: string, options: CPWidgetOptions) => void
      onComplete?: (paymentResult: unknown, options: CPWidgetOptions) => void
    },
  ): void
}

declare global {
  interface Window {
    cp: {
      Checkout: new (options: CPCheckoutOptions) => CPCheckout
      CloudPayments: new () => CPWidget
    }
  }
}

export {}
