import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Textarea,
  Timeline,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { MdOutlineSick } from "react-icons/md";
import { useEffect, useState } from "react";
import { AiFillClockCircle } from "react-icons/ai";
import Loader from "../../common/Loader";
import { Link, useParams } from "react-router-dom";
import { usePatients } from "../../hooks/usePatients";
import { addHistoriaClinicaActual } from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../hooks/useToast";
import Pagination from "../../common/Pagination";
import { useNavigationC } from "../../hooks/useNavigationC";

const MedicalCondition = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { patientID } = useParams();
  const [idHistorial, setIdHistorial] = useState(null);
  const [open, setOpen] = useState(false);
  const [padecimientos, setPadecimientos] = useState([]);
  const [loadingPadecimiento, setLoadingPadecimiento] = useState(false);
  const { getPaciente, loading } = usePatients(null, patientID);
  const [currentPadecimiento, setCurrentPadecimiento] = useState(null);
  const { next, prev, currentPage, pageCount, infoToDisplay, getItemProps } =
    useNavigationC(padecimientos);

  useEffect(() => {
    (async () => {
      const res = await getPaciente(patientID);
      setIdHistorial(res.HistorialClinico.id);
      const {
        HistorialClinico: { HistoriaClinicaActuals },
      } = res;
      setPadecimientos(HistoriaClinicaActuals);
    })();
  }, [patientID, loadingPadecimiento]);

  const handleOpen = () => setOpen(!open);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = handleSubmit(async (values) => {
    setLoadingPadecimiento(true);
    values.idHistorialClinico = idHistorial;
    const res = await addHistoriaClinicaActual(values, user.token);
    if (res.status !== 200) {
      showToast("error", "Ocurrio un error al añadir el padecimiento");
      return;
    }
    showToast("success", "Padecimiento añadido");
    reset();
    setLoadingPadecimiento(false);
  });

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-1 md:py-10 2xl:py-24 mx-auto flex flex-wrap items-center divide-red-700">
        <div className="w-full lg:w-2/6 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <Timeline>
            {!loading ? (
              <>
                {infoToDisplay.map(
                  (
                    {
                      Motivo_consulta,
                      Fecha_inicio_sintomas,
                      Sintomas,
                      Plan_tratamiento,
                    },
                    key
                  ) => (
                    <TimelineItem className="h-28" key={key}>
                      <TimelineConnector className="!w-[78px]" />
                      <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-indigo-900/5">
                        <TimelineIcon
                          className="p-3 text-indigo-500 bg-indigo-100"
                          variant="ghost"
                        >
                          <MdOutlineSick className="h-5 w-5" />
                        </TimelineIcon>
                        <div className="w-full flex flex-col gap-1">
                          <Typography variant="h6" color="blue-gray">
                            {Motivo_consulta}
                          </Typography>
                          <Typography
                            variant="small"
                            color="gray"
                            className="font-normal"
                          >
                            <div className="2xl:flex justify-between gap-3 md:gap-0">
                              <p>Fecha Sintomas {Fecha_inicio_sintomas}</p>
                              <div>
                                <p
                                  className="text-indigo-500 inline-flex items-center hover:cursor-pointer"
                                  onClick={() => {
                                    setCurrentPadecimiento({
                                      Motivo_consulta,
                                      Fecha_inicio_sintomas,
                                      Sintomas,
                                      Plan_tratamiento,
                                    });
                                    handleOpen();
                                  }}
                                >
                                  Detalles
                                  <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="w-4 h-4 ml-1"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                  </svg>
                                </p>
                              </div>
                            </div>
                          </Typography>
                        </div>
                      </TimelineHeader>
                    </TimelineItem>
                  )
                )}
              </>
            ) : (
              <Loader top="mt-auto" />
            )}
          </Timeline>
          <Pagination
            prev={prev}
            currentPage={currentPage}
            pageCount={pageCount}
            next={next}
            getItemProps={getItemProps}
          />
        </div>
        <div className="lg:w-3/5 md:w-1/2 shadow-lg rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-2xl font-bold">
            Nuevo Padecimiento
          </h2>
          <form onSubmit={onSubmit}>
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 lg:grid-cols-12">
              <div className="md:col-span-6 2xl:col-span-8">
                <div className="mt-2">
                  <Input
                    size="lg"
                    label="Motivo de la consulta"
                    type="text"
                    variant="standard"
                    {...register("Motivo_consulta", { required: true })}
                    error={errors.Motivo_consulta ? true : false}
                  />
                </div>
              </div>
              <div className="md:col-span-6 2xl:col-span-4">
                <div className="mt-2">
                  <Input
                    size="lg"
                    label="Fecha inicio de sintomas"
                    type="date"
                    variant="standard"
                    {...register("Fecha_inicio_sintomas", { required: true })}
                    error={errors.Fecha_inicio_sintomas ? true : false}
                  />
                </div>
              </div>
              <div className="lg:col-span-full">
                <div className="mt-2">
                  <Textarea
                    variant="standard"
                    label="Sintomas"
                    {...register("Sintomas", { required: true })}
                    rows={8}
                    error={errors.Sintomas ? true : false}
                  />
                </div>
              </div>
              <div className="lg:col-span-full">
                <div className="mt-2">
                  <Textarea
                    variant="standard"
                    label="Plan de tratamiento"
                    rows={8}
                    {...register("Plan_tratamiento", { required: true })}
                    error={errors.Plan_tratamiento ? true : false}
                  />
                </div>
              </div>
              <div className="lg:col-span-6">
                <div className="flex gap-5">
                  <Link
                    to={`${
                      import.meta.env.VITE_FRONTEND_URL ||
                      "http://localhost:5173/"
                    }patient/${patientID}`}
                  >
                    <Button className="w-fit bg-cerise-500" color="blue">
                      Cancelar
                    </Button>
                  </Link>
                  {!loadingPadecimiento ? (
                    <Button
                      type="submit"
                      className="w-full md:w-fit "
                      color="blue"
                    >
                      Añadir
                    </Button>
                  ) : (
                    <Loader top="mt-0" size="w-12 h-12" />
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Dialog open={open} handler={handleOpen} dismiss={{ enabled: false }}>
        <DialogHeader>
          <div className="flex justify-between w-full items-center">
            <p> {currentPadecimiento?.Motivo_consulta} </p>
            <div>
              <p className="text-lg flex items-center gap-2">
                <AiFillClockCircle /> Fecha Sintomas{" "}
                {currentPadecimiento?.Fecha_inicio_sintomas}
              </p>
            </div>
          </div>
        </DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-5">
            <p>Sintomas: {currentPadecimiento?.Sintomas}</p>
            <hr />
            <div>
              <p>Plan Tratamiento: {currentPadecimiento?.Plan_tratamiento}</p>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            onClick={() => {
              setCurrentPadecimiento({});
              handleOpen();
            }}
            className="mr-1 bg-cerise-500 border-0"
          >
            <span>Volver</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </section>
  );
};

export default MedicalCondition;
