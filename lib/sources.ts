export type CategorySources = {
  name: string; // Tên category chính
  keywords: string[]; // Tất cả từ khóa liên quan
  sites: { name: string; url: string }[];
};

export const SOURCES: CategorySources[] = [
  {
    name: "nước hoa",
    keywords: ["nước hoa", "nuoc hoa", "perfume", "parfum"],
    sites: [
      { name: "Sephora", url: "https://www.sephora.fr" },
      { name: "Nocibé", url: "https://www.nocibe.fr" },
      { name: "Marionnaud", url: "https://www.marionnaud.fr" },
    ],
  },
  {
    name: "quần áo",
    keywords: ["quần áo", "quan ao", "áo", "ao", "váy", "quan jean", "shirt", "trousers"],
    sites: [
      { name: "Zara", url: "https://www.zara.com/fr/" },
      { name: "H&M", url: "https://www2.hm.com/fr_fr/" },
      { name: "Uniqlo", url: "https://www.uniqlo.com/fr/" },
    ],
  },
  {
    name: "điện tử",
    keywords: ["điện tử", "dien tu", "laptop", "điện thoại", "smartphone", "tablet", "camera"],
    sites: [
      { name: "Fnac", url: "https://www.fnac.com" },
      { name: "Darty", url: "https://www.darty.com" },
    ],
  },
];
