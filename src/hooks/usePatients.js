import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getPatientsClinicRequest, getPatientsRequest } from "../api/api";

export const usePatients = (clinicID) => {
  const { user } = useAuth();
  const [pacientes, setPacientes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (clinicID) {
        const response = await getPatientsClinicRequest(user.token, clinicID);
        setPacientes(response.data);
      } else {
        const response = await getPatientsRequest(user.token);
        setPacientes(response.data);
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

  return {
    pacientes,
    filtered,
    loading,
    setLoading,
    filterPatients,
  };
};
