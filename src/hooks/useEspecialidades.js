import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getEspecialidadesRequest } from "../api/api";

export const useEspecialidades = () => {
  const { user } = useAuth();
  const [especialidades, setEspecialidades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await getEspecialidadesRequest(user.token);
      setEspecialidades(res.data);
      setLoading(false);
    })();
  }, [loading, user.token]);

  return {
    especialidades,
  };
}