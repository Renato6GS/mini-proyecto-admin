// eslint-disable-next-line @typescript-eslint/no-var-requires
const sql = require("mssql");
import { resultadoType } from "@/pages/registrar-cama";
import { config } from "../config";

export async function getIdClinics() {
  let result1: resultadoType = { recordset: [] };
  try {
    const pool = await sql.connect(config);
    result1 = await pool.request().execute("sp_ObtenerIdsClinicas");
  } catch (err) {
    console.log(err);
  } finally {
    sql.close();
  }

  return result1;
}
