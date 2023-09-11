import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  Input,
  Checkbox,
  Button,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { useAuth } from "../context/AuthContext.jsx";
import AlertCustom from "../common/AlertCustom.jsx";

const SignUp = () => {
  const [alertConfig, setAlertConfig] = useState({});
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { signup, isAthenticated } = useAuth();

  useEffect(() => {
    if (isAthenticated) {
      navigate("/main");
    }
  }, [isAthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    setLoading(true);
    try {
      await signup(values);
      setAlertConfig({
        msg: "Registro completo",
        type: "success",
        isopen: true,
      });
    } catch (error) {
      setAlertConfig({
        msg: error.message,
        type: "error",
        isopen: true,
      });
      setLoading(false);
    }
  });

  useEffect(() => {
    setAlertConfig({ ...alertConfig, isopen: false });
  }, [loading]);

  return (
    <>
      <AlertCustom
        msg={alertConfig.msg}
        type={alertConfig.type}
        isopen={alertConfig.isopen}
      />

      <Card
        shadow={true}
        className="mt-16 mx-auto w-[90%] px-5 py-2 xs:mx-auto sm:w-fit sm:mt-20 md:mt-24 lg:mt-28"
      >
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h4" color="white">
            Sign Up
          </Typography>
        </CardHeader>
        <Typography color="gray" className="mt-1 font-normal">
          Ingresa tus datos para registrarte
        </Typography>
        <form className="mt-4 mb-2 w-100 max-w-screen-lg" onSubmit={onSubmit}>
          <div className="mb-4 flex flex-col gap-4">
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
            <div className="flex items-center gap-4">
              <Input
                label="Especialidad"
                maxLength={20}
                containerProps={{ className: "min-w-[72px]" }}
                type="text"
                {...register("Especialidad", { required: true })}
                error={errors.Especialidad ? true : false}
              />
              <Input
                label="Consultorio"
                maxLength={4}
                containerProps={{ className: "min-w-[72px]" }}
                type="number"
                {...register("Consultorio", { required: true })}
                error={errors.Consultorio ? true : false}
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

          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className={`flex items-center font-normal ${
                  errors.Checked ? "text-red-800" : ""
                }`}
              >
                Acepto los
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terminos y condiciones
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
            {...register("Checked", { required: true })}
            className={`${errors.Checked ? "border-red-800" : ""}`}
          />
          {loading ? (
            <Spinner className="mx-auto" />
          ) : (
            <Button className="mt-6" fullWidth type="submit">
              Sign Up
            </Button>
          )}
          <Typography
            variant="small"
            color="gray"
            className="mt-4 text-center font-normal"
          >
            ¿Ya cuentas con una cuenta?{" "}
            <a href="/login" className="font-medium text-blue-gray-900">
              Log in
            </a>
          </Typography>
        </form>
      </Card>
    </>
  );
};

export default SignUp;
