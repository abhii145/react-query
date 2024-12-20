import React from "react"

const Cart = React.lazy(() => import("./Cart"))
const FavoriteItems = React.lazy(() => import("./FavoriteItems"))
const ProductListingPage = React.lazy(() => import("./ProductListingPage"))
const LandingPage = React.lazy(() => import("./LandingPage"))
const ProductDetails = React.lazy(() => import("./ProductDetails"))
const Orders = React.lazy(() => import("./Orders"))

export { Cart, FavoriteItems, ProductListingPage, LandingPage, ProductDetails, Orders }
