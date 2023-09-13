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

const LogIn = () => {
  const [alertConfig, setAlertConfig] = useState({});
  const [loading, setLoading] = useState(false);
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

  return (
    <>
      <AlertCustom
        msg={alertConfig.msg}
        type={alertConfig.type}
        isopen={alertConfig.isopen}
      />

      <Card className="w-[90%] mx-[5%] mt-16 px-5 py-2 sm:w-[24rem] sm:mx-auto sm:mt-28 md:mt-24 lg:mt-28">
        <CardHeader
          variant="gradient"
          color="gray"
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
              {...register("Correo", { required: true })}
              error={errors.Correo ? true : false}
            />
            <Input
              type="password"
              label="Contraseña"
              size="lg"
              {...register("Password", { required: true })}
              error={errors.Password ? true : false}
            />
          </div>
          {loading ? (
            <Spinner className="mx-auto" />
          ) : (
            <Button variant="gradient" fullWidth type="submit" className="mt-5">
              Log In
            </Button>
          )}
          <Typography variant="small" className="mt-4 flex justify-center">
            ¿No tienes una cuenta?
            <Typography
              as="a"
              href="/signup"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              Sign up
            </Typography>
          </Typography>
        </form>
      </Card>
    </>
  );
};

export default LogIn;
