import React, { useState,useEffect } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { BsClipboard2CheckFill } from "react-icons/bs";
import { MdPendingActions } from "react-icons/md";
import dayjs from "dayjs";
import { useDay } from "../../../hooks/useDay";

const AppointmentsAccordion = ({ appointments }) => {
  const { isAfter, isBefore, findNext } = useDay();
  const nextAppointment = findNext(appointments);
  const [open, setOpen] = useState(nextAppointment);

  useEffect(() => {
    setOpen(findNext(appointments));
  }, [appointments])

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      {appointments.map(
        ({ id, Fecha, Hora, Diagnostico, DocPac: { Paciente } },index) => (
          <Accordion
            open={open === index}
            className="mb-2 rounded-lg border border-blue-gray-100 px-4"
            key={id}
          >
            <AccordionHeader
              onClick={() => handleOpen(index)}
              className={`border-b-0 transition-colors ${
                open === index ? "text-blue-500 hover:!text-blue-700" : ""
              }`}
            >
              <div className="flex justify-between w-full">
                <div className="flex justify-between w-full">
                  <p className="self-center text-xl">{Paciente.Nombre} {Paciente.ApellidoP}</p>
                  <p className="self-center mr-4" >{dayjs(Fecha).format("h:mm A")}</p>
                </div>
                <p>
                  {isAfter(Fecha) ? (
                    <BsClipboard2CheckFill color="#31AD2F" style={{fontSize:31}}/>
                  ) : (
                    <MdPendingActions color="#0989AF" style={{fontSize:35}} />
                  )}
                </p>
              </div>
            </AccordionHeader>
            <AccordionBody className="pt-0 text-base font-normal">
              {Diagnostico}
            </AccordionBody>
          </Accordion>
        )
      )}
    </>
  );
};

export default AppointmentsAccordion;
