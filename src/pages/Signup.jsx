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
import logo from "../assets/principal.jpg";
import { useAlert } from "../context/AlertContext.jsx";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const fullText = "Sistema de Gestion Clinica para Doctores";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuth();
  const { setAlertConfig } = useAlert();

  useEffect(() => {
    if (isAuthenticated) {
      return navigate("/main");
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    setLoading(true);
    try {
      const { Password, CPassword } = values;
      if (Password !== CPassword) {
        throw new Error("Las contraseñas no coinciden");
      }
      delete values.CPassword;
      delete values.Checked;
      await signup(values);
      setAlertConfig({
        msg: "Registro completo",
        type: "success",
      });
    } catch (error) {
      setAlertConfig({
        msg: error.message,
        type: "error",
      });
      setLoading(false);
    }
  });

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100); // Velocidad de escritura (en milisegundos)

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <>
      <div className="flex h-[calc(100vh)]">
        <div className="hidden lg:block lg:w-2/3 h-full px-5 py-5">
          <img
            className="h-full rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"
            src={logo}
            alt="Principal"
          />
          <div className="hidden lg:block absolute top-[42%] left-32 bg-opacity-50 bg-black text-white xl:text-3xl 2xl:text-5xl p-4 rounded">
            {text}
          </div>
        </div>
        <div className="w-full lg:w-1/3 my-auto">
          <Card
            className="mx-auto w-[90%] px-5 py-2 sm:w-3/4"
            color="transparent"
            shadow={false}
          >
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography variant="h4" color="white">
                Sign Up
              </Typography>
            </CardHeader>
            <Typography color="gray" className="mt-1 font-normal">
              Ingresa tus datos para registrarte
            </Typography>
            <form className="mt-4 mb-2" onSubmit={onSubmit}>
              <div className="mb-4 flex flex-col gap-4">
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
                <Input
                  size="lg"
                  label="Confirmar contraseña"
                  type="password"
                  {...register("CPassword", { required: true })}
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
                <Button className="mt-6" color="blue" fullWidth type="submit">
                  Sign Up
                </Button>
              )}
              <Typography
                variant="small"
                color="gray"
                className="mt-4 text-center font-normal flex justify-center"
              >
                ¿Ya cuentas con una cuenta?
                <Typography
                  as="a"
                  href="/login"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Log in
                </Typography>
              </Typography>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SignUp;
