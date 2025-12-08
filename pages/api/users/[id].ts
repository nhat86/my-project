// pages/api/users/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      const user = await prisma.user.findUnique({ where: { id: Number(id) } });
      return res.status(200).json(user);

    case "PUT":
      const { name, email } = req.body;
      try {
        const updatedUser = await prisma.user.update({
          where: { id: Number(id) },
          data: { name, email },
        });
        return res.status(200).json(updatedUser);
      } catch (error) {
        return res.status(400).json({ error: "Update thất bại." });
      }

    case "DELETE":
      await prisma.user.delete({ where: { id: Number(id) } });
      return res.status(204).end();

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
