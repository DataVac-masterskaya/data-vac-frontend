import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="text-6xl font-bold text-accent mb-4">404</div>
      <h1 className="text-xl font-semibold text-fg mb-2">Страница не найдена</h1>
      <p className="text-sm text-fg-secondary mb-6">
        Запрошенная страница не существует или была перемещена.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-accent text-white rounded-full text-sm hover:opacity-90 transition-opacity"
      >
        На главную
      </Link>
    </div>
  )
}
