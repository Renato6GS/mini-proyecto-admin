// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { registerClinic } from "@/db/inserts/registerClinic";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const data = req.body;
  const resultado: string = await registerClinic(data);
  console.log(resultado);
  res.status(200).json({ name: "Procedimiento terminado" });
}
