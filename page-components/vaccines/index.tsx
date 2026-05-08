import { fetchVaccines } from '@/shared/api/vaccines'

export default async function VaccinesPage({
  searchParams,
}: {
  searchParams: Promise<{ letter?: string; sort?: string }>
}) {
  const { letter, sort } = await searchParams
  const { results, count } = await fetchVaccines({
    letter,
    sort: sort === 'name' ? 'name' : 'popularity',
  })

  const alphabet = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'.split('')

  return (
    <div>
      <h1 className="text-2xl font-semibold text-fg mb-6">
        Вакцины <span className="text-fg-secondary font-normal text-base">({count})</span>
      </h1>

      <div className="flex flex-wrap gap-1 mb-4">
        <a
          href="/vaccines"
          className={`px-2 py-1 rounded text-xs ${!letter ? 'bg-accent text-white' : 'bg-card text-fg hover:bg-subtle'}`}
        >
          Все
        </a>
        {alphabet.map((l) => (
          <a
            key={l}
            href={`/vaccines?letter=${l}`}
            className={`px-2 py-1 rounded text-xs ${letter === l ? 'bg-accent text-white' : 'bg-card text-fg hover:bg-subtle'}`}
          >
            {l}
          </a>
        ))}
      </div>

      <div className="flex gap-2 mb-6">
        <a
          href={`/vaccines${letter ? `?letter=${letter}&` : '?'}sort=popularity`}
          className={`px-3 py-1 rounded-full text-sm ${sort !== 'name' ? 'bg-accent text-white' : 'bg-card text-fg'}`}
        >
          По популярности
        </a>
        <a
          href={`/vaccines${letter ? `?letter=${letter}&` : '?'}sort=name`}
          className={`px-3 py-1 rounded-full text-sm ${sort === 'name' ? 'bg-accent text-white' : 'bg-card text-fg'}`}
        >
          По алфавиту
        </a>
      </div>

      {results.length === 0 ? (
        <div className="bg-card rounded-2xl p-10 text-center text-fg-secondary">
          Ничего не найдено
        </div>
      ) : (
        <div className="bg-card rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-subtle text-fg-secondary text-xs">
              <tr>
                <th className="text-left px-5 py-3">Название</th>
                <th className="text-left px-5 py-3">Инфекции</th>
                <th className="text-left px-5 py-3">Способ введения</th>
                <th className="text-left px-5 py-3">Беременность</th>
              </tr>
            </thead>
            <tbody>
              {results.map((vaccine) => (
                <tr key={vaccine.id} className="border-t border-subtle hover:bg-subtle/50">
                  <td className="px-5 py-3">
                    <a href={`/vaccines/${vaccine.id}`} className="text-accent hover:underline">
                      {vaccine.name}
                    </a>
                  </td>
                  <td className="px-5 py-3 text-fg">
                    {vaccine.infections.slice(0, 2).join(', ')}
                    {vaccine.infections.length > 2 && (
                      <span className="ml-1 text-xs text-fg-secondary">
                        +{vaccine.infections.length - 2}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-fg">{vaccine.administration_method}</td>
                  <td className="px-5 py-3">
                    {vaccine.allowed_during_pregnancy ? (
                      <span className="text-green-600">✓</span>
                    ) : (
                      <span className="text-fg-secondary">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
