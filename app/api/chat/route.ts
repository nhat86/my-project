// chat/route.ts
import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: Request) {
  try {
    const { message, context } = await req.json();

    if (!message) {
      return NextResponse.json({
        reply: "Xin lỗi, mình chưa nhận được nội dung.",
        suggestedQuestions: [],
      });
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { reply: "Lỗi hệ thống: Missing API Key", suggestedQuestions: [] },
        { status: 500 }
      );
    }

    const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

    // Xác định hướng dịch
    let translationInstruction = "";
    if (context?.translation === "fr2vi") {
      translationInstruction = `Dịch sang tiếng Việt: "${message}"`;
    } else if (context?.translation === "vi2fr") {
      translationInstruction = `Dịch sang tiếng Pháp: "${message}"`;
    } else {
      translationInstruction = `Hướng dẫn mua sắm hoặc trả lời câu hỏi: "${message}"`;
    }

    const prompt = `
Bạn là trợ lý của website PhapShopping, có thể hướng dẫn mua sắm và dịch Pháp ↔ Việt.
TRẢ VỀ DUY NHẤT JSON:
{ "reply": "Bản dịch hoặc hướng dẫn ngắn gọn", "suggestedQuestions": ["Câu hỏi gợi ý 1", "Câu hỏi gợi ý 2"] }
Nội dung: ${translationInstruction}
Ngữ cảnh hiện tại: ${JSON.stringify(context)}
`;

    const response = await client.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
    });

    let parsedJSON;
    try {
      parsedJSON = JSON.parse(response.choices?.[0]?.message?.content || "{}");
    } catch {
      parsedJSON = {
        reply: "Xin lỗi, mình chưa hiểu nội dung.",
        suggestedQuestions: ["Tìm sản phẩm theo chủ đề", "Tìm sản phẩm theo mô tả"],
      };
    }

    return NextResponse.json(parsedJSON);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { reply: "Đã có lỗi xảy ra, vui lòng thử lại.", suggestedQuestions: [] },
      { status: 500 }
    );
  }
}
