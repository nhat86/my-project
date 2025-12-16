import { SOURCES, CategorySources } from "./sources";

// Hàm chuẩn hóa: loại bỏ dấu, lowercase
function normalizeText(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function detectCategory(message: string): CategorySources {
  const text = normalizeText(message);

  for (const category of SOURCES) {
    for (const kw of category.keywords) {
      if (text.includes(normalizeText(kw))) return category;
    }
  }

  // Nếu không khớp → mặc định nước hoa
  return SOURCES.find((c) => c.name === "nước hoa")!;
}
