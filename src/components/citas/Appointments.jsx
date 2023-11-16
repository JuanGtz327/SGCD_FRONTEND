import { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
  Button,
  Select,
  Option,
  Alert,
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
import Loader from "../../common/Loader";
import { useDoctors } from "../../hooks/useDoctors";
import { useHorarios } from "../../hooks/useHorarios";
import { MdCancelPresentation, MdPendingActions } from "react-icons/md";
import { BsClipboard2CheckFill, BsInfoCircleFill } from "react-icons/bs";
import { GoAlertFill } from "react-icons/go";

const Appointments = () => {
  const { docConfigs, setLoading: setDoctorLoading } = useDoctors();
  const { pacientes } = usePatients();
  const { appointments, loading, setLoading, setFiltro } = useAppointments();
  const { user } = useAuth();
  const { showToast } = useToast();
  const { currentDate, getDia, getMes, dayjs } = useCalendar();
  const { isToday, isBefore, isValidHour, translatedDate } = useDay();

  const [selectDate, setSelectDate] = useState(currentDate);
  const { horariosCita } = useHorarios(docConfigs, appointments, selectDate);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const onAppointmentSubmit = handleSubmit(async (values) => {
    const checkValidHour = values.Hora.split(":")[0];
    if (checkValidHour.length < 2) values.Hora = "0" + values.Hora;
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
      setDoctorLoading(true);
      reset();
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

  const onChangeSelectDate = (date) => {
    setSelectDate(date);
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
              En este apartado puede consultar las citas agendadas con sus
              pacientes. Ademas puede agendar nuevas citas a traves del
              calendario.
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
          <div className="mt-8 flex md:gap-1 2xl:gap-10 sm:divide-x justify-center items-center sm:flex-row flex-col">
            <Calendar
              selectDate={selectDate}
              customClassName="w-full max-w-lg"
              onDayChange={onDayChange}
              onSetToday={onSetToday}
              appointments={appointments}
              diasLaborales={docConfigs.Configuracione?.Dias_laborables.split(
                ","
              )}
            />
            <hr className="sm:hidden h-px my-0 bg-gray-300 border-0 w-full" />
            <div className="bg-white shadow-none md:shadow-2xl rounded-sm h-full md:min-h-[600px] w-full max-w-4xl sm:px-5 py-8">
              <div className="flex justify-between md:justify-start gap-2 mt-3 md:text-lg 2xl:text-3xl md:mt-0">
                <div className="flex items-center gap-1 text-cerise-500">
                  <MdCancelPresentation />{" "}
                  <p className="text-sm 2xl:text-lg">Cancelada</p>
                </div>
                <div className="flex items-center gap-1 text-[#10b981]">
                  <BsClipboard2CheckFill />{" "}
                  <p className="text-sm 2xl:text-lg">Completada</p>
                </div>
                <div className="flex items-center gap-1 text-blue-500">
                  <MdPendingActions />{" "}
                  <p className="text-sm 2xl:text-lg">Pendiente</p>
                </div>
              </div>
              <div className="font-semibold mt-5 flex gap-3 text-sm md:text-base justify-between md:justify-start">
                <p>{translatedDate(selectDate.format())}</p>
                <p className="text-gray-400">|</p>
                <p>
                  {filterAppointmens().length == 0
                    ? "No hay"
                    : filterAppointmens().length}{" "}
                  citas agendadas
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 mt-5">
                {pacientes.length > 0 && (
                  <div className="col-span-2">
                    <Controller
                      name="agendaDoctor"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          color="blue"
                          label="Filtrar por paciente"
                          variant="standard"
                          onChange={(e) => {
                            setFiltro(e);
                          }}
                        >
                          {pacientes.map(({ id, Nombre, ApellidoP }) => (
                            <Option key={id} value={`${id}`}>
                              {Nombre} {ApellidoP}
                            </Option>
                          ))}
                        </Select>
                      )}
                    />
                  </div>
                )}
                {validDate() &&
                (docConfigs?.Configuracione
                  ? docConfigs?.Configuracione.Dias_laborables.split(
                      ","
                    ).includes(getDia(selectDate))
                  : false) &&
                pacientes.length > 0 ? (
                  <Button
                    color="blue"
                    onClick={handleOpen}
                    className="mt-3 md:mt-0"
                  >
                    AGENDAR CITA
                  </Button>
                ) : (
                  <div className="flex mt-5 col-span-3">
                    {pacientes.length == 0 ? (
                      <Alert
                        className="rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946]"
                        open
                        icon={<GoAlertFill />}
                      >
                        Añada un paciente para agendar citas.
                      </Alert>
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
              </div>
              <hr className="mt-5" />
              <div className="mt-5">
                {filterAppointmens().length == 0 ? (
                  <Alert
                    className="rounded-none border-l-4 border-blue-500 bg-blue-500/20 font-medium text-blue-600"
                    open
                    icon={<BsInfoCircleFill />}
                  >
                    No cuenta con citas agendadas para este dia.
                  </Alert>
                ) : (
                  <AppointmentsAccordion
                    appointments={filterAppointmens()}
                    setLoading={setLoading}
                    docConfigs={docConfigs}
                    selectDate={selectDate}
                    onChangeSelectDate={onChangeSelectDate}
                  />
                )}
              </div>
            </div>

            <Dialog
              open={open}
              handler={handleOpen}
              size="xs"
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
                  <div className="grid grid-cols-2 gap-6">
                    <Controller
                      name="Hora"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          color="blue"
                          label="Hora"
                          containerProps={{ className: "min-w-[72px]" }}
                          error={errors.Hora ? true : false}
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
                          {pacientes.map(
                            ({ id, DocPacs, Nombre, ApellidoP }) => (
                              <Option
                                key={id}
                                value={`${
                                  DocPacs.find(
                                    ({
                                      Doctor: {
                                        User: { Correo },
                                      },
                                    }) => Correo === user.email
                                  ).id
                                },${id}`}
                              >
                                {Nombre} {ApellidoP}
                              </Option>
                            )
                          )}
                        </Select>
                      )}
                    />
                  </div>
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

export default Appointments;
