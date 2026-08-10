import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = (process.env.NEXT_PUBLIC_API_URL ?? '').replace(/\/v\d+$/, '')

export async function POST(req: NextRequest) {
  const body = await req.json() as { entityType: string; entityId: number }

  try {
    const res = await fetch(`${BACKEND_URL}/search/select/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      return NextResponse.json({ error: res.statusText }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Select unavailable' }, { status: 502 })
  }
}
