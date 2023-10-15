import { useState } from "react";
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
import { useToast } from "../../hooks/useToast";
import { useCalendar } from "../../hooks/useCalendar";
import Calendar from "./custom/Calendar";
import { useDay } from "../../hooks/useDay";

const Appointments = () => {
  const { pacientes } = usePatients();
  const { appointments, loading, setLoading } = useAppointments();

  const { user } = useAuth();
  const { showToast } = useToast();

  const { currentDate, getDia, getMes, dayjs } = useCalendar();
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
      showToast("success", "Cita agendada");
      setLoading(true);
      setOpen(false);
    } catch (error) {
      showToast("error", error.response.data.message, "center");
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
    <div className="h-full">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-6 mx-auto">
          <div className="text-center mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
              Citas
            </h1>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">
              En este apartado puede consultar las citas agendadas con sus pacientes.
              Ademas puede agendar nuevas citas a traves del calendario.
            </p>
            <div className="flex mt-6 justify-center">
              <div className="w-16 h-1 rounded-full bg-blue-500 inline-flex"></div>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <Spinner className="h-8 w-8 mx-auto mt-[25%]" />
      ) : (
        <>
          <div className="flex md:gap-1 2xl:gap-10 sm:divide-x justify-center items-center sm:flex-row flex-col">
            <Calendar
              selectDate={selectDate}
              customClassName="w-full max-w-lg"
              onDayChange={onDayChange}
              onSetToday={onSetToday}
            />
            <hr className="sm:hidden h-px my-0 bg-gray-300 border-0 w-full" />
            <div className="h-full w-full max-w-4xl sm:px-5 py-8">
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
                              <Option
                                key={id}
                                value={`${DocPac.id.toString()},${id}`}
                              >
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
    </div>
  );
};

export default Appointments;
