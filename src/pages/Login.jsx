import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  Input,
  Button,
  Typography,
  CardBody,
  CardFooter,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../hooks/useToast.js";
import fondo from "../assets/fondo.svg";
import Loader from "../common/Loader.jsx";
import { forgotPasswordRequest } from "../api/api.js";

const LogIn = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm();
  const { signin, isAuthenticated } = useAuth();
  const [modalPassword, setModalPassword] = useState(false);
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

  const onMissingPasswordSubmit = handleSubmit(async (values) => {
    try {
      await forgotPasswordRequest(values);
      showToast("success", "Verifique su correo electrónico");
    } catch (error) {
      showToast("error", error.message, "center");
    }
    setModalPassword(false);
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
                    label="Correo electrónico"
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
                    Ingresar
                  </Button>
                )}
              </form>
            </CardBody>
            <CardFooter className="flex flex-col justify-center mt-auto">
              <Typography
                variant="small"
                onClick={() => setModalPassword(true)}
                className="mx-auto mb-2 textClinic font-bold hover:text-azure-900 hover:underline cursor-pointer"
              >
                No recuerdo mi contraseña
              </Typography>
              <div className="text-sm text-gray-500 flex justify-center">
                <Typography
                  variant="small"
                  className="ml-1 font-bold textClinic"
                >
                  Sistema de Gestión de Clínica para Doctores
                </Typography>
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className="absolute w-full h-full">
          <svg className="w-full h-full">
            <image href={fondo} className="2xl:w-full 2xl:h-full" />
          </svg>
        </div>
      </div>
      <Dialog
        open={modalPassword}
        size="md"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Restablecer contraseña</DialogHeader>

        <form onSubmit={onMissingPasswordSubmit}>
          <DialogBody>
            <Typography color="blue-gray">
              Ingrese su correo electrónico y recibirá las
              instrucciones para restablecer su contraseña.
            </Typography>
            <div className="mt-6 flex flex-col gap-6">
              <Input
                size="lg"
                label="Correo electrónico"
                variant="standard"
                color="blue"
                type="text"
                {...register2("CorreoR", { required: true })}
                error={errors2.CorreoR ? true : false}
              />
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              onClick={() => {
                setModalPassword(false);
              }}
              className="mr-1 bg-cerise-500"
            >
              <span>Cancelar</span>
            </Button>
            <Button
              color="blue"
              type="sumbit"
              onClick={handleSubmit2(async (values) => {
                try {
                  await forgotPasswordRequest({ Correo: values.CorreoR });
                  showToast("success", "Verifique su correo electrónico");
                } catch (error) {
                  showToast("error", error.message, "center");
                }
                setModalPassword(false);
              })}
            >
              <span>Enviar correo</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
};

export default LogIn;
