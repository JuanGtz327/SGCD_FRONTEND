import { useEffect, useState } from "react";
import { getDoctorConfig, getDoctorsRequest } from "../api/api";
import { useAuth } from "../context/AuthContext";

export const useDoctors = (idDoctor) => {
  const { user } = useAuth();
  const [filtered, setFiltered] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [docConfigs, setDocConfigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await getDoctorsRequest(user.token);
      setDoctors(response.data);
      setLoading(false);
    })();
    if (user.is_doctor && !user.is_admin) {
      (async () => {
        const response = await getDoctorConfig(user.idDoctor, user.token);
        setDocConfigs(response.data);
      })();
    }
  }, [loading, user.token]);

  useEffect(() => {
    if (user.is_admin) {
      if (idDoctor === undefined || !idDoctor) return;
      (async () => {
        const response = await getDoctorConfig(docConfigs === 'all' ? 0 : idDoctor, user.token);
        setDocConfigs(response.data);
      })();
    }
  }, [idDoctor]);

  const filterDoctors = (value) => {
    setFiltered(
      doctors.filter((val) => {
        if (value === "") {
          return val;
        } else if (
          val.Nombre.toLowerCase().includes(
            value.toLowerCase()
          ) ||
          val.ApellidoP.toLowerCase().includes(
            value.toLowerCase()
          ) ||
          val.ApellidoM.toLowerCase().includes(
            value.toLowerCase()
          )
        ) {
          return val;
        }
      })
    );
  };

  return {
    docConfigs,
    doctors,
    filtered,
    loading,
    setLoading,
    filterDoctors,
  };
};
