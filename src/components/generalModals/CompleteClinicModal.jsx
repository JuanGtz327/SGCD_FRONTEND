import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { GiConfirmed } from "react-icons/gi";
import { useAuth } from "../../context/AuthContext";

export function CompleteClinicModal({ show = false, onConfirm }) {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(show);
  }, [show]);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        size="md"
        dismiss={{ enabled: false }}
      >
        <DialogBody className="grid place-items-center gap-4">
          <GiConfirmed className="text-submarine-500 h-10 w-10" />
          <Typography className="text-submarine-500 text-center" variant="h5">
            Completa tu Clinica
          </Typography>
          <Typography className="text-center font-normal">
            Para poder utilizar la plataforma, debes completar tu clinica.
            Debes indicar el nombre de tu clinica, su direccion y su numero de
            telefono de contacto.
          </Typography>
        </DialogBody>
        <DialogFooter className="flex justify-between md:justify-end md:gap-3">
          <Button
            color="blue"
            onClick={() => {
              onConfirm();
            }}
          >
            Completar mi clinica
          </Button>
          <Button className="bg-cerise-500" onClick={async () => {
              await logout();
            }}>
            Cerrar Sesion
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
