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
} from "@material-tailwind/react";
import { useForm, Controller } from "react-hook-form";
import { useDoctors } from "../../../hooks/useDoctors";
import { useAppointments } from "../../../hooks/useAppointments";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../hooks/useToast";
import { useCalendar } from "../../../hooks/useCalendar";
import { useDay } from "../../../hooks/useDay";
import { createAppointmentRequest } from "../../../api/api";
import Loader from "../../../common/Loader";
import Calendar from "./Calendar";
import AppointmentsAccordion from "./AppointmentsAccordion";

const AdminAppointments = () => {
  const { doctors } = useDoctors();
  const { adminAppointments, loading, setLoading, setFiltro } = useAppointments();

  const { user } = useAuth();
  const { showToast } = useToast();

  const { currentDate, getDia, getMes, dayjs } = useCalendar();
  const { isToday, isBefore, isValidHour, convertToBirthDate } = useDay();

  const [selectDate, setSelectDate] = useState(currentDate);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

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

    if (!isValidHour(values.Fecha, 30)) {
      showToast(
        "error",
        "La cita no puede ser en los ultimos 30 min",
        "center"
      );
      return;
    }

    try {
      await createAppointmentRequest(values, user.token);
      showToast("success", "Cita agendada");
      //setLoading(true);
      setOpen(false);
    } catch (error) {
      showToast("error", error.response.data.message, "center");
    }
  });

  const filterAppointmens = () => {
    const appointmensPerDay = adminAppointments.filter(
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
              Citas Administrador
            </h1>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">
              En este apartado puede consultar la agenda de citas de los
              doctores y agendar citas para los pacientes.
            </p>
            <div className="flex mt-6 justify-center">
              <div className="w-64 h-1 rounded-full bg-indigo-500 inline-flex"></div>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <Loader top="mt-32" />
      ) : (
        <>
          <div className="flex md:gap-1 2xl:gap-10 sm:divide-x justify-center items-center sm:flex-row flex-col">
            <Calendar
              selectDate={selectDate}
              customClassName="w-full max-w-lg"
              onDayChange={onDayChange}
              onSetToday={onSetToday}
              appointments={adminAppointments}
            />
            <hr className="sm:hidden h-px my-0 bg-gray-300 border-0 w-full" />
            <div className="h-full w-full max-w-4xl sm:px-5 py-8">
              <h1 className="font-semibold">
                {convertToBirthDate(selectDate.format())}
              </h1>
              <div className="text-gray-400 grid grid-cols-3">
                <h6 className="flex my-auto">
                  {filterAppointmens().length == 0
                    ? "No hay"
                    : filterAppointmens().length}{" "}
                  citas agendadas
                </h6>
                <Controller
                  name="agendaDoctor"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      color="blue"
                      label="Seleccione un doctor"
                      containerProps={{ className: "min-w-[72px]" }}
                      variant="standard"
                      onChange={(e) => {setFiltro(e)}}
                    >
                      {doctors.map(({ id, Nombre, ApellidoP }) => (
                        <Option key={id} value={`${id}`}>
                          {Nombre} {ApellidoP}
                        </Option>
                      ))}
                    </Select>
                  )}
                />
                {validDate() && (
                  <Button color="blue" onClick={handleOpen}>
                    AGENDAR CITA
                  </Button>
                )}
              </div>
              <hr className="mt-5" />
              <div className="mt-5">
                <AppointmentsAccordion
                  appointments={filterAppointmens()}
                  setLoading={setLoading}
                />
              </div>
            </div>

            <Dialog
              open={open}
              handler={handleOpen}
              size="sm"
              dismiss={{ enabled: false }}
            >
              <div className="flex items-center justify-between">
                <DialogHeader>
                  Cita - {getDia(selectDate)} {selectDate.date()}{" "}
                  {getMes(selectDate)}
                </DialogHeader>
              </div>
              <form onSubmit={onAppointmentSubmit}>
                <DialogBody className="flex flex-col gap-5">
                  <Input
                    color="blue"
                    label="Hora"
                    type="time"
                    step={1800}
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
                        color="blue"
                        label="Paciente"
                        containerProps={{ className: "min-w-[72px]" }}
                        error={errors.id ? true : false}
                        variant="standard"
                      >
                        {doctors.map(({ id, Nombre, ApellidoP }) => (
                          <Option key={id} value={`id`}>
                            {Nombre} {ApellidoP}
                          </Option>
                        ))}
                      </Select>
                    )}
                  />
                  <Textarea
                    color="blue"
                    label="Diagnostico"
                    {...register("Diagnostico", { required: true })}
                    error={errors.Diagnostico ? true : false}
                    variant="standard"
                  />
                </DialogBody>
                <DialogFooter className="space-x-2">
                  <Button className="bg-cerise-500" onClick={handleOpen}>
                    Cancelar
                  </Button>
                  <Button color="blue" type="sumbit">
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

export default AdminAppointments;
