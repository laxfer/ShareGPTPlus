import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query as { id: string };
  if (req.method === "POST") {
    try {
      const response = await prisma.conversation.update({
        where: {
          id: id, // 使用传入的 id 作为条件
        },
        data: {
          views: {
            increment: 1, // 将 views 字段的值加 1
          },
        },
      });
      return res.status(200).json({ views: response.views });
    } catch (error) {
      console.error("Database query error:", error);
      return res.status(500).json({ error: "Failed to fetch data" });
    }
  } else {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
