import {
  Button,
  Drawer,
  IconButton,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect } from "react";
import { addNotaRequest, getNotasRequest } from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../common/Loader";
import { useToast } from "../../hooks/useToast";

const NotasPaciente = ({ openRight, setOpenRight, patientID }) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [notes, setNotes] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [Nota, setNota] = React.useState("");

  useEffect(() => {
    (async () => {
      const res = await getNotasRequest(patientID, user.token);
      setNotes(res.data);
      setLoading(false);
    })();
  }, [patientID,loading]);

  const closeDrawerRight = () => setOpenRight(false);

  return (
    <React.Fragment>
      <Drawer
        placement="right"
        open={openRight}
        onClose={closeDrawerRight}
        className="p-4"
        dismiss={{ enabled: false }}
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h3" color="blue-gray">
            Notas
          </Typography>
          <IconButton
            variant="text"
            className="bg-cerise-500 text-white"
            onClick={closeDrawerRight}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <Typography color="gray" className="mb-8 pr-4 font-normal">
          {!loading ? (
            notes.length > 0 ? (
              notes.map((note) => (
                <div className="mb-4" key={note.id}>
                  <Typography color="gray" className="mb-2 font-normal">
                    {note.Nota}
                  </Typography>
                  <Typography
                    color="gray"
                    className="mb-2 font-normal text-xs text-right"
                  >
                    {note.DocPac.Doctor.Genero == "M" ? "Dr." : "Dra"}{" "}
                    {note.DocPac.Doctor.Nombre} {note.DocPac.Doctor.ApellidoP}
                  </Typography>
                  <hr />
                </div>
              ))
            ) : (
              <Typography color="gray" className="mb-2 font-normal">
                No hay notas para este paciente
              </Typography>
            )
          ) : (
            <Loader />
          )}
        </Typography>
        <div className="">
          <Textarea
            color="blue"
            size="regular"
            variant="standard"
            outline={true}
            placeholder="Escribe una nota"
            value={Nota}
            onChange={(e) => setNota(e.target.value)}
          />
          <Button
            color="blue"
            className="w-full mt-5"
            onClick={async () => {
              try {
                await addNotaRequest(
                  { idPaciente: patientID, Nota },
                  user.token
                );
                setNota("");
                showToast("success", "Nota agregada correctamente");
                setLoading(true);
              } catch (error) {
                showToast("error", error.response.data.message);
                console.log(error);
              }
            }}
          >
            Añadir nota
          </Button>
        </div>
      </Drawer>
    </React.Fragment>
  );
};

export default NotasPaciente;
