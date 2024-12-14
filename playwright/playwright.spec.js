import { test, expect } from "@playwright/test"

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/")
  })

  test.afterEach(async ({ page }, testInfo) => {
    // Capture screenshot after each test
    const screenshotPath = `screenshots/${testInfo.title.replace(
      /\s+/g,
      "_"
    )}.png`
    await page.screenshot({ path: screenshotPath })
    console.log(`Screenshot saved: ${screenshotPath}`)
  })

  test("Should render Header", async ({ page }) => {
    await expect(page.getByRole("textbox")).toBeVisible()
    await expect(page.getByTestId("favourite-link")).toBeVisible()
    await expect(page.getByTestId("cart-link")).toBeVisible()
  })

  test("Should render Footer", async ({ page }) => {
    await expect(page.locator("footer")).toBeVisible()
  })

  test("Should render category list", async ({ page }) => {
    await expect(page.locator("h2")).toHaveText("Categories")

    const viewAllProductsLink = page.locator('a:has-text("View All Products")')
    await expect(viewAllProductsLink).toHaveText("View All Products")

    const categories = await page.locator(".grid > a")
    const categoryCount = await categories.count()
    expect(categoryCount).toBeGreaterThan(0)

    for (let i = 0; i < categoryCount; i++) {
      const category = categories.nth(i)
      await expect(category).toBeVisible()
      await expect(category.locator("span")).not.toBeEmpty()
    }
  })
})

test.describe("Products List Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/")
    await expect(page.locator("h2")).toHaveText("Categories")

    const viewAllProductsLink = page.locator(
      'a[data-discover="true"]:has-text("View All Products")'
    )
    await expect(viewAllProductsLink).toHaveText("View All Products")

    await viewAllProductsLink.click()
    await expect(page).toHaveURL("http://localhost:5173/products")
  })

  test.afterEach(async ({ page }, testInfo) => {
    // Capture screenshot after each test
    const screenshotPath = `screenshots/${testInfo.title.replace(
      /\s+/g,
      "_"
    )}.png`
    await page.screenshot({ path: screenshotPath })
    console.log(`Screenshot saved: ${screenshotPath}`)
  })

  test("should render product list page on click of view all product", async ({
    page,
  }) => {
    const products = page.locator(".group.relative")
    await expect(products).toHaveCount(10)

    const previousButton = page.locator('button:has-text("Previous")')
    const nextButton = page.locator('button:has-text("Next")')
    await expect(previousButton).toBeDisabled()
    await expect(nextButton).toBeEnabled()
  })

  test("should navigate to product details page on product click", async ({
    page,
  }) => {
    const firstProduct = page.locator(".group.relative").first()
    await firstProduct.click()

    await expect(page).toHaveURL(/\/product\/\d+/)
    await expect(page.locator("[data-testid='product-details']")).toBeVisible()
    await expect(page.locator("[data-testid='product-title']")).toBeVisible()
    await expect(page.locator("[data-testid='product-price']")).toBeVisible()
    await expect(page.locator("[data-testid='add-to-cart']")).toBeVisible()

    await page.locator("[data-testid='add-to-cart']").click()
    await expect(page.locator(".Toastify__toast--success")).toHaveText(
      "added to cart"
    )
  })
})
