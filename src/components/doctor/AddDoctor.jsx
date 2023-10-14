import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Card,
  Button,
  Typography,
  Spinner,
  Textarea,
} from "@material-tailwind/react";
import DatosDoctor from "./datos_doctor/DatosDoctor.jsx";
import StepperC from "../../common/StepperC.jsx";
import { createDoctorRequest } from "../../api/api";
import { useAuth } from "../../context/AuthContext.jsx";
import { useAlert } from "../../context/AlertContext";
import { useNavigate } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/outline";
import { AiOutlineSetting } from "react-icons/ai";

const AddDoctor = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const { user } = useAuth();
  const { setAlertConfig } = useAlert();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const onSubmit = handleSubmit(async (values) => {
    setLoading(true);
    try {
      await createDoctorRequest(values, user.token);
      setAlertConfig({
        msg: "Registro completo",
        type: "success",
      });
      navigate("/listDoctors");
    } catch (error) {
      console.log(error);
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
  }, [errors, setAlertConfig]);

  return (
    <>
      <div className="flex flex-col h-full">
        <Card shadow={false} className="w-full max-w-6xl px-5 lg:px-16 py-5 mx-auto">
          <Typography
            variant="h3"
            color="blue-gray"
            className="text-center mb-5"
          >
            Nuevo doctor
          </Typography>
          <hr />
          <form className="mt-4 mb-2 w-[100%]" onSubmit={onSubmit}>
            <div className={`${step != 0 && "hidden"}`}>
              <DatosDoctor
                register={register}
                errors={errors}
                control={control}
                Controller={Controller}
              />
            </div>
            <div className={`${step != 1 && "hidden"}`}>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Configuraciones
              </h2>
              <p className="mt-1 mb-10 text-sm leading-6 text-gray-600">
                En este apartado puede establecer las configuraciones del
                doctor.
              </p>
              <Textarea
                variant="standard"
                label="Configuraciones"
                {...register("Configuraciones")}
              />
              <hr className="mt-6" />
              {loading ? (
                <Spinner className="mx-auto mt-6" />
              ) : (
                <div className="flex">
                  <Button
                    color="blue"
                    className="mt-6 mx-auto w-full max-w-[10rem]"
                    type="submit"
                  >
                    Agregar Doctor
                  </Button>
                </div>
              )}
            </div>
          </form>
        </Card>
        <StepperC
          steps={[
            {
              Details: "Datos del doctor",
              Icon: UserIcon,
            },
            {
              Details: "Configuraciones",
              Icon: AiOutlineSetting,
            },
          ]}
          onStepChange={(step) => setStep(step)}
        />
      </div>
    </>
  );
};

export default AddDoctor;
