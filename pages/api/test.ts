import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  try {
    const data = await prisma.user.findMany();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
