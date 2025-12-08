import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma"; // phải đúng đường dẫn

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const users = await prisma.user.findMany();
      return res.status(200).json(users);
    }

    if (req.method === "POST") {
      const { name, email } = req.body;
      if (!email) return res.status(400).json({ error: "Email is required" });

      const user = await prisma.user.create({ data: { name, email } });
      return res.status(201).json(user);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err: any) {
    console.error("API /api/users error:", err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
}
