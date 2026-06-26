interface VaccineCatalogItem {
  id: string
  name: string
  officialName: string | null
  infections: string[]
  isAvailable: boolean
}
