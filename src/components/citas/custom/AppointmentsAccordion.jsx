import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { BsClipboard2CheckFill } from "react-icons/bs";
import { MdCancelPresentation, MdPendingActions } from "react-icons/md";
import dayjs from "dayjs";
import { useDay } from "../../../hooks/useDay";
import { Controller, useForm } from "react-hook-form";
import {
  cancelAppointmentRequest,
  cancelConfirmAppointmentRequest,
  editAppointmentRequest,
} from "../../../api/api";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../hooks/useToast";
import { useHorarios } from "../../../hooks/useHorarios";
import { useCalendar } from "../../../hooks/useCalendar";
import { ConfirmationModal } from "../../generalModals/ConfirmationModal";

const AppointmentsAccordion = ({
  docConfigs,
  selectDate,
  appointments,
  setLoading,
  view = "doctor",
  enableControls = true,
}) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { isAfter, findNext, isBeforeOneDay, isValidHour } = useDay();
  const nextAppointment = findNext(appointments);
  const [open, setOpen] = useState(nextAppointment);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => setOpenDialog(!openDialog);
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(!openEdit);
  const [editAppointment, setEditAppointment] = useState(null);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const [editDate, setEditDate] = useState(selectDate);
  const { getHorariosEdit } = useHorarios(docConfigs, appointments, editDate);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const { getDia } = useCalendar();

  useEffect(() => {
    if (selectDate) {
      setEditDate(selectDate);
    }
  }, [selectDate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: errorsEdit },
  } = useForm();

  useEffect(() => {
    setOpen(findNext(appointments));
  }, [appointments]);

  const onAppointmentCancel = handleSubmit(async (values) => {
    values.id = selectedAppointment;
    setOpenDialog(false);
    setSelectedAppointment(null);
    try {
      await cancelAppointmentRequest(values, user.token);
      showToast("success", "Cita cancelada");
      setLoading(true);
    } catch (error) {
      showToast("error", error.response.data.message, "center");
    }
  });

  const onAppointmentEdit = handleSubmitEdit(async () => {
    if (isAfter(editAppointment.Fecha)) {
      showToast("error", "La hora no puede ser anterior a la actual", "center");
      return;
    }

    if (!isValidHour(editAppointment.Fecha, 30)) {
      showToast("error", "El horario de la cita no es valido", "center");
      return;
    }

    const payload = {
      id: editAppointment.id,
      Fecha: editAppointment.Fecha,
      Diagnostico: editAppointment.Diagnostico,
    };

    try {
      await editAppointmentRequest(payload, user.token);
      showToast("success", "Cita actualizada");
      setLoading(true);
    } catch (error) {
      showToast("error", error.response.data.message, "center");
    }

    setOpenEdit(false);
    setEditAppointment(null);
  });

  const handleInputChange = (event) => {
    if (event.target.name === "Fecha") {
      if (
        !docConfigs.Configuracione.Dias_laborables.split(",").includes(
          getDia(dayjs(event.target.value))
        )
      ) {
        showToast("error", "Este día no esta disponible para agendar citas.");
        return;
      }
      const valor =
        event.target.value + " " + editAppointment.Fecha.split(" ")[1];
      setEditAppointment({
        ...editAppointment,
        [event.target.name]: valor,
      });
      setEditDate(dayjs(event.target.value));
    } else {
      setEditAppointment({
        ...editAppointment,
        [event.target.name]: event.target.value,
      });
    }
  };

  const getDelay = (key) => {
    if (key === 0) return 'animate-delay-[150ms]';
    if (key === 1) return 'animate-delay-[300ms]';
    if (key === 2) return 'animate-delay-[450ms]';
    if (key === 3) return 'animate-delay-[600ms]';
    if (key === 4) return 'animate-delay-[750ms]';
    if (key === 5) return 'animate-delay-[900ms]';
    if (key === 6) return 'animate-delay-[1050ms]';
    if (key === 7) return 'animate-delay-[1200ms]';
    if (key === 8) return 'animate-delay-[1350ms]';
    if (key === 9) return 'animate-delay-[1500ms]';
    if (key === 10) return 'animate-delay-[1650ms]';
    if (key === 11) return 'animate-delay-[1800ms]';
    if (key === 12) return 'animate-delay-[1950ms]';
    if (key === 13) return 'animate-delay-[2100ms]';
    if (key === 14) return 'animate-delay-[2250ms]';
    if (key === 15) return 'animate-delay-[2400ms]';
    if (key === 16) return 'animate-delay-[2550ms]';
    if (key === 17) return 'animate-delay-[2700ms]';
    if (key === 18) return 'animate-delay-[2850ms]';
    if (key === 19) return 'animate-delay-[3000ms]';
    if (key === 20) return 'animate-delay-[3150ms]';
  }

  return (
    <>
      {appointments.map(
        (
          {
            id,
            Fecha,
            Estado,
            Diagnostico,
            CancelacionCitum,
            DocPac: { Paciente, Doctor },
          },
          index,
          appointments
        ) => (
          <Accordion
            open={open === index}
            className={`mb-2 rounded-lg border border-blue-gray-100 px-3 md:px-5 animate-fade-right animate-duration-[750ms] ${getDelay(index)} `}
            key={id}
          >
            <AccordionHeader
              onClick={() => handleOpen(index)}
              className={`border-b-0 transition-colors text-lg md:text-xl ${
                open === index ? "text-blue-500 hover:!text-blue-700" : ""
              }`}
            >
              <div className="w-full flex justify-between self-center text-base xl:text-lg items-center">
                {view === "admin" ? (
                  <div className="flex flex-col">
                    <b>
                      Médico:{" "}
                      {Doctor.Nombre +
                        " " +
                        Doctor.ApellidoP +
                        " " +
                        Doctor.ApellidoM}{" "}
                    </b>
                    <b>
                      Paciente:{" "}
                      {Paciente.Nombre +
                        " " +
                        Paciente.ApellidoP +
                        " " +
                        Paciente.ApellidoM}
                    </b>
                  </div>
                ) : view === "doctor" ? (
                  <p>
                    Paciente:{" "}
                    {Paciente.Nombre +
                      " " +
                      Paciente.ApellidoP +
                      " " +
                      Paciente.ApellidoM}
                  </p>
                ) : (
                  <p>
                    {"Médico: " +
                      Doctor.Nombre +
                      " " +
                      Doctor.ApellidoP +
                      " " +
                      Doctor.ApellidoM}
                  </p>
                )}
                <div className="flex md:gap-2 items-center">
                  <p className="hidden 2xl:flex">
                    {dayjs(Fecha).format("h:mm A")}
                  </p>
                  <div className="text-2xl md:text-3xl">
                    {Estado === false ? (
                      <MdCancelPresentation className="text-cerise-500" />
                    ) : isAfter(Fecha) ? (
                      <BsClipboard2CheckFill color="#10b981" />
                    ) : (
                      <div className="flex gap-1">
                        <MdPendingActions className="text-blue-500" />
                        {CancelacionCitum?.Pendiente && (
                          <MdCancelPresentation className="text-cerise-500" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </AccordionHeader>
            <AccordionBody className="pt-0 text-base">
              <div className="flex flex-col md:flex-row md:justify-between gap-3">
                <div>
                  <p className="2xl:hidden">
                    <b className="font-bold">Horario:</b>{" "}
                    {dayjs(Fecha).format("h:mm A")}
                  </p>
                  <p>
                    <b className="font-bold">Diagnóstico:</b> {Diagnostico}
                  </p>
                  {CancelacionCitum && (
                    <p>
                      <b className="font-bold">Motivo cancelación:</b>{" "}
                      {CancelacionCitum.Motivo}
                    </p>
                  )}
                </div>
                {isBeforeOneDay(Fecha) &&
                  (view === "doctor" || view === "admin") &&
                  !CancelacionCitum &&
                  enableControls && (
                    <div className="flex md:gap-3 md:justify-end justify-between">
                      <Button
                        className="bg-cerise-500"
                        onClick={() => {
                          handleOpenDialog();
                          setSelectedAppointment(id);
                        }}
                      >
                        Cancelar Cita
                      </Button>
                      <Button
                        className="bg-blue-500"
                        onClick={() => {
                          handleOpenEdit();
                          setEditAppointment(appointments[index]);
                        }}
                      >
                        Actualizar Cita
                      </Button>
                    </div>
                  )}
                {isBeforeOneDay(Fecha) &&
                  view === "paciente" &&
                  Estado === true &&
                  CancelacionCitum?.Pendiente != true && (
                    <div className="flex gap-3">
                      <Button
                        className="bg-cerise-500 w-full md:w-fit h-fit"
                        onClick={() => {
                          handleOpenDialog();
                          setSelectedAppointment(id);
                        }}
                      >
                        No podré asistir
                      </Button>
                    </div>
                  )}

                {isBeforeOneDay(Fecha) &&
                  view === "doctor" &&
                  Estado === true &&
                  CancelacionCitum?.Pendiente == true && (
                    <div className="flex md:gap-3 md:justify-end justify-between">
                      <Button
                        className="bg-cerise-500 w-full md:w-fit h-fit"
                        onClick={() => {
                          setShowConfirmationModal(true);
                          setSelectedAppointment(id);
                        }}
                      >
                        Confirmar cancelación
                      </Button>
                      <Button
                        className="bg-blue-500 h-fit"
                        onClick={() => {
                          handleOpenEdit();
                          setEditAppointment(appointments[index]);
                        }}
                      >
                        Actualizar Cita
                      </Button>
                    </div>
                  )}
              </div>
            </AccordionBody>
          </Accordion>
        )
      )}

      <ConfirmationModal
        show={showConfirmationModal}
        onConfirm={async () => {
          await cancelConfirmAppointmentRequest(
            { idCita: selectedAppointment },
            user.token
          );
          showToast("success", "Cita cancelada");
        }}
        onCancel={() => {
          setShowConfirmationModal(false);
        }}
        tittle="Confirmar cancelación"
        message="¿Desea cancelar la cita? Esta acción no se puede deshacer."
      />

      <Dialog
        open={openDialog}
        handler={handleOpenDialog}
        size="sm"
        dismiss={{ enabled: false }}
      >
        <DialogHeader>¿Esta seguro que desea cancelar la cita?</DialogHeader>
        <form>
          <DialogBody className="py-10">
            <Textarea
              color="blue"
              label="Motivo de Cancelación"
              {...register("Motivo", { required: true })}
              error={errors.Motivo ? true : false}
              variant="standard"
            />
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button className="bg-cerise-500" onClick={handleOpenDialog}>
              Volver
            </Button>
            <Button color="blue" onClick={onAppointmentCancel}>
              Cancelar Cita
            </Button>
          </DialogFooter>
        </form>
      </Dialog>

      <Dialog
        open={openEdit}
        handler={handleOpenEdit}
        size="sm"
        dismiss={{ enabled: false }}
      >
        <DialogHeader>Actualizar Cita</DialogHeader>
        <form>
          <DialogBody className="flex flex-col gap-5">
            <Input
              color="blue"
              label="Fecha"
              type="date"
              value={editAppointment?.Fecha.split(" ")[0]}
              variant="standard"
              {...registerEdit("Fecha", { required: true })}
              error={errorsEdit.Fecha ? true : false}
              onChange={handleInputChange}
            />
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
                  name="Hora"
                  onChange={(e) => {
                    const valor = editAppointment.Fecha.split(" ")[0] + " " + e;
                    setEditAppointment({
                      ...editAppointment,
                      Fecha: valor,
                    });
                  }}
                >
                  {getHorariosEdit(editDate).map((horario) => (
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
              value={editAppointment?.Diagnostico}
              {...registerEdit("Diagnostico", { required: true })}
              error={errorsEdit.Diagnostico ? true : false}
              variant="standard"
              onChange={handleInputChange}
            />
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button
              className="bg-cerise-500"
              onClick={() => {
                handleOpenEdit();
                setEditAppointment(null);
              }}
            >
              Cancelar
            </Button>
            <Button
              color="blue"
              onClick={() => {
                onAppointmentEdit();
              }}
            >
              Acualizar Cita
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
};

export default AppointmentsAccordion;
