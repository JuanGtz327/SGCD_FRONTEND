import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import dayjs from "dayjs";

const AppointmentsAccordion = ({ appointments }) => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      {appointments.map(({ Nombre, ApellidoP, DocPac }, index) => {
        const { Cita } = DocPac;
        return Cita.map(({ id,Fecha, Hora, Descripcion }) => (
          <Accordion
            open={open === id}
            className="mb-2 rounded-lg border border-blue-gray-100 px-4"
            key={id}
          >
            <AccordionHeader
              onClick={() => handleOpen(id)}
              className={`border-b-0 transition-colors ${
                open === id ? "text-blue-500 hover:!text-blue-700" : ""
              }`}
            >
              <div className="flex flex-wrap gap-4">
                <p className="">
                  {Nombre} {ApellidoP} - {dayjs(Fecha).format("h:mm A")}
                </p>
              </div>
            </AccordionHeader>
            <AccordionBody className="pt-0 text-base font-normal">
              {Descripcion}
            </AccordionBody>
          </Accordion>
        ));
      })}
    </>
  );
};

export default AppointmentsAccordion;
