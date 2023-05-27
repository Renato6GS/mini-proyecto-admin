// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { registerStudent } from "@/db/inserts/registerStudent";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const data = req.body;
  const resultado: string = await registerStudent(data);
  console.log(resultado);
  res.status(200).json({ name: "Procedimiento terminado" });
}
