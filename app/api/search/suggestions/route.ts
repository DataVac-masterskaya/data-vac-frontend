import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = (process.env.NEXT_PUBLIC_API_URL ?? '').replace(/\/v\d+$/, '')

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') ?? ''

  if (!q.trim()) {
    return NextResponse.json({
      vaccines: [],
      infections: [],
      ingredients: [],
      contraindications: [],
      instructions: [],
    })
  }

  const url = `${BACKEND_URL}/search/suggestions/?q=${encodeURIComponent(q.trim())}`

  try {
    const res = await fetch(url, { cache: 'no-store' })

    if (!res.ok) {
      return NextResponse.json({ error: res.statusText }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Search unavailable' }, { status: 502 })
  }
}
