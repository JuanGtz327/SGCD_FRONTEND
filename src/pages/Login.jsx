import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  Input,
  Button,
  Typography,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../hooks/useToast.js";
import fondo from "../assets/fondo.svg";
import Loader from "../common/Loader.jsx";

const LogIn = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      return navigate("/main");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    setLoading(true);
    try {
      await signin(values);
      showToast("success", "Inicio de sesión exitoso");
      navigate("/main");
    } catch (error) {
      showToast("error", error.message, "center");
    }
    setLoading(false);
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
              <form onSubmit={onSubmit} className="mb-2">
                <div className="flex flex-col gap-8">
                  <Input
                    color="blue"
                    type="email"
                    label="Email"
                    size="lg"
                    variant="standard"
                    containerProps={{ className: "min-w-[72px] mb-5" }}
                    {...register("Correo", { required: true })}
                    error={errors.Correo ? true : false}
                  />
                  <Input
                    color="blue"
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
                  <Loader top="mt-5" />
                ) : (
                  <Button fullWidth type="submit" className="mt-5" color="blue">
                    Log In
                  </Button>
                )}
              </form>
            </CardBody>
            <CardFooter className="flex justify-center mt-auto">
              <hr className="h-px my-0 bg-gray-300 border-0" />
              <div className="text-sm text-gray-500 flex justify-center">
                ¿No tienes una cuenta?
                <Link to="/signup">
                  <Typography
                    variant="small"
                    className="ml-1 font-bold textClinic"
                  >
                    Crear cuenta
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

export default LogIn;
