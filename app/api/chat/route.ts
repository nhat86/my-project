import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

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

    // Chỉ hướng dẫn tìm sản phẩm hoặc gửi link để báo giá
const prompt = `
Bạn là trợ lý của website PhapShopping, chuyên giúp khách tìm sản phẩm Pháp.

Hướng dẫn trả lời:
1. Nếu đây là lần đầu khách mở chat, hãy chào khách hàng đầu tiên và hỏi xem khách đã chọn sản phẩm chưa.
2. Nếu khách chưa chọn sản phẩm, hiển thị các mục tên để khách click:
   - Nếu khách muốn tìm theo mô tả, hiển thị mục "Tìm kiếm bằng AI".
   - Nếu khách muốn tìm theo chủ đề, hiển thị mục "Gợi ý tìm kiếm sản phẩm theo chủ đề" ở cuối trang, có thể gợi ý các trang web nổi tiếng của Pháp theo từng chủ đề.
3. Nếu khách đã có sản phẩm, hướng dẫn khách click vào mục "Dán link sản phẩm" để kiểm tra thông tin và gửi yêu cầu báo giá.
4. TRẢ VỀ DUY NHẤT JSON với định dạng:
{
  "reply": "Hướng dẫn ngắn gọn, hiển thị các mục tên theo lựa chọn của khách, không cần link",
  "suggestedQuestions": ["Các câu hỏi gợi ý liên quan trực tiếp đến nội dung khách nhập"]
}

Nội dung cần xử lý: "${message}"
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
