import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getPatientsRequest } from "../api/api";

export const usePatients = () => {
  const { user } = useAuth();
  const [pacientes, setPacientes] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const [loading, setLoading] = useState(true);

  const itemsPerPage = 4;
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);

  useEffect(() => {
    (async () => {
      const response = await getPatientsRequest(user.token);
      setPacientes(response.data);
      setTotalItems(response.data.length);
      setPageCount(Math.ceil(response.data.length / itemsPerPage));
      setLoading(false);
    })();
  }, []);

  const getItemProps = (index) => ({
    variant: currentPage === index ? "filled" : "text",
    color: "white",
    onClick: () => setCurrentPage(index),
  });

  const next = () => {
    if (currentPage === pageCount) return;
    setCurrentPage(currentPage + 1);
  };

  const prev = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    (async () => {
      const response = await getPatientsRequest(user.token);
      setPacientes(response.data);
      setTotalItems(response.data.length);
      setPageCount(Math.ceil(response.data.length / itemsPerPage));
      setLoading(false);
    })();
  }, [loading]);

  const pacientesToDisplay = pacientes.slice(startIndex, endIndex + 1);

  return {
    pacientes,
    pacientesToDisplay,
    loading,
    setLoading,
    next,
    prev,
    currentPage,
    pageCount,
    getItemProps,
  };
};
