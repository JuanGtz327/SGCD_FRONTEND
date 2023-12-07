import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Card,
  Button,
  Typography,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import HistoriaMedica from "./historial_clinico/HistoriaMedica";
import { createPatientRequest } from "../../api/api";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import StepperC from "../../common/StepperC";
import {
  UserIcon,
  FingerPrintIcon,
  ClipboardDocumentListIcon,
  ClipboardDocumentIcon,
  PaintBrushIcon,
  Square3Stack3DIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import DatosPersonales from "./historial_clinico/DatosPersonales";
import ExamenFisico from "./historial_clinico/ExamenFisico";
import HistoriaClinicaActual from "./historial_clinico/HistoriaClinicaActual";
import CitasHistorial from "./historial_clinico/CitasHistorial";
import NotasHistorial from "./historial_clinico/NotasHistorial";
import Loader from "../../common/Loader";
import { useDoctors } from "../../hooks/useDoctors.js";

const AddPatient = () => {
  const [loading, setLoading] = useState(false);
  const [nombrePaciente, setNombrePaciente] = useState("Nuevo Paciente");
  const [apellidoPaciente, setApellidoPaciente] = useState("");
  const [apellidoPacienteM, setApellidoPacienteM] = useState("");
  const [habitosNegativos, setHabitosNegativos] = useState([]);
  const [habitosPositivos, setHabitosPositivos] = useState([]);
  const [preAppointments, setPreAppointments] = useState([]);
  const [notas, setNotas] = useState([]);
  const [step, setStep] = useState(0);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState("all");
  const { doctors } = useDoctors(filtro);
  const [btnVisible, setBtnVisible] = useState(false);

  const onSubmit = handleSubmit(async (values) => {
    if (user.is_admin && filtro === "all") {
      showToast("error", "Debes seleccionar un doctor");
      return;
    }

    let habitos_salud = [...habitosPositivos, ...habitosNegativos];
    if (habitos_salud.length === 0) {
      habitos_salud = ["Ninguno"];
    }
    const pacientePayload = {
      Nombre: values.Nombre,
      ApellidoP: values.ApellidoP,
      ApellidoM: values.ApellidoM,
      Fecha_nacimiento: values.Fecha_nacimiento,
      Genero: values.Genero,
      CURP: values.CURP,
    };

    const domicilioPayload = {
      Calle: values.Calle,
      Num_ext: values.Num_ext,
      Num_int: values.Num_int,
      Estado: values.Estado,
      Municipio: values.Municipio,
      Colonia: values.Colonia,
      CP: values.CP,
      Telefono: values.Telefono,
    };

    const historiaMedicaPayload = {
      Enfermedades_hereditarias: values.Enfermedades_hereditarias,
      Enfermedades_previas: values.Enfermedades_previas,
      Cirugias: values.Cirugias,
      Alergias: values.Alergias,
      Traumatismos: values.Traumatismos,
      Vacunas: values.Vacunas,
      Habitos_salud: habitos_salud.join(","),
    };

    const examenFisicoPayload = {
      Peso: values.Peso,
      Estatura: values.Estatura,
      Presion_arterial: values.Presion_arterial,
      Frecuencia_cardiaca: values.Frecuencia_cardiaca,
      Frecuencia_respiratoria: values.Frecuencia_respiratoria,
      Temperatura: values.Temperatura,
      Grupo_sanguineo: values.Grupo_sanguineo,
      Exploracion_detallada: values.Detalles,
    };

    const historiaClinicaActualPayload = {
      Motivo_consulta: values.Motivo_consulta,
      Sintomas: values.Sintomas,
      Fecha_inicio_sintomas: values.Fecha_inicio_sintomas,
      Plan_tratamiento: values.Plan_tratamiento,
    };
    setLoading(true);

    const regex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;

    if (!regex.test(values.Password)) {
      showToast("error", "La contraseña del paciente no cumple con los requisitos");
      setLoading(false);
      return;
    }

    try {
      await createPatientRequest(
        {
          pacientePayload,
          domicilioPayload,
          historiaMedicaPayload,
          examenFisicoPayload,
          historiaClinicaActualPayload,
          preAppointments,
          notas,
          Correo: values.Correo,
          Password: values.Password,
          PasswordDoctor: values.PasswordDoctor,
        },
        user.token,
        user.is_admin ? filtro : null
      );
      showToast("success", "Paciente añadido exitosamente");
      navigate("/listPatients");
    } catch (error) {
      showToast("error", error.response.data.message);
    }
    setLoading(false);
  });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      showToast("error", "Debes llenar todos los campos");
    }
  }, [errors, showToast]);

  const onNewHN = (newHN, adding) => {
    if (adding) {
      setHabitosNegativos([...habitosNegativos, newHN]);
      return;
    } else {
      setHabitosNegativos(habitosNegativos.filter((item) => item !== newHN));
      return;
    }
  };

  const onNewHP = (newHN, adding) => {
    if (adding) {
      setHabitosPositivos([...habitosPositivos, newHN]);
      return;
    } else {
      setHabitosPositivos(habitosPositivos.filter((item) => item !== newHN));
      return;
    }
  };

  const onAppointments = (values, adding) => {
    if (adding) {
      const error = preAppointments.find((item) => {
        if (item.Fecha === values.Fecha) {
          showToast("error", "Ya existe una cita en esta fecha");
          return true;
        }
      });
      if (error) {
        return;
      }

      setPreAppointments((prev) => [...prev, values]);
      return;
    } else {
      setPreAppointments((prev) => prev.filter((_, i) => i !== values));
      return;
    }
  };

  const onNotas = (values, adding) => {
    if (adding) {
      setNotas((prev) => [...prev, values]);
      return;
    } else {
      setNotas((prev) => prev.filter((_, i) => i !== values));
      return;
    }
  };

  return (
    <>
      <div className="flex flex-col lg:px-16">
        <Card
          shadow={false}
          className="bg-white rounded-sm w-full shadow-none md:shadow-2xl md:min-h-[730px] px-5 lg:px-16 py-5 mx-auto"
        >
          <div className="flex justify-between gap-5">
            <Typography
              variant="h3"
              color="blue-gray"
              className="text-center mb-5"
            >
              {nombrePaciente} {apellidoPaciente} {apellidoPacienteM}
            </Typography>

            {user.is_admin && (
              <Controller
                name="idDoctor"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    color="blue"
                    label="Asignar al doctor"
                    containerProps={{ className: "max-w-md" }}
                    variant="standard"
                    onChange={(e) => {
                      setFiltro(e);
                      if (!btnVisible) {
                        setBtnVisible(true);
                      }
                    }}
                  >
                    {doctors.map(({ id, Nombre, ApellidoP }) => (
                      <Option key={id} value={`${id}`}>
                        {Nombre} {ApellidoP}
                      </Option>
                    ))}
                  </Select>
                )}
              />
            )}
          </div>

          <hr />
          <form className="mt-4 mb-2 w-[100%]" onSubmit={onSubmit}>
            <div className={`${step != 0 && "hidden"}`}>
              <DatosPersonales
                register={register}
                errors={errors}
                control={control}
                Controller={Controller}
                setNombre={setNombrePaciente}
                setApellidoP={setApellidoPaciente}
                setApellidoM={setApellidoPacienteM}
              />
            </div>
            <div className={`${step != 1 && "hidden"}`}>
              <HistoriaMedica
                register={register}
                errors={errors}
                onNewHN={onNewHN}
                onNewHP={onNewHP}
              />
            </div>
            <div className={`${step != 2 && "hidden"}`}>
              <ExamenFisico register={register} errors={errors} />
            </div>
            <div className={`${step != 3 && "hidden"}`}>
              <HistoriaClinicaActual register={register} errors={errors} />
            </div>
            <div className={`${step != 4 && "hidden"}`}>
              <CitasHistorial
                preAppointments={preAppointments}
                onAppointments={onAppointments}
                filtro={filtro}
              />
            </div>
            <div className={`${step != 5 && "hidden"}`}>
              <NotasHistorial onNotas={onNotas} />
            </div>
            <div className={`${step != 6 && "hidden"}`}>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Firmar Historial Clinico
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Finalmente ingrese su contraseña para crear el historial clinico
                del paciente.
              </p>
              <div className="flex justify-center items-center h-[calc(50vh)]">
                <div className="w-full">
                  <Input
                    size="lg"
                    label="Ingrese su contraseña de doctor"
                    type="password"
                    color="blue"
                    variant="standard"
                    {...register("PasswordDoctor", { required: true })}
                    error={errors.PasswordDoctor ? true : false}
                  />
                  {loading ? (
                    <Loader top="mt-6" />
                  ) : (
                    <div className="flex">
                      <Button
                        color="blue"
                        className="mt-6 mx-auto"
                        type="submit"
                      >
                        Firmar Historial Clinico
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </Card>

        <StepperC
          steps={[
            {
              Details: "Datos paciente",
              Icon: UserIcon,
            },
            {
              Details: "Historia Medica",
              Icon: ClipboardDocumentListIcon,
            },
            {
              Details: "Examen Fisico",
              Icon: FingerPrintIcon,
            },
            {
              Details: "Historia Clinica Actual",
              Icon: ClipboardDocumentIcon,
            },
            {
              Details: "Citas",
              Icon: CalendarIcon,
            },
            {
              Details: "Notas",
              Icon: Square3Stack3DIcon,
            },
            {
              Details: "Firmar Historial Clinico",
              Icon: PaintBrushIcon,
            },
          ]}
          onStepChange={(step) => setStep(step)}
        />
      </div>
    </>
  );
};

export default AddPatient;
