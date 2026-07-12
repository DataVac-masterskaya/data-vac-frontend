import { test, expect, type Page } from '@playwright/test'
import { LABEL_TAB_PROCESSED, LABEL_TAB_INSTRUCTION } from '../page-components/vaccines/detail/ui/vaccine-detail-content.labels'

test.describe('Vaccines routes', () => {
  test('страница /vaccines отображает каталог вакцин', async ({ page }) => {
    await page.goto('/vaccines')
    await page.waitForLoadState('networkidle')

    await expect(page.getByRole('button', { name: 'Название вакцины' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Официальное название' })).toBeVisible()
    await expect(page.getByRole('button', { name: /Пентаксим/ })).toBeVisible()
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

test.describe('Vaccine detail page', () => {
  const TAB_PROCESSED = LABEL_TAB_PROCESSED
  const TAB_INSTRUCTION = LABEL_TAB_INSTRUCTION

  const tabPanel = (page: Page) => page.getByRole('tabpanel')

  test.beforeEach(async ({ page }) => {
    await page.goto('/vaccines/2')
    await page.waitForLoadState('networkidle')
    await expect(
      page.getByRole('heading', { level: 1, name: 'Инфанрикс Гекса' }),
    ).toBeVisible()
  })

  test('показывает обе вкладки контента', async ({ page }) => {
    await expect(page.getByRole('tab', { name: TAB_PROCESSED })).toBeVisible()
    await expect(page.getByRole('tab', { name: TAB_INSTRUCTION })).toBeVisible()
  })

  test('по умолчанию открыта вкладка переработанной информации', async ({ page }) => {
    await expect(page.getByRole('tab', { name: TAB_PROCESSED })).toHaveAttribute(
      'aria-selected',
      'true',
    )
    await expect(
      tabPanel(page).getByRole('heading', { name: 'Полное название вакцины' }),
    ).toBeVisible()
    await expect(tabPanel(page).locator('#instruction-section-допустимый-возраст')).toHaveCount(0)
  })

  test('переключает вкладки без перезагрузки страницы', async ({ page }) => {
    await page.getByRole('tab', { name: TAB_INSTRUCTION }).click()

    await expect(page).toHaveURL('/vaccines/2')
    await expect(page.getByRole('tab', { name: TAB_INSTRUCTION })).toHaveAttribute(
      'aria-selected',
      'true',
    )
    await expect(tabPanel(page).locator('#instruction-section-допустимый-возраст')).toBeVisible()
    await expect(
      tabPanel(page).getByRole('heading', { name: 'Полное название вакцины' }),
    ).toHaveCount(0)

    await page.getByRole('tab', { name: TAB_PROCESSED }).click()

    await expect(page.getByRole('tab', { name: TAB_PROCESSED })).toHaveAttribute(
      'aria-selected',
      'true',
    )
    await expect(tabPanel(page).getByRole('heading', { name: 'Инфекция' })).toBeVisible()
    await expect(tabPanel(page).locator('#instruction-section-допустимый-возраст')).toHaveCount(0)
  })
})
