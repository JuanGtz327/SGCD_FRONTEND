import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { loginRequest } from "../api/api";
import AlertCustom from "../common/AlertCustom.jsx";

const LogIn = () => {
  const [alertConfig, setAlertConfig] = useState({});
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    setLoading(true);
    try {
      await loginRequest(values);
      setAlertConfig({
        msg: "Inicio de sesion exitoso",
        type: "success",
        isopen: true,
      });
      navigate("/main");
    } catch (error) {
      setAlertConfig({
        msg: error.response.data.message,
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

      <Card className="w-[90%] mx-[5%] sm:w-96 sm:mx-auto sm:mt-28 md:mt-36">
        <form onSubmit={onSubmit}>
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
              error={errors.Correo ? true : false}
            />
            <Input
              type="password"
              label="Contraseña"
              size="lg"
              {...register("Password", { required: true })}
              error={errors.Password ? true : false}
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
