import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Checkbox,
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

      <Card className="w-[90%] mx-[5%] sm:w-96 sm:mx-auto sm:mt-28 md:mt-36">
        <form
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
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Log In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              type="email"
              label="Email"
              size="lg"
              {...register("Correo", { required: true })}
            />
            <Input
              type="password"
              label="Contraseña"
              size="lg"
              {...register("Password", { required: true })}
            />
          </CardBody>
          <CardFooter className="pt-0 mt-3">
            {loading ? (
              <Spinner className="mx-auto" />
            ) : (
              <Button variant="gradient" fullWidth type="submit">
                Log In
              </Button>
            )}
            <Typography variant="small" className="mt-6 flex justify-center">
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
          </CardFooter>
        </form>
      </Card>
    </>
  );
};

export default LogIn;
