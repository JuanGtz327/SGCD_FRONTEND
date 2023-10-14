import { useEffect, useState } from "react";
import { getDoctorsRequest } from "../api/api";
import { useAuth } from "../context/AuthContext";

export const useDoctors = () => {
  const {user} = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await getDoctorsRequest(user.token);
      setDoctors(response.data);
      setLoading(false);
    })();
  }, [loading, user.token]);

  return {
    doctors,
    loading,
    setLoading,
  };
};
