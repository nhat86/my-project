import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { detectCategory } from "@/lib/detectCategory";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message) {
      return NextResponse.json({ reply: { suggestedProducts: [] } });
    }

    const category = detectCategory(message);
    const sites = category.sites;

    const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

    // Gọi AI
    const response = await client.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "user",
          content: `
Bạn là trợ lý gợi ý sản phẩm cho khách Việt.
Chỉ gợi ý sản phẩm trong danh mục: "${category.name}".

⚠️ TRẢ VỀ DUY NHẤT JSON, KHÔNG THÊM CHỮ BÊN NGOÀI.

Format JSON bắt buộc:
{
  "suggestedProducts": [
    {
      "name": "Tên sản phẩm bằng tiếng Việt",
      "description": "Mô tả ngắn gọn tiếng Việt",
      "volume": "Dung tích (nếu có)",
      "estimatedPrice": "Giá ước tính (€)",
      "websites": [
        { "name": "Sephora", "url": "https://www.sephora.fr" },
        ...
      ]
    }
  ]
}

Danh sách website hợp lệ: ${JSON.stringify(sites, null, 2)}

Câu hỏi: "${message}"
          `,
        },
      ],
    });

    const aiReply = response.choices?.[0]?.message?.content || "{}";

    let parsed;
    try {
      parsed = JSON.parse(aiReply);
    } catch {
      parsed = { suggestedProducts: [] };
    }

    // Gắn tất cả website
    const productsWithWebsites = (parsed.suggestedProducts || []).map((p: any) => ({
      name: p.name,
      description: p.description,
      volume: p.volume || "",
      estimatedPrice: p.price ? `${p.price}€ (ước tính)` : "Giá ước tính",
      websites: sites,
    }));

    return NextResponse.json({
      reply: { suggestedProducts: productsWithWebsites },
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ reply: { suggestedProducts: [] } });
  }
}
