import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";

const NotaDialog = ({ open, handleOpen, onNewNota }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const newNote = handleSubmit((values) => {
    onNewNota(values.Nota);
  });

  return (
    <>
      <Dialog open={open} handler={handleOpen} size="sm" dismiss={{enabled:false}}>
        <div className="flex items-center justify-between">
          <DialogHeader>Nueva Nota</DialogHeader>
        </div>
        <DialogBody>
          <Textarea
          color="blue"
            variant="standard"
            label="Esciba algo..."
            {...register("Nota", { required: true })}
            error={errors.Nota ? true : false}
          />
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button className="bg-cerise-500" onClick={handleOpen}>
            Cancelar
          </Button>
          <Button color="blue" onClick={newNote}>
            Agregar Nota
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default NotaDialog;
