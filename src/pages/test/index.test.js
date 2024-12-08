import {
  Cart,
  FavoriteItems,
  ProductListingPage,
  LandingPage,
  ProductDetails,
} from "../index"

describe("Component Imports", () => {
  test("should import all components correctly", () => {
    expect(Cart).toBeDefined()
    expect(FavoriteItems).toBeDefined()
    expect(ProductListingPage).toBeDefined()
    expect(LandingPage).toBeDefined()
    expect(ProductDetails).toBeDefined()
  })
})
