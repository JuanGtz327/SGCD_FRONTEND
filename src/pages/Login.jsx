import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  Input,
  Button,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import AlertCustom from "../common/AlertCustom.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import logo from "../assets/principal.jpg";

const LogIn = () => {
  const [alertConfig, setAlertConfig] = useState({});
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const fullText = "Sistema de Gestion Clinica para Doctores";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      return navigate("/main");
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    setLoading(true);
    try {
      await signin(values);
      setAlertConfig({
        msg: "Inicio de sesion exitoso",
        type: "success",
        isopen: true,
      });
      navigate("/main");
    } catch (error) {
      setAlertConfig({
        msg: error.message,
        type: "error",
        isopen: true,
      });
    }
    setLoading(false);
  });

  useEffect(() => {
    setAlertConfig({ ...alertConfig, isopen: false });
  }, [loading]);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <>
      <AlertCustom
        msg={alertConfig.msg}
        type={alertConfig.type}
        isopen={alertConfig.isopen}
      />

      <div className="flex h-[calc(100vh)]">
        <div className="hidden lg:block w-2/3 h-full px-5 py-5">
          <img
            className="h-full rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"
            src={logo}
            alt="Principal"
          />
          <div className="hidden lg:block absolute top-[42%] left-32 bg-opacity-50 bg-black text-white md:text-3xl 2xl:text-5xl p-4 rounded">
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
                Log In
              </Typography>
            </CardHeader>
            <Typography color="gray" className="mt-1 font-normal">
              Ingresa tus credenciales para acceder
            </Typography>
            <form onSubmit={onSubmit} className="mt-4 mb-2">
              <div className="mb-4 flex flex-col gap-4">
                <Input
                  type="email"
                  label="Email"
                  size="lg"
                  containerProps={{ className: "min-w-[72px]" }}
                  {...register("Correo", { required: true })}
                  error={errors.Correo ? true : false}
                />
                <Input
                  type="password"
                  label="Contraseña"
                  size="lg"
                  containerProps={{ className: "min-w-[72px]" }}
                  {...register("Password", { required: true })}
                  error={errors.Password ? true : false}
                />
              </div>
              {loading ? (
                <Spinner className="mx-auto" />
              ) : (
                <Button color="blue" fullWidth type="submit" className="mt-5">
                  Log In
                </Button>
              )}
              <Typography variant="small" className="mt-4 flex justify-center">
                ¿No tienes una cuenta?
                <Typography
                  as="a"
                  href="/signup"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign up
                </Typography>
              </Typography>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default LogIn;
