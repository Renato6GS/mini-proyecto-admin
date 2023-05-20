import Layout from "@/components/Layout";
import { getIdClinics } from "@/db/queries/getIdClinics";
import { getIdPatients } from "@/db/queries/getIdPatients";
import { Button, Flex, Group, LoadingOverlay, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

export interface FormValuesBed {
  becIdClinic: string;
  bedPatientId: string;
  bedNumber: string;
}

interface RegistrarCamaProps {
  dataCli: { value: string; label: string }[];
  dataPac: { value: string; label: string }[];
}

type Data = {
  value: string;
  label: string;
};

export type resultadoType = {
  recordset: Array<Response>;
};

type Response = {
  item: string;
};

export default function RegistrarCama({ dataCli, dataPac }: RegistrarCamaProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      becIdClinic: "",
      bedPatientId: "",
      bedNumber: "",
    },
  });

  const handleSubmit = async (values: FormValuesBed) => {
    setLoading(true);
    try {
      const res = await fetch("/api/register/bed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        alert("Cama registrado con éxito");
        form.reset();
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("Error al registrar cama");
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h2>Registrar cama</h2>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Flex justify="flex-end" align="flex-start" direction="column" wrap="wrap" gap="md">
          <h3>Información de la cama</h3>
          <Select
            label="Selecciona la clínica donde será asignado"
            placeholder="Selecciona uno"
            data={dataCli}
            style={{ width: "100%", maxWidth: 400 }}
            {...form.getInputProps("becIdClinic")}
          />

          <Select
            label="Selecciona al paciente donde será asignado"
            placeholder="Selecciona uno"
            data={dataPac}
            style={{ width: "100%", maxWidth: 400 }}
            {...form.getInputProps("bedPatientId")}
          />

          <TextInput
            withAsterisk
            label="Número de cama"
            placeholder="212"
            style={{ width: "100%", maxWidth: 400 }}
            required
            {...form.getInputProps("bedNumber")}
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

export async function getServerSideProps() {
  try {
    const resultado: resultadoType = await getIdClinics();
    const { recordset } = resultado;
    const dataCli: Data[] = recordset.map((item: any) => {
      return {
        value: item.id_clinica,
        label: item.id_clinica,
      };
    });

    const resultadoPac: resultadoType = await getIdPatients();
    const { recordset: recordsetPac } = resultadoPac;
    const dataPac: Data[] = recordsetPac.map((item: any) => {
      return {
        value: item.id_paciente,
        label: item.id_paciente,
      };
    });

    return {
      props: {
        dataCli,
        dataPac,
      },
    };
  } catch (error) {
    return {
      props: {
        data: [{ value: "error", label: "error" }],
      },
    };
  }
}
