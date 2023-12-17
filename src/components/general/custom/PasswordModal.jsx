import { useEffect, useState } from "react";
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
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../hooks/useToast";
import { editPasswordRequest } from "../../../api/api";

export default function PasswordModal({ show, setShow }) {
  const { user } = useAuth();
  const [openEdit, setOpenEdit] = useState(show);
  const handleOpenEdit = () => {
    setOpenEdit(!openEdit);
    setShow(false);
  };
  const { showToast } = useToast();

  useEffect(() => {
    setOpenEdit(show);
  }, [show]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = handleSubmit(async (values) => {
    values.id = user.id
    try {
      await editPasswordRequest(values,user.token)
      showToast("success", "Contraseña actualizada");
      handleOpenEdit();
    } catch (error) {
      showToast("error", error.response.data.message, "center");
    }
  });

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
      onClose={handleOpenEdit}
    >
      <DialogHeader>Actualizar contraseña</DialogHeader>
      <form onSubmit={onSubmit}>
        <DialogBody>
          <div className="flex flex-col gap-6 px-5">
            <Input
              color="blue"
              variant="standard"
              size="lg"
              label="Contraseña anterior"
              type="password"
              {...register("LPassword", { required: true })}
              error={errors.LPassword ? true : false}
            />
            <Input
              color="blue"
              variant="standard"
              size="lg"
              label="Nueva contraseña"
              type="password"
              {...register("Password", { required: true })}
              error={errors.Password ? true : false}
            />
            <Input
              color="blue"
              variant="standard"
              size="lg"
              label="Repetir contraseña"
              type="password"
              {...register("CPassword", { required: true })}
              error={errors.CPassword ? true : false}
            />
            <Typography variant="small" color="blue" className="flex">
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
              Usa al menos 8 caracteres, una mayúscula y un número.
            </Typography>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            onClick={() => {
              handleOpenEdit();
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
}
