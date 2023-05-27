// eslint-disable-next-line @typescript-eslint/no-var-requires
const sql = require("mssql");
import { config } from "../config";
import { FormValuesStudent } from "@/pages";

export async function registerStudent(data: FormValuesStudent) {
  let resultado = "";
  try {
    const pool = await sql.connect(config);
    resultado = await pool
      .request()
      .input("cui", data.studentCui)
      .input("nombre", data.studentName)
      .input("apellidos", data.studentLastName)
      .input("fecha_nacimiento", new Date(data.studentBirthDate ?? new Date()))
      .input("genero", data.studentGender)
      .input("direccion", data.studentAddress)
      .input("id_cursos", data.studentCourses)
      .execute("sp_RegistrarEstudianteYAsignarCursos");

    return resultado;
  } catch (err) {
    console.log(err);
  } finally {
    sql.close();
  }
  return resultado;
}
