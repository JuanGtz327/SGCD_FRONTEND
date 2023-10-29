import { useAuth } from "../../context/AuthContext";

const MedicosEdit = ({ data }) => {
  const { user } = useAuth();

  return (
    <>
      <h2 className="text-base font-semibold leading-7 text-gray-900 md:mt-5">
        Historial de Medicos
      </h2>
      {!user.idPaciente && (
        <p className="mt-1 text-sm leading-6 text-gray-600">
          En este apartado puede consultar los medicos que han atendido a su
          paciente.
        </p>
      )}
      <section className="text-gray-600 body-font">
        <div className="py-8">
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
                className="flex items-center sm:flex-row flex-col border p-4 mb-4 sm:mb-0 rounded"
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
                    Cedula : {Cedula} <br />
                  </p>
                  <a className="mt-3 text-indigo-500 inline-flex items-center">
                    Correo: {Correo} <br />
                    Numero Telefonico: {Telefono}
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
