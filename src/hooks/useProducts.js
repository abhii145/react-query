import { keepPreviousData, useQuery } from "@tanstack/react-query"

const fetchCategories = async () => {
  const response = await fetch(`https://dummyjson.com/products/categories`)
  const data = await response.json()
  return data
}

const fetchProducts = async ({
  limit,
  skip,
  searchQuery,
  category,
  sortBy,
  order,
}) => {
  let url = `https://dummyjson.com/products/search?limit=${limit}&skip=${skip}&q=${searchQuery}&sortBy=${sortBy}&order=${order}`
  if (category && category !== "All") {
    url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`
  }

  const response = await fetch(url)
  const data = await response.json()
  return {
    products: data.products,
    total: data.total,
  }
}

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  })
}

export const useProducts = ({
  limit,
  skip,
  searchQuery,
  category,
  sortBy,
  order,
}) => {
  return useQuery({
    queryKey: ["products", limit, skip, searchQuery, category, sortBy, order],
    queryFn: () =>
      fetchProducts({ limit, skip, searchQuery, category, sortBy, order }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  })
}
