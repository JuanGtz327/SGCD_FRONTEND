import { useEffect, useState } from "react";
import { getDoctorsRequest } from "../api/api";
import { useAuth } from "../context/AuthContext";

export const useDoctors = () => {
  const {user} = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 6;
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);

  useEffect(() => {
    (async () => {
      const response = await getDoctorsRequest(user.token);
      setDoctors(response.data);
      setTotalItems(response.data.length);
      setPageCount(Math.ceil(response.data.length / itemsPerPage));
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await getDoctorsRequest(user.token);
      setDoctors(response.data);
      setTotalItems(response.data.length);
      setPageCount(Math.ceil(response.data.length / itemsPerPage));
      setLoading(false);
    })();
  }, [loading]);

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

  const doctorsToDisplay = doctors.slice(startIndex, endIndex + 1);

  return {
    doctorsToDisplay,
    pageCount,
    currentPage,
    loading,
    setLoading,
    getItemProps,
    next,
    prev,
  };
};
