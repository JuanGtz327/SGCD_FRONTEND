import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAdminAppointmentsRequest, getAppointmentsRequest, getPatientAppointmentsRequest, getValidAppointmentsRequest } from "../api/api";
import { useDay } from "./useDay";

export const useAppointments = (validApponitments = false) => {
  const { user } = useAuth();
  const [filtro, setFiltro] = useState('all');
  const [appointments, setAppointments] = useState([]);
  const [nextAppointments, setNextAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentDate } = useDay();

  useEffect(() => {
    (async () => {
      if (user.is_admin) {
        const res = await getAdminAppointmentsRequest(filtro === null ? 'all' : filtro, user.token);
        setAppointments(res.data);
      } else if (!user.is_admin && user.is_doctor) {
        const res = await getAppointmentsRequest(filtro === null ? 'all' : filtro, user.token);
        setAppointments(res.data);
      } else {
        const res = await getPatientAppointmentsRequest(filtro === null ? 'all' : filtro, user.token);
        setAppointments(res.data);
      }
      setLoading(false);
    })();
  }, [loading, user.token]);

  useEffect(() => {
    if (user.is_admin) {
      (async () => {
        const res = await getAdminAppointmentsRequest(filtro === null ? 'all' : filtro, user.token);
        setAppointments(res.data);
        setLoading(false);
      })();
    }
    if (!user.is_admin && user.is_doctor) {
      (async () => {
        const res = await getAppointmentsRequest(filtro === null ? 'all' : filtro, user.token);
        setAppointments(res.data);
        setLoading(false);
      })();
    }
    if (!user.is_admin && !user.is_doctor) {
      (async () => {
        const res = await getPatientAppointmentsRequest(filtro === null ? 'all' : filtro, user.token);
        setAppointments(res.data);
        setLoading(false);
      })();
    }
  }, [loading, user.token, filtro]);

  useEffect(() => {
    if (validApponitments === true) {
      (async () => {
        const res = await getValidAppointmentsRequest(currentDate, user.token);
        setNextAppointments(res.data);
        setLoading(false);
      })();
    }
  }, [loading, user.token]);

  return {
    appointments,
    nextAppointments,
    loading,
    setLoading,
    setFiltro,
    filtro
  };
}