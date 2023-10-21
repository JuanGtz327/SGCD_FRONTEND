import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { PiWarningFill } from "react-icons/pi";

export function DeleteModal({
  show = false,
  tittle = "¿Seguro que desea continuar?",
  message = "Esto eliminara completamente esta informacion.",
  onDelete,
  onCancel,
}) {
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
        size="sm"
        dismiss={{ enabled: false }}
      >
        <DialogBody className="grid place-items-center gap-4">
          <PiWarningFill className="text-cerise-500 h-10 w-10" />
          <Typography className="text-cerise-500" variant="h5">
            {tittle}
          </Typography>
          <Typography className="text-center font-normal">{message}</Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            className="bg-cerise-500 text-white"
            onClick={() => {
              onCancel();
              handleOpen();
            }}
          >
            Cancel
          </Button>
          <Button
            color="blue"
            onClick={() => {
              onDelete();
              handleOpen();
            }}
          >
            Confirmar
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
