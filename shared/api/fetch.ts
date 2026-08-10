import { inspect } from 'util'

export class ApiError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  console.log(`[API →] ${url}`)
  const res = await fetch(url, options)

  let body: unknown
  const text = await res.text()
  try {
    body = JSON.parse(text)
  } catch {
    body = text
  }

  if (!res.ok) {
    console.error(`[API ✗] ${res.status} ${url}`, body)
    throw new ApiError(res.status, `Не удалось получить данные (${res.status})`)
  }

  console.log(`[API ✓] ${res.status} ${url}`, inspect(body, { colors: true, depth: null }))
  return body as T
}
