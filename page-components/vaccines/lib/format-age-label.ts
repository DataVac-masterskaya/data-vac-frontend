export function formatAgeLabel(
  minAgeMonths: number | null,
  maxAgeMonths: number | null,
): string {
  const minPart =
    minAgeMonths !== null
      ? `от ${Math.floor(minAgeMonths / 12)} лет${
          minAgeMonths % 12 > 0 ? ` ${minAgeMonths % 12} мес.` : ''
        }`
      : null

  const maxPart =
    maxAgeMonths !== null ? `до ${Math.floor(maxAgeMonths / 12)} лет` : null

  if (minPart && maxPart) {
    return `${minPart} ${maxPart}`
  }

  if (minPart) {
    return minPart
  }

  if (maxPart) {
    return maxPart
  }

  return 'Не ограничено'
}
