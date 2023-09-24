import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

const AppointmentsAccordion = ({ appointments }) => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      {appointments.map((appointment, index) => (
        <Accordion
          open={open === index}
          className="mb-2 rounded-lg border border-blue-gray-100 px-4"
          key={index}
        >
          <AccordionHeader
            onClick={() => handleOpen(index)}
            className={`border-b-0 transition-colors ${
              open === index ? "text-blue-500 hover:!text-blue-700" : ""
            }`}
          >
            {appointment.Fecha}
          </AccordionHeader>
          <AccordionBody className="pt-0 text-base font-normal">
            {appointment.Descripcion}
          </AccordionBody>
        </Accordion>
      ))}
    </>
  );
};

export default AppointmentsAccordion;
