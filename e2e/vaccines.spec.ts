import { test, expect } from '@playwright/test'

test.describe('VaccinesPage (#10)', () => {
  test('список отображается, клик по строке ведёт на детальную', async ({
    page,
  }) => {
    await page.goto('/vaccines')
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
})
