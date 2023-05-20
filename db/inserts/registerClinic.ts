// import sql from "mssql";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sql = require("mssql");
import { FormValuesClinic } from "@/pages/registrar-clinica";
import { config } from "../config";

export async function registerClinic(data: FormValuesClinic) {
  let resultado = "";
  try {
    const pool = await sql.connect(config);
    resultado = await pool
      .request()
      .input("nombre", data.clinicName)
      .input("direccion", data.clinicAddress)
      .input("telefono", data.clinicNumberTel)
      .input("status", 1)
      .input("creado_por", "renato")
      .execute("sp_InsertarClinica ");

    return resultado;
  } catch (err) {
    console.log(err);
  } finally {
    sql.close();
  }
  return resultado;
}
