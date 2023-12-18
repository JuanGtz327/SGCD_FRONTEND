import { useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { DeleteModal } from "../generalModals/DeleteModal";
import { MdEmail } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { activatePatientRequest, deletePatientRequest } from "../../api/api";
import { usePatients } from "../../hooks/usePatients";
import Pagination from "../../common/Pagination";
import EditPacienteDialog from "./custom/EditPacienteDialog";
import { useAuth } from "../../context/AuthContext";
import { useNavigationC } from "../../hooks/useNavigationC";
import { useToast } from "../../hooks/useToast";
import EmptyData from "../../common/EmptyData";
import { useParams } from "react-router-dom";
import Loader from "../../common/Loader";
import { BreadCrumbsPag } from "../../common/BreadCrumbsPag";
import { FaPowerOff } from "react-icons/fa";

const Patients = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingPatient, setEditingPatient] = useState({});
  const { clinicID } = useParams();

  const { pacientes, loading, setLoading, filterPatients, filtered } =
    usePatients(clinicID, false);

  const { next, prev, currentPage, pageCount, infoToDisplay, getItemProps } =
    useNavigationC(isSearching ? filtered : pacientes);

  const navigate = useNavigate();

  const onDeletePatient = async () => {
    try {
      await deletePatientRequest(patientToDelete, user.token);
      showToast("success", "Paciente eliminado");
    } catch (error) {
      showToast("error", error.response.data.message);
      console.log(error);
    }
    setLoading(true);
    setPatientToDelete(0);
    setShowDeleteModal(false);
  };

  const handleActivatePatient = async (id) => {
    try {
      await activatePatientRequest(id, user.token);
      showToast("success", "Paciente activado");
    } catch (error) {
      console.log(error);
    }
    setLoading(true);
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
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col 2xl:px-16">
          <BreadCrumbsPag show={[1]} idClinica={clinicID} />
          <section className="text-gray-600 body-font">
            <div className="container px-0 py-5 mx-auto">
              <div className="flex flex-col text-center w-full mb-5">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                  Mis Pacientes
                </h1>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                  En este apartado puede ver a los pacientes pertenecientes a su
                  clínica.
                </p>
                <div className="flex mt-6 justify-center">
                  <div className="w-64 h-1 rounded-full bg-indigo-500 inline-flex"></div>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-white py-5 px-5 rounded-sm md:px-8 md:min-h-[635px] shadow-none md:shadow-2xl text-black body-font overflow-hidden">
            <Input
              color="blue"
              type="text"
              variant="standard"
              label="Buscar paciente"
              className="w-full rounded text-base outline-none text-black-700 py-1 px-3 leading-8 duration-200 ease-in-out"
              onChange={(e) => {
                if (e.target.value.length === 0) setIsSearching(false);
                if (e.target.value.length > 0 && !isSearching)
                  setIsSearching(true);
                filterPatients(e.target.value);
              }}
            />
            <div className="container py-10 mx-auto">
              <div className="-my-8 divide-y-2 divide-gray-100">
                {pacientes.length === 0 || infoToDisplay.length === 0 ? (
                  <EmptyData
                    title="No hay pacientes"
                    description="Agrega un paciente para comenzar"
                    btnDesc="Agregar paciente"
                    onNewData={() => navigate("/addPatient")}
                  />
                ) : (
                  <>
                    {infoToDisplay.map(
                      (
                        {
                          User: { Correo, is_active },
                          id,
                          Nombre,
                          ApellidoP,
                          ApellidoM,
                          idUser,
                          Domicilio: {
                            Calle,
                            Num_ext,
                            Num_int,
                            Colonia,
                            CP,
                            Estado,
                            Municipio,
                          },
                        },
                        key,
                        Paciente
                      ) => (
                        <div
                          className={`py-8 flex flex-col sm:flex-wrap md:flex-nowrap lg:flex-row justify-between animate-fade-right animate-duration-[750ms] ${getDelay(key)}`}
                          key={id}
                        >
                          <div className="flex flex-col md:flex-row sm:flex-shrink-0 gap-5 mb-4 sm:mb-0 rounded-md">
                            <div className="mx-auto sm:w-32 sm:h-32 h-20 w-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                              <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="sm:w-16 sm:h-16 w-10 h-10"
                                viewBox="0 0 24 24"
                              >
                                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                              </svg>
                            </div>
                            <div>
                              <h2 className="text-lg md:text-xl 2xl:text-2xl font-medium text-gray-900 title-font mb-2 text-center md:text-left">
                                {`${Nombre} ${ApellidoP} ${ApellidoM}`}
                              </h2>
                              <p className="hidden mb-3 text-sm md:text-base leading-relaxed 2xl:block text-justify truncate md:max-w-md
                               2xl:max-w-full">
                                {`Calle: ${Calle} #${Num_ext} ${Num_int} Colonia: ${Colonia} CP: ${CP} Estado: ${Estado} Municipio: ${Municipio}`}
                              </p>
                              {is_active &&
                                !user.is_admin &&
                                user.is_doctor && (
                                  <>
                                    <Link
                                      to={`/patient/${id}`}
                                      className="text-indigo-500 inline-flex items-center mt-1 md:mt-4"
                                    >
                                      Detalles paciente
                                      <svg
                                        className="w-4 h-4 ml-1"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      >
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                      </svg>
                                    </Link>
                                    <Link
                                      to={`/medicalCondition/${id}`}
                                      className="ml-0 md:ml-3 text-indigo-500 inline-flex items-center mt-1 md:mt-4"
                                    >
                                      Padecimientos
                                      <svg
                                        className="w-4 h-4 ml-1"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      >
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                      </svg>
                                    </Link>
                                  </>
                                )}
                              {is_active && user.is_admin && (
                                <Link
                                  to={`/newDocPac/${id}`}
                                  className="ml-3 text-indigo-500 inline-flex items-center mt-1 md:mt-4 md:ml-5"
                                >
                                  Asignar Doctor
                                  <svg
                                    className="w-4 h-4 ml-1"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M5 12h14"></path>
                                    <path d="M12 5l7 7-7 7"></path>
                                  </svg>
                                </Link>
                              )}
                              {!is_active && (
                                <p className="ml-3 text-indigo-500 inline-flex items-center mt-1 md:mt-4 md:ml-5">
                                  Active al paciente para poder gestionar sus
                                  datos clinicos.
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                            <span className="w-full mt-3 md:flex gap-1 font-semibold title-font text-gray-700 hidden justify-end">
                              <MdEmail className="w-6 h-6" />
                              {Correo}
                            </span>
                            <div
                              className={`grid ${
                                user.is_admin
                                  ? "grid-cols-2"
                                  : "md:grid-cols-2 grid-cols-1"
                              } gap-2 md:mt-5 mt-2 w-full`}
                            >
                              {user.is_admin ? (
                                <Button
                                  size="sm"
                                  color="blue"
                                  onClick={() => {
                                    setOpenEdit(true);
                                    setEditingPatient(
                                      Paciente.find((p) => p.idUser === idUser)
                                    );
                                  }}
                                >
                                  <div className="flex items-center mx-auto">
                                    <AiFillEdit className="w-6 h-6" />{" "}
                                    Credenciales
                                  </div>
                                </Button>
                              ) : (
                                <div></div>
                              )}
                              {is_active ? (
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    setPatientToDelete(idUser);
                                    setShowDeleteModal(true);
                                  }}
                                  className="bg-cerise-500"
                                >
                                  <div className="flex items-center mx-auto">
                                    <FaPowerOff className="w-5 h-5 mr-2" />{" "}
                                    Desactivar
                                  </div>
                                </Button>
                              ) : (
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    handleActivatePatient(idUser);
                                  }}
                                  className="bg-[#10b981]"
                                >
                                  <div className="flex items-center mx-auto">
                                    <FaPowerOff className="w-5 h-5 mr-2" />{" "}
                                    Activar
                                  </div>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </>
                )}
              </div>
            </div>
          </section>
          <Pagination
            prev={prev}
            currentPage={currentPage}
            pageCount={pageCount}
            next={next}
            getItemProps={getItemProps}
          />
          <EditPacienteDialog
            openEdit={openEdit}
            setOpenEdit={setOpenEdit}
            editingPatient={editingPatient}
            setEditingPatient={setEditingPatient}
            setLoading={setLoading}
          />
          <DeleteModal
            show={showDeleteModal}
            onDelete={onDeletePatient}
            onCancel={() => {
              setPatientToDelete(0);
              setShowDeleteModal(false);
            }}
            tittle="¿Seguro que desea desactivar este paciente?"
            message="El paciente ya no podrá acceder a su cuenta ni podra ver su expediente clínico."
          />
        </div>
      )}
    </>
  );
};

export default Patients;
