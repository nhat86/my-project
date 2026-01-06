// translate/route.ts
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
      translationInstruction = `Dịch từ tiếng Pháp sang tiếng Việt: "${message}"`;
    } else if (context?.translation === "vi2fr") {
      translationInstruction = `Dịch từ tiếng Việt sang tiếng Pháp: "${message}"`;
    } else {
      return NextResponse.json({
        reply: "Hướng dịch không xác định.",
        suggestedQuestions: [],
      });
    }

    const prompt = `
Bạn là một trợ lý dịch thuật Pháp ↔ Việt.
TRẢ VỀ DUY NHẤT JSON:
{ "reply": "Bản dịch ngắn gọn", "suggestedQuestions": [] }
Nội dung cần dịch: ${translationInstruction}
`;

    const response = await client.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3, // giảm để trả lời chuẩn hơn
    });

    let parsedJSON;
    try {
      parsedJSON = JSON.parse(response.choices?.[0]?.message?.content || "{}");
    } catch {
      parsedJSON = {
        reply: "Xin lỗi, mình chưa hiểu nội dung.",
        suggestedQuestions: [],
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
