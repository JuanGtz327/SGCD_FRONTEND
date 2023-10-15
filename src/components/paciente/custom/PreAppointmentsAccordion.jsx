import { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { BsFillTrash3Fill } from "react-icons/bs";
import dayjs from "dayjs";

const PreAppointmentsAccordion = ({ appointments, onDeletePreAppointment}) => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      {appointments.map(({ Fecha, Diagnostico }, index) => (
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
            <div className="flex justify-between w-full">
              <div className="flex justify-between w-full">
                <p className="self-center text-xl">Cita {dayjs(Fecha).format("DD/MM/YYYY h:mm A")}</p>
              </div>
              <p>
                <BsFillTrash3Fill
                  color="red"
                  onClick={()=>onDeletePreAppointment(index)}
                  style={{ fontSize: 31 }}
                />
              </p>
            </div>
          </AccordionHeader>
          <AccordionBody className="pt-0 text-base font-normal">
            {Diagnostico}
          </AccordionBody>
        </Accordion>
      ))}
    </>
  );
};

export default PreAppointmentsAccordion;
