import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Input,
  Button,
  Typography,
  Alert,
  Spinner,
} from "@material-tailwind/react";
import { AiFillCheckCircle } from "react-icons/ai";
import { BiSolidErrorAlt } from "react-icons/bi";
import { loginRequest } from "../api/api";

const LogIn = () => {
  const [open, setOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({});
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  return (
    <>
      <Alert
        icon={
          alertConfig.type === "success" ? (
            <AiFillCheckCircle />
          ) : (
            <BiSolidErrorAlt />
          )
        }
        className={`fixed top-10 w-3/4 sm:left-3/4 sm:w-1/5 z-50 ${
          alertConfig.type === "success" ? "bg-green-500" : "bg-red-500"
        }`}
        open={open}
        onClose={() => setOpen(false)}
      >
        <>{alertConfig.children}</>
      </Alert>
      <Card
        shadow={true}
        className="mt-16 mx-3 w-fit px-5 py-2 lg:w-1/5 lg:mt-52 xs:mx-auto"
      >
        <Typography variant="h4" color="blue-gray">
          Log In
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Ingresa tus credenciales
        </Typography>
        <form
          className="mt-4 mb-2 w-100 max-w-screen-lg"
          onSubmit={handleSubmit(async (values) => {
            setLoading(true);
            try {
              const res = await loginRequest(values);
              if (res.status === 200) {
                setAlertConfig({
                  children: "Inicio de sesion exitoso",
                  type: "success",
                });
                setOpen(true);
                setTimeout(() => {
                  setOpen(false);
                  navigate("/main");
                }, 1000);
              }
            } catch (error) {
              setAlertConfig({
                children: error.response.data.message,
                type: "error",
              });
              setOpen(true);
              setTimeout(() => {
                setOpen(false);
              }, 3000);
              setLoading(false);
            }
          })}
        >
          <div className="mb-4 flex flex-col gap-4">
            <Input
              type="email"
              size="lg"
              label="Correo"
              {...register("Correo", { required: true })}
            />
            <Input
              type="password"
              size="lg"
              label="Contraseña"
              {...register("Password", { required: true })}
            />
          </div>
          {loading ? (
            <Spinner className="mx-auto" />
          ) : (
            <Button className="mt-6" fullWidth type="submit">
              Inciar Sesion
            </Button>
          )}
          <Typography color="gray" className="mt-4 text-center font-normal">
            ¿No tienes una cuenta?{" "}
            <a href="/signup" className="font-medium text-cyan-800">
              Sign Up
            </a>
          </Typography>
        </form>
      </Card>
    </>
  );
};

export default LogIn;
