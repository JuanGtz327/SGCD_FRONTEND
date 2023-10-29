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
} from "@material-tailwind/react";
import { BsClipboard2CheckFill } from "react-icons/bs";
import { MdCancelPresentation, MdPendingActions } from "react-icons/md";
import dayjs from "dayjs";
import { useDay } from "../../../hooks/useDay";
import { useForm } from "react-hook-form";
import {
  cancelAppointmentRequest,
  editAppointmentRequest,
} from "../../../api/api";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../hooks/useToast";

const AppointmentsAccordion = ({
  appointments,
  setLoading,
  view = "doctor",
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

  const {
    register,
    handleSubmit,
    formState: { errors },
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
      showToast(
        "error",
        "La cita no puede ser en los ultimos 30 min",
        "center"
      );
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
      const valor =
        event.target.value + " " + editAppointment.Fecha.split(" ")[1];
      setEditAppointment({
        ...editAppointment,
        [event.target.name]: valor,
      });
    } else if (event.target.name === "Hora") {
      const valor =
        editAppointment.Fecha.split(" ")[0] + " " + event.target.value;
      setEditAppointment({
        ...editAppointment,
        Fecha: valor,
      });
    } else {
      setEditAppointment({
        ...editAppointment,
        [event.target.name]: event.target.value,
      });
    }
  };

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
            className="mb-2 rounded-lg border border-blue-gray-100 px-3 md:px-5"
            key={id}
          >
            <AccordionHeader
              onClick={() => handleOpen(index)}
              className={`border-b-0 transition-colors text-lg md:text-xl ${
                open === index ? "text-blue-500 hover:!text-blue-700" : ""
              }`}
            >
              <div className="w-full flex justify-between self-center">
                <p>
                  {view === "doctor"
                    ? Paciente.Nombre + " " + Paciente.ApellidoP
                    : "Medico: " + Doctor.Nombre + " " + Doctor.ApellidoP}
                </p>
                <div className="flex md:gap-2">
                  <p>{dayjs(Fecha).format("h:mm A")}</p>
                  <p className="text-2xl md:text-3xl">
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
                  </p>
                </div>
              </div>
            </AccordionHeader>
            <AccordionBody className="pt-0 text-base">
              <div className="flex justify-between">
                <div>
                  <p>
                    <b className="font-bold">Diagnostico:</b> {Diagnostico}
                  </p>
                  {CancelacionCitum && (
                    <p>
                      <b className="font-bold">Motivo Cancelacion:</b>{" "}
                      {CancelacionCitum.Motivo}
                    </p>
                  )}
                </div>
                {isBeforeOneDay(Fecha) && view === "doctor" && (
                  <div className="flex gap-3">
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
                        className="bg-cerise-500 w-fit h-fit"
                        onClick={() => {
                          handleOpenDialog();
                          setSelectedAppointment(id);
                        }}
                      >
                        No podre asistir
                      </Button>
                    </div>
                  )}
              </div>
            </AccordionBody>
          </Accordion>
        )
      )}

      <Dialog
        open={openDialog}
        handler={handleOpenDialog}
        size="sm"
        dismiss={{ enabled: false }}
      >
        <DialogHeader>Esta seguro que desea cancelar la cita?</DialogHeader>
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
        <DialogHeader>Actualizar Cita {}</DialogHeader>
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
            <Input
            color="blue"
              label="Hora"
              type="time"
              step={1800}
              value={editAppointment?.Fecha.split(" ")[1]}
              variant="standard"
              {...registerEdit("Hora", { required: true })}
              error={errorsEdit.Hora ? true : false}
              onChange={handleInputChange}
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
