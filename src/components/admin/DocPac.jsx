import {
  Button,
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Input,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { IoAddOutline } from "react-icons/io5";
import { useDoctors } from "../../hooks/useDoctors";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../hooks/useToast";
import { ConfirmationModal } from "../generalModals/ConfirmationModal";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePatients } from "../../hooks/usePatients";
import Loader from "../../common/Loader";
import { addDocPacRequest } from "../../api/api";
import { GiConfirmed } from "react-icons/gi";
import { BreadCrumbsPag } from "../../common/BreadCrumbsPag";
import { useNavigationC } from "../../hooks/useNavigationC";
import Pagination from "../../common/Pagination";

const DocPac = () => {
  const { user } = useAuth();
  const { doctors, filterDoctors, filtered } = useDoctors();
  const [isSearching, setIsSearching] = useState(false);
  const { patientID } = useParams();
  const { getPaciente, loading } = usePatients(null, patientID);
  const { infoToDisplay, currentPage, next, prev, pageCount, getItemProps } =
    useNavigationC(isSearching ? filtered : doctors, 6);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [doctorToAdd, setDoctorToAdd] = useState({});

  useEffect(() => {
    (async () => {
      setPaciente(await getPaciente(patientID));
    })();
  }, [patientID]);

  const onNewDocPac = async () => {
    try {
      await addDocPacRequest(
        { idDoctor: doctorToAdd.id, idPaciente: paciente.id },
        user.token
      );
      showToast("success", "Se ha añadido el médico al paciente");
      if (user.is_admin) 
        navigate("/patients");
      else
        navigate(`/clinicDetail/${paciente.id}`);
    } catch (error) {
      showToast(
        "error",
        "No se ha podido añadir el médico al paciente",
        "center"
      );
    }
    setShowConfirmationModal(false);
  };

  const getDelay = (key) => {
    if (key === 0) return 'animate-delay-[150ms]';
    if (key === 1) return 'animate-delay-[300ms]';
    if (key === 2) return 'animate-delay-[450ms]';
    if (key === 3) return 'animate-delay-[600ms]';
    if (key === 4) return 'animate-delay-[750ms]';
    if (key === 5) return 'animate-delay-[900ms]';
    if (key === 6) return 'animate-delay-[1050ms]';
    if (key === 7) return 'animate-delay-[1200ms]';
    if (key === 8) return 'animate-delay-[1350ms]';
    if (key === 9) return 'animate-delay-[1500ms]';
    if (key === 10) return 'animate-delay-[1650ms]';
    if (key === 11) return 'animate-delay-[1800ms]';
    if (key === 12) return 'animate-delay-[1950ms]';
    if (key === 13) return 'animate-delay-[2100ms]';
    if (key === 14) return 'animate-delay-[2250ms]';
    if (key === 15) return 'animate-delay-[2400ms]';
    if (key === 16) return 'animate-delay-[2550ms]';
    if (key === 17) return 'animate-delay-[2700ms]';
    if (key === 18) return 'animate-delay-[2850ms]';
    if (key === 19) return 'animate-delay-[3000ms]';
    if (key === 20) return 'animate-delay-[3150ms]';
  }

  return (
    <div className="2xl:px-16">
      {!loading && paciente ? (
        <section className="text-gray-600 body-font">
          <BreadCrumbsPag show={user.is_admin ? [1,4] : [1, 2, 3, 4]} idPaciente={patientID} />
          <div className="container mx-auto">
            <section className="text-gray-600 body-font">
              <div className="container px-5 py-6 mx-auto">
                <div className="text-center mb-0">
                  <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
                    Doctor-Paciente
                  </h1>
                  <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">
                    A continuación, se muestra una lista de los médicos de la
                    clínica, para asociar a un médico al paciente, solo debe dar click en el
                    botón +.
                  </p>
                  <div className="flex mt-6 justify-center">
                    <div className="w-64 h-1 rounded-full bg-indigo-500 inline-flex"></div>
                  </div>
                </div>
              </div>
            </section>
            <div className="bg-white shadow-none md:shadow-2xl min-h-[600px] py-4 md:py-8 px-2 md:px-8 2xl:mt-10">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="col-span-1">
                  <Card className="w-full 2xl:w-96">
                    <CardHeader floated={false} className="h-80 bg-indigo-100">
                      <div className="h-full w-full inline-flex items-center justify-center rounded-full text-indigo-500 flex-shrink-0">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="sm:w-32 sm:h-32 w-32 h-32"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                    </CardHeader>
                    <CardBody className="text-center">
                      <Typography
                        variant="h4"
                        color="blue-gray"
                        className="mb-2"
                      >
                        {paciente.Nombre} {paciente.ApellidoP}{" "}
                        {paciente.ApellidoM}
                      </Typography>
                      <Typography
                        color="blue-gray"
                        className="font-medium"
                        textGradient
                      >
                        {paciente.User.Correo}
                      </Typography>
                      <Link
                        to={user.is_admin ? `${ import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173/" }patients` : `${ import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173/" }patient/${patientID}`}
                      >
                        <Button className="mt-5 w-fit bg-cerise-500">
                          Volver
                        </Button>
                      </Link>
                    </CardBody>
                  </Card>
                </div>
                <div className="col-span-2 mt-5 md:mt-0">
                  <div className="mx-4">
                    <Input
                      color="blue"
                      type="text"
                      variant="standard"
                      label="Buscar doctor"
                      className="text-base text-gray-900"
                      onChange={(e) => {
                        if (e.target.value.length === 0) setIsSearching(false);
                        if (e.target.value.length > 0 && !isSearching)
                          setIsSearching(true);
                        filterDoctors(e.target.value);
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-1 2xl:grid-cols-2 mt-5">
                    {infoToDisplay.map(
                      ({ id, Nombre, ApellidoP, ApellidoM, Especialidad },key) => (
                        <div className={`p-2 animate-fade-right animate-duration-[750ms] ${getDelay(key)}`} key={id}>
                          <div className="flex items-center border-blue-400 border p-4 rounded-lg">
                            <div className="mr-2 sm:w-16 sm:h-16 h-14 w-14 sm:mr-5 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                              <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="sm:w-8 sm:h-18 w-10 h-10"
                                viewBox="0 0 24 24"
                              >
                                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                              </svg>
                            </div>
                            <div className="hidden md:flex-grow">
                              <h2 className="text-gray-900 title-font font-medium">
                                Médico: {Nombre} {ApellidoP} {ApellidoM}
                              </h2>
                              <p className="text-gray-500">{Especialidad}</p>
                            </div>

                            <div className="flex-grow">
                              <h2 className="text-gray-900 title-font text-sm font-medium">
                                {Nombre} {ApellidoP}
                              </h2>
                              <p className="text-gray-500 text-sm">
                                {Especialidad}
                              </p>
                            </div>

                            {paciente.DocPacs.filter(
                              (docpac) => docpac.idDoctor === id
                            ).length > 0 ? (
                              <Tooltip
                                content="Este doctor ya pertenece al paciente"
                                className="bg-submarine-500"
                              >
                                <p>
                                  <GiConfirmed className="text-submarine-500 h-10 w-10" />
                                </p>
                              </Tooltip>
                            ) : (
                              <Tooltip
                                content="Agregar Doctor"
                                className="bg-blue-500"
                              >
                                <IconButton
                                  color="blue"
                                  onClick={() => {
                                    setDoctorToAdd({
                                      id,
                                      Nombre,
                                      ApellidoP,
                                      ApellidoM,
                                      Especialidad,
                                    });
                                    setShowConfirmationModal(true);
                                  }}
                                >
                                  <IoAddOutline className="text-white h-6 w-6" />
                                </IconButton>
                              </Tooltip>
                            )}
                          </div>
                        </div>
                      )
                    )}
                    <div className="col-span-full">
                      <Pagination
                        prev={prev}
                        currentPage={currentPage}
                        pageCount={pageCount}
                        next={next}
                        getItemProps={getItemProps}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ConfirmationModal
            show={showConfirmationModal}
            onConfirm={onNewDocPac}
            onCancel={() => {
              setDoctorToAdd({});
              setShowConfirmationModal(false);
            }}
            message={`Esto añadirá el médico ${
              doctorToAdd.Nombre + " " + doctorToAdd.ApellidoP
            } al paciente ${
              paciente?.Nombre +
              " " +
              paciente?.ApellidoP +
              " " +
              paciente?.ApellidoM
            }`}
          />
        </section>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default DocPac;
