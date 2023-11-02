import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getPatientRequest,
  getPatientsClinicRequest,
  getPatientsRequest,
} from "../api/api";

export const usePatients = (clinicID) => {
  const { user } = useAuth();
  const [pacientes, setPacientes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!user.is_doctor) {
      return;
    }

    (async () => {
      if (clinicID) {
        const response = await getPatientsClinicRequest(user.token, clinicID);
        setPacientes(response.data);
      } else {
        if (user.is_admin) {
          const response = await getPatientsClinicRequest(user.token, user.idClinica);
          setPacientes(response.data);
        } else {
          const response = await getPatientsRequest(user.token);
          setPacientes(response.data);
        }
      }
      setLoading(false);
    })();
  }, [loading, user.token]);

  const filterPatients = (value) => {
    setFiltered(
      pacientes.filter((val) => {
        if (value === "") {
          return val;
        } else if (
          val.Nombre.toLowerCase().includes(value.toLowerCase()) ||
          val.ApellidoP.toLowerCase().includes(value.toLowerCase()) ||
          val.ApellidoM.toLowerCase().includes(value.toLowerCase())
        ) {
          return val;
        }
      })
    );
  };

  const getPaciente = async (patientID) => {
    setLoading(true);
    const response = await getPatientRequest(patientID, user.token);
    setLoading(false);
    return response.data;
  };

  return {
    pacientes,
    filtered,
    loading,
    setLoading,
    filterPatients,
    getPaciente
  };
};
