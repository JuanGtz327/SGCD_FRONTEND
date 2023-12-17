import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "@material-tailwind/react";

const MedicosEdit = ({ data, patientID }) => {
  const { user } = useAuth();

  return (
    <>
      <h2 className="text-lg font-semibold text-gray-900 md:mt-5">
        Historial de médicos
      </h2>

      {!user.idPaciente && (
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="mt-1 text-sm leading-6 text-gray-600">
            En este apartado puede consultar los médicos que han atendido a su
            paciente.
          </p>
          <div className="flex justify-between md:justify-start md:gap-5">
            <Link
              to={`${
                import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173/"
              }newDocPac/${patientID}`}
            >
              <Button className="mt-5 w-fit" color="blue">
                Añadir nuevo médico
              </Button>
            </Link>
          </div>
        </div>
      )}
      <section className="text-gray-600 body-font">
        <div className="py-4 grid 2xl:grid-cols-2 2xl:gap-10">
          {data.map(
            ({
              id,
              Doctor: {
                Nombre,
                ApellidoP,
                ApellidoM,
                Especialidad,
                Cedula,
                User: { Correo },
                Domicilio: { Telefono },
              },
            }) => (
              <div
                className="flex items-center sm:flex-row flex-col border p-4 mb-4 sm:mb-0 rounded-2xl"
                key={id}
              >
                <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
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
                <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                  <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                    Médico: {Nombre} {ApellidoP} {ApellidoM}
                  </h2>
                  <p className="leading-relaxed text-base">
                    Especialidad : {Especialidad} <br />
                    Cédula : {Cedula} <br />
                  </p>
                  <a className="mt-3 text-indigo-500 inline-flex items-center">
                    Correo: {Correo} <br />
                    Némero telefónico: {Telefono}
                  </a>
                </div>
              </div>
            )
          )}
        </div>
      </section>
    </>
  );
};

export default MedicosEdit;
