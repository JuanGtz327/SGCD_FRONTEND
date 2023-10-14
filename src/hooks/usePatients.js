import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getPatientsRequest } from "../api/api";

export const usePatients = () => {
  const { user } = useAuth();
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await getPatientsRequest(user.token);
      setPacientes(response.data);
      setLoading(false);
    })();
  }, [loading, user.token]);

  return {
    pacientes,
    loading,
    setLoading
  };
};
