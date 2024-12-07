import React from "react"
import { TbPerfume, TbShirtSport, TbSunglassesFilled } from "react-icons/tb"
import {
  GiGemChain,
  GiLargeDress,
  GiLipstick,
  GiRockingChair,
  GiSonicShoes,
  GiWatch,
  GiWheat,
} from "react-icons/gi"
import { FaKitchenSet, FaMotorcycle, FaRegFaceGrin } from "react-icons/fa6"
import { MdOutlineSportsGymnastics } from "react-icons/md"
import { BsHandbag } from "react-icons/bs"
import { LuLaptop } from "react-icons/lu"
import { PiDress } from "react-icons/pi"
import {
  FaCarAlt,
  FaMobileAlt,
  FaShoppingBag,
  FaTabletAlt,
} from "react-icons/fa"

export const SORT_OPTIONS = {
  feature: { sortBy: "feature", order: "asc" },
  "Price: Low to High": { sortBy: "price", order: "asc" },
  "Price: High to Low": { sortBy: "price", order: "desc" },
  "Newest First": { sortBy: "date", order: "desc" },
  "Highest Rating": { sortBy: "rating", order: "desc" },
}

export const DEFAULT_SEARCH_PARAMS = {
  skip: 0,
  limit: 10,
  search: "",
  category: "All",
  sortBy: "price",
  order: "asc",
}

export const categoryIcons = {
  beauty: React.createElement(GiLipstick, { color: "red" }),
  fragrances: React.createElement(TbPerfume, { color: "purple" }),
  furniture: React.createElement(GiRockingChair, { color: "brown" }),
  groceries: React.createElement(GiWheat, { color: "goldenrod" }),
  "home-decoration": React.createElement(FaShoppingBag, { color: "blue" }),
  "kitchen-accessories": React.createElement(FaKitchenSet, { color: "green" }),
  laptops: React.createElement(LuLaptop, { color: "gray" }),
  "mens-shirts": React.createElement(TbShirtSport, { color: "blue" }),
  "mens-shoes": React.createElement(GiSonicShoes, { color: "black" }),
  "mens-watches": React.createElement(GiWatch, { color: "silver" }),
  "mobile-accessories": React.createElement(FaMobileAlt, { color: "black" }),
  motorcycle: React.createElement(FaMotorcycle, { color: "red" }),
  "skin-care": React.createElement(FaRegFaceGrin, { color: "pink" }),
  smartphones: React.createElement(FaMobileAlt, { color: "black" }),
  "sports-accessories": React.createElement(MdOutlineSportsGymnastics, {
    color: "orange",
  }),
  sunglasses: React.createElement(TbSunglassesFilled, { color: "black" }),
  tablets: React.createElement(FaTabletAlt, { color: "gray" }),
  tops: React.createElement(PiDress, { color: "purple" }),
  vehicle: React.createElement(FaCarAlt, { color: "blue" }),
  "womens-bags": React.createElement(BsHandbag, { color: "pink" }),
  "womens-dresses": React.createElement(GiLargeDress, { color: "red" }),
  "womens-jewellery": React.createElement(GiGemChain, { color: "gold" }),
  "womens-shoes": React.createElement(GiSonicShoes, { color: "red" }),
  "womens-watches": React.createElement(GiWatch, { color: "gold" }),
}
