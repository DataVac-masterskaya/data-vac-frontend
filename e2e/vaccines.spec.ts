import { test, expect } from '@playwright/test'

test.describe('Vaccines routes', () => {
  test('страница /vaccines отображает заглушку', async ({ page }) => {
    await page.goto('/vaccines')
    await page.waitForLoadState('networkidle')

    await expect(
      page.getByRole('heading', { level: 1, name: 'Вакцины (в разработке)' }),
    ).toBeVisible()
  })

  test('страница /vaccines/search показывает таблицу и ведёт на детальную', async ({
    page,
  }) => {
    await page.goto('/vaccines/search')
    await page.waitForLoadState('networkidle')

    await expect(
      page.getByRole('heading', { level: 1, name: 'Вакцины' }),
    ).toBeVisible()

    const vaccineName = 'Пентаксим'
    const row = page
      .locator('[role="button"][tabindex="0"]')
      .filter({ hasText: new RegExp(`^${vaccineName}`) })
      .locator('visible=true')

    await expect(row).toBeVisible()
    // В строке есть вложенная button (AdministrationIcon) — кликаем по области названия.
    await row.click({ position: { x: 10, y: 15 } })

    await expect(page).toHaveURL('/vaccines/1')
    await expect(
      page.getByRole('heading', { level: 1, name: vaccineName }),
    ).toBeVisible()
  })

  test('страница /vaccines/search применяет фильтрацию по q', async ({ page }) => {
    await page.goto('/vaccines/search?q=пент')
    await page.waitForLoadState('networkidle')

    const rows = page.locator('[role="button"][tabindex="0"]')

    await expect(
      rows.filter({ hasText: /^Пентаксим/ }).first(),
    ).toBeVisible()
    await expect(rows.filter({ hasText: /^Инфанрикс Гекса/ })).toHaveCount(0)
  })
})
