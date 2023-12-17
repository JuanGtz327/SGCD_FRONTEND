import { useEffect, useState } from "react";
import { BreadCrumbsPag } from "../../common/BreadCrumbsPag";
import { useParams } from "react-router-dom";
import { usePatients } from "../../hooks/usePatients";
import { Typography } from "@material-tailwind/react";
import Loader from "../../common/Loader";
import { getMetricasRequest } from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import {
  FaHeartbeat,
  FaPumpMedical,
  FaTemperatureLow,
  FaWeight,
} from "react-icons/fa";
import { GiBodyHeight, GiMedicalDrip } from "react-icons/gi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler
);

const optionsPresion = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      max: 200,
    },
  },
};

const optionsCardio = {
  scales: {
    y: {
      min: 40,
      max: 150,
    },
  },
};

const optionsRespiratoria = {
  scales: {
    y: {
      min: 20,
      max: 100,
    },
  },
};

const optionsPeso = {
  responsive: true,
};

const PatientStats = () => {
  const { user } = useAuth();
  const { patientID } = useParams();
  const [paciente, setPaciente] = useState(null);
  const [metricas, setMetricas] = useState(null);
  const [metricasLoading, setMetricasLoading] = useState(true);
  const { getPaciente, loading } = usePatients(null, patientID);
  const [datosPresion, setDatosPresion] = useState([]);
  const [datosPeso, setDatosPeso] = useState([]);
  const [datosEstatura, setDatosEstatura] = useState([]);
  const [datosFrecuenciaCardiaca, setDatosFrecuenciaCardiaca] = useState([]);
  const [datosFrecuenciaRespiratoria, setDatosFrecuenciaRespiratoria] =
    useState([]);
  const [datosTemperatura, setDatosTemperatura] = useState([]);

  useEffect(() => {
    (async () => {
      setPaciente(await getPaciente(patientID));
      const res = await getMetricasRequest(patientID, user.token);
      setMetricas(res.data);
      setDatosPresion(
        res.data.ProgresoPresionArterials.map(
          (presion) => presion.Presion_arterial
        )
      );
      setDatosPeso(res.data.ProgresoPesos.map((peso) => peso.Peso));
      setDatosEstatura(
        res.data.ProgresoEstaturas.map((estatura) => estatura.Estatura)
      );
      setDatosFrecuenciaCardiaca(
        res.data.ProgresoFrecuenciaCardiacas.map(
          (frecuencia) => frecuencia.Frecuencia_cardiaca
        )
      );
      setDatosFrecuenciaRespiratoria(
        res.data.ProgresoFrecuenciaRespiratoria.map(
          (frecuencia) => frecuencia.Frecuencia_respiratoria
        )
      );
      setDatosTemperatura(
        res.data.ProgresoTemperaturas.map(
          (temperatura) => temperatura.Temperatura
        )
      );
      setMetricasLoading(false);
    })();
  }, [patientID]);

  const sistolica = datosPresion.map((dato) => parseInt(dato.split("/")[0]));
  const diastolica = datosPresion.map((dato) => parseInt(dato.split("/")[1]));

  // Configuración de los datos del gráfico
  const dataPresion = {
    labels: Array.from(
      { length: datosPresion.length },
      (_, i) => `${datosPresion[i]} mmHg`
    ),
    datasets: [
      {
        label: "Sistólica",
        backgroundColor: "rgba(14, 165, 233, 0.2)",
        borderColor: "rgba(14, 165, 233, 1)",
        borderWidth: 1,
        data: sistolica,
      },
      {
        label: "Diastólica",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        borderColor: "rgba(16, 185, 129, 1)",
        borderWidth: 1,
        data: diastolica,
      },
    ],
  };

  const dataPeso = {
    labels: Array.from(
      { length: datosPeso.length },
      (_, i) => `${datosPeso[i]} kg`
    ),
    datasets: [
      {
        label: "Peso",
        fill: true,
        backgroundColor: "rgba(124,58,237,0.1)",
        borderColor: "rgba(124,58,237,1)",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(124,58,237,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: datosPeso,
      },
    ],
  };

  const dataEstatura = {
    labels: Array.from(
      { length: datosEstatura.length },
      (_, i) => `${datosEstatura[i]} cm`
    ),
    datasets: [
      {
        label: "Estatura",
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgba(124,58,237,0.1)",
        borderColor: "rgba(124,58,237,1)",
        pointBorderColor: "rgba(124,58,237,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(124,58,237,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: datosEstatura,
      },
    ],
  };

  const dataCardiaca = {
    labels: Array.from(
      { length: datosFrecuenciaCardiaca.length },
      (_, i) => `${datosFrecuenciaCardiaca[i]} bpm`
    ),
    datasets: [
      {
        label: "Frecuencia cardiaca",
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        borderColor: "rgba(99, 102, 241, 1)",
        data: datosFrecuenciaCardiaca,
      },
    ],
  };

  const dataRespiratoria = {
    labels: Array.from(
      { length: datosFrecuenciaRespiratoria.length },
      (_, i) => `${datosFrecuenciaRespiratoria[i]} xmin`
    ),
    datasets: [
      {
        label: "Frecuencia respiratoria",
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        borderColor: "rgba(99, 102, 241, 1)",
        data: datosFrecuenciaRespiratoria,
      },
    ],
  };

  const dataTemperatura = {
    labels: Array.from(
      { length: datosTemperatura.length },
      (_, i) => `${datosTemperatura[i]}°C`
    ),
    datasets: [
      {
        label: "Temperatura",
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgba(244, 63, 94, 0.2)",
        borderColor: "rgba(244, 63, 94, 1)",
        data: datosTemperatura,
      },
    ],
  };

  return (
    <div className="py-5 lg:px-16">
      {!loading && !metricasLoading && paciente ? (
        <>
          {user.is_doctor ? (
            <>
              <BreadCrumbsPag show={[1, 2, 11]} idPaciente={patientID} />
              <div className="mt-5 md:mt-0 flex w-full lg:mb-5 justify-end">
                <div className="w-full text-center">
                  <Typography
                    variant="h3"
                    color="gray"
                    className="md:text-right"
                  >
                    Paciente: {paciente.Nombre} {paciente.ApellidoP}{" "}
                    {paciente.ApellidoM}
                  </Typography>
                  <div className="flex my-2 md:mt-6 justify-center">
                    <div className="w-full h-1 rounded-full bg-indigo-500 inline-flex"></div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="mb-8">
              <Typography variant="h3" color="gray" className="text-center">
                Estadísticas
              </Typography>
              <Typography color="gray" className="text-center">
                A continuación, se muestran las estadísticas generadas a partir
                de sus datos registrados.
              </Typography>

              <div className="flex my-2 md:mt-6 justify-center">
                <div className="w-[50%] h-1 rounded-full bg-indigo-500 inline-flex"></div>
              </div>
            </div>
          )}
          <div className="bg-white rounded-sm shadow-none md:shadow-2xl py-8 md:py-6">
            {user.is_doctor ? (
              <div>
                <Typography variant="h3" color="gray" className="text-center">
                  Estadísticas
                </Typography>
                <Typography color="gray" className="text-center">
                  A continuación, se muestran las estadísticas generadas a partir
                  de los datos registrados en el paciente.
                </Typography>

                <div className="flex my-2 md:mt-6 justify-center">
                  <div className="w-[50%] h-1 rounded-full bg-indigo-500 inline-flex"></div>
                </div>
              </div>
            ) : (
              <></>
            )}
            <section className="text-gray-600 body-font">
              <div className="container px-5 py-6 mx-auto">
                <div className="flex flex-wrap -mx-4 -mb-10 text-center">
                  <div className="sm:w-1/2 mb-5 px-4">
                    <div className="rounded-lg overflow-hidden">
                      <Line data={dataPeso} options={optionsPeso} />
                    </div>
                    <div className="gap-3 flex justify-center items-center mt-6 mb-3 text-xl title-font font-medium text-gray-700 ">
                      <div className="flex flex-col text-sm gap-3">
                        <div className="flex justify-center items-center gap-2">
                          <FaWeight className="h-5 w-5" />
                          Peso promedio:{" "}
                          {(
                            datosPeso.reduce((total, peso) => total + peso, 0) /
                            datosPeso.length
                          ).toFixed(2)}{" "}
                          kg
                        </div>
                        {/* Ver de cuanto fue el aumento o disminucion con respecto al valor anterior */}
                        {datosPeso.length > 1 &&
                          (datosPeso[datosPeso.length - 1] >
                          datosPeso[datosPeso.length - 2] ? (
                            <span className="ml-5 text-green-500 text-sm">
                              +{" "}
                              {(
                                datosPeso[datosPeso.length - 1] -
                                datosPeso[datosPeso.length - 2]
                              ).toFixed(2)}{" "}
                              kg desde la última medición
                            </span>
                          ) : datosPeso[datosPeso.length - 1] ===
                            datosPeso[datosPeso.length - 2] ? (
                            <span className="ml-5 text-gray-500 text-sm">
                              Peso estable
                            </span>
                          ) : (
                            <span className="text-red-500 text-sm">
                              -{" "}
                              {(
                                datosPeso[datosPeso.length - 2] -
                                datosPeso[datosPeso.length - 1]
                              ).toFixed(2)}{" "}
                              kg desde la última medición
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="sm:w-1/2 mb-5 px-4">
                    <div className="rounded-lg overflow-hidden">
                      <Line data={dataEstatura} options={optionsPeso} />
                    </div>
                    <div className="gap-3 flex justify-center items-center mt-6 mb-3 text-xl title-font font-medium text-gray-700 ">
                      <div className="flex flex-col text-sm gap-3">
                        <div className="flex justify-center items-center gap-2">
                          <GiBodyHeight className="h-6 w-6" />
                          Estatura promedio:{" "}
                          {(
                            datosEstatura.reduce(
                              (total, estatura) => total + estatura,
                              0
                            ) / datosEstatura.length
                          ).toFixed(2)}{" "}
                          cm
                        </div>
                        {/* Ver de cuanto fue el aumento o disminucion con respecto al valor anterior */}
                        {datosEstatura.length > 1 &&
                          (datosEstatura[datosEstatura.length - 1] >
                          datosEstatura[datosEstatura.length - 2] ? (
                            <span className="ml-5 text-green-500 text-sm">
                              +{" "}
                              {(
                                datosEstatura[datosEstatura.length - 1] -
                                datosEstatura[datosEstatura.length - 2]
                              ).toFixed(2)}{" "}
                              cm desde la última medición
                            </span>
                          ) : datosEstatura[datosEstatura.length - 1] ===
                            datosEstatura[datosEstatura.length - 2] ? (
                            <span className="ml-5 text-gray-500 text-sm">
                              Estatura estable
                            </span>
                          ) : (
                            <span className="text-red-500 text-sm">
                              -{" "}
                              {(
                                datosEstatura[datosEstatura.length - 2] -
                                datosEstatura[datosEstatura.length - 1]
                              ).toFixed(2)}{" "}
                              cm desde la última medición
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                  <hr className="border-blue-gray-200 mx-8 w-full mb-6" />
                  <div className="sm:w-1/2 mb-5 px-4">
                    <div className="rounded-lg">
                      <Bar data={dataPresion} options={optionsPresion} />
                    </div>
                    <div className="gap-3 flex justify-center items-center mt-6 mb-3 text-xl title-font font-medium text-gray-700 ">
                      <div className="flex flex-col text-sm gap-3">
                        <div className="flex justify-center items-center gap-2">
                          <GiMedicalDrip className="h-8 w-8" />
                          Presion arterial promedio:
                          {` ${parseInt(
                            (
                              sistolica.reduce(
                                (total, presion) => total + presion,
                                0
                              ) / sistolica.length
                            ).toFixed(2)
                          )} / ${parseInt(
                            (
                              diastolica.reduce(
                                (total, presion) => total + presion,
                                0
                              ) / diastolica.length
                            ).toFixed(2)
                          )} mmHg`}
                        </div>
                        {/* Ver de cuanto fue el aumento o disminucion con respecto al valor anterior */}
                        {sistolica.length > 1 &&
                          diastolica.length > 1 &&
                          (sistolica[sistolica.length - 1] >
                          sistolica[sistolica.length - 2] ? (
                            <span className="ml-5 text-green-500 text-sm">
                              +{" "}
                              {(
                                sistolica[sistolica.length - 1] -
                                sistolica[sistolica.length - 2]
                              ).toFixed(2)}{" "}
                              mmHg desde la última medición
                            </span>
                          ) : sistolica[sistolica.length - 1] ===
                            sistolica[sistolica.length - 2] ? (
                            <span className="ml-5 text-gray-500 text-sm">
                              Presión arterial estable
                            </span>
                          ) : (
                            <span className="text-red-500 text-sm">
                              -{" "}
                              {(
                                sistolica[sistolica.length - 2] -
                                sistolica[sistolica.length - 1]
                              ).toFixed(2)}{" "}
                              mmHg desde la última medición
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="sm:w-1/2 mb-5 px-4">
                    <div className="rounded-lg overflow-hidden">
                      <Line data={dataCardiaca} options={optionsCardio} />
                    </div>
                    <div className="gap-3 flex justify-center items-center mt-6 mb-3 text-xl title-font font-medium text-gray-700 ">
                      <div className="flex flex-col text-sm gap-3">
                        <div className="flex justify-center items-center gap-2">
                          <FaHeartbeat className="h-6 w-6" />
                          Frecuencia cardiaca promedio:{" "}
                          {parseInt(
                            (
                              datosFrecuenciaCardiaca.reduce(
                                (total, frecuencia) => total + frecuencia,
                                0
                              ) / datosFrecuenciaCardiaca.length
                            ).toFixed(2)
                          )}{" "}
                          bpm
                        </div>
                        {/* Ver de cuanto fue el aumento o disminucion con respecto al valor anterior */}
                        {datosFrecuenciaCardiaca.length > 1 &&
                          (datosFrecuenciaCardiaca[
                            datosFrecuenciaCardiaca.length - 1
                          ] >
                          datosFrecuenciaCardiaca[
                            datosFrecuenciaCardiaca.length - 2
                          ] ? (
                            <span className="ml-5 text-amber-500 text-sm">
                              +{" "}
                              {(
                                datosFrecuenciaCardiaca[
                                  datosFrecuenciaCardiaca.length - 1
                                ] -
                                datosFrecuenciaCardiaca[
                                  datosFrecuenciaCardiaca.length - 2
                                ]
                              ).toFixed(2)}{" "}
                              bpm desde la última medición
                            </span>
                          ) : datosFrecuenciaCardiaca[
                              datosFrecuenciaCardiaca.length - 1
                            ] ===
                            datosFrecuenciaCardiaca[
                              datosFrecuenciaCardiaca.length - 2
                            ] ? (
                            <span className="ml-5 text-gray-500 text-sm">
                              Frecuencia cardiaca estable
                            </span>
                          ) : (
                            <span className="text-amber-500 text-sm">
                              -{" "}
                              {(
                                datosFrecuenciaCardiaca[
                                  datosFrecuenciaCardiaca.length - 2
                                ] -
                                datosFrecuenciaCardiaca[
                                  datosFrecuenciaCardiaca.length - 1
                                ]
                              ).toFixed(2)}{" "}
                              bpm desde la última medición
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                  <hr className="border-blue-gray-200 mx-8 w-full mb-6" />
                  <div className="sm:w-1/2 mb-5 px-4">
                    <div className="rounded-lg overflow-hidden">
                      <Line
                        data={dataRespiratoria}
                        options={optionsRespiratoria}
                      />
                    </div>
                    <div className="gap-3 flex justify-center items-center mt-6 mb-3 text-xl title-font font-medium text-gray-700 ">
                      <div className="flex flex-col text-sm gap-3">
                        <div className="flex justify-center items-center gap-2">
                          <FaPumpMedical className="h-6 w-6" />
                          Frecuencia respiratoria rromedio:{" "}
                          {parseInt(
                            (
                              datosFrecuenciaRespiratoria.reduce(
                                (total, frecuencia) => total + frecuencia,
                                0
                              ) / datosFrecuenciaRespiratoria.length
                            ).toFixed(2)
                          )}{" "}
                          xmin
                        </div>
                        {/* Ver de cuanto fue el aumento o disminucion con respecto al valor anterior */}
                        {datosFrecuenciaRespiratoria.length > 1 &&
                          (datosFrecuenciaRespiratoria[
                            datosFrecuenciaRespiratoria.length - 1
                          ] >
                          datosFrecuenciaRespiratoria[
                            datosFrecuenciaRespiratoria.length - 2
                          ] ? (
                            <span className="ml-5 text-amber-500 text-sm">
                              +{" "}
                              {(
                                datosFrecuenciaRespiratoria[
                                  datosFrecuenciaRespiratoria.length - 1
                                ] -
                                datosFrecuenciaRespiratoria[
                                  datosFrecuenciaRespiratoria.length - 2
                                ]
                              ).toFixed(2)}{" "}
                              xmin desde la última medición
                            </span>
                          ) : datosFrecuenciaRespiratoria[
                              datosFrecuenciaRespiratoria.length - 1
                            ] ===
                            datosFrecuenciaRespiratoria[
                              datosFrecuenciaRespiratoria.length - 2
                            ] ? (
                            <span className="ml-5 text-gray-500 text-sm">
                              Frecuencia respiratoria estable
                            </span>
                          ) : (
                            <span className="text-amber-500 text-sm">
                              -{" "}
                              {(
                                datosFrecuenciaRespiratoria[
                                  datosFrecuenciaRespiratoria.length - 2
                                ] -
                                datosFrecuenciaRespiratoria[
                                  datosFrecuenciaRespiratoria.length - 1
                                ]
                              ).toFixed(2)}{" "}
                              xmin desde la última medición
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="sm:w-1/2 mb-5 px-4">
                    <div className="rounded-lg  overflow-hidden">
                      <Line
                        data={dataTemperatura}
                        options={optionsRespiratoria}
                      />
                    </div>
                    <div className="gap-3 flex justify-center items-center mt-6 mb-3 text-xl title-font font-medium text-gray-700 ">
                      <div className="flex flex-col text-sm gap-3">
                        <div className="flex justify-center items-center gap-2">
                          <FaTemperatureLow className="h-6 w-6" />
                          Temperatura promedio:{" "}
                          {(
                            datosTemperatura.reduce(
                              (total, temperatura) =>
                                total + parseFloat(temperatura),
                              0
                            ) / datosTemperatura.length
                          ).toFixed(2)}{" "}
                          °C
                        </div>
                        {/* Ver de cuanto fue el aumento o disminucion con respecto al valor anterior */}
                        {datosTemperatura.length > 1 &&
                          (datosTemperatura[datosTemperatura.length - 1] >
                          datosTemperatura[datosTemperatura.length - 2] ? (
                            <span className="ml-5 text-cerise-500 text-sm">
                              +{" "}
                              {(
                                datosTemperatura[datosTemperatura.length - 1] -
                                datosTemperatura[datosTemperatura.length - 2]
                              ).toFixed(2)}{" "}
                              °C desde la última medición
                            </span>
                          ) : datosTemperatura[datosTemperatura.length - 1] ===
                            datosTemperatura[datosTemperatura.length - 2] ? (
                            <span className="ml-5 text-gray-500 text-sm">
                              Temperatura estable
                            </span>
                          ) : (
                            <span className="text-cyan-500 text-sm">
                              -{" "}
                              {(
                                datosTemperatura[datosTemperatura.length - 2] -
                                datosTemperatura[datosTemperatura.length - 1]
                              ).toFixed(2)}{" "}
                              °C desde la última medición
                            </span>
                          ))}
                      </div>
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

export default PatientStats;
