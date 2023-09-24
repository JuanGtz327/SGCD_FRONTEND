import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import React, { useEffect, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
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
import AlertCustom from "../../common/AlertCustom";
import { useForm, Controller, set } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import {
  getPatientsRequest,
  createAppointmentRequest,
  getAppointmentsRequest,
} from "../../api/api";
import AppointmentsAccordion from "./custom/AppointmentsAccordion";

const generateDate = (month = dayjs().month(), year = dayjs().year()) => {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
  const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

  const arrayOfDate = [];

  // create prefix date
  for (let i = 0; i < firstDateOfMonth.day(); i++) {
    const date = firstDateOfMonth.day(i);

    arrayOfDate.push({
      currentMonth: false,
      date,
    });
  }

  // generate current date
  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    arrayOfDate.push({
      currentMonth: true,
      date: firstDateOfMonth.date(i),
      today:
        firstDateOfMonth.date(i).toDate().toDateString() ===
        dayjs().toDate().toDateString(),
    });
  }

  const remaining = 42 - arrayOfDate.length;

  for (
    let i = lastDateOfMonth.date() + 1;
    i <= lastDateOfMonth.date() + remaining;
    i++
  ) {
    arrayOfDate.push({
      currentMonth: false,
      date: lastDateOfMonth.date(i),
    });
  }
  return arrayOfDate;
};

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Augosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const dias = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
  "Dominigo",
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

dayjs.extend(utc);
dayjs.extend(timezone);

const Appointments = () => {
  const [loading, setLoading] = useState(false);
  const [alertConfig, setAlertConfig] = useState({});
  const [pacientes, setPacientes] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const { user } = useAuth();

  const days = ["S", "M", "T", "W", "T", "F", "S"];

  const currentDate = dayjs().tz("America/Mexico_City");
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    (async () => {
      const response = await getPatientsRequest(user.token);
      const response2 = await getAppointmentsRequest(user.token);
      setPacientes(response.data);
      setAppointments(response2.data);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await getPatientsRequest(user.token);
      const response2 = await getAppointmentsRequest(user.token);
      setPacientes(response.data);
      setAppointments(response2.data);
      setLoading(false);
    })();
  }, [loading]);

  const onAppointmentSubmit = handleSubmit(async (values) => {
    values.Fecha = selectDate.format().split("T")[0] + "T" + values.Hora;
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
        isopen: true,
        type: "success",
        msg: "Cita agendada",
      });
    }
  });

  const filterAppointmens = () =>
    appointments.filter(
      (cita) => cita.Fecha.split(" ")[0] === selectDate.format().split("T")[0]
    );

  return (
    <>
      {loading ? (
        <Spinner className="h-8 w-8 mx-auto mt-[25%]" />
      ) : (
        <>
          <AlertCustom
            msg={alertConfig.msg}
            type={alertConfig.type}
            isopen={alertConfig.isopen}
          />
          <div className="rounded-3xl p-10 flex gap-10 sm:divide-x justify-center 2xl:w-[90%] lg:h-[100%] mx-auto items-center sm:flex-row flex-col">
            <div className="h-fit 2xl:w-[35%] rounded-3xl shadow-2xl bg-white shadow-black/50 p-12">
              <div className="flex justify-between items-center">
                <h1 className="select-none font-semibold">
                  {/* Septiembre 2023 */}
                  {months[today.month()]}, {today.year()}
                </h1>
                <div className="flex gap-10 items-center ">
                  {/* Menu para cambiar los meses y volver al dia actual */}
                  <GrFormPrevious
                    className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                    onClick={() => {
                      setToday(today.month(today.month() - 1));
                    }}
                  />
                  <h1
                    className=" cursor-pointer hover:scale-105 transition-all"
                    onClick={() => {
                      setToday(dayjs());
                      setSelectDate(dayjs());
                    }}
                  >
                    Hoy
                  </h1>
                  <GrFormNext
                    className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                    onClick={() => {
                      setToday(today.month(today.month() + 1));
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-7 ">
                {/* S M T W T F S */}
                {days.map((day, index) => {
                  return (
                    <h1
                      key={index}
                      className="text-sm text-center h-14 w-14 grid place-content-center text-gray-500 select-none"
                    >
                      {day}
                    </h1>
                  );
                })}
              </div>
              <div className=" grid grid-cols-7 ">
                {generateDate(today.month(), today.year()).map(
                  ({ date, currentMonth, today }, index) => {
                    return (
                      <div
                        key={index}
                        className="p-2 text-center h-14 grid place-content-center text-sm border-t"
                      >
                        <h1
                          className={cn(
                            currentMonth ? "" : "text-gray-400",
                            today ? "bg-blue-600 text-white" : "",
                            selectDate.toDate().toDateString() ===
                              date.toDate().toDateString()
                              ? "bg-blue-gray-400 text-white"
                              : "",
                            "h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
                          )}
                          onClick={() => {
                            setSelectDate(date);
                          }}
                        >
                          {/* Valor del dia */}
                          {date.date()}
                        </h1>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
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
                <Button color="blue" variant="gradient" onClick={handleOpen}>
                  Agendar cita
                </Button>
              </div>
              <hr className="mt-5" />
              <div className="mt-5">
                <AppointmentsAccordion appointments={filterAppointmens()} />
              </div>
            </div>

            <Dialog open={open} handler={handleOpen} size="xs">
              <div className="flex items-center justify-between">
                <DialogHeader>
                  Cita - {dias[selectDate.day() - 1]} {selectDate.date()}{" "}
                  {months[selectDate.month()]}
                </DialogHeader>
              </div>
              <form onSubmit={onAppointmentSubmit}>
                <DialogBody divider>
                  <div className="grid gap-6">
                    <Input
                      label="Hora"
                      type="time"
                      {...register("Hora", { required: true })}
                      error={errors.Hora ? true : false}
                    />
                    <Controller
                      name="id"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          label="Paciente"
                          containerProps={{ className: "min-w-[72px]" }}
                          error={errors.id ? true : false}
                        >
                          {pacientes.map(({ Correo, Paciente }) => (
                            <Option
                              key={Paciente.id}
                              value={Paciente.id.toString()}
                            >
                              {" "}
                              {Paciente.Nombre} {Paciente.Apellido}{" "}
                            </Option>
                          ))}
                        </Select>
                      )}
                    />
                    <Textarea
                      label="Descripcion"
                      {...register("Descripcion", { required: true })}
                      error={errors.Descripcion ? true : false}
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
