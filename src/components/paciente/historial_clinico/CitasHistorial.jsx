import {
  Input,
  Textarea,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import React, { useState } from "react";
import Calendar from "../../citas/custom/Calendar";
import { useCalendar } from "../../../hooks/useCalendar";
import { useDay } from "../../../hooks/useDay";
import PreAppointmentsAccordion from "../custom/PreAppointmentsAccordion";
import { useForm } from "react-hook-form";

const CitasHistorial = ({preAppointments,onAppointments}) => {
  const { currentDate, getDia, getMes } = useCalendar();
  const { isToday, isBefore } = useDay();
  const {
    register: registerCita,
    handleSubmit: handleSubmitCita,
    formState: { errors: errorsCita },
  } = useForm();

  const [selectDate, setSelectDate] = useState(currentDate);
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const onDayChange = (date) => {
    setSelectDate(date);
  };

  const onSetToday = (date) => {
    setSelectDate(date);
  };

  const validDate = () => {
    if (isToday(selectDate)) return true;
    else if (isBefore(selectDate)) return true;
    else return false;
  };

  const onNewAppointment = handleSubmitCita((values) => {
    values.Fecha = selectDate.format().split("T")[0] + "T" + values.Hora;
    delete values.Hora;
    onAppointments(values,true);
    handleOpen();
  });

  const onDeletePreAppointment = (index) => {
    onAppointments(index,false);
  };

  return (
    <>
      <h2 className="text-base font-semibold leading-7 text-gray-900">Citas</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        En este apartado puede opcionalmente agendar una cita con el paciente.
        Simplemente seleccione el dia de su preferencia y la hora en la que
        desea agendar la cita.
      </p>
      <div className="flex flex-wrap">
        <Calendar
          selectDate={selectDate}
          customClassName="w-1/2 mt-7"
          onDayChange={onDayChange}
          onSetToday={onSetToday}
        />
        <div className="h-full mt-5 w-1/2 sm:px-5 bg-white py-8">
          <div className="text-gray-400 w-full">
            {validDate() && (
              <Button
                color="blue"
                variant="outlined"
                fullWidth
                onClick={handleOpen}
              >
                Agendar cita
              </Button>
            )}
          </div>
          <hr className="mt-5" />
          <div className="mt-5">
            <PreAppointmentsAccordion
              appointments={preAppointments}
              onDeletePreAppointment={onDeletePreAppointment}
            />
          </div>
        </div>
      </div>

      <Dialog open={open} handler={handleOpen} size="xs">
        <div className="flex items-center justify-between">
          <DialogHeader>
            Cita - {getDia(selectDate)} {selectDate.date()} {getMes(selectDate)}
          </DialogHeader>
        </div>
        <form>
          <DialogBody divider>
            <div className="grid gap-6">
              <Input
                label="Hora"
                type="time"
                variant="standard"
                {...registerCita("Hora", { required: true })}
                error={errorsCita.Hora ? true : false}
              />
              <Textarea
                label="Diagnostico"
                {...registerCita("Diagnostico", { required: true })}
                error={errorsCita.Diagnostico ? true : false}
                variant="standard"
              />
            </div>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button variant="text" color="red" onClick={handleOpen}>
              Cancelar
            </Button>
            <Button variant="gradient" color="blue" onClick={onNewAppointment}>
              Agendar Cita
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
};

export default CitasHistorial;
