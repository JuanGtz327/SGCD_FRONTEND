import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Card, Button, Typography, Textarea } from "@material-tailwind/react";
import DatosDoctor from "./datos_doctor/DatosDoctor.jsx";
import StepperC from "../../common/StepperC.jsx";
import { createDoctorRequest } from "../../api/api";
import { useAuth } from "../../context/AuthContext.jsx";
import { useToast } from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/outline";
import { AiOutlineSetting } from "react-icons/ai";
import Loader from "../../common/Loader.jsx";

const AddDoctor = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const onSubmit = handleSubmit(async (values) => {
    setLoading(true);
    try {
      await createDoctorRequest(values, user.token);
      showToast("success", "Registro completo");
      navigate("/listDoctors");
    } catch (error) {
      showToast("error", error.message, "center");
    }
    setLoading(false);
  });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      showToast("error", "Debes llenar todos los campos", "center");
    }
  }, [errors, showToast]);

  return (
    <>
      <div className="flex flex-col h-full">
        <Card
          shadow={false}
          className="w-full max-w-6xl px-5 lg:px-16 py-5 mx-auto"
        >
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
                color="blue"
                variant="standard"
                label="Configuraciones"
                {...register("Configuraciones")}
              />
              <hr className="mt-6" />
              {loading ? (
                <Loader top="mt-6" />
              ) : (
                <div className="flex">
                  <Button
                    color="blue"
                    className="mt-6 mx-auto w-full max-w-sm"
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
