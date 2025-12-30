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
    link: "/category/my_pham",
    icon: Sparkles, // chỉ reference, không JSX
  },
  {
    name: "Thời trang",
    description: "Quần áo, váy, áo khoác phong cách Pháp",
    link: "/category/thoi_trang",
    icon: Shirt,
  },
  {
    name: "Giày dép",
    description: "Sneakers, giày da và giày thời trang",
    link: "/category/giay_dep",
    icon: Footprints,
  },
  {
    name: "Túi xách",
    description: "Túi xách, ví và phụ kiện cao cấp",
    link: "/category/tui_xach",
    icon: ShoppingBag,
  },
  {
    name: "Kính mắt",
    description: "Kính mát, kính cận chính hãng",
    link: "/category/kinh_mat",
    icon: Glasses,
  },
  {
    name: "Thuốc bổ",
    description: "Vitamin & thực phẩm chức năng từ Pháp",
    link: "/category/thuoc_bo",
    icon: Pill,
  },
  {
    name: "Thể thao",
    description: "Đồ thể thao, outdoor & fitness",
    link: "/category/the_thao",
    icon: Dumbbell,
  },
];
