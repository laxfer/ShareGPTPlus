import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query as { id: string };
  if (req.method === "GET") {
    try {
      const count = await prisma.save.count({
        where: {
          conversationId: id,
        },
      });
      return res.status(200).json({ count });
    } catch (error) {
      console.error("Database query error:", error);
      return res.status(500).json({ error: "Failed to fetch data" });
    }
  } else {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
