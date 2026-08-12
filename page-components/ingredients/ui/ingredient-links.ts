export function ingredientVaccinesHref(ingredientId: number, label?: string): string {
  const params = new URLSearchParams({ ingredient_id: String(ingredientId) })
  if (label?.trim()) params.set('label', label.trim())
  return `/vaccines/search?${params.toString()}`
}
