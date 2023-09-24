import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
  Textarea,
  Spinner,
} from "@material-tailwind/react";
import { createPatientRequest } from "../../api/api";
import { useAuth } from "../../context/AuthContext.jsx";
import AlertCustom from "../../common/AlertCustom.jsx";
import { useNavigate } from "react-router-dom";

const AddPatient = () => {
  const [alertConfig, setAlertConfig] = useState({});
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    setLoading(true);
    try {
      await createPatientRequest(values, user.token);
      setAlertConfig({
        msg: "Registro completo",
        type: "success",
        isopen: true,
      });
      navigate("/listPatients");
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
      <Card shadow={false} className="w-96 px-5 py-5 mx-auto mt-[5%]">
        <Typography variant="h4" color="blue-gray">
          Nuevo paciente
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Ingrese los datos de su paciente
        </Typography>
        <form className="mt-4 mb-2 w-[100%]" onSubmit={onSubmit}>
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Nombre"
              type="text"
              {...register("Nombre", { required: true })}
              error={errors.Nombre ? true : false}
            />
            <div className="flex items-center gap-4">
              <Input
                label="Apellido Paterno"
                maxLength={15}
                containerProps={{ className: "min-w-[72px]" }}
                type="text"
                {...register("ApellidoP", { required: true })}
                error={errors.ApellidoP ? true : false}
              />
              <Input
                label="Apellido Materno"
                maxLength={15}
                containerProps={{ className: "min-w-[72px]" }}
                type="text"
                {...register("ApellidoM", { required: true })}
                error={errors.ApellidoM ? true : false}
              />
            </div>
            <div className="flex items-center gap-4">
              <Input
                label="Edad"
                maxLength={20}
                containerProps={{ className: "min-w-[72px]" }}
                type="number"
                {...register("Edad", { required: true })}
                error={errors.Edad ? true : false}
              />
              <Controller
                name="Genero"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Genero"
                    containerProps={{ className: "min-w-[72px]" }}
                    error={errors.Genero ? true : false}
                  >
                    <Option value="M">Masculino</Option>
                    <Option value="F">Femenino</Option>
                  </Select>
                )}
              />
            </div>
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
            <Textarea
              variant="standard"
              label="Domicilio"
              {...register("Domicilio", { required: true })}
              error={errors.Domicilio ? true : false}
            />
          </div>
          {loading ? (
            <Spinner className="mx-auto" />
          ) : (
            <Button color="blue" className="mt-6" fullWidth type="submit">
              Añadir paciente
            </Button>
          )}
        </form>
      </Card>
    </>
  );
};

export default AddPatient;
