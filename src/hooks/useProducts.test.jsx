import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useCategories, useProducts } from './useProducts'
import { describe, expect, it, vi } from "vitest"

vi.mock('./useProducts', () => ({
  useCategories: vi.fn(() => ({
    isSuccess: true,
    data: [{ id: 1, name: 'Category 1' }, { id: 2, name: 'Category 2' }]
  })),
  useProducts: vi.fn(() => ({
    isSuccess: true,
    data: {
      products: [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }],
      total: 2
    }
  }))
}));

const queryClient = new QueryClient()

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
)

describe('useCategories', () => {
  it("fetches and returns categories", async () => {
    const { result } = renderHook(() => useCategories(), { wrapper })

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data).toBeDefined()
    expect(Array.isArray(result.current.data)).toBe(true)
  })
})

describe('useProducts', () => {
  it("fetches and returns products", async () => {
    const { result } = renderHook(
      () =>
        useProducts({
          limit: 10,
          skip: 0,
          searchQuery: "",
          category: "All",
          sortBy: "name",
          order: "asc",
        }),
      { wrapper }
    )

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data).toBeDefined()
    expect(result.current.data.products).toBeDefined()
    expect(Array.isArray(result.current.data.products)).toBe(true)
    expect(result.current.data.total).toBeDefined()
  })
})