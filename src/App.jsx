import { BrowserRouter, Route, Routes } from "react-router"
import ProductDetails from "./components/ProductDetails"
import Home from "./components/Home"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  )
}
