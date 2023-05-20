// import sql from "mssql";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sql = require("mssql");
import { config } from "../config";
import { FormValuesBed } from "@/pages/registrar-cama";

export async function registerBed(data: FormValuesBed) {
  let resultado = "";
  try {
    const pool = await sql.connect(config);
    resultado = await pool
      .request()
      .input("id_paciente", data.bedPatientId)
      .input("id_clinica", data.becIdClinic)
      .input("numero", data.bedNumber)
      .input("status", 1)
      .input("creado_por", "renato")
      .execute("sp_InsertarCama ");

    return resultado;
  } catch (err) {
    console.log(err);
  } finally {
    sql.close();
  }
  return resultado;
}
