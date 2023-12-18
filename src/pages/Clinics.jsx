import { useEffect, useState } from "react";
import fondo from "../assets/fondo.svg";
import { getClinicsRequest } from "../api/api";
import Loader from "../common/Loader";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Rating,
  Typography,
} from "@material-tailwind/react";
import { FaHospitalAlt } from "react-icons/fa";
import { useNavigationC } from "../hooks/useNavigationC";
import Pagination from "../common/Pagination";

const Clinics = () => {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usersC, setUsersC] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState({});
  const [open, setOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [filtered, setFiltered] = useState([]);

  const handleOpen = () => setOpen((cur) => !cur);

  useEffect(() => {
    (async () => {
      const res = await getClinicsRequest();
      setClinics(res.data);
      setLoading(false);
    })();
  }, []);

  const { next, prev, currentPage, pageCount, infoToDisplay, getItemProps } =
    useNavigationC(isSearching ? filtered : usersC, 12);

  function contarDoctoresPorEspecialidad(usuarios) {
    const countPorEspecialidad = {};

    // Iterar sobre cada usuario
    usuarios.forEach((user) => {
      const especialidad = user.Doctor.Especialidad;

      // Verificar si ya existe la especialidad en el objeto countPorEspecialidad
      if (countPorEspecialidad[especialidad]) {
        // Si existe, incrementar el contador
        countPorEspecialidad[especialidad]++;
      } else {
        // Si no existe, inicializar el contador en 1
        countPorEspecialidad[especialidad] = 1;
      }
    });

    // Filtrar las especialidades con recuento mayor que 0
    const especialidadesConRecuento = Object.fromEntries(
      Object.entries(countPorEspecialidad).filter(([_, count]) => count > 0)
    );

    return especialidadesConRecuento;
  }

  return (
    <>
      <div className="flex w-full h-full">
        <div className="lg:px-5 w-full my-auto z-10">
          <div className="container px-5 py-6 mx-auto">
            <div className="text-center mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
                Clínicas
              </h1>
              <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">
                Busque entre las clínicas registradas en el sistema, podrá ver
                los detalles de cada una de ellas. Como los doctores que
                trabajan en ella, así como las especialidades que se atienden en
                la misma.
              </p>
              <div className="flex mt-6 justify-center">
                <div className="w-64 h-1 rounded-full bg-indigo-500 inline-flex"></div>
              </div>
            </div>
          </div>
          {!loading ? (
            <section className="text-gray-600 body-font">
              <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -m-4">
                  <div className="p-4 lg:w-1/3">
                    {clinics.map(
                      ({
                        id,
                        Nombre,
                        Domicilio: {
                          Calle,
                          Num_ext,
                          Colonia,
                          CP,
                          Estado,
                          Municipio,
                        },
                        Users,
                      }) => (
                        <div
                          key={id}
                          className="h-full bg-white shadow-2xl px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative"
                        >
                          <h2 className="tracking-widest text-base title-font font-medium text-gray-400 mb-1">
                            Clínica
                          </h2>
                          <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                            {Nombre}
                          </h1>
                          <p className="leading-relaxed mb-3">
                            {`Calle: ${Calle} #${Num_ext} Colonia: ${Colonia} CP: ${CP} Estado: ${Estado} Municipio: ${Municipio}`}
                          </p>
                          <div
                            className="text-indigo-500 inline-flex items-center cursor-pointer"
                            onClick={() => {
                              setUsersC(Users);
                              setOpen(true);
                              setSelectedClinic({
                                Nombre,
                                Calle,
                                Num_ext,
                                Colonia,
                                CP,
                                Estado,
                                Municipio,
                              });
                            }}
                          >
                            Consultar personal
                            <svg
                              className="w-4 h-4 ml-2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              fill="none"
                            >
                              <path d="M5 12h14"></path>
                              <path d="M12 5l7 7-7 7"></path>
                            </svg>
                          </div>
                          <div className="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                            <Rating value={5} />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <Loader />
          )}
        </div>
        <div className="absolute w-full h-full">
          <svg className="w-full h-full">
            <image href={fondo} className="2xl:w-full 2xl:h-full" />
          </svg>
        </div>
      </div>

      <Dialog size="xl" open={open} handler={handleOpen}>
        <DialogHeader className="justify-between">
          <div className="flex items-center gap-3">
            <FaHospitalAlt className="text-blue-500" />
            <div className="-mt-px flex flex-col">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-medium"
              >
                {`${selectedClinic.Nombre}`}
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="text-xs font-normal"
              >
                {`${selectedClinic.Calle} #${selectedClinic.Num_ext} Colonia: ${selectedClinic.Colonia} CP: ${selectedClinic.CP} Estado: ${selectedClinic.Estado} Municipio: ${selectedClinic.Municipio}`}
              </Typography>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Rating value={5} />
          </div>
        </DialogHeader>
        <DialogBody>
          <section className="text-gray-600 body-font">
            <div className="container px-5 mx-auto">
              <div className="flex flex-col text-center w-full mb-5">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                  Nuestro personal
                </h1>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                  Los mejores doctores a su disposición para atenderle.
                </p>
              </div>
              <div className="flex flex-wrap -m-2">
                {infoToDisplay.map(
                  ({
                    id,
                    Doctor: {
                      Nombre,
                      ApellidoP,
                      ApellidoM,
                      Especialidad,
                      Genero,
                    },
                  }) => (
                    <div key={id} className="p-2 lg:w-1/3 md:w-1/2 w-full">
                      <div className="flex items-center border-gray-200 border p-4 rounded-lg">
                        <div className="sm:w-11 sm:h-11 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-8 h-8"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        </div>
                        <div className="flex-grow ml-5">
                          <h2 className="text-gray-900 title-font font-medium">
                            {`${
                              Genero === "M" ? "Dr." : "Dra."
                            }  ${Nombre} ${ApellidoP} ${ApellidoM}`}
                          </h2>
                          <p className="text-gray-500">{Especialidad}</p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
              <Pagination
                prev={prev}
                currentPage={currentPage}
                pageCount={pageCount}
                next={next}
                getItemProps={getItemProps}
              />
            </div>
          </section>
        </DialogBody>
        <DialogFooter className="justify-between">
          <div className="flex items-center gap-3">
            <div
              className="bg-blue-100 rounded-xl p-4 cursor-pointer"
              onClick={() => {
                setIsSearching(false);
              }}
            >
              <Typography variant="small" color="gray" className="font-normal">
                Médicos
              </Typography>
              <Typography color="blue-gray" className="font-medium text-center">
                {usersC.length}
              </Typography>
            </div>
            {Object.entries(contarDoctoresPorEspecialidad(usersC)).map(
              ([especialidad, count]) => (
                <div
                  key={especialidad}
                  className="text-xs font-normal flex items-center gap-1 cursor-pointer"
                  onClick={() => {
                    setIsSearching(true);
                    setFiltered(
                      usersC.filter(
                        (user) => user.Doctor.Especialidad === especialidad
                      )
                    );
                  }}
                >
                  {especialidad}: {count}
                </div>
              )
            )}
          </div>
          <Button
            onClick={handleOpen}
            className="mr-5 flex items-center bg-cerise-500"
          >
            Cerrar
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default Clinics;
