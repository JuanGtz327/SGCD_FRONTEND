import fondo from "../assets/fondo.svg";

const Billing = () => {
  return (
    <>
      <div className="flex w-full h-full">
        <div className="lg:px-5 w-full my-auto z-10">
          <section className="text-gray-600 body-font overflow-hidden">
            <div className="container lg:px-5 py-5 mx-auto bg-white rounded-md border border-blue-300">
              <div className="flex flex-col text-center w-full mb-10">
                <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
                  Planes
                </h1>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">
                  A continuación se muestran los planes disponibles para
                  contratar. Escoge el que más se adapte a tus necesidades.
                </p>
              </div>
              <div className="flex my-2 md:mt-6 justify-center">
                <div className="w-[50%] h-1 rounded-full bg-indigo-500 inline-flex"></div>
              </div>
              <div className="flex flex-wrap lg:flex-row justify-center lg:px-20">
                <div className="p-4 xl:w-1/3 md:w-1/2 w-full">
                  <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
                    <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
                      Inicial
                    </h2>
                    <h1 className="mt-5 text-4xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">
                      Gratis
                    </h1>
                    <p className="flex items-center text-gray-600 mb-2">
                      <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          className="w-3 h-3"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 6L9 17l-5-5"></path>
                        </svg>
                      </span>
                      5 doctores
                    </p>
                    <p className="flex items-center text-gray-600 mb-2">
                      <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          className="w-3 h-3"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 6L9 17l-5-5"></path>
                        </svg>
                      </span>
                      10 pacientes por doctor
                    </p>
                    <p className="flex items-center text-gray-600 mb-2">
                      <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          className="w-3 h-3"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 6L9 17l-5-5"></path>
                        </svg>
                      </span>
                      100 recetas por mes
                    </p>
                    <p className="flex items-center text-gray-600 mb-6">
                      <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          className="w-3 h-3"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 6L9 17l-5-5"></path>
                        </svg>
                      </span>
                      Citas ilimitadas
                    </p>
                    <button className="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded">
                      Plan actual
                      <svg
                        fill="none"
                        stroke="currentColor"
                        className="w-4 h-4 ml-auto"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </button>
                    <p className="text-xs text-gray-500 mt-3">
                      Un plan gratuito y básico para comenzar a usar los
                      servicios de SGCD.
                    </p>
                  </div>
                </div>
                <div className="p-4 xl:w-1/3 md:w-1/2 w-full">
                  <div className="h-full p-6 rounded-lg border-2 border-indigo-500 flex flex-col relative overflow-hidden">
                    <span className="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
                      Recomendado
                    </span>
                    <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
                      Clínica
                    </h2>
                    <h1 className="mt-5 text-4xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                      <span>$199.00 mx</span>
                      <span className="text-lg ml-1 font-normal text-gray-500">
                        /mo
                      </span>
                    </h1>
                    <p className="flex items-center text-gray-600 mb-2">
                      <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          className="w-3 h-3"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 6L9 17l-5-5"></path>
                        </svg>
                      </span>
                      50 doctores
                    </p>
                    <p className="flex items-center text-gray-600 mb-2">
                      <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          className="w-3 h-3"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 6L9 17l-5-5"></path>
                        </svg>
                      </span>
                      100 pacientes por doctor
                    </p>
                    <p className="flex items-center text-gray-600 mb-2">
                      <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          className="w-3 h-3"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 6L9 17l-5-5"></path>
                        </svg>
                      </span>
                      1000 recetas por mes
                    </p>
                    <p className="flex items-center text-gray-600 mb-2">
                      <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          className="w-3 h-3"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 6L9 17l-5-5"></path>
                        </svg>
                      </span>
                      Citas ilimitadas
                    </p>
                    <p className="flex items-center text-gray-600 mb-6">
                      <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          className="w-3 h-3"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 6L9 17l-5-5"></path>
                        </svg>
                      </span>
                      Notificaciones por correo electrónico
                    </p>
                    <button className="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded">
                      Contratar
                      <svg
                        fill="none"
                        stroke="currentColor"
                        className="w-4 h-4 ml-auto"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </button>
                    <p className="text-xs text-gray-500 mt-3">
                      Un plan para clínicas pequeñas que buscan expandir sus
                      servicios.
                    </p>
                  </div>
                </div>
                <div className="p-4 xl:w-1/3 md:w-1/2 w-full">
                  <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
                    <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
                      Hospital
                    </h2>
                    <h1 className="mt-5 text-4xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                      <span>$499.00 mx</span>
                      <span className="text-lg ml-1 font-normal text-gray-500">
                        /mo
                      </span>
                    </h1>
                    <p className="flex items-center text-gray-600 mb-2">
                      <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          className="w-3 h-3"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 6L9 17l-5-5"></path>
                        </svg>
                      </span>
                      Doctores ilimitados
                    </p>
                    <p className="flex items-center text-gray-600 mb-2">
                      <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          className="w-3 h-3"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 6L9 17l-5-5"></path>
                        </svg>
                      </span>
                      Pacientes ilimitados
                    </p>
                    <p className="flex items-center text-gray-600 mb-2">
                      <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          className="w-3 h-3"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 6L9 17l-5-5"></path>
                        </svg>
                      </span>
                      Recetas ilimitadas
                    </p>
                    <p className="flex items-center text-gray-600 mb-2">
                      <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          className="w-3 h-3"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 6L9 17l-5-5"></path>
                        </svg>
                      </span>
                      Citas ilimitadas
                    </p>
                    <p className="flex items-center text-gray-600 mb-2">
                      <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          className="w-3 h-3"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 6L9 17l-5-5"></path>
                        </svg>
                      </span>
                      Notificaciones por correo electrónico
                    </p>
                    <p className="flex items-center text-gray-600 mb-2">
                      <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          className="w-3 h-3"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 6L9 17l-5-5"></path>
                        </svg>
                      </span>
                      Personalización de expedientes clínicos
                    </p>
                    <p className="flex items-center text-gray-600 mb-6">
                      <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          className="w-3 h-3"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 6L9 17l-5-5"></path>
                        </svg>
                      </span>
                      Configuraciones avanzadas para doctores
                    </p>
                    <button className="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded">
                      Contratar
                      <svg
                        fill="none"
                        stroke="currentColor"
                        className="w-4 h-4 ml-auto"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </button>
                    <p className="text-xs text-gray-500 mt-3">
                      Un plan para los usuarios que deseen usar a lo grande los
                      servicios de SGCD.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="absolute w-full h-full">
          <svg className="w-full h-full">
            <image href={fondo} className="2xl:w-full 2xl:h-full" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default Billing;
