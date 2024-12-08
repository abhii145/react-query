import {
  Categories,
  CategoryFilter,
  EmptyStateCard,
  Footer,
  Header,
  NotFound,
  PaginationControls,
  Pagination,
  ProductCard,
  SearchBar,
  SortFilter,
  Caraousel,
} from "../index"
import { test, expect } from "vitest"

test("should import all components correctly", () => {
  expect(Categories).toBeDefined()
  expect(CategoryFilter).toBeDefined()
  expect(EmptyStateCard).toBeDefined()
  expect(Footer).toBeDefined()
  expect(Header).toBeDefined()
  expect(NotFound).toBeDefined()
  expect(PaginationControls).toBeDefined()
  expect(Pagination).toBeDefined()
  expect(ProductCard).toBeDefined()
  expect(SearchBar).toBeDefined()
  expect(SortFilter).toBeDefined()
  expect(Caraousel).toBeDefined()
})
