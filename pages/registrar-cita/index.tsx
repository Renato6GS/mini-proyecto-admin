import Layout from "@/components/Layout";
import { getIdMedics } from "@/db/queries/getIdMedics";
import { getIdPatients } from "@/db/queries/getIdPatients";
import { Button, Flex, Group, LoadingOverlay, Select } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useState } from "react";

export interface FormValuesCite {
  citeIdPatient: string;
  citeIdMedic: string;
  citeDatetime: Date;
}

interface RegistrarCamaProps {
  dataMed: { value: string; label: string }[];
  dataPac: { value: string; label: string }[];
}

type Data = {
  value: string;
  label: string;
};

export default function RegistrarCita({ dataMed, dataPac }: RegistrarCamaProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      citeIdPatient: "",
      citeIdMedic: "",
      citeDatetime: new Date(),
    },
  });

  const handleSubmit = async (values: FormValuesCite) => {
    setLoading(true);
    try {
      const res = await fetch("/api/register/cite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        alert("Cita registrada con éxito");
        form.reset();
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("Error al registrar la cita");
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h2>Registrar cita</h2>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Flex justify="flex-end" align="flex-start" direction="column" wrap="wrap" gap="md">
          <h3>Información de la cita</h3>
          <Select
            label="Selecciona el médico que atenderá la cita"
            placeholder="Selecciona uno"
            data={dataMed}
            style={{ width: "100%", maxWidth: 400 }}
            {...form.getInputProps("citeIdMedic")}
          />

          <Select
            label="Selecciona al paciente que asistirá a la cita"
            placeholder="Selecciona uno"
            data={dataPac}
            style={{ width: "100%", maxWidth: 400 }}
            {...form.getInputProps("citeIdPatient")}
          />

          <DateTimePicker
            label="Fecha y hora de la cita"
            placeholder="Selecciona una fecha y hora"
            style={{ width: "100%", maxWidth: 400 }}
            required
            withAsterisk
            dropdownType="modal"
            {...form.getInputProps("citeDatetime")}
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
    const resultado: any = await getIdMedics();
    const { recordset } = resultado;
    const dataMed: Data[] = recordset.map((item: any) => {
      return {
        value: item.id_medico,
        label: item.id_medico,
      };
    });

    console.log(dataMed);

    const resultadoPac: any = await getIdPatients();
    const { recordset: recordsetPac } = resultadoPac;
    const dataPac: Data[] = recordsetPac.map((item: any) => {
      return {
        value: item.id_paciente,
        label: item.id_paciente,
      };
    });

    return {
      props: {
        dataMed,
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
