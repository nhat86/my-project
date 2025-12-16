import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message) {
      return NextResponse.json({ reply: { suggestedProducts: [] } });
    }

    if (!process.env.GROQ_API_KEY) {
      console.error("Missing GROQ_API_KEY");
      return NextResponse.json({ reply: { suggestedProducts: [] }, error: "Missing API Key" }, { status: 500 });
    }

    const client = new Groq({ apiKey: process.env.GROQ_API_KEY! });

    const prompt = `
Bạn là trợ lý thương mại Việt Nam.
⚠️ CHỈ TRẢ VỀ JSON THUẦN.
Format JSON bắt buộc:
{
  "suggestedProducts": [
    {
      "name": "Tên sản phẩm",
      "description": "Mô tả ngắn",
      "volume": "Dung tích (nếu có)",
      "estimatedPrice": "Giá ước tính (€)",
      "websites": [
        { "name": "Tên web", "url": "https://..." }
      ]
    }
  ]
}
Câu hỏi: "${message}"
`;

    const response = await client.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    });

    const raw = response.choices?.[0]?.message?.content || "{}";

    let parsed;
    try {
      parsed = JSON.parse(raw.trim());
    } catch {
      console.error("JSON parse lỗi từ AI:", raw);
      parsed = { suggestedProducts: [] };
    }

    return NextResponse.json({ reply: parsed });
  } catch (err: any) {
    console.error("API error:", err);
    return NextResponse.json({ reply: { suggestedProducts: [] }, error: err.message }, { status: 500 });
  }
}
