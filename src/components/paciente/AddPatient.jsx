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
import { useDay } from "../../hooks/useDay.js";
import { useCalendar } from "../../hooks/useCalendar.js";

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
  const { currentDate } = useDay();
  const { dayjs } = useCalendar();

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

    const showErrors = [];

    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;

    if (!passwordRegex.test(values.Password))
      showErrors.push(
        "La contraseña del paciente no cumple con los requisitos"
      );

    const curpRegex = /^[A-Z]{4}[0-9]{6}[HM][A-Z0-9]{7}$/;

    if (!curpRegex.test(pacientePayload.CURP))
      showErrors.push("El formato de la CURP no es valido");

    //Verificar que el nombre no contenga numeros
    const nombreRegex = /^[a-zA-Z\s]*$/;

    if (!nombreRegex.test(pacientePayload.Nombre))
      showErrors.push("El nombre no puede contener numeros");

    //Verificar que el apellido paterno no contenga numeros
    if (!nombreRegex.test(pacientePayload.ApellidoP))
      showErrors.push("El apellido paterno no puede contener numeros");

    //Verificar que el apellido materno no contenga numeros
    if (!nombreRegex.test(pacientePayload.ApellidoM))
      showErrors.push("El apellido materno no puede contener numeros");

    //Verificar que el telefono solo contenga numeros y sea de 10 digitos
    const telefonoRegex = /^[0-9]{10}$/;

    if (!telefonoRegex.test(domicilioPayload.Telefono))
      showErrors.push("El telefono debe contener 10 digitos");

    //Verificar que el codigo postal solo contenga numeros y sea de 5 digitos
    const cpRegex = /^[0-9]{5}$/;

    if (!cpRegex.test(domicilioPayload.CP))
      showErrors.push("El codigo postal debe contener 5 digitos");

    //Fecha de naacimiento no puede ser mayor a la fecha actual
    if (currentDate.isBefore(dayjs(pacientePayload.Fecha_nacimiento)))
      showErrors.push("La fecha de nacimiento no es valida");

    const presionRegex = /^\d{2,3}\/\d{2,3}$/;

    if (!presionRegex.test(examenFisicoPayload.Presion_arterial))
      showErrors.push("El formato de la presion arterial debe ser 00/00");

    //Verificar que el peso sea mayor a 0 y menor a 1000
    if (examenFisicoPayload.Peso < 0 || examenFisicoPayload.Peso > 1000)
      showErrors.push("El peso debe ser mayor a 0 y menor a 1000");

    //Verificar que la estatura sea mayor a 0 y menor a 300
    if (examenFisicoPayload.Estatura < 30 || examenFisicoPayload.Estatura > 250)
      showErrors.push("La estatura debe ser mayor a 30 y menor a 250");

    //Verificar que la frecuencia cardiaca sea mayor a 0 y menor a 300
    if (
      examenFisicoPayload.Frecuencia_cardiaca < 0 ||
      examenFisicoPayload.Frecuencia_cardiaca > 300
    )
      showErrors.push(
        "La frecuencia cardiaca debe ser mayor a 0 y menor a 300"
      );

    //Verificar que la frecuencia respiratoria sea mayor a 0 y menor a 300
    if (
      examenFisicoPayload.Frecuencia_respiratoria < 0 ||
      examenFisicoPayload.Frecuencia_respiratoria > 300
    )
      showErrors.push(
        "La frecuencia respiratoria debe ser mayor a 0 y menor a 300"
      );

    //Verificar que la temperatura sea mayor a 0 y menor a 100
    if (
      examenFisicoPayload.Temperatura < 0 ||
      examenFisicoPayload.Temperatura > 100
    )
      showErrors.push("La temperatura debe ser mayor a 0 y menor a 100");

    //Verificar la expresion regular de la temperatura
    const temperaturaRegex = /^\d{2}(\.\d{1})?$/;

    if (!temperaturaRegex.test(examenFisicoPayload.Temperatura))
      showErrors.push("El formato de la temperatura debe ser 00.0");

    //Verificar que el grupo sanguineo sea valido
    const grupoSanguineoRegex = /^(A|B|AB|O)[+-]$/;

    if (!grupoSanguineoRegex.test(examenFisicoPayload.Grupo_sanguineo))
      showErrors.push("El grupo sanguineo no es valido, ej: O+");

    //Verificar que la fecha de inicio de sintomas no sea mayor a la fecha actual
    if (
      currentDate.isBefore(
        dayjs(historiaClinicaActualPayload.Fecha_inicio_sintomas)
      )
    )
      showErrors.push(
        "La fecha de inicio de sintomas no puede ser mayor a la actual"
      );

    if (showErrors.length > 0) {
      for (let i = 0; i < showErrors.length; i++) {
        showToast("error", showErrors[i]);
      }
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
