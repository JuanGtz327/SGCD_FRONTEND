import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getPatiensByDoctorRequest,
  getPatientRequest,
  getPatientsClinicRequest,
  getPatientsRequest,
} from "../api/api";

export const usePatients = (clinicID, showOnlyActive = true) => {
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
        if (showOnlyActive)
          setPacientes(response.data.filter((patient) => patient.User.is_active));
        else
          setPacientes(response.data);

      } else {
        if (user.is_admin) {
          const response = await getPatientsClinicRequest(user.token, user.idClinica);
          if (showOnlyActive)
            setPacientes(response.data.filter((patient) => patient.User.is_active));
          else
            setPacientes(response.data);
        } else {
          const response = await getPatientsRequest(user.token);
          if (showOnlyActive)
            setPacientes(response.data.filter((patient) => patient.User.is_active));
          else
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

  const getPatiensByDoctor = async (doctorID) => {
    setLoading(true);
    const response = await getPatiensByDoctorRequest(doctorID, user.token);
    setLoading(false);
    if (showOnlyActive)
      return response.data.filter((patient) => patient.User.is_active);
    return response.data;
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
    getPaciente,
    getPatiensByDoctor,
  };
};
