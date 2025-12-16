import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { detectCategory } from "@/lib/detectCategory";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message) {
      return NextResponse.json({ reply: { suggestedProducts: [] } });
    }

    if (!process.env.GROQ_API_KEY) {
      console.error("Missing GROQ_API_KEY");
      return NextResponse.json(
        { reply: { suggestedProducts: [] }, error: "Missing API Key" },
        { status: 500 }
      );
    }

    // Detect category dựa trên message
    const category = detectCategory(message);
    const sites = category.sites; // websites theo category

    const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const prompt = `
Bạn là trợ lý thương mại Việt Nam.
⚠️ TRẢ VỀ DUY NHẤT JSON, KHÔNG ĐƯỢC THÊM GIẢI THÍCH.

Format JSON:
{
  "suggestedProducts": [
    {
      "name": "Tên sản phẩm tiếng Việt",
      "description": "Mô tả ngắn gọn",
      "volume": "Dung tích (nếu có)",
      "estimatedPrice": "Giá (€)",
      "websites": []
    }
  ]
}

Chỉ gợi ý sản phẩm trong category: "${category.name}".
Websites chỉ lấy từ danh sách này: ${JSON.stringify(sites, null, 2)}

Câu hỏi: "${message}"
`;

    const response = await client.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
    });

    const aiReply = response.choices?.[0]?.message?.content || "{}";

    let parsedJSON;
    try {
      parsedJSON = JSON.parse(aiReply);
    } catch (e) {
      console.log("❌ JSON parse lỗi từ AI:", aiReply);
      parsedJSON = { suggestedProducts: [] };
    }

    // Gắn websites theo category
    const productsWithWebsites = (parsedJSON.suggestedProducts || []).map((p: any) => ({
      name: p.name,
      description: p.description,
      volume: p.volume || "",
      estimatedPrice: p.estimatedPrice || "Prix estimé",
      websites: sites,
    }));

    return NextResponse.json({ reply: { suggestedProducts: productsWithWebsites } });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { reply: { suggestedProducts: [] }, error: "Lỗi khi gọi API" },
      { status: 500 }
    );
  }
}
