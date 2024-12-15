import { BrowserRouter, Route, Routes } from "react-router"
import { Footer, Header } from "./components"
import {
  Cart,
  FavoriteItems,
  LandingPage,
  ProductListingPage,
  ProductDetails,
  Orders,
} from "./pages"
import { Suspense } from "react"
import Loader from "./components/Loading"

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Suspense fallback={<Loader />}>
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/products" element={<ProductListingPage />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/favourite" element={<FavoriteItems />} />
            </Routes>
          </main>
          <Footer />
        </Suspense>
      </div>
    </BrowserRouter>
  )
}
