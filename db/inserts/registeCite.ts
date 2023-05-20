// import sql from "mssql";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sql = require("mssql");
import { FormValuesCite } from "@/pages/registrar-cita";
import { config } from "../config";

export async function registerCite(data: FormValuesCite) {
  let resultado = "";
  try {
    const pool = await sql.connect(config);
    resultado = await pool
      .request()
      .input("id_paciente", data.citeIdPatient)
      .input("id_medico", data.citeIdMedic)
      .input("fecha_hora", new Date(data.citeDatetime))
      .input("status", 1)
      .input("creado_por", "renato")
      .execute("sp_InsertarCita");

    return resultado;
  } catch (err) {
    console.log(err);
  } finally {
    sql.close();
  }
  return resultado;
}
