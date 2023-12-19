import {
  Typography,
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import NotaDialog from "../custom/NotaDialog";
import { useToast } from "../../../hooks/useToast";

const NotasHistorial = ({onNotas}) => {
  const [notas, setNotas] = useState([]);
  const { showToast } = useToast();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const onNewNota = (nota) => {
    setNotas([...notas, {Nota: nota}]);
    showToast("success", "Nota agregada");
    setOpen(false);
    onNotas({Nota:nota},true);
  };

  const onDeleteNota = (index) => {
    setNotas(notas.filter((_,i)=>i!==index));
    showToast("error", "Nota eliminada", "center");
    onNotas(index,false);
  };

  return (
    <>
      <h2 className="text-base font-semibold leading-7 text-gray-900">Notas</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Aquí puede añadir notas al expediente clínico. (Opcional)
      </p>
      <div className="mt-5 w-full">
        <Button
          color="blue"
          className="mb-5"
          onClick={handleOpen}
        >
          Agregar Nota
        </Button>
        <div className="w-[38rem]">
          <Timeline>
            {notas.map(({Nota}, i) => (
              <TimelineItem key={i}>
                <TimelineConnector />
                <TimelineHeader className="h-3">
                  <TimelineIcon />
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="leading-none"
                  >
                    Nota
                  </Typography>
                  <Button variant="text" color="red" onClick={()=>onDeleteNota(i)}>Eliminar</Button>
                </TimelineHeader>
                <TimelineBody className="pb-8">
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal text-gray-600"
                  >
                    {Nota}
                  </Typography>
                </TimelineBody>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      </div>
      <NotaDialog open={open} handleOpen={handleOpen} onNewNota={onNewNota} />
    </>
  );
};

export default NotasHistorial;
