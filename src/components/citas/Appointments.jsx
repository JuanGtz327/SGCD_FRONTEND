import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Button,
  Select,
  Option,
  Spinner,
} from "@material-tailwind/react";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { createAppointmentRequest } from "../../api/api";
import AppointmentsAccordion from "./custom/AppointmentsAccordion";
import { usePatients } from "../../hooks/usePatients";
import { useAppointments } from "../../hooks/useAppointments";
import { useAlert } from "../../context/AlertContext";
import { useCalendar } from "../../hooks/useCalendar";
import Calendar from "./custom/Calendar";
import { useDay } from "../../hooks/useDay";

const Appointments = () => {
  const { pacientes } = usePatients();
  const { appointments, loading, setLoading } = useAppointments();

  const { user } = useAuth();
  const { setAlertConfig } = useAlert();

  const { currentDate, getDia, getMes,dayjs } = useCalendar();
  const { isToday, isBefore } = useDay();

  const [selectDate, setSelectDate] = useState(currentDate);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  console.log(appointments);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onAppointmentSubmit = handleSubmit(async (values) => {
    values.Fecha = selectDate.format().split("T")[0] + "T" + values.Hora;
    const ids = values.idDocPac.split(",");
    values.idDocPac = ids[0];
    values.id = ids[1];
    delete values.Hora;
    try {
      await createAppointmentRequest(values, user.token);
      setAlertConfig({
        isopen: true,
        type: "success",
        msg: "Cita agendada",
      });
      setLoading(true);
      setOpen(false);
    } catch (error) {
      setAlertConfig({
        type: "error",
        msg: error.response.data.message,
      });
    }
  });

  const filterAppointmens = () => {
    const appointmensPerDay = appointments.filter(
      ({ Fecha }) => Fecha.split(" ")[0] === selectDate.format().split("T")[0]
    );

    return appointmensPerDay.sort(
      (a, b) => dayjs(a["Fecha"]) - dayjs(b["Fecha"])
    );
  };

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

  return (
    <>
      {loading ? (
        <Spinner className="h-8 w-8 mx-auto mt-[25%]" />
      ) : (
        <>
          <div className="rounded-3xl p-10 flex gap-10 sm:divide-x justify-center 2xl:w-[90%] lg:h-[100%] mx-auto items-center sm:flex-row flex-col">
            <Calendar
              selectDate={selectDate}
              onDayChange={onDayChange}
              onSetToday={onSetToday}
            />

            <div className="h-full 2xl:w-[65%] sm:px-5 bg-white py-8 rounded-3xl">
              <h1 className="font-semibold">
                {selectDate.toDate().toDateString()}
              </h1>
              <div className="text-gray-400 grid grid-cols-2">
                <h6 className="flex my-auto">
                  {filterAppointmens().length == 0
                    ? "No hay"
                    : filterAppointmens().length}{" "}
                  citas agendadas
                </h6>
                {validDate() && (
                  <Button color="blue" variant="gradient" onClick={handleOpen}>
                    Agendar cita
                  </Button>
                )}
              </div>
              <hr className="mt-5" />
              <div className="mt-5">
                <AppointmentsAccordion appointments={filterAppointmens()} />
              </div>
            </div>

            <Dialog open={open} handler={handleOpen} size="xs">
              <div className="flex items-center justify-between">
                <DialogHeader>
                  Cita - {getDia(selectDate)} {selectDate.date()}{" "}
                  {getMes(selectDate)}
                </DialogHeader>
              </div>
              <form onSubmit={onAppointmentSubmit}>
                <DialogBody divider>
                  <div className="grid gap-6">
                    <Input
                      label="Hora"
                      type="time"
                      variant="standard"
                      {...register("Hora", { required: true })}
                      error={errors.Hora ? true : false}
                    />
                    <Controller
                      name="idDocPac"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          label="Paciente"
                          containerProps={{ className: "min-w-[72px]" }}
                          error={errors.id ? true : false}
                          variant="standard"
                        >
                          {pacientes.map(
                            ({ id, DocPac, Nombre, ApellidoP }) => (
                              <Option key={id} value={`${DocPac.id.toString()},${id}`}>
                                {Nombre} {ApellidoP}
                              </Option>
                            )
                          )}
                        </Select>
                      )}
                    />
                    <Textarea
                      label="Diagnostico"
                      {...register("Diagnostico", { required: true })}
                      error={errors.Diagnostico ? true : false}
                      variant="standard"
                    />
                  </div>
                </DialogBody>
                <DialogFooter className="space-x-2">
                  <Button variant="text" color="red" onClick={handleOpen}>
                    Cancelar
                  </Button>
                  <Button variant="gradient" color="blue" type="sumbit">
                    Agendar Cita
                  </Button>
                </DialogFooter>
              </form>
            </Dialog>
          </div>
        </>
      )}
    </>
  );
};

export default Appointments;
