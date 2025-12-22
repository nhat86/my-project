// app/data/categories.ts
import { Sparkles, Shirt, Footprints, ShoppingBag, Glasses, Pill, Dumbbell } from "lucide-react";

export type Category = {
  name: string;
  description: string;
  link: string;
  icon: typeof Sparkles; // type là React component
};

export const categories: Category[] = [
  {
    name: "Làm đẹp & Nước hoa",
    description: "Nước hoa, mỹ phẩm và chăm sóc da từ Pháp",
    link: "/category/beauty",
    icon: Sparkles, // chỉ reference, không JSX
  },
  {
    name: "Thời trang",
    description: "Quần áo, váy, áo khoác phong cách Pháp",
    link: "/category/fashion",
    icon: Shirt,
  },
  {
    name: "Giày dép",
    description: "Sneakers, giày da và giày thời trang",
    link: "/category/shoes",
    icon: Footprints,
  },
  {
    name: "Túi xách",
    description: "Túi xách, ví và phụ kiện cao cấp",
    link: "/category/bags",
    icon: ShoppingBag,
  },
  {
    name: "Kính mắt",
    description: "Kính mát, kính cận chính hãng",
    link: "/category/eyewear",
    icon: Glasses,
  },
  {
    name: "Thuốc bổ",
    description: "Vitamin & thực phẩm chức năng từ Pháp",
    link: "/category/supplements",
    icon: Pill,
  },
  {
    name: "Thể thao",
    description: "Đồ thể thao, outdoor & fitness",
    link: "/category/sports",
    icon: Dumbbell,
  },
];
