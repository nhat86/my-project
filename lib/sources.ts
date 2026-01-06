export type SiteSource = {
  name: string;
  url: string;
  description: string;
  image: string; // path trong /public/images
};

export type CategorySources = {
  name: string;
  name_vi: string;
  keywords: string[];
  sites: SiteSource[];
};
export const SOURCES: CategorySources[] = [
  // 1. Beauty
  {
    name: "my_pham",
    name_vi: "Mỹ phẩm",
    keywords: [
      "nước hoa", "nuoc hoa", "perfume", "parfum",
      "mỹ phẩm", "my pham", "cosmetics", "skincare",
      "chăm sóc da", "cham soc da", "makeup"
    ],
    sites: [
      {
        name: "Sephora France",
        url: "https://www.sephora.fr/",
        description: "Chuỗi mỹ phẩm và nước hoa hàng đầu tại Pháp",
        image: "/images/sephora.jpg",
      },
      {
        name: "Marionnaud",
        url: "https://www.marionnaud.fr/",
        description: "Mỹ phẩm, skincare và nước hoa cao cấp",
        image: "/images/marionnaud.jpg",
      },
      {
        name: "Nocibé",
        url: "https://www.nocibe.fr/",
        description: "Chuyên nước hoa và sản phẩm làm đẹp",
        image: "/images/nocibe.jpg",
      },
      {
        name: "Yves Rocher",
        url: "https://www.yves-rocher.fr/",
        description: "Thương hiệu Pháp nổi tiếng với mỹ phẩm thiên nhiên và nước hoa",
        image: "/images/yves-rocher.jpg",
      },
      {
  name: "Kiko Milano",
  url: "https://www.kikocosmetics.com/fr-fr/",
  description: "Thương hiệu mỹ phẩm Ý phổ biến tại Pháp, nổi bật với trang điểm và chăm sóc da",
  image: "/images/kiko.jpg",
},
{
  name: "L’Oréal Paris",
  url: "https://www.lorealparis.fr/",
  description: "Thương hiệu mỹ phẩm quốc tế nổi tiếng với các sản phẩm chăm sóc da, trang điểm và nước hoa",
  image: "/images/loreal-paris.jpg",
}


    ],
  },

  // 2. Fashion
  {
    name: "thoi_trang",
    name_vi: "Thời trang",
    keywords: [
      "quần áo", "quan ao", "áo", "ao", "váy", "vay",
      "quần", "quan", "jean", "shirt",
      "thời trang", "thoi trang", "fashion"
    ],
    sites: [
  {
    name: "Zara France",
    url: "https://www.zara.com/fr/",
    description: "Thời trang nhanh, thiết kế hiện đại cho nam và nữ",
    image: "/images/zara.jpg",
  },
  {
    name: "H&M France",
    url: "https://www2.hm.com/fr_fr/",
    description: "Thời trang phổ thông, giá hợp lý cho mọi lứa tuổi",
    image: "/images/hm.jpg",
  },
  {
    name: "Celio",
    url: "https://www.celio.com/",
    description: "Thời trang nam phong cách trẻ trung và năng động",
    image: "/images/celio.jpg",
  },
  {
    name: "Uniqlo France",
    url: "https://www.uniqlo.com/fr/",
    description: "Thời trang tối giản, chất lượng tốt, dễ mặc",
    image: "/images/uniqlo.jpg",
  },
  {
    name: "Kiabi",
    url: "https://www.kiabi.com/",
    description: "Thời trang gia đình, giá rẻ, dễ mua",
    image: "/images/kiabi.jpg",
  },
  {
  name: "Levi’s France",
  url: "https://www.levi.com/FR/fr_FR/",
  description: "Thương hiệu jean kinh điển",
  image: "/images/levis.jpg",
  },
],

  },

  // 3. Shoes
  {
    name: "giay_dep",
    name_vi: "Giày dép",
    keywords: [
      "giày", "giay", "giày dép", "giay dep",
      "sneaker", "sneakers", "shoes", "chaussures"
    ],
    sites: [
      {
        name: "Zalando France",
        url: "https://www.zalando.fr/",
        description: "Sàn thương mại điện tử giày và thời trang",
        image: "/images/zalando.jpg",
      },
      {
        name: "Courir",
        url: "https://www.courir.com/",
        description: "Chuyên sneaker và giày thể thao",
        image: "/images/courir.jpg",
      },
      {
  name: "Nike France",
  url: "https://www.nike.com/fr/",
  description: "Giày thể thao và thời trang thể thao",
  image: "/images/nike.jpg",
},
{
  name: "Adidas France",
  url: "https://www.adidas.fr/",
  description: "Giày, quần áo và phụ kiện thể thao",
  image: "/images/adidas.jpg",
},
{
  name: "Eram",
  url: "https://www.eram.fr/",
  description: "Thương hiệu giày nổi tiếng Pháp",
  image: "/images/eram.jpg",
},
{
  name: "New Balance France",
  url: "https://www.newbalance.fr/",
  description: "Giày thể thao và casual chất lượng cao",
  image: "/images/newbalance.jpg",
}
    ],
  },

  // 4. Bags & Accessories
  {
    name: "tui_xach",
    name_vi: "Túi xách",
    keywords: [
      "túi xách", "tui xach", "handbag",
      "sac", "sac à main", "ví", "wallet", "phụ kiện"
    ],
    sites: [
      {
  name: "Louis Vuitton",
  url: "https://fr.louisvuitton.com/",
  description: "Túi xách, ví và phụ kiện xa xỉ hàng đầu",
  image: "/images/louisvuitton.jpg",
},
{
  name: "Gucci",
  url: "https://www.gucci.com/fr/fr/",
  description: "Thời trang, túi xách và phụ kiện cao cấp",
  image: "/images/gucci.jpg",
},
{
  name: "Chanel",
  url: "https://www.chanel.com/fr/",
  description: "Túi xách, ví và phụ kiện thời trang sang trọng",
  image: "/images/chanel.jpg",
},
{
  name: "Hermès",
  url: "https://www.hermes.com/fr/fr/",
  description: "Thương hiệu xa xỉ với túi xách và phụ kiện nổi tiếng",
  image: "/images/hermes.jpg",
},
      {
        name: "Longchamp",
        url: "https://www.longchamp.com/fr/fr/",
        description: "Túi xách và phụ kiện cao cấp của Pháp",
        image: "/images/longchamp.jpg",
      }
    ],
  },

  // 5. Eyewear
  {
    name: "kinh_mat",
    name_vi: "Kính mắt",
    keywords: [
      "kính", "kinh", "kính mát",
      "sunglasses", "lunettes"
    ],
    sites: [
      {
  name: "Ray-Ban France",
  url: "https://www.ray-ban.com/fr",
  description: "Kính mát và kính mắt thời trang nổi tiếng",
  image: "/images/rayban.jpg",
},
{
  name: "Prada Eyewear",
  url: "https://www.prada.com/fr/fr/eyewear.html",
  description: "Kính mát và kính thời trang cao cấp",
  image: "/images/prada_eyewear.jpg",
},
{
  name: "Gucci Eyewear",
  url: "https://www.gucci.com/fr/fr/ca/eyewear",
  description: "Kính mắt và phụ kiện thời trang sang trọng",
  image: "/images/gucci_eyewear.jpg",
},
{
  name: "Krys",
  url: "https://www.krys.com/fr",
  description: "Chuỗi cửa hàng kính mắt và kính mát nổi tiếng tại Pháp",
  image: "/images/krys.jpg",
},
      {
        name: "Optic 2000",
        url: "https://www.optic2000.com/",
        description: "Chuỗi cửa hàng kính mắt lớn tại Pháp",
        image: "/images/optic2000.jpg",
      },
      {
        name: "Afflelou",
        url: "https://www.afflelou.com/",
        description: "Kính cận, kính mát và tròng kính",
        image: "/images/afflelou.jpg",
      },
    ],
  },

  // 6. Supplements
  {
    name: "thuoc_bo",
    name_vi: "Thuốc bổ",
    keywords: [
      "thuốc bổ", "thực phẩm chức năng",
      "vitamin", "complément alimentaire", "probiotic"
    ],
    sites: [
      {
        name: "Parapharmacie Lafayette",
        url: "https://www.pharmacielafayette.com/",
        description: "Dược mỹ phẩm và chăm sóc sức khỏe",
        image: "/images/lafayette-parapharmacie.jpg",
      },
      {
        name: "Arkopharma",
        url: "https://www.arkopharma.com/",
        description: "Chuyên thực phẩm chức năng thiên nhiên",
        image: "/images/arkopharma.jpg",
      },
      {
        name: "Easyparapharmacie",
        url: "https://www.easypara.fr/",
        description: "Nhà thuốc online và dược mỹ phẩm",
        image: "/images/easypara.jpg",
      },
    ],
  },

  // 8. Sports & Outdoor
  {
    name: "the_thao",
    name_vi: "Thể thao",
    keywords: [
      "đồ thể thao", "sports", "gym", "fitness",
      "outdoor", "camping", "running", "swimming"
    ],
    sites: [
      {
        name: "Decathlon France",
        url: "https://www.decathlon.fr/",
        description: "Đồ thể thao và outdoor giá tốt",
        image: "/images/decathlon.jpg",
      },
      {
        name: "Intersport",
        url: "https://www.intersport.fr/",
        description: "Chuỗi bán lẻ thể thao quốc tế",
        image: "/images/intersport.jpg",
      },
      {
        name: "Go Sport",
        url: "https://www.go-sport.com/",
        description: "Thiết bị và quần áo thể thao",
        image: "/images/gosport.jpg",
      },
       {
  name: "Nike France",
  url: "https://www.nike.com/fr/",
  description: "Giày thể thao và thời trang thể thao",
  image: "/images/nike.jpg",
},
{
  name: "Adidas France",
  url: "https://www.adidas.fr/",
  description: "Giày, quần áo và phụ kiện thể thao",
  image: "/images/adidas.jpg",
},
    ],
  },
];
