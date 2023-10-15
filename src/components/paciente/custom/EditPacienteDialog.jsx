import { useState } from "react";
import {
  Card,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
import { Controller, useForm } from "react-hook-form";
import { editPatientRequest } from "../../../api/api";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../hooks/useToast";

const EditPacienteDialog = ({
  openEdit,
  setOpenEdit,
  editingPatient,
  setEditingPatient,
  setLoading,
}) => {
  const { user } = useAuth();
  const handleOpenEdit = () => setOpenEdit(!openEdit);
  const { showToast } = useToast();
  const [editingEmail, setEditingEmail] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onEditSubmit = handleSubmit(async (values) => {
    setLoading(true);
    try {
      if (values.Genero === undefined) {
        delete values.Genero;
      }
      if (values.Password === "") {
        delete values.Password;
      }
      if (editingEmail === false) {
        delete values.Correo;
      }
      const res = await editPatientRequest(
        editingPatient.id,
        values,
        user.token
      );
      if (res.status == 200) {
        showToast("success", "Paciente actualizado");
      } else {
        showToast("error", "No se pudo actualizar", "center");
      }
    } catch (error) {
      showToast("error", error.response.data.message, "center");
    }
    setEditingEmail(false);
    setOpenEdit(false);
    setLoading(false);
  });

  const handleInputChange = (event) => {
    if (event.target.name === "Correo") setEditingEmail(true);
    setEditingPatient({
      ...editingPatient,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Dialog
      open={openEdit}
      handler={handleOpenEdit}
      size="xs"
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogHeader>Paciente: {editingPatient.Nombre}</DialogHeader>
      <form className="mt-4 mb-2 w-[100%]" onSubmit={onEditSubmit}>
        <DialogBody divider>
          <Card shadow={false} className="w-96 px-5 py-5 mx-auto">
            <Typography variant="h4" color="blue-gray">
              Editar paciente {editingPatient.User?.Correo}
            </Typography>
            <div className="mt-4 mb-4 flex flex-col gap-6">
              <Input
                size="lg"
                label="Nombre"
                type="text"
                {...register("Nombre", { required: true })}
                error={errors.Nombre ? true : false}
                value={editingPatient.Nombre}
                onChange={handleInputChange}
              />
              <div className="flex items-center gap-4">
                <Input
                  label="Apellido Paterno"
                  maxLength={15}
                  containerProps={{ className: "min-w-[72px]" }}
                  type="text"
                  {...register("ApellidoP", { required: true })}
                  error={errors.ApellidoP ? true : false}
                  value={editingPatient.ApellidoP}
                  onChange={handleInputChange}
                />
                <Input
                  label="Apellido Materno"
                  maxLength={15}
                  containerProps={{ className: "min-w-[72px]" }}
                  type="text"
                  {...register("ApellidoM", { required: true })}
                  error={errors.ApellidoM ? true : false}
                  value={editingPatient.ApellidoM}
                  onChange={handleInputChange}
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
                  value={editingPatient.Edad}
                  onChange={handleInputChange}
                />
                <Controller
                  name="Genero"
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
                value={editingPatient.Correo}
                onChange={handleInputChange}
              />
              <Input
                size="lg"
                label="Contraseña"
                type="password"
                {...register("Password")}
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
                value={editingPatient.Domicilio}
                onChange={handleInputChange}
              />
            </div>
          </Card>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => {
              setOpenEdit(false);
              setEditingPatient({});
            }}
            className="mr-1"
          >
            <span>Cancelar</span>
          </Button>
          <Button variant="gradient" color="blue" type="sumbit">
            <span>Confirmar</span>
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
};

export default EditPacienteDialog;
