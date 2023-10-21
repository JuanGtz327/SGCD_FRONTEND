import { useState } from "react";
import { Spinner, Input, IconButton } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import userImg from "../../assets/user.png";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { deletePatientRequest } from "../../api/api";
import { usePatients } from "../../hooks/usePatients";
import Pagination from "../../common/Pagination";
import EditPacienteDialog from "./custom/EditPacienteDialog";
import { useAuth } from "../../context/AuthContext";
import { useNavigationC } from "../../hooks/useNavigationC";
import { useToast } from "../../hooks/useToast";
import EmptyData from "../../common/EmptyData";
import { useParams } from "react-router-dom";

const Patients = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [isSearching, setIsSearching] = useState(false);
  const { clinicID } = useParams();

  const { pacientes, loading, setLoading, filterPatients, filtered } =
    usePatients(clinicID);

  const { next, prev, currentPage, pageCount, infoToDisplay, getItemProps } =
    useNavigationC(isSearching ? filtered : pacientes);

  const navigate = useNavigate();

  const [openEdit, setOpenEdit] = useState(false);
  const [editingPatient, setEditingPatient] = useState({});

  const onDeletePatient = async (idUser) => {
    setLoading(true);
    try {
      await deletePatientRequest(idUser, user.token);
      showToast("success", "Paciente eliminado");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner className="h-8 w-8 mx-auto mt-[25%]" />
      ) : (
        <>
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-5 mx-auto">
              <div className="flex flex-col text-center w-full mb-5">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                  Mis Pacientes
                </h1>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                  En este apartado podrás ver a todos tus pacientes, así como
                  consultar los detalles asociados a sus expedientes clinicos.
                </p>
              </div>
              <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                <div className="relative flex-grow w-full">
                  <label
                    htmlFor="full-name"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Buscar paciente
                  </label>
                  <Input
                    type="text"
                    variant="standard"
                    className="w-full bg-opacity-50 rounded text-base outline-none text-gray-700 py-1 px-3 leading-8 duration-200 ease-in-out"
                    onChange={(e) => {
                      if (e.target.value.length === 0) setIsSearching(false);
                      if (e.target.value.length > 0 && !isSearching)
                        setIsSearching(true);
                      filterPatients(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-10 mx-auto">
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
                          User: { Correo },
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
                        key,Paciente
                      ) => (
                        <div
                          className="py-8 flex flex-wrap md:flex-nowrap"
                          key={key}
                        >
                          <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                            <img
                              className="w-full rounded-md h-32 lg:w-32 object-cover"
                              src={userImg}
                              alt="text"
                            />
                          </div>
                          <div className="md:flex-grow">
                            <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
                              {`${Nombre} ${ApellidoP} ${ApellidoM}`}
                            </h2>
                            <p className="leading-relaxed">
                              {`Calle: ${Calle} #${Num_ext} ${Num_int} Colonia: ${Colonia} CP: ${CP} Estado: ${Estado} Municipio: ${Municipio}`}
                            </p>
                            <Link
                              to={`/patient/${id}`}
                              className="text-blue-500 inline-flex items-center mt-4"
                            >
                              Detalles del paciente
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
                          </div>
                          <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                            <span className="font-semibold title-font text-gray-700">
                              {Correo}
                            </span>
                            <div className="flex gap-5 mt-5">
                            <IconButton
                            color="blue"
                              onClick={() => {
                                setOpenEdit(true);
                                setEditingPatient(
                                  Paciente.find((p) => p.idUser === idUser)
                                );
                              }}
                            >
                              <AiFillEdit className="w-6 h-6" />
                            </IconButton>
                            <IconButton
                              onClick={() => onDeletePatient(idUser)}
                              className="bg-cerise-500"
                            >
                              <AiFillDelete className="w-6 h-6" />
                            </IconButton>
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
        </>
      )}
    </>
  );
};

export default Patients;
