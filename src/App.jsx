import { BrowserRouter, Route, Routes } from "react-router"
import ProductDetails from "./components/ProductDetails"
import Home from "./components/Home"
import HomePage from "./components/HomePage"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Cart from "./components/Cart"
import FavoriteItems from "./components/FavoriteItems"

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/favourite" element={<FavoriteItems />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
