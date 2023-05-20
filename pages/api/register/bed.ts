// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { registerBed } from "@/db/inserts/registerBed";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const data = req.body;
  const resultado: string = await registerBed(data);
  console.log(resultado);
  res.status(200).json({ name: "Procedimiento terminado" });
}
