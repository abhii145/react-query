import React from "react"

const Categories = React.lazy(() => import("./Categories"))
const CategoryFilter = React.lazy(() => import("./CategoryFilter"))
const EmptyStateCard = React.lazy(() => import("./EmptyStateCard"))
const Footer = React.lazy(() => import("./Footer"))
const Header = React.lazy(() => import("./Header"))
const NotFound = React.lazy(() => import("./NotFound"))
const PaginationControls = React.lazy(() => import("./PaginationControls"))
const ProductCard = React.lazy(() => import("./ProductCard"))
const SearchBar = React.lazy(() => import("./SearchBar"))
const SortFilter = React.lazy(() => import("./SortFilter"))
const Caraousel = React.lazy(() => import("./Carousel"))

export {
  Categories,
  CategoryFilter,
  EmptyStateCard,
  Footer,
  Header,
  NotFound,
  PaginationControls,
  ProductCard,
  SearchBar,
  SortFilter,
  Caraousel,
}
