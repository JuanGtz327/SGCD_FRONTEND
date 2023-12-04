import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Typography,
} from "@material-tailwind/react";
import {
  ClipboardDocumentListIcon,
  FingerPrintIcon,
} from "@heroicons/react/24/solid";
import { FaUserDoctor } from "react-icons/fa6";
import { createElement, useEffect, useState } from "react";
import HistoriaMedicaEdit from "./HistoriaMedicaEdit";
import ExamenFisicoEdit from "./ExamenFisicoEdit";
import { useParams } from "react-router-dom";
import { usePatients } from "../../hooks/usePatients";
import Loader from "../../common/Loader";
import MedicosEdit from "./MedicosEdit";
import { BreadCrumbsPag } from "../../common/BreadCrumbsPag";

const ClinicDetail = () => {
  const { patientID } = useParams();
  const [paciente, setPaciente] = useState(null);
  const { getPaciente, loading } = usePatients(null, patientID);

  useEffect(() => {
    (async () => {
      setPaciente(await getPaciente(patientID));
    })();
  }, [patientID]);

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
    {
      label: "Historial Medicos",
      value: "hisotrial_medicos",
      icon: FaUserDoctor,
      id: 2,
    },
  ];

  return (
    <>
      {!loading && paciente ? (
        <div className="py-5 px-1 md:py-4 lg:px-16">
          <BreadCrumbsPag show={[1, 2, 3]} idPaciente={patientID} />
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
          <Tabs value="dashboard" className="shadow-none md:shadow-2xl">
            <TabsHeader>
              {data.map(({ label, value, icon }) => (
                <Tab key={value} value={value}>
                  <div className="md:flex md:items-center md:gap-2 md:text-base text-sm">
                    {createElement(icon, { className: "w-5 h-5 mx-auto" })}
                    {label}
                  </div>
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody className="bg-white rounded-sm mt-5 md:mt-5 2xl:min-h-[700px] mx-auto">
              <TabPanel value="dashboard">
                <div className="text-center py-24">
                  <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
                    Informacion Clinica
                  </h1>
                  <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">
                    En este apartado se incluyen la informacion de su expediente
                    clinico. Se divide en tres secciones Historia Medica que es
                    donde puede consultar el antecendete de enfermedaes, el
                    examen fisico que es donde puede consultar los datos de su
                    examen fisico y por ultimo el historial de medicos.
                  </p>
                  <div className="flex mt-6 justify-center">
                    <div className="w-64 h-1 rounded-full bg-indigo-500 inline-flex"></div>
                  </div>
                </div>
              </TabPanel>

              {data.map(({ value, id }) => (
                <TabPanel key={value} value={value}>
                  {id == 0 && (
                    <div className="lg:px-16">
                      <HistoriaMedicaEdit
                        data={paciente.HistorialClinico.HistoriaMedica}
                        patientID={patientID}
                      />
                    </div>
                  )}
                  {id == 1 && (
                    <div className="lg:px-16">
                      <ExamenFisicoEdit
                        data={paciente.HistorialClinico.ExamenFisico}
                        patientID={patientID}
                      />
                    </div>
                  )}
                  {id == 2 && (
                    <div className="lg:px-16">
                      <MedicosEdit
                        data={paciente.DocPacs}
                        patientID={patientID}
                      />
                    </div>
                  )}
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </div>
      ) : (
        <Loader top="mt-32" />
      )}
    </>
  );
};

export default ClinicDetail;
