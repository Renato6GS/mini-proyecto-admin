import Layout from "@/components/Layout";
import { COURSES, GENDERS, STUDENT_INPUTS } from "@/constants/INPUTS";
import { Button, Flex, Grid, Group, LoadingOverlay, Select, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useState } from "react";

export interface FormValuesStudent {
  studentCui: string;
  studentName: string;
  studentLastName: string;
  studentBirthDate: Date | null;
  studentGender: string;
  studentAddress: string;
  studentCourses: string;
}

export default function IndexPage() {
  const [loading, setLoading] = useState(false);
  const [coursesToSelect, setCoursesToSelect] = useState(5);
  const [coursesSelected, setCoursesSelected] = useState<string[]>([]);

  const form = useForm({
    initialValues: {
      studentCui: "",
      studentName: "",
      studentLastName: "",
      studentBirthDate: null,
      studentGender: "",
      studentAddress: "",
      studentCourses: "",
    },
  });

  const handleSubmit = async (values: FormValuesStudent) => {
    setLoading(true);
    let repeated = false;
    for (let i = 0; i < coursesSelected.length; i++) {
      for (let j = i + 1; j < coursesSelected.length; j++) {
        if (coursesSelected[i] === coursesSelected[j]) {
          repeated = true;
        }
      }
    }

    if (repeated) {
      alert("No puede seleccionar el mismo curso más de una vez");
      return;
    }

    const courses = coursesSelected.join(",");
    values.studentCourses = courses;

    try {
      const res = await fetch("/api/register/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        alert("Estudiante registrado con éxito");
        form.reset();
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("Error al registrar estudiante");
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1 style={{ color: "#283d3e" }}>Registro de Alumnos</h1>
      <h2>Información del alumno:</h2>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Grid>
          <Grid.Col span={4}>
            <Flex gap="lg" direction="column">
              {STUDENT_INPUTS.map((input) => (
                <TextInput
                  key={input.key}
                  withAsterisk={input.withAsterisk}
                  label={input.label}
                  placeholder={input.placeholder}
                  style={{ width: "100%", maxWidth: 400 }}
                  required={input.required}
                  {...form.getInputProps(input.name)}
                />
              ))}

              <DatePickerInput
                label="Fecha de nacimiento"
                placeholder=""
                style={{ width: "100%", maxWidth: 400 }}
                required
                withAsterisk
                {...form.getInputProps("studentBirthDate")}
              />

              <Select
                label="Género"
                placeholder="Selecciona género"
                data={GENDERS}
                searchable
                clearable
                style={{ width: "100%", maxWidth: 400 }}
                {...form.getInputProps("studentGender")}
              />
              <TextInput
                withAsterisk
                label="Dirección"
                style={{ width: "100%", maxWidth: 400 }}
                required
                {...form.getInputProps("studentAddress")}
              />
            </Flex>
          </Grid.Col>
          <Grid.Col span={4}>
            <Flex gap="lg" direction="column">
              <span>Seleccionar cursos</span>

              {Array.from({ length: coursesToSelect }, (_, i) => i + 1).map((_, index) => (
                <Select
                  key={index}
                  placeholder="Selecciona el curso"
                  data={COURSES}
                  searchable
                  clearable
                  style={{ width: "100%", maxWidth: 400 }}
                  value={coursesSelected?.[index]}
                  onChange={(value: string) => {
                    setCoursesSelected((curr) => {
                      const newCurr = [...(curr ?? [])];
                      newCurr[index] = value;
                      return newCurr;
                    });
                  }}
                />
              ))}

              <Group position="center" style={{ width: "100%", maxWidth: 400 }}>
                <button className="register__btn-add-course" onClick={() => setCoursesToSelect((curr) => curr + 1)}>
                  +
                </button>
              </Group>
              <Group position="right" mt="md" style={{ width: "100%", maxWidth: 400 }}>
                <Button type="submit" size="lg" style={{ backgroundColor: "#283d3e" }}>
                  GUARDAR
                </Button>
              </Group>
            </Flex>
          </Grid.Col>
        </Grid>
      </form>
      <LoadingOverlay visible={loading} />
    </Layout>
  );
}
