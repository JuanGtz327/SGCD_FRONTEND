import { useEffect, useState } from "react";
import { usePatients } from "../../hooks/usePatients";
import { Link, useParams } from "react-router-dom";
import { useDay } from "../../hooks/useDay";
import { MdOutlineSick } from "react-icons/md";
import Loader from "../../common/Loader";
import { Typography } from "@material-tailwind/react";
import { BreadCrumbsPag } from "../../common/BreadCrumbsPag";
import { GoGraph } from "react-icons/go";

const PatientDetails = () => {
  const { convertToBirthDate } = useDay();
  const { patientID } = useParams();
  const [paciente, setPaciente] = useState(null);
  const { getPaciente, loading } = usePatients(null, patientID);

  useEffect(() => {
    (async () => {
      setPaciente(await getPaciente(patientID));
    })();
  }, [patientID]);

  return (
    <div className="py-5 2xl:px-16">
      {!loading && paciente ? (
        <>
          <BreadCrumbsPag show={[1, 2]} idPaciente={patientID} />
          <div className="mt-5 md:mt-0 flex w-full lg:mb-5 justify-end">
            <div className="w-full text-center">
              <Typography variant="h3" color="gray" className="md:text-right">
                Paciente: {paciente.Nombre} {paciente.ApellidoP}{" "}
                {paciente.ApellidoM}
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
                          {paciente.Nombre} {paciente.ApellidoP}{" "}
                          {paciente.ApellidoM}
                        </h2>
                        <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                        <p className="text-base">Paciente No# {paciente.id}</p>
                      </div>
                    </div>
                    <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                      <div>
                        <p className="leading-relaxed mb-4">
                          <b>Dirección:</b> {paciente.Domicilio.Calle} #
                          {paciente.Domicilio.Num_ext},{" "}
                          {paciente.Domicilio.Colonia},{" "}
                          {paciente.Domicilio.Municipio},{" "}
                          {paciente.Domicilio.Estado}, C.P.{" "}
                          {paciente.Domicilio.CP}
                        </p>
                        <p className="leading-relaxed mb-4">
                          <b>CURP:</b> {paciente.CURP}
                        </p>
                        <p className="leading-relaxed mb-4">
                          <b>Fecha nacimiento:</b>{" "}
                          {convertToBirthDate(paciente.Fecha_nacimiento)}
                        </p>
                        <p className="leading-relaxed mb-4">
                          <b>Sexo:</b>{" "}
                          {paciente.Genero == "M" ? "Masculino" : "Femenino"}
                        </p>
                        <p>
                          <b>Número teléfono:</b> {paciente.Domicilio.Telefono}
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
                  Expediente clínico
                </h1>
                <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6 justify-center">
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
                        Informacion clínica
                      </h2>
                      <p className="leading-relaxed text-base">
                        En esta sección se podrá visualizar la información
                        clínica del paciente. Donde se encuentran los datos del
                        examen físico, así como la historia médica.
                      </p>
                      <Link
                        to={`${
                          import.meta.env.VITE_FRONTEND_URL ||
                          "http://localhost:5173/"
                        }clinicDetail/${paciente.id}`}
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
                      <MdOutlineSick className="w-6 h-6" />
                    </div>
                    <div className="flex-grow pl-6">
                      <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                        Padecimientos
                      </h2>
                      <p className="leading-relaxed text-base">
                        En esta sección se podrá agregar nuevos padecimientos al
                        paciente, así como consultar el histórico de
                        enfermedades.
                      </p>
                      <Link
                        to={`${
                          import.meta.env.VITE_FRONTEND_URL ||
                          "http://localhost:5173/"
                        }medicalCondition/${paciente.id}`}
                        className="mt-3 text-indigo-500 inline-flex items-center"
                      >
                        Agregar Padecimiento
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
                      <GoGraph className="w-6 h-6" />
                    </div>
                    <div className="flex-grow pl-6">
                      <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                        Métricas paciente
                      </h2>
                      <p className="leading-relaxed text-base">
                        En esta sección se podrá consultar el progreso del
                        paciente en cuanto a su peso, estatura, presión
                        arterial, etc.
                      </p>
                      <Link
                        to={`${
                          import.meta.env.VITE_FRONTEND_URL ||
                          "http://localhost:5173/"
                        }stats/${paciente.id}`}
                        className="mt-3 text-indigo-500 inline-flex items-center"
                      >
                        Consultar Metricas
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

export default PatientDetails;
