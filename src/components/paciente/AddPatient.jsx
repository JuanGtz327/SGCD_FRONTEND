import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Card, Button, Typography, Spinner } from "@material-tailwind/react";
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

const AddPatient = () => {
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      await createPatientRequest(values, user.token);
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
              <div className={`${step != 3 && "hidden"}`}></div>
              <div className={`${step != 4 && "hidden"}`}></div>
              <div className={`${step != 5 && "hidden"}`}></div>
              <div className={`${step != 6 && "hidden"}`}>
                {loading ? (
                  <Spinner className="mx-auto" />
                ) : (
                  <Button color="blue" className="mt-6" fullWidth type="submit">
                    Añadir paciente
                  </Button>
                )}
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
