import Layout from "@/components/Layout";
import { CLINIC_INPUTS } from "@/constants/INPUTS";
import { Button, Flex, Group, LoadingOverlay, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

export interface FormValuesClinic {
  clinicName: string;
  clinicAddress: string;
  clinicNumberTel: string;
}

export default function RegistrarClinica() {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      clinicName: "",
      clinicAddress: "",
      clinicNumberTel: "",
    },
  });

  const handleSubmit = async (values: FormValuesClinic) => {
    setLoading(true);
    try {
      const res = await fetch("/api/register/clinic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        alert("Clínica registrado con éxito");
        form.reset();
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("Error al registrar clínica");
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h2>Registrar clínica</h2>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Flex justify="flex-end" align="flex-start" direction="column" wrap="wrap" gap="md">
          <h3>Información de la clínica</h3>
          {CLINIC_INPUTS.map((input) => (
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

          <Group position="right" mt="md" style={{ width: "100%", maxWidth: 400 }}>
            <Button type="submit">Registrar</Button>
          </Group>
          <LoadingOverlay visible={loading} />
        </Flex>
      </form>
    </Layout>
  );
}
