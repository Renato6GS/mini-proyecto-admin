// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getIdClinics } from "@/db/queries/getIdClinics";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  value: string;
  label: string;
};

type resultadoType = {
  recordset: Array<Response>;
};

type Response = {
  id_clinica: string;
};

type ResponseData = {
  data: Data[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const resultado: resultadoType = await getIdClinics();
  const { recordset } = resultado;
  const data: Data[] = recordset.map((item: Response) => {
    return {
      value: item.id_clinica,
      label: item.id_clinica,
    };
  });

  res.status(200).json({ data });
}
