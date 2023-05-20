// eslint-disable-next-line @typescript-eslint/no-var-requires
const sql = require("mssql");
import { FormValuesPatient } from "@/pages/registrar-paciente";
import { config } from "../config";

export async function registerPatient(data: FormValuesPatient) {
  let resultado = "";
  try {
    const pool = await sql.connect(config);
    resultado = await pool
      .request()
      .input("nombre", data.patientName)
      .input("apellido", data.patientLastName)
      .input("fecha_nacimiento", new Date(data.patientBirthDate))
      .input("direccion", data.patientAddress)
      .input("telefono", data.patientNumber)
      .input("status", 1)
      .input("creado_por", "renato")
      .execute("sp_InsertarPaciente");

    return resultado;
  } catch (err) {
    console.log(err);
  } finally {
    sql.close();
  }
  return resultado;
}
