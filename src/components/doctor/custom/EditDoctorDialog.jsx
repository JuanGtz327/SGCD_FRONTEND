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
import { editDoctorRequest } from "../../../api/api";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../hooks/useToast";

const EditDoctorDialog = ({
  openEdit,
  setOpenEdit,
  editingDoctor,
  setEditingDoctor,
  setLoading,
}) => {
  const { user } = useAuth();
  const handleOpenEdit = () => setOpenEdit(!openEdit);
  const [editingEmail, setEditingEmail] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { showToast } = useToast();

  const onEditSubmit = handleSubmit(async (values) => {
    try {
      if (values.Password === "") {
        delete values.Password;
      }
      if (editingEmail === false) {
        delete values.Correo;
      }
      const res = await editDoctorRequest(editingDoctor.id, values, user.token);
      if (res.status == 200) {
        setOpenEdit(false);
        setLoading(true);
        showToast("success", "Doctor actualizado");
        setEditingEmail(false);
      } else {
        showToast("error", "No se pudo actualizar", "center");
      }
    } catch (error) {
      showToast("error", error.response.data.message, "center");
    }
    setOpenEdit(false);
  });

  const handleInputChange = (event) => {
    if (event.target.name === "Correo") {
      setEditingEmail(true);
      setEditingDoctor({
        ...editingDoctor,
        User: { ...editingDoctor.User, Correo: event.target.value },
      });
    } else {
      setEditingDoctor({
        ...editingDoctor,
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
    >
      <DialogHeader>Doctor: {editingDoctor.Nombre}</DialogHeader>
      <form onSubmit={onEditSubmit}>
        <DialogBody>
          <Typography color="blue-gray">
            Ingrese las nuevas credenciales del doctor.
          </Typography>
          <div className="mt-6 flex flex-col gap-6">
            <Input
              size="lg"
              label="Correo"
              variant="standard"
              color="blue"
              type="text"
              {...register("Correo", { required: true })}
              error={errors.Correo ? true : false}
              value={editingDoctor.User?.Correo}
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
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            onClick={() => {
              setOpenEdit(false);
              setEditingDoctor({});
              setEditingEmail(false);
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

export default EditDoctorDialog;
