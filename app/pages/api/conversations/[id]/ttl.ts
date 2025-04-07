import { redis } from "@/lib/upstash";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query as { id: string };
  if (req.method === "GET") {
    try {
      const ttl = await redis.ttl(`delete:${id}`);
      return res.status(200).json({ ttl });
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch data" });
    }
  } else {
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
