import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Textarea,
  Timeline,
  TimelineBody,
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
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePatients } from "../../hooks/usePatients";
import { addHistoriaClinicaActual } from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../hooks/useToast";
import Pagination from "../../common/Pagination";
import { useNavigationC } from "../../hooks/useNavigationC";
import { BreadCrumbsPag } from "../../common/BreadCrumbsPag";

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
    useNavigationC(padecimientos, 5);

  const navigate = useNavigate();

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

  const isMax2Hours = (date) => {
    const date1 = new Date(date);
    const date2 = new Date();
    const diffTime = Math.abs(date2 - date1);
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    console.log("La diferencia es de: ", diffHours - 6, " horas");
    return diffHours - 6 <= 2;
  };

  return (
    <section className="text-gray-600 body-font lg:px-16">
      <BreadCrumbsPag
        show={[1, 2, 3, 5]}
        idPaciente={patientID}
      />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-6 mx-auto">
          <div className="text-center mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
              Padecimientos
            </h1>
            <p className="text-base leading-relaxed lg:w-3/4 mx-auto text-gray-500s">
              En este apartado puede consultar el historial de padecimientos del
              paciente asi como añadir nuevos padecimientos. Si desea generar
              una receta para un padecimiento, presione el boton
              &quot;Detalles&quot; y posteriormente &quot;Generar Receta&quot;.
            </p>
            <div className="flex mt-6 justify-center">
              <div className="w-64 h-1 rounded-full bg-indigo-500 inline-flex"></div>
            </div>
          </div>
        </div>
      </section>
      <div className="container px-1 md:py-5 2xl:py-0 mx-auto flex flex-wrap items-center divide-red-700">
        <div className="w-full lg:w-2/6 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <Timeline>
            {!loading ? (
              <>
                {infoToDisplay.map(
                  (
                    {
                      id,
                      Motivo_consulta,
                      Fecha_inicio_sintomas,
                      Sintomas,
                      Plan_tratamiento,
                      Recetum,
                      createdAt,
                    },
                    key
                  ) => (
                    <TimelineItem className="h-28" key={key}>
                      <TimelineConnector className="!w-[78px]" />
                      <TimelineHeader className="relative rounded-sm border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-indigo-900/5">
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
                          <div className="font-normal">
                            <div className="2xl:flex justify-between gap-3 md:gap-0">
                              <p>Fecha Sintomas {Fecha_inicio_sintomas}</p>
                              <div className="text-base">
                                <p
                                  className="text-indigo-500 inline-flex items-center hover:cursor-pointer"
                                  onClick={() => {
                                    setCurrentPadecimiento({
                                      id,
                                      Motivo_consulta,
                                      Fecha_inicio_sintomas,
                                      Sintomas,
                                      Plan_tratamiento,
                                      Recetum,
                                      createdAt,
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
                          </div>
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
        <div className="bg-white lg:w-3/5 md:w-1/2 shadow-none md:shadow-2xl rounded-sm md:p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-2xl font-bold">
            Nuevo Padecimiento
          </h2>
          <form onSubmit={onSubmit}>
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 lg:grid-cols-12">
              <div className="md:col-span-6 2xl:col-span-8">
                <div className="mt-2">
                  <Input
                    size="lg"
                    color="blue"
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
                    color="blue"
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
                    color="blue"
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
                    color="blue"
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
            <div className="flex gap-2">
              <p className="font-bold text-gray-900">Sintomas:</p>
              <p> {currentPadecimiento?.Sintomas}</p>
            </div>
            <hr />
            <div className="flex gap-2">
              <p className="font-bold text-gray-900">Plan Tratamiento:</p>
              <p> {currentPadecimiento?.Plan_tratamiento}</p>
            </div>
            {currentPadecimiento?.Recetum !== null && (
              <>
                <hr />
                <p className="font-bold text-gray-900">Receta Ascociada</p>
                <div className="grid grid-cols-2">
                  <div className="flex gap-2">
                    <p className="font-bold text-gray-900">
                      Fecha de elaboracion:
                    </p>
                    <p>
                      {currentPadecimiento?.Recetum.Fecha_inicio.split(" ")[0]}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <p className="font-bold text-gray-900">Valida hasta:</p>
                    <p>
                      {currentPadecimiento?.Recetum.Fecha_fin.split(" ")[0]}
                    </p>
                  </div>
                </div>
                <div className="w-fit">
                  <Timeline>
                    {currentPadecimiento?.Recetum.Medicamentos.map(
                      ({
                        id,
                        Nombre,
                        Dosis,
                        Frecuencia,
                        Via_administracion,
                      }) => (
                        <TimelineItem key={id}>
                          <TimelineConnector />
                          <TimelineHeader className="h-3">
                            <TimelineIcon className="bg-blue-500" />
                            <Typography className="font-bold text-gray-900">
                              {Nombre}
                            </Typography>
                          </TimelineHeader>
                          <TimelineBody className="pb-4">
                            <Typography variant="small" className="font-normal">
                              Tomar {Dosis} cada {Frecuencia} via{" "}
                              {Via_administracion}
                            </Typography>
                          </TimelineBody>
                        </TimelineItem>
                      )
                    )}
                  </Timeline>
                </div>
                <div>
                  <p className="font-bold text-gray-900">
                    Indicaciones Adicionales
                  </p>
                  <p className="leading-relaxed text-base">
                    {currentPadecimiento?.Recetum.Indicaciones}
                  </p>
                </div>
              </>
            )}
          </div>
        </DialogBody>
        <DialogFooter>
          {currentPadecimiento?.Recetum === null &&
            !user.is_admin &&
            user.is_doctor &&
            isMax2Hours(currentPadecimiento?.createdAt) && (
              <Button
                color="blue"
                onClick={() => {
                  navigate(
                    `/newRecipe/${patientID}/${currentPadecimiento?.id}`
                  );
                }}
                className="mr-1 border-0"
              >
                <span>Generar Receta</span>
              </Button>
            )}
          {currentPadecimiento?.Recetum !== null &&
            !user.is_admin &&
            user.is_doctor &&
            isMax2Hours(currentPadecimiento?.createdAt) && (
              <Button
                color="blue"
                onClick={async () => {
                  window.open(
                    import.meta.env.VITE_API_URL
                      ? `${import.meta.env.VITE_API_URL}/admin/recipePDF/${
                          currentPadecimiento?.Recetum.id
                        }`
                      : `http://localhost:8000/admin/recipePDF/${currentPadecimiento?.Recetum.id}`
                  );
                }}
                className="mr-1 border-0"
              >
                <span>Reimprimir Receta</span>
              </Button>
            )}
          <Button
            onClick={() => {
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
