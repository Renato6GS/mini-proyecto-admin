// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { registerMedic } from "@/db/inserts/registerMedic";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const data = req.body;
  await registerMedic(data);
  res.status(200).json({ name: "Procedimiento terminado" });
}
