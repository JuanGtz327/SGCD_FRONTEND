import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  Input,
  Button,
  Typography,
  Spinner,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { useAuth } from "../context/AuthContext.jsx";
import fondo from "../assets/fondo.svg";
import { useAlert } from "../context/AlertContext.jsx";

const LogIn = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, isAuthenticated } = useAuth();
  const { setAlertConfig } = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      return navigate("/main");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    setLoading(true);
    try {
      await signin(values);
      setAlertConfig({
        msg: "Inicio de sesion exitoso",
        type: "success",
      });
      navigate("/main");
    } catch (error) {
      setAlertConfig({
        msg: error.message,
        type: "error",
      });
    }
    setLoading(false);
  });

  return (
    <>
      <div className="flex w-full h-full">
        <div className="px-5 w-full my-auto z-10">
          <Card
            className="shadow-lg mx-auto max-w-md px-0 sm:px-5 py-2 h-[550px]"
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
            <CardBody className="mt-auto">
              <Typography color="gray" className="font-normal">
                Ingresa tus credenciales
              </Typography>
              <form onSubmit={onSubmit} className="mt-4 mb-2">
                <div className="flex flex-col gap-4">
                  <Input
                    type="email"
                    label="Email"
                    size="lg"
                    variant="standard"
                    containerProps={{ className: "min-w-[72px] mb-5" }}
                    {...register("Correo", { required: true })}
                    error={errors.Correo ? true : false}
                  />
                  <Input
                    type="password"
                    label="Contraseña"
                    size="lg"
                    variant="standard"
                    containerProps={{ className: "min-w-[72px] mb-5" }}
                    {...register("Password", { required: true })}
                    error={errors.Password ? true : false}
                  />
                </div>
                {loading ? (
                  <Spinner className="mx-auto" />
                ) : (
                  <Button fullWidth type="submit" className="mt-5" color="blue">
                    Log In
                  </Button>
                )}
              </form>
            </CardBody>
            <CardFooter className="flex justify-center mt-auto">
              <hr className="h-px my-0 bg-gray-300 border-0" />
              <Typography variant="small" className="flex justify-center">
                ¿No tienes una cuenta?
                <Link to="/signup">
                  <Typography
                    variant="small"
                    className="ml-1 font-bold textClinic"
                  >
                    Sign up
                  </Typography>
                </Link>
              </Typography>
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

export default LogIn;
