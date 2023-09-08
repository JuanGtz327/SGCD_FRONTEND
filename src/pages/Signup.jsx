import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Alert,
  Spinner,
} from "@material-tailwind/react";
import { AiFillCheckCircle } from "react-icons/ai";
import { BiSolidErrorAlt } from "react-icons/bi";
import { signupRequest } from "../api/api";

const SignUp = () => {
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
        className="mt-16 mx-3 w-fit px-5 py-2 lg:w-50 lg:mt-52 sm:mx-auto"
      >
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Ingresa tus datos para registrarte
        </Typography>
        <form
          className="mt-4 mb-2 w-100 max-w-screen-lg"
          onSubmit={handleSubmit(async (values) => {
            setLoading(true);
            try {
              const res = await signupRequest(values);
              if (res.status === 200) {
                setAlertConfig({
                  children: "Registro exitoso",
                  type: "success",
                });
                setOpen(true);
                setTimeout(() => {
                  setOpen(false);
                  navigate("/login");
                }, 500);
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
              size="lg"
              label="Nombre"
              type="text"
              {...register("Nombre", { required: true })}
            />
            <div className="flex items-center gap-4">
              <Input
                label="Apellido Paterno"
                maxLength={15}
                containerProps={{ className: "min-w-[72px]" }}
                type="text"
                {...register("ApellidoP", { required: true })}
              />
              <Input
                label="Apellido Materno"
                maxLength={15}
                containerProps={{ className: "min-w-[72px]" }}
                type="text"
                {...register("ApellidoM", { required: true })}
              />
            </div>
            <div className="flex items-center gap-4">
              <Input
                label="Especialidad"
                maxLength={20}
                containerProps={{ className: "min-w-[72px]" }}
                type="text"
                {...register("Especialidad", { required: true })}
              />
              <Input
                label="Consultorio"
                maxLength={4}
                containerProps={{ className: "min-w-[72px]" }}
                type="number"
                {...register("Consultorio", { required: true })}
              />
            </div>
            <Input
              size="lg"
              label="Correo"
              type="email"
              {...register("Correo", { required: true })}
            />
            <Input
              size="lg"
              label="Contraseña"
              type="password"
              {...register("Password", { required: true })}
            />
          </div>

          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
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
          />
          {loading ? (
            <Spinner className="mx-auto" />
          ) : (
            <Button className="mt-6" fullWidth type="submit">
              Registrarme
            </Button>
          )}
          <Typography color="gray" className="mt-4 text-center font-normal">
            ¿Ya cuentas con una cuenta?{" "}
            <a href="/login" className="font-medium text-cyan-700">
              Log in
            </a>
          </Typography>
        </form>
      </Card>
    </>
  );
};

export default SignUp;
