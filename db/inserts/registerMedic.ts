// import sql from "mssql";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sql = require("mssql");
import { config } from "../config";
import { FormValuesMedic } from "@/pages/registrar-medico";

export async function registerMedic(data: FormValuesMedic) {
  let resultado = "";
  try {
    const pool = await sql.connect(config);
    resultado = await pool
      .request()
      .input("nombre", data.medicName)
      .input("apellido", data.medicLastName)
      .input("especialidad", data.medicSpeciality)
      .input("direccion", data.medicAddress)
      .input("telefono", data.medicNumberTel)
      .input("status", 1)
      .input("creado_por", "renato")
      .execute("sp_InsertarMedico ");

    return resultado;
  } catch (err) {
    console.log(err);
  } finally {
    sql.close();
  }
  return resultado;
}
