// /pages/api/translate.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { text, targetLang } = req.body;

  // Đây chỉ ví dụ giả lập, bạn nên dùng OpenAI API
  let translation = "";
  if (targetLang === "vi") translation = "Phiên dịch sang tiếng Việt: " + text;
  else if (targetLang === "fr") translation = "Traduction en français: " + text;

  res.status(200).json({ translation });
}
