import { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Button,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { createAppointmentRequest } from "../../api/api";
import AppointmentsAccordion from "./custom/AppointmentsAccordion";
import { useAppointments } from "../../hooks/useAppointments";
import { useToast } from "../../hooks/useToast";
import { useCalendar } from "../../hooks/useCalendar";
import Calendar from "./custom/Calendar";
import { useDay } from "../../hooks/useDay";
import Loader from "../../common/Loader";
import { MdCancelPresentation, MdPendingActions } from "react-icons/md";
import { BsClipboard2CheckFill } from "react-icons/bs";

const PatientAppointments = () => {
  const { appointments, loading, setLoading } = useAppointments();

  const { user } = useAuth();
  const { showToast } = useToast();

  const { currentDate, getDia, getMes, dayjs } = useCalendar();
  const { isValidHour, translatedDate } = useDay();

  const [selectDate, setSelectDate] = useState(currentDate);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const {
    register,
    handleSubmit,
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

  return (
    <div className="h-full">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-6 mx-auto">
          <div className="text-center mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
              Citas Paciente
            </h1>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">
              En este apartado puede consultar las citas agendadas por sus
              doctores.
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
              appointments={appointments}
            />
            <hr className="sm:hidden h-px my-0 bg-gray-300 border-0 w-full" />
            <div className="h-full w-full max-w-4xl sm:px-5 py-8">
              <h1 className="font-semibold">
                {translatedDate(selectDate.format())}
              </h1>
              <div className="text-gray-400 flex justify-between">
                <h6 className="flex my-auto">
                  {filterAppointmens().length == 0
                    ? "No hay"
                    : filterAppointmens().length}{" "}
                  citas agendadas
                </h6>
                <div className="flex gap-2 mt-3 md:text-lg 2xl:text-3xl md:mt-0">
                  <div className="flex items-center gap-1 text-cerise-500">
                    <MdCancelPresentation />{" "}
                    <p className="text-sm 2xl:text-lg">Cancelada</p>
                  </div>
                  <div className="flex items-center gap-1 text-[#10b981]">
                    <BsClipboard2CheckFill />{" "}
                    <p className="text-sm 2xl:text-lg">Completada</p>
                  </div>
                  <div className="flex items-center gap-1 text-blue-500">
                    <MdPendingActions /> <p className="text-sm 2xl:text-lg">Pendiente</p>
                  </div>
                </div>
              </div>
              <hr className="mt-5" />
              <div className="mt-5">
                <AppointmentsAccordion
                  appointments={filterAppointmens()}
                  setLoading={setLoading}
                  view="paciente"
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

export default PatientAppointments;
