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
  beauty: React.createElement(GiLipstick),
  fragrances: React.createElement(TbPerfume),
  furniture: React.createElement(GiRockingChair),
  groceries: React.createElement(GiWheat),
  "home-decoration": React.createElement(FaShoppingBag),
  "kitchen-accessories": React.createElement(FaKitchenSet),
  laptops: React.createElement(LuLaptop),
  "mens-shirts": React.createElement(TbShirtSport),
  "mens-shoes": React.createElement(GiSonicShoes),
  "mens-watches": React.createElement(GiWatch),
  "mobile-accessories": React.createElement(FaMobileAlt),
  motorcycle: React.createElement(FaMotorcycle),
  "skin-care": React.createElement(FaRegFaceGrin),
  smartphones: React.createElement(FaMobileAlt),
  "sports-accessories": React.createElement(MdOutlineSportsGymnastics),
  sunglasses: React.createElement(TbSunglassesFilled),
  tablets: React.createElement(FaTabletAlt),
  tops: React.createElement(PiDress),
  vehicle: React.createElement(FaCarAlt),
  "womens-bags": React.createElement(BsHandbag),
  "womens-dresses": React.createElement(GiLargeDress),
  "womens-jewellery": React.createElement(GiGemChain),
  "womens-shoes": React.createElement(GiSonicShoes),
  "womens-watches": React.createElement(GiWatch),
}
