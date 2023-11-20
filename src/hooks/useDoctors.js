import { useEffect, useState } from "react";
import { getDoctorConfig, getDoctorRequest, getDoctorsRequest, getPatientDoctorsRequest } from "../api/api";
import { useAuth } from "../context/AuthContext";

export const useDoctors = (idDoctor) => {
  const { user } = useAuth();
  const [filtered, setFiltered] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [docConfigs, setDocConfigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user.is_doctor) {
      (async () => {
        const response = await getPatientDoctorsRequest(user.idPaciente,user.token);
        setDoctors(response.data);
        setLoading(false);
      })();
      return;
    }
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
    if (!user.is_admin && !user.is_doctor) {
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

  const getDoctor = async (doctorID) => {
    setLoading(true);
    const response = await getDoctorRequest(doctorID, user.token);
    setLoading(false);
    return response.data;
  };

  return {
    docConfigs,
    doctors,
    filtered,
    loading,
    setLoading,
    filterDoctors,
    getDoctor,
  };
};
