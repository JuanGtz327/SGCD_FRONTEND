import {
  Textarea,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option,
  Alert,
} from "@material-tailwind/react";
import { useState } from "react";
import Calendar from "../../citas/custom/Calendar";
import { useCalendar } from "../../../hooks/useCalendar";
import { useDay } from "../../../hooks/useDay";
import PreAppointmentsAccordion from "../custom/PreAppointmentsAccordion";
import { Controller, useForm } from "react-hook-form";
import { useAppointments } from "../../../hooks/useAppointments";
import Loader from "../../../common/Loader";
import AppointmentsAccordion from "../../citas/custom/AppointmentsAccordion";
import dayjs from "dayjs";
import { useDoctors } from "../../../hooks/useDoctors";
import { useHorarios } from "../../../hooks/useHorarios";
import { useAuth } from "../../../context/AuthContext";
import { GoAlertFill } from "react-icons/go";

const CitasHistorial = ({ preAppointments, onAppointments, filtro }) => {
  const { user } = useAuth();
  const { currentDate, getDia, getMes } = useCalendar();
  const { isToday, isBefore } = useDay();
  const { nextAppointments, loading } = useAppointments(true);
  const { docConfigs } = useDoctors(filtro);
  const {
    register: registerCita,
    handleSubmit: handleSubmitCita,
    control: controlCita,
    formState: { errors: errorsCita },
  } = useForm();

  const [selectDate, setSelectDate] = useState(currentDate);
  const { horariosCita } = useHorarios(
    docConfigs,
    nextAppointments,
    selectDate
  );
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const filterAppointmens = () => {
    const appointmensPerDay = nextAppointments.filter(
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

  const onNewAppointment = handleSubmitCita((values) => {
    values.Fecha = selectDate.format().split("T")[0] + "T" + values.Hora;
    delete values.Hora;
    if (user.is_admin) {
      values.idDoctor = filtro;
    }
    onAppointments(values, true);
    handleOpen();
  });

  const onDeletePreAppointment = (index) => {
    onAppointments(index, false);
  };

  return (
    <>
      <h2 className="text-base font-semibold leading-7 text-gray-900">Citas</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        En este apartado puede opcionalmente agendar una cita con el paciente.
        Simplemente seleccione el dia de su preferencia y la hora en la que
        desea agendar la cita.
      </p>
      {loading ? (
        <Loader top="mt-32" />
      ) : (
        <div className="flex flex-col md:flex-row w-full justify-center">
          <Calendar
            selectDate={selectDate}
            customClassName="max-w-[900px] mt-5"
            onDayChange={onDayChange}
            onSetToday={onSetToday}
            appointments={nextAppointments}
            diasLaborales={
              docConfigs?.Configuracione
                ? docConfigs?.Configuracione.Dias_laborables.split(",")
                : [
                    "Lunes",
                    "Martes",
                    "Miercoles",
                    "Jueves",
                    "Viernes",
                    "Sabado",
                    "Domingo",
                  ]
            }
          />
          <div className="h-full mt-0 sm:mt-5 sm:px-5 py-2 sm:py-8 w-full max-w-2xl">
            {user.is_admin ? (
              <div className="grid grid-cols-1 gap-5">
                {validDate() &&
                (docConfigs?.Configuracione
                  ? docConfigs?.Configuracione.Dias_laborables.split(
                      ","
                    ).includes(getDia(selectDate))
                  : false) ? (
                  <div className="text-gray-400 w-full">
                    <Button color="blue" fullWidth onClick={handleOpen}>
                      Agendar cita
                    </Button>
                  </div>
                ) : (
                  <Alert
                    className="rounded-none border-l-4 border-cerise-500 bg-cerise-500/20 font-medium text-red-600"
                    open
                    icon={<GoAlertFill />}
                  >
                    Horario no disponible para agendar citas.
                  </Alert>
                )}
              </div>
            ) : (
              <div className="text-gray-400 w-full">
                {validDate() ? (
                  <Button color="blue" fullWidth onClick={handleOpen}>
                    Agendar cita
                  </Button>
                ) : (
                  <Alert
                    className="rounded-none border-l-4 border-cerise-500 bg-cerise-500/20 font-medium text-red-600"
                    open
                    icon={<GoAlertFill />}
                  >
                    Horario no disponible para agendar citas.
                  </Alert>
                )}
              </div>
            )}

            <hr className="mt-5" />
            <div className="mt-5">
              <AppointmentsAccordion appointments={filterAppointmens()} />
              <PreAppointmentsAccordion
                appointments={preAppointments}
                onDeletePreAppointment={onDeletePreAppointment}
              />
            </div>
          </div>
        </div>
      )}

      <Dialog
        open={open}
        handler={handleOpen}
        size="sm"
        dismiss={{ enabled: false }}
      >
        <div className="flex items-center justify-between">
          <DialogHeader>
            Cita - {getDia(selectDate)} {selectDate.date()} {getMes(selectDate)}
          </DialogHeader>
        </div>
        <form>
          <DialogBody>
            <div className="flex flex-col gap-5">
              <Controller
                name="Hora"
                control={controlCita}
                render={({ field }) => (
                  <Select
                    {...field}
                    color="blue"
                    label="Hora"
                    containerProps={{ className: "min-w-[72px]" }}
                    error={errorsCita.Hora ? true : false}
                    variant="standard"
                  >
                    {horariosCita.map((horario) => (
                      <Option key={horario} value={horario}>
                        {horario}
                      </Option>
                    ))}
                  </Select>
                )}
              />
              <Textarea
                color="blue"
                label="Diagnostico"
                {...registerCita("Diagnostico", { required: true })}
                error={errorsCita.Diagnostico ? true : false}
                variant="standard"
              />
            </div>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button className="bg-cerise-500" onClick={handleOpen}>
              Cancelar
            </Button>
            <Button color="blue" onClick={onNewAppointment}>
              Agendar Cita
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
};

export default CitasHistorial;
