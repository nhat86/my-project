import { SOURCES } from "./sources";

export function detectCategory(message: string) {
  const text = message.toLowerCase();

  for (const category of SOURCES) {
    if (text.includes(category.name)) return category;
  }

  // Nếu không khớp → auto đoán: chủ yếu là nước hoa & mỹ phẩm
  return SOURCES.find((c) => c.name === "nước hoa")!;
}
