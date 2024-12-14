import {
  Cart,
  FavoriteItems,
  ProductListingPage,
  LandingPage,
  ProductDetails,
} from "../index"

import { it, expect, describe } from "vitest"

describe("Component Imports", () => {
  it("should import all components correctly", () => {
    expect(Cart).toBeDefined()
    expect(FavoriteItems).toBeDefined()
    expect(ProductListingPage).toBeDefined()
    expect(LandingPage).toBeDefined()
    expect(ProductDetails).toBeDefined()
  })
})
