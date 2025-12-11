export type CategorySources = {
  name: string;
  sites: { name: string; url: string }[];
};

// Danh sách site cho mỗi category
export const SOURCES: CategorySources[] = [
  {
    name: "nước hoa",
    sites: [
      { name: "Sephora", url: "https://www.sephora.fr" },
      { name: "Nocibé", url: "https://www.nocibe.fr" },
      { name: "Marionnaud", url: "https://www.marionnaud.fr" },
    ],
  },
  {
    name: "quần áo",
    sites: [
      { name: "Zara", url: "https://www.zara.com/fr/" },
      { name: "H&M", url: "https://www2.hm.com/fr_fr/" },
      { name: "Uniqlo", url: "https://www.uniqlo.com/fr/" },
    ],
  },
  {
    name: "điện tử",
    sites: [
      { name: "Fnac", url: "https://www.fnac.com" },
      { name: "Darty", url: "https://www.darty.com" },
    ],
  },
];

// Từ khóa cho mỗi category để detect
export const CATEGORY_KEYWORDS: Record<string, string[]> = {
  "nước hoa": ["nuoc hoa", "perfume", "parfum", "huong", "nuoc hoa nu", "nuoc hoa nam"],
  "quần áo": ["quan ao", "ao", "vay", "trang phuc", "shirt", "pants", "tui xach", "giay"],
  "điện tử": ["dien tu", "laptop", "smartphone", "tv", "dien thoai", "may tinh"],
};
