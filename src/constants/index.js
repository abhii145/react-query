
export const SORT_OPTIONS = {
  "Price: Low to High": { sortBy: "price", order: "asc" },
  "Price: High to Low": { sortBy: "price", order: "desc" },
  "Newest First": { sortBy: "date", order: "desc" },
  "Highest Rating": { sortBy: "rating", order: "desc" },
  feature: { sortBy: "feature", order: "asc" },
}

export const DEFAULT_SEARCH_PARAMS = {
  skip: 0,
  limit: 10,
  search: "",
  category: "All",
  sortBy: "price",
  order: "asc",
}