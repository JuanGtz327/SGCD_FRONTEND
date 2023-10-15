import { useEffect, useState } from "react";
import { getDoctorsRequest } from "../api/api";
import { useAuth } from "../context/AuthContext";

export const useDoctors = () => {
  const {user} = useAuth();
  const [filtered,setFiltered] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await getDoctorsRequest(user.token);
      setDoctors(response.data);
      setLoading(false);
    })();
  }, [loading, user.token]);

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
    doctors,
    filtered,
    loading,
    setLoading,
    filterDoctors,
  };
};
