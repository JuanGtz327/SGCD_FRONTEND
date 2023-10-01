import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Card,
  Button,
  Typography,
  Spinner,
  Input,
} from "@material-tailwind/react";
import HistoriaMedica from "./historial_clinico/HistoriaMedica";
import { createPatientRequest } from "../../api/api";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../context/AlertContext";
import StepperC from "../../common/StepperC";
import {
  BuildingLibraryIcon,
  CogIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import DatosPersonales from "./historial_clinico/DatosPersonales";
import ExamenFisico from "./historial_clinico/ExamenFisico";
import HistoriaClinicaActual from "./historial_clinico/HistoriaClinicaActual";
import CitasHistorial from "./historial_clinico/CitasHistorial";
import NotasHistorial from "./historial_clinico/NotasHistorial";

const AddPatient = () => {
  const [loading, setLoading] = useState(false);
  const [habitosNegativos, setHabitosNegativos] = useState([]);
  const [habitosPositivos, setHabitosPositivos] = useState([]);
  const [step, setStep] = useState(0);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const { setAlertConfig } = useAlert();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    let habitos_salud = [...habitosPositivos, ...habitosNegativos]
    if (habitos_salud.length === 0) {
      habitos_salud = ["Ninguno"];
    }
    console.log(values);

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
    }

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

    console.log(pacientePayload);
    console.log(domicilioPayload);
    console.log(historiaMedicaPayload);
    console.log(examenFisicoPayload);
    console.log(historiaClinicaActualPayload);
    setLoading(true);
    try {
      await createPatientRequest({
        pacientePayload,
        domicilioPayload,
        historiaMedicaPayload,
        examenFisicoPayload,
        historiaClinicaActualPayload,
        Correo: values.Correo,
        Password: values.Password,
        PasswordDoctor: values.PasswordDoctor,
      }, user.token);
      setAlertConfig({
        msg: "Registro completo",
        type: "success",
      });
      navigate("/listPatients");
    } catch (error) {
      setAlertConfig({
        msg: error.message,
        type: "error",
      });
    }
    setLoading(false);
  });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setAlertConfig({
        msg: "Debes llenar todos los campos",
        type: "error",
      });
    }
  }, [errors]);

  const onNewHN = (newHN,adding) => {
    if(adding){
      setHabitosNegativos([...habitosNegativos, newHN]);
      return;
    }else{
      setHabitosNegativos(habitosNegativos.filter((item) => item !== newHN));
      return;
    }
  };

  const onNewHP = (newHN,adding) => {
    if(adding){
      setHabitosPositivos([...habitosPositivos, newHN]);
      return;
    }else{
      setHabitosPositivos(habitosPositivos.filter((item) => item !== newHN));
      return;
    }
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="h-4/5">
          <Card shadow={false} className="w-4/5 px-16 py-5 mx-auto h-full">
            <Typography
              variant="h3"
              color="blue-gray"
              className="text-center mb-5"
            >
              Nuevo paciente
            </Typography>
            <hr />
            <form className="mt-4 mb-2 w-[100%]" onSubmit={onSubmit}>
              <div className={`${step != 0 && "hidden"}`}>
                <DatosPersonales
                  register={register}
                  errors={errors}
                  control={control}
                  Controller={Controller}
                />
              </div>
              <div className={`${step != 1 && "hidden"}`}>
                <HistoriaMedica
                  register={register}
                  errors={errors}
                  control={control}
                  Controller={Controller}
                  onNewHN={onNewHN}
                  onNewHP={onNewHP}
                />
              </div>
              <div className={`${step != 2 && "hidden"}`}>
                <ExamenFisico
                  register={register}
                  errors={errors}
                  control={control}
                  Controller={Controller}
                />
              </div>
              <div className={`${step != 3 && "hidden"}`}>
                <HistoriaClinicaActual
                  register={register}
                  errors={errors}
                  control={control}
                  Controller={Controller}
                />
              </div>
              <div className={`${step != 4 && "hidden"}`}>
                <CitasHistorial
                  register={register}
                  errors={errors}
                  control={control}
                  Controller={Controller}
                />
              </div>
              <div className={`${step != 5 && "hidden"}`}>
                <NotasHistorial
                  register={register}
                  errors={errors}
                  control={control}
                  Controller={Controller}
                />
              </div>
              <div className={`${step != 6 && "hidden"}`}>
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Firmar Historial Clinico
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Finalmente ingrese su contraseña para crear el historial
                  clinico del paciente.
                </p>
                <div className="flex justify-center items-center h-[calc(50vh)]">
                  <div className="w-2/3">
                    <Input
                      size="lg"
                      label="Ingrese su contraseña de doctor"
                      type="password"
                      variant="standard"
                      {...register("PasswordDoctor", { required: true })}
                      error={errors.PasswordDoctor ? true : false}
                    />
                    {loading ? (
                      <Spinner className="mx-auto mt-6" />
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
        </div>
        <StepperC
          steps={[
            {
              Details: "Datos paciente",
              Icon: UserIcon,
            },
            {
              Details: "Historia Medica",
              Icon: BuildingLibraryIcon,
            },
            {
              Details: "Examen Fisico",
              Icon: CogIcon,
            },
            {
              Details: "Historia Clinica Actual",
              Icon: CogIcon,
            },
            {
              Details: "Citas",
              Icon: CogIcon,
            },
            {
              Details: "Notas",
              Icon: CogIcon,
            },
            {
              Details: "Firmar Historial Clinico",
              Icon: CogIcon,
            },
          ]}
          onStepChange={(step) => setStep(step)}
        />
      </div>
    </>
  );
};

export default AddPatient;
