import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAppointmentsRequest } from "../api/api";

export const useAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await getAppointmentsRequest(user.token);
      setAppointments(res.data);
      setLoading(false);
    })();
  }, [loading]);

  return {
    appointments,
    loading,
    setLoading,
  };
}