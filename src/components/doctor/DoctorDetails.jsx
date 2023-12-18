import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDoctors } from "../../hooks/useDoctors";
import Loader from "../../common/Loader";
import { Button, Typography } from "@material-tailwind/react";
import { BreadCrumbsPag } from "../../common/BreadCrumbsPag";

const DoctorDetails = () => {
  const { doctorID } = useParams();
  const [doctor, setDoctor] = useState(null);
  const { getDoctor, loading } = useDoctors(null, doctorID);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setDoctor(await getDoctor(doctorID));
    })();
  }, [doctorID]);

  return (
    <div className="2xl:px-16">
      {!loading && doctor ? (
        <>
          <BreadCrumbsPag show={[6, 7]} idDoctor={doctorID} />
          <div className="mt-5 md:mt-0 flex w-full lg:mb-5 justify-end">
            <div className="w-full text-center">
              <Typography variant="h3" color="gray" className="md:text-right">
                {doctor.Genero === "F" ? "Dra. " : "Dr. "} {doctor.Nombre}{" "}
                {doctor.ApellidoP} {doctor.ApellidoM}
              </Typography>
              <div className="flex my-2 md:mt-6 justify-center">
                <div className="w-full h-1 rounded-full bg-indigo-500 inline-flex"></div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-sm shadow-none md:shadow-2xl py-8 md:py-0">
            <section className="text-gray-600 body-font">
              <div className="container px-5 pb-5 mx-auto flex flex-col">
                <div className="lg:w-full mx-auto">
                  <div className="flex flex-col sm:flex-row md:mt-10">
                    <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                      <div className="sm:w-36 sm:h-36 h-20 w-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
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
                      <div className="flex flex-col items-center text-center justify-center">
                        <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">
                          {doctor.Genero === "F" ? "Dra. " : "Dr. "}{" "}
                          {doctor.Nombre} {doctor.ApellidoP} {doctor.ApellidoM}
                        </h2>
                        <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                        <p className="text-base">
                          {doctor.Genero === "F" ? "Doctora " : "Doctor "} No#{" "}
                          {doctor.id}
                        </p>
                        <Button
                          className="mt-3 bg-cerise-500 inline-flex items-center"
                          onClick={() => navigate("/listDoctors")}
                        >
                          Volver a mis doctores
                        </Button>
                      </div>
                    </div>
                    <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                      <div>
                        <p className="leading-relaxed mb-4">
                          <b>Dirección:</b> {doctor.Domicilio.Calle} #
                          {doctor.Domicilio.Num_ext}, {doctor.Domicilio.Colonia}
                          , {doctor.Domicilio.Municipio},{" "}
                          {doctor.Domicilio.Estado}, C.P. {doctor.Domicilio.CP}
                        </p>
                        <p className="leading-relaxed mb-4">
                          <b>CURP:</b> {doctor.CURP}
                        </p>
                        <p className="leading-relaxed mb-4">
                          <b>Especialidad</b> {doctor.Especialidad}
                        </p>
                        <p className="leading-relaxed mb-4">
                          <b>Cédula:</b> {doctor.Cedula}
                        </p>
                        <p>
                          <b>Número teléfono:</b> {doctor.Domicilio.Telefono}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="w-[50%] h-1 bg-indigo-500 rounded mt-2 mb-2 mx-auto"></div>

            <section className="text-gray-600 body-font">
              <div className="container px-5 py-5 mx-auto">
                <h1 className="sm:text-3xl text-2xl font-medium title-font text-center text-gray-900 mb-10 md:mb-20">
                  Gestión del doctor
                </h1>
                <div className="flex flex-wrap justify-center sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
                  <div className="p-4 md:w-1/3 flex">
                    <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-blue-100 text-indigo-500 mb-4 flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <div className="flex-grow pl-6">
                      <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                        Administración
                      </h2>
                      <p className="leading-relaxed text-base">
                        En esta sección puede gestionar las configuraciones de
                        su doctor, como lo son horas de trabajo, días de
                        trabajo, etc. Así como tambien modificar sus datos
                        personales.
                      </p>
                      <Link
                        to={`${
                          import.meta.env.VITE_FRONTEND_URL ||
                          "http://localhost:5173/"
                        }doctorHandle/${doctorID}`}
                        className="mt-3 text-indigo-500 inline-flex items-center"
                      >
                        Consultar
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                  <div className="p-4 md:w-1/3 flex">
                    <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-blue-100 text-indigo-500 mb-4 flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div className="flex-grow pl-6">
                      <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                        Pacientes
                      </h2>
                      <p className="leading-relaxed text-base">
                        En este apartado puede consultar el histórico de
                        pacientes del doctor.
                      </p>
                      <Link
                        to={`${
                          import.meta.env.VITE_FRONTEND_URL ||
                          "http://localhost:5173/"
                        }newPacDoc/${doctorID}`}
                        className="mt-3 text-indigo-500 inline-flex items-center"
                      >
                        Consultar
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default DoctorDetails;
