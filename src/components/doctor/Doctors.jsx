import { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { AiFillEdit } from "react-icons/ai";
import { FaPowerOff } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { activateDoctorRequest, deleteDoctorRequest } from "../../api/api";
import { useDoctors } from "../../hooks/useDoctors";
import Pagination from "../../common/Pagination";
import EditDoctorDialog from "./custom/EditDoctorDialog";
import { useAuth } from "../../context/AuthContext";
import { useNavigationC } from "../../hooks/useNavigationC";
import { useToast } from "../../hooks/useToast";
import EmptyData from "../../common/EmptyData";
import Loader from "../../common/Loader";
import { DeleteModal } from "../generalModals/DeleteModal";
import { BreadCrumbsPag } from "../../common/BreadCrumbsPag";

const Doctors = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [isSearching, setIsSearching] = useState(false);
  const { doctors, loading, setLoading, filtered, filterDoctors } = useDoctors(
    null,
    false
  );
  const [doctorToDelete, setDoctorToDelete] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { next, prev, currentPage, pageCount, infoToDisplay, getItemProps } =
    useNavigationC(isSearching ? filtered : doctors);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState({});

  const navigate = useNavigate();

  const onDeleteDoctor = async () => {
    try {
      await deleteDoctorRequest(doctorToDelete, user.token);
      setLoading(true);
      setDoctorToDelete(0);
      showToast("success", "Doctor desactivado");
    } catch (error) {
      showToast("error", error.response.data.message);
      console.log(error);
    }
    setShowDeleteModal(false);
  };

  const handleActivateDoctor = async (id) => {
    try {
      await activateDoctorRequest(id, user.token);
      setLoading(true);
      showToast("success", "Doctor activado");
    } catch (error) {
      console.log(error);
    }
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
          <BreadCrumbsPag show={[6]} />
          <section className="text-gray-600 body-font">
            <div className="container px-0 py-5 mx-auto">
              <div className="flex flex-col text-center w-full mb-5">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                  Doctores
                </h1>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                  En este apartado podrá ver la lista completa de los doctores que pertenecen a su clínica, además de los detalles asociados.
                </p>
                <div className="flex mt-6 justify-center">
                  <div className="w-64 h-1 rounded-full bg-indigo-500 inline-flex"></div>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-white py-5 px-5 rounded-sm md:px-8 md:min-h-[650px] shadow-none md:shadow-2xl text-black body-font overflow-hidden">
            <Input
              color="blue"
              type="text"
              variant="standard"
              label="Buscar doctor"
              onChange={(e) => {
                if (e.target.value.length === 0) setIsSearching(false);
                if (e.target.value.length > 0 && !isSearching)
                  setIsSearching(true);
                filterDoctors(e.target.value);
              }}
            />
            <div className="container py-10 mx-auto">
              <div className="-my-8 divide-y-2 divide-gray-100">
                {doctors.length === 0 || infoToDisplay.length === 0 ? (
                  <EmptyData
                    title="No hay doctores"
                    description="Agrega un doctor para comenzar"
                    btnDesc="Agregar doctor"
                    onNewData={() => navigate("/addDoctor")}
                  />
                ) : (
                  <>
                    {infoToDisplay.map(
                      (
                        {
                          User: { Correo, is_active },
                          idUser,
                          id,
                          Especialidad,
                          Nombre,
                          ApellidoP,
                          ApellidoM,
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
                        DoctorArr
                      ) => (
                        <div
                          className={`py-8 flex flex-wrap md:flex-nowrap animate-fade-right animate-duration-[750ms] ${getDelay(key)}`}
                          key={id}
                        >
                          <div className="sm:flex-shrink-0 mb-4 sm:mb-0 sm:mr-4 mx-auto rounded-md">
                            <div className="sm:w-32 sm:h-32 h-20 w-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
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
                          </div>
                          <div className="md:flex-grow">
                            <h2 className="text-center md:text-left text-lg md:text-2xl font-medium text-gray-900 title-font mb-2">
                              {`${Nombre} ${ApellidoP} ${ApellidoM}`}
                            </h2>
                            <p className="text-sm hidden 2xl:block md:text-base leading-relaxed text-justify">
                              {`Calle: ${Calle} #${Num_ext} ${Num_int} Colonia: ${Colonia} CP: ${CP} Estado: ${Estado} Municipio: ${Municipio}`}
                            </p>
                            {is_active && (
                              <>
                                <Link
                                  to={`/doctor/${id}`}
                                  className="text-blue-500 inline-flex items-center mt-4"
                                >
                                  Detalles del doctor
                                  <svg
                                    className="w-4 h-4 ml-2"
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
                                  to={`/newPacDoc/${id}`}
                                  className="text-blue-500 inline-flex items-center mt-4 ml-4"
                                >
                                  Pacientes
                                  <svg
                                    className="w-4 h-4 ml-2"
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

                            {!is_active && (
                              <p className="ml-3 text-indigo-500 inline-flex items-center mt-1 md:mt-4 md:ml-5">
                                Active al doctor para poder ver sus detalles
                                clínicos así como sus pacientes.
                              </p>
                            )}
                          </div>
                          <div className="md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                            <span className="font-semibold title-font text-gray-700 hidden md:inline">
                              {Correo}
                            </span>
                            <span className="mt-1 text-gray-500 text-sm hidden md:inline">
                              {Especialidad}
                            </span>
                            <div
                              className={`grid ${
                                user.is_admin
                                  ? "grid-cols-2"
                                  : "md:grid-cols-2 grid-cols-1"
                              } gap-2 md:mt-5 mt-2 w-full`}
                            >
                              {user.is_admin && (
                                <Button
                                  size="sm"
                                  className="flex items-center"
                                  color="blue"
                                  onClick={() => {
                                    setOpenEdit(true);
                                    setEditingDoctor(
                                      DoctorArr.find((p) => p.idUser === idUser)
                                    );
                                  }}
                                >
                                  <div className="flex items-center mx-auto">
                                    <AiFillEdit className="w-6 h-6" />{" "}
                                    Credenciales
                                  </div>
                                </Button>
                              )}
                              {is_active ? (
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    setDoctorToDelete(idUser);
                                    setShowDeleteModal(true);
                                  }}
                                  className="bg-cerise-500 flex items-center w-full"
                                >
                                  <div className="flex items-center mx-auto">
                                    <FaPowerOff className="w-5 h-5 mr-1" />{" "}
                                    Desactivar
                                  </div>
                                </Button>
                              ) : (
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    handleActivateDoctor(idUser);
                                  }}
                                  className="bg-[#10b981] flex items-center w-full"
                                >
                                  <div className="flex items-center mx-auto">
                                    <FaPowerOff className="w-5 h-5 mr-1" />{" "}
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

          <EditDoctorDialog
            openEdit={openEdit}
            setOpenEdit={setOpenEdit}
            editingDoctor={editingDoctor}
            setEditingDoctor={setEditingDoctor}
            setLoading={setLoading}
          />

          <DeleteModal
            show={showDeleteModal}
            onDelete={onDeleteDoctor}
            onCancel={() => {
              setDoctorToDelete(0);
              setShowDeleteModal(false);
            }}
            tittle="¿Seguro que desea desactivar este doctor?"
            message="Al desactivar este doctor, ya no podrá iniciar sesión en el sistema, ni ser asignado a nuevos pacientes."
          />
        </div>
      )}
    </>
  );
};

export default Doctors;
