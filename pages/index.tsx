import Agenda from "@/components/Agenda";
import Layout from "@/components/Layout";
import { getCites } from "@/db/queries/getCites";
import { useEffect, useState } from "react";

interface Event {
  title: string;
  start: Date;
  end: Date;
  id: string;
}

interface FormValues {
  id_cita: string;
  Paciente: string;
  fecha_hora: string;
}

interface CiteProps {
  cites: string;
}

export default function IndexPage({ cites }: CiteProps) {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    console.log(cites);

    const eventsArray: FormValues[] = JSON.parse(cites);
    const events: Event[] = eventsArray.map((event) => {
      const eventDate = new Date(event.fecha_hora);
      const localDate = new Date(eventDate.getTime() + 6 * 3600 * 1000);
      return {
        title: `Paciente: ${event.Paciente}`,
        start: localDate,
        end: localDate,
        id: event.id_cita,
      };
    });

    setEvents(events);
  }, []);

  return (
    <Layout>
      <Agenda resEvents={events} />
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const cites = await getCites();

    return {
      props: {
        cites: JSON.stringify(cites.recordset),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        cites: [],
      },
    };
  }
}
