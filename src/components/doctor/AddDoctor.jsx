import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Card,
  Input,
  Button,
  Typography,
  Spinner,
  Select,
  Option,
  Textarea,
} from "@material-tailwind/react";
import StepperC from "../../common/StepperC.jsx";
import { createDoctorRequest } from "../../api/api";
import { useAuth } from "../../context/AuthContext.jsx";
import { useAlert } from "../../context/AlertContext";
import { useNavigate } from "react-router-dom";
import {
  CogIcon,
  UserIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

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
  }, [errors]);

  return (
    <>
      <Card shadow={false} className="w-[28%] px-5 py-5 mx-auto mt-[5%]">
        <Typography variant="h3" color="blue-gray" className="text-center mb-5">
          Nuevo doctor
        </Typography>
        <hr />
        <form className="mt-4 mb-2 w-[100%]" onSubmit={onSubmit}>
          <div className={`mb-4 flex flex-col gap-6 ${step != 0 && "hidden"}`}>
            <Input
              size="lg"
              label="Nombre"
              type="text"
              {...register("Nombre", { required: true })}
              error={errors.Nombre ? true : false}
            />
            <div className="flex items-center gap-4">
              <Input
                label="Apellido Paterno"
                maxLength={15}
                containerProps={{ className: "min-w-[72px]" }}
                type="text"
                {...register("ApellidoP", { required: true })}
                error={errors.ApellidoP ? true : false}
              />
              <Input
                label="Apellido Materno"
                maxLength={15}
                containerProps={{ className: "min-w-[72px]" }}
                type="text"
                {...register("ApellidoM", { required: true })}
                error={errors.ApellidoM ? true : false}
              />
            </div>
            <Controller
              name="Especialidad"
              rules={{ required: true }}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Especialidad"
                  containerProps={{ className: "min-w-[72px]" }}
                  error={errors.Especialidad ? true : false}
                >
                  <Option value="Medicina Interna">Medicina Interna</Option>
                  <Option value="Cirugía General">Cirugía General</Option>
                  <Option value="Ginecología y Obstetricia">
                    Ginecología y Obstetricia
                  </Option>
                  <Option value="Pediatría">Pediatría</Option>
                  <Option value="Cardiología">Cardiología</Option>
                  <Option value="Ortopedia y Traumatología">
                    Ortopedia y Traumatología
                  </Option>
                  <Option value="Dermatología">Dermatología</Option>
                  <Option value="Oftalmología">Oftalmología</Option>
                  <Option value="Otorrinolaringología">
                    Otorrinolaringología
                  </Option>
                  <Option value="Psiquiatría">Psiquiatría</Option>
                  <Option value="Anestesiología">Anestesiología</Option>
                  <Option value="Radiología">Radiología</Option>
                </Select>
              )}
            />
            <div className="flex items-center gap-4">
              <Input
                label="CURP"
                maxLength={18}
                containerProps={{ className: "min-w-[72px]" }}
                type="text"
                {...register("CURP", { required: true })}
                error={errors.CURP ? true : false}
              />
              <Input
                label="Cedula"
                maxLength={8}
                containerProps={{ className: "min-w-[72px]" }}
                type="text"
                {...register("Cedula", { required: true })}
                error={errors.Cedula ? true : false}
              />
            </div>
            <Input
              size="lg"
              label="Correo"
              type="email"
              {...register("Correo", { required: true })}
              error={errors.Correo ? true : false}
            />
            <Input
              size="lg"
              label="Contraseña"
              type="password"
              {...register("Password", { required: true })}
              error={errors.Password ? true : false}
            />
            {errors.Password ? (
              <Typography variant="small" color="red" className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 mr-1 mt-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
                Usa al menos 8 caracteres, una mayuscula y un numero
              </Typography>
            ) : (
              <></>
            )}
          </div>
          <div className={`mb-4 flex flex-col gap-6 ${step != 1 && "hidden"}`}>
            <Input
              size="lg"
              label="Calle"
              type="text"
              {...register("Calle", { required: true })}
              error={errors.Calle ? true : false}
            />
            <div className="flex items-center gap-4">
              <Input
                label="Numero Exterior"
                maxLength={5}
                containerProps={{ className: "min-w-[72px]" }}
                type="text"
                {...register("Num_ext", { required: true })}
                error={errors.Num_ext ? true : false}
              />
              <Input
                label="Numero Interior"
                maxLength={5}
                containerProps={{ className: "min-w-[72px]" }}
                type="number"
                {...register("Num_int", { required: true })}
                error={errors.Num_int ? true : false}
              />
            </div>
            <Input
              size="lg"
              label="Estado"
              type="text"
              {...register("Estado", { required: true })}
              error={errors.Estado ? true : false}
            />
            <Input
              size="lg"
              label="Municipio"
              type="text"
              {...register("Municipio", { required: true })}
              error={errors.Municipio ? true : false}
            />
            <Input
              size="lg"
              label="Colonia"
              type="text"
              {...register("Colonia", { required: true })}
              error={errors.Colonia ? true : false}
            />
            <div className="flex items-center gap-4">
              <Input
                label="Codigo Postal"
                maxLength={5}
                containerProps={{ className: "min-w-[72px]" }}
                type="number"
                {...register("CP", { required: true })}
                error={errors.CP ? true : false}
              />
              <Input
                label="Numero Telefonico"
                maxLength={10}
                containerProps={{ className: "min-w-[72px]" }}
                type="number"
                {...register("Telefono", { required: true })}
                error={errors.Telefono ? true : false}
              />
            </div>
          </div>
          <div className={`mb-4 flex flex-col gap-6 ${step != 2 && "hidden"}`}>
            <Textarea
              label="Configuraciones"
              {...register("Configuraciones")}
            />
            <hr />
            {loading ? (
              <Spinner className="mx-auto" />
            ) : (
              <>
                <Button color="blue" className="mt-6" fullWidth type="submit">
                  Añadir doctor
                </Button>
              </>
            )}
          </div>
        </form>
      </Card>
      <StepperC
        steps={[
          {
            Details: "Ingrese los datos del doctor",
            Icon: UserIcon,
          },
          {
            Details: "Ingrese el domicilio del doctor",
            Icon: BuildingLibraryIcon,
          },
          {
            Details: "Ingrese las configuraciones del doctor",
            Icon: CogIcon,
          },
        ]}
        onStepChange={(step) => setStep(step)}
      />
    </>
  );
};

export default AddDoctor;
