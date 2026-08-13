export function mediaUrl(path: string | null | undefined): string | null {
  if (!path) return null
  if (path.startsWith('http')) return path
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? ''
  try {
    const origin = new URL(apiUrl).origin
    return `${origin}${path}`
  } catch {
    return path
  }
}
