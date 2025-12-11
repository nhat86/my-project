import { SOURCES, CATEGORY_KEYWORDS } from "./sources";

// Hàm bỏ dấu
function removeVietnameseTones(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

export function detectCategory(message: string) {
  const text = removeVietnameseTones(message.toLowerCase());
  const matchedCategories: string[] = [];

  for (const category of SOURCES) {
    const keywords = CATEGORY_KEYWORDS[category.name] || [];
    if (keywords.some((kw) => text.includes(kw.toLowerCase()))) {
      matchedCategories.push(category.name);
    }
  }

  // Nếu không khớp → trả về mảng rỗng
  return matchedCategories;
}
