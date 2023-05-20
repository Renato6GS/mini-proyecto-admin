import Layout from "@/components/Layout";
import { PATIENT_INPUTS } from "@/constants/INPUTS";
import { Button, Flex, Group, TextInput, LoadingOverlay } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useState } from "react";

export interface FormValuesPatient {
  patientName: string;
  patientLastName: string;
  patientAddress: string;
  patientNumber: string;
  patientBirthDate: Date;
}

export default function RegistrarPaciente() {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      patientName: "",
      patientLastName: "",
      patientAddress: "",
      patientNumber: "",
      patientBirthDate: new Date(),
    },
  });

  const handleSubmit = async (values: FormValuesPatient) => {
    setLoading(true);
    try {
      const res = await fetch("/api/register/patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        alert("Paciente registrado con éxito");
        form.reset();
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("Error al registrar paciente");
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h2>Registrar paciente</h2>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Flex justify="flex-end" align="flex-start" direction="column" wrap="wrap" gap="md">
          <h3>Información del paciente</h3>
          {PATIENT_INPUTS.map((input) => (
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
            label="Pick date"
            placeholder="Pick date"
            style={{ width: "100%", maxWidth: 400 }}
            required
            {...form.getInputProps("patientBirthDate")}
          />

          <Group position="right" mt="md" style={{ width: "100%", maxWidth: 400 }}>
            <Button type="submit">Registrar</Button>
          </Group>
          <LoadingOverlay visible={loading} />
        </Flex>
      </form>
    </Layout>
  );
}
