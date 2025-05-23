import { NextApiRequest, NextApiResponse } from "next";
import { redis } from "@/lib/upstash";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;
  if (!id) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  if (req.method === "DELETE") {
    const ttl = await redis.ttl(`delete:${id}`);
    if (ttl > 0) {
      await Promise.all([
        prisma.conversation.delete({
          where: { id },
        }),
        redis.del(`delete:${id}`),
      ]);
      await res.revalidate(`/${id}`);
      return res.status(200).json({ message: "对话已删除" });
    } else {
      return res.status(404).json({ error: "对话无法删除" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
