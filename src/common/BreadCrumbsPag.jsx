import { Breadcrumbs } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function reemplazarUltimaParte(cadenaOriginal, nuevaParte) {
  const partes = cadenaOriginal.split("/");
  partes[partes.length - 1] = nuevaParte;
  return partes.join("/");
}

export function BreadCrumbsPag({
  show = [1, 2, 3, 4, 5],
  idPaciente,
  idClinica,
  idDoctor,
}) {
  const { user } = useAuth();
  const elements = [
    {
      title: "Pacientes",
      href: user.is_admin ? "/listPatients/idClinica" : "/listPatients",
      noChange: !user.is_admin,
      type: "clinica",
    },
    {
      title: "Detalles Paciente",
      href: "/patient/idPaciente",
      type: "patient",
    },
    {
      title: "Informacion Clinica",
      href: "/clinicDetail/idPaciente",
      type: "patient",
    },
    {
      title: "Medicos Asociados",
      href: "/newDocPac/idPaciente",
      type: "patient",
    },
    {
      title: "Padecimientos",
      href: "/medicalCondition/idPaciente",
      type: "patient",
    },
    {
      title: "Doctores",
      href: "/listDoctors",
      type: "doctor",
      noChange: true
    },
    {
      title: "Detalles Doctor",
      href: "/doctor/idDoctor",
      type: "doctor",
    },
    {
      title: "Administracion",
      href: "/doctorHandle/idDoctor",
      type: "doctor",
    },
    {
      title: "Pacientes Doctor",
      href: "/newPacDoc/idDoctor",
      type: "doctor",
    },
  ];
  const [finalElements, setFinalElements] = useState([]);

  useEffect(() => {
    const elementsShow = elements.filter((element, i) => show.includes(i + 1));

    const replaceParams = elementsShow.map((element) => {
      if (element.href.includes("idPaciente") && idPaciente) {
        element.href = element.href.replace("idPaciente", idPaciente);
      } else if (element.href.includes("idClinica") && idClinica) {
        element.href = element.href.replace("idClinica", idClinica);
      } else if (element.href.includes("idDoctor") && idDoctor) {
        element.href = element.href.replace("idDoctor", idDoctor);
      } else {
        if (!element.noChange && element.type === "patient") {
          element.href = reemplazarUltimaParte(element.href, idPaciente);
        }
        if (!element.noChange && element.type === "clinica") {
          element.href = reemplazarUltimaParte(element.href, idClinica);
        }
        if (!element.noChange && element.type === "doctor") {
          element.href = reemplazarUltimaParte(element.href, idDoctor);
        }
      }
      return element;
    });
    setFinalElements(replaceParams);
  }, [idPaciente, show]);

  return (
    <div className="md:absolute flex justify-center">
      <Breadcrumbs fullWidth className="bg-blue-600/20">
        {finalElements.map((element, i) => (
          <Link
            key={i}
            to={element.href}
            className={`${
              finalElements[finalElements.length - 1] === element
                ? "text-azure-500"
                : "text-blue-400"
            } hover:text-azure-900 hover:transition hover:duration-300 ease-in-out`}
          >
            {element.title}
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  );
}
