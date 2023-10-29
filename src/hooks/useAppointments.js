import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAppointmentsRequest, getPatientAppointmentsRequest, getValidAppointmentsRequest } from "../api/api";
import { useDay } from "./useDay";

export const useAppointments = (validApponitments = false) => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [nextAppointments, setNextAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentDate } = useDay();

  useEffect(() => {
    (async () => {
      if (user.is_admin) {
        return;
      }else if (user.is_admin === false && user.is_doctor === true) {
        const res = await getAppointmentsRequest(user.token);
        setAppointments(res.data);
      }else{
        const res = await getPatientAppointmentsRequest(user.token);
        setAppointments(res.data);
      }
      setLoading(false);
    })();
  }, [loading, user.token]);

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
  };
}