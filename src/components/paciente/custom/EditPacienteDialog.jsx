import { useState } from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
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
    formState: { errors },
    reset,
  } = useForm();

  const onEditSubmit = handleSubmit(async (values) => {
    try {
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
    setLoading(true);
  });

  const handleInputChange = (event) => {
    if (event.target.name === "Correo") {
      setEditingEmail(true);
      setEditingPatient({
        ...editingPatient,
        User: { ...editingPatient.User, Correo: event.target.value },
      });
    } else {
      setEditingPatient({
        ...editingPatient,
        [event.target.name]: event.target.value,
      });
    }
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
      dismiss={{
        enabled: false,
      }}
    >
      <DialogHeader>Paciente: {editingPatient.Nombre}</DialogHeader>
      <form onSubmit={onEditSubmit}>
        <DialogBody>
          <Typography color="blue-gray">
            Ingrese las nuevas credenciales del paciente.
          </Typography>
          <div className="mt-6 flex flex-col gap-6">
            <Input
              size="lg"
              label="Correo"
              variant="standard"
              color="blue"
              type="email"
              {...register("Correo", { required: true })}
              error={errors.Correo ? true : false}
              value={editingPatient.User?.Correo}
              onChange={handleInputChange}
            />
            <Input
              size="lg"
              label="Contraseña"
              variant="standard"
              color="blue"
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
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            onClick={() => {
              setOpenEdit(false);
              setEditingPatient({});
              reset();
            }}
            className="mr-1 bg-cerise-500"
          >
            <span>Cancelar</span>
          </Button>
          <Button color="blue" type="sumbit">
            <span>Confirmar</span>
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
};

export default EditPacienteDialog;
