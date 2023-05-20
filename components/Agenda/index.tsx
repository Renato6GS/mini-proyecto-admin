// @ts-nocheck
import { useCallback, useMemo, useState } from "react";
import { Calendar, luxonLocalizer, Views } from "react-big-calendar";
import { DateTime } from "luxon";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = luxonLocalizer(DateTime);

const lang = {
  en: null,
  "en-GB": null,
  es: {
    week: "Semana",
    work_week: "Semana de trabajo",
    day: "Día",
    month: "Mes",
    previous: "Atrás",
    next: "Después",
    today: "Hoy",
    agenda: "Diario",

    showMore: (total: string) => `+${total} más`,
  },
};

interface Event {
  title: string;
  start: Date;
  end: Date;
  id: string;
}

export default function Agenda({ resEvents }: { resEvents: Event[] }) {
  const [view, setView] = useState(Views.WEEK);
  const events = resEvents;
  const today = new Date();

  const onView = useCallback((newView) => setView(newView), [setView]);

  const { defaultDate, messages } = useMemo(
    () => ({
      defaultDate: new Date(),
      messages: lang["es"],
    }),
    []
  );

  const eventPropGetter = useCallback(
    (event) => ({
      ...(event.title.includes("Paciente") && {
        className: "meeting",
      }),
    }),
    []
  );

  return (
    <>
      <Calendar
        defaultDate={defaultDate}
        culture={"es"}
        messages={messages}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        eventPropGetter={eventPropGetter}
        onView={onView}
        view={view}
        min={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8)}
        max={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 19)}
      />
    </>
  );
}
