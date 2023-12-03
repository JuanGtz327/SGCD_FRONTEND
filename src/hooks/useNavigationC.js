import { useEffect, useState } from "react";

export const useNavigationC = (data,itemsPerPageVar=3) => {
  const itemsPerPage = itemsPerPageVar;
  const [totalItems, setTotalItems] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [infoToDisplay, setInfoToDisplay] = useState([]);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);

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
    if(!data) return;
    setTotalItems(data.length);
    setPageCount(Math.ceil(data.length / itemsPerPage));
    setInfoToDisplay(data.slice(startIndex, endIndex + 1));
  }, [data,currentPage,startIndex,endIndex]);

  return {
    infoToDisplay,
    next,
    prev,
    currentPage,
    pageCount,
    getItemProps
  }
}