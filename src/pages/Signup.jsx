import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  Input,
  Checkbox,
  Button,
  Typography,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { useAuth } from "../context/AuthContext.jsx";
import fondo from "../assets/fondo.svg";
import { useToast } from "../hooks/useToast";
import Loader from "../common/Loader.jsx";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      return navigate("/main");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    setLoading(true);
    try {
      const { Password, CPassword } = values;
      if (Password !== CPassword) {
        throw new Error("Las contraseñas no coinciden");
      }
      const regex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;

      if (!regex.test(Password)) {
        showToast(
          "error",
          "La contraseña no cumple con los requisitos"
        );
        return;
      }
      delete values.CPassword;
      delete values.Checked;
      await signup(values);
      showToast("success", "Registro completo");
    } catch (error) {
      showToast("error", error.message, "center");
      setLoading(false);
    }
  });

  return (
    <>
      <div className="flex w-full h-full">
        <div className="px-5 w-full my-auto z-10">
          <Card
            className="shadow-lg mx-auto max-w-[400px] px-0 sm:px-5 md:py-2 h-auto"
            color="white"
          >
            <CardHeader
              variant="gradient"
              className="grid h-28 place-items-center bgClinic"
            >
              <Typography variant="h4" color="white">
                SGCD
              </Typography>
            </CardHeader>
            <CardBody>
              <form className="mb-2" onSubmit={onSubmit}>
                <div className="mb-4 flex flex-col gap-4">
                  <Input
                    color="blue"
                    variant="standard"
                    size="lg"
                    label="Correo"
                    type="email"
                    {...register("Correo", { required: true })}
                    containerProps={{ className: "min-w-[72px] mb-5" }}
                    error={errors.Correo ? true : false}
                  />
                  <Input
                    color="blue"
                    size="lg"
                    variant="standard"
                    label="Contraseña"
                    type="password"
                    {...register("Password", { required: true })}
                    containerProps={{ className: "min-w-[72px] mb-5" }}
                    error={errors.Password ? true : false}
                  />
                  <Input
                    color="blue"
                    size="lg"
                    variant="standard"
                    label="Confirmar contraseña"
                    type="password"
                    {...register("CPassword", { required: true })}
                    containerProps={{ className: "min-w-[72px] mb-5" }}
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
                  color="blue"
                  label={
                    <Typography
                      variant="small"
                      color="gray"
                      className={`flex items-center font-normal ${
                        errors.Checked ? "text-red-800" : ""
                      }`}
                    >
                      Acepto los
                      <Link to="/" className="font-bold textClinic">
                        &nbsp;Términos y condiciones
                      </Link>
                    </Typography>
                  }
                  containerProps={{ className: "-ml-2.5" }}
                  {...register("Checked", { required: true })}
                  className={`${errors.Checked ? "border-red-800" : ""}`}
                />
                {loading ? (
                  <Loader top="mt-5" />
                ) : (
                  <Button color="blue" className="mt-6" fullWidth type="submit">
                    Sign Up
                  </Button>
                )}
              </form>
            </CardBody>
            <CardFooter className="flex justify-center mt-auto">
              <div className="text-center text-sm flex justify-center">
                ¿Ya cuentas con una cuenta?
                <Link to="/login">
                  <Typography
                    variant="small"
                    className="ml-1 font-bold textClinic"
                  >
                    Iniciar Sesión
                  </Typography>
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className="absolute w-full h-full">
          <svg className="w-full h-full">
            <image href={fondo} className="md:w-full h-full" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default SignUp;
