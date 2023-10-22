import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  ClipboardDocumentListIcon,
  FingerPrintIcon,
} from "@heroicons/react/24/solid";
import { createElement, useEffect, useState } from "react";
import HistoriaMedicaEdit from "./HistoriaMedicaEdit";
import ExamenFisicoEdit from "./ExamenFisicoEdit";
import { useParams } from "react-router-dom";
import { usePatients } from "../../hooks/usePatients";
import Loader from "../../common/Loader";

const ClinicDetail = () => {
  const { patientID } = useParams();
  const [paciente, setPaciente] = useState(null);
  const { getPaciente, loading } = usePatients(null, patientID);
  const [mainVisible, setMainVisible] = useState(true);

  useEffect(() => {
    (async () => {
      setPaciente(await getPaciente(patientID));
    })();
  }, [patientID]);

  const handleMain = () => {
    mainVisible && setMainVisible(false);
  };

  const data = [
    {
      label: "Historia Medica",
      value: "historia_medica",
      icon: ClipboardDocumentListIcon,
      id: 0,
    },
    {
      label: "Examen Fisico",
      value: "examen_fisico",
      icon: FingerPrintIcon,
      id: 1,
    },
  ];

  return (
    <>
      {!loading && paciente ? (
        <div className="py-5 px-1 md:py-10 md:px-10">
          <Tabs value="dashboard">
            <TabsHeader>
              {data.map(({ label, value, icon }) => (
                <Tab key={value} value={value} onClick={handleMain}>
                  <div className="md:flex md:items-center md:gap-2 md:text-base text-sm">
                    {createElement(icon, { className: "w-5 h-5 mx-auto" })}
                    {label}
                  </div>
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody>
              {data.map(({ value, id }) => (
                <TabPanel key={value} value={value}>
                  {id == 0 && (
                    <HistoriaMedicaEdit
                      data={paciente.HistorialClinico.HistoriaMedica}
                      patientID={patientID}
                    />
                  )}
                  {id == 1 && (
                    <ExamenFisicoEdit
                      data={paciente.HistorialClinico.ExamenFisico}
                      patientID={patientID}
                    />
                  )}
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
          <div className={`${!mainVisible && "hidden"} text-center py-24`}>
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
              Informacion Clinica
            </h1>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">
              En este apartado se incluyen la informacion clinica del paciente. Se divide en dos secciones Historia Medica y Examen
              Fisico. Para editar la informacion de cada seccion de click en la
              pestaña correspondiente.
            </p>
            <div className="flex mt-6 justify-center">
              <div className="w-64 h-1 rounded-full bg-indigo-500 inline-flex"></div>
            </div>
          </div>
        </div>
      ) : (
        <Loader top="mt-32"/>
      )}
    </>
  );
};

export default ClinicDetail;
