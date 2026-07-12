export function validateEmail(email: string): string | null {
  if (!email) return 'Введите email'
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? null : 'Некорректный email'
}
