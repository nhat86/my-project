import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { detectCategory } from "@/lib/detectCategory";
import { SOURCES } from "@/lib/sources";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message) return NextResponse.json({ reply: { suggestedProducts: [] } });

    const category = detectCategory(message);

    if (!category) {
      return NextResponse.json({
        reply: { suggestedProducts: [], message: "Xin loi, minh chua hieu ban muon san pham loai nao." },
      });
    }

    const sites = category.sites;

    const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const response = await client.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "user",
          content: `
Ban la tro ly goi y san pham cho khach Viet.
Chi goi y san pham trong danh muc: "${category.name}".
Tra JSON duy nhat, khong them chu khac.

Format JSON (phải trả về ÍT NHẤT 6 sản phẩm, có thể hơn nếu hợp lý):
{
  "suggestedProducts": [
    {
      "name": "Ten san pham bang tieng Viet",
      "description": "Mo ta ngan gon tieng Viet",
      "volume": "Dung tich / Size / Thong so",
      "price": "So (Euro)"
    }
  ]
}

Tra đúng JSON. KHÔNG giải thích. KHÔNG thêm chữ ngoài JSON.
Phải trả về 6–10 sản phẩm phù hợp nhất.

Danh sach website hop le: ${JSON.stringify(sites, null, 2)}

Cau hoi: "${message}"
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

    // Chuẩn hóa tên trường chung: 'technical'
  // Chuẩn hóa tên trường chung: 'technical'
  const productsWithWebsites = (parsed.suggestedProducts || []).map((p: any) => ({
    name: p.name,
    description: p.description,
    technical: p.volume || "",       // volume dùng cho tất cả category
    estimatedPrice: Number(p.price) || 0,
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
