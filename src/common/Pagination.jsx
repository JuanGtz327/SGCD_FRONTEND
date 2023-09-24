import React from "react";
import { IconButton, Button } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const Pagination = ({ prev, currentPage, pageCount, next, getItemProps }) => {
  return (
    <div className="absolute bottom-10 left-[48.5%]">
      <div className="flex items-center gap-4 mt-10">
        <Button
          className="flex items-center gap-2"
          onClick={prev}
          disabled={currentPage === 1}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Anterior
        </Button>
        <div className="flex items-center gap-2">
          {Array.from({ length: pageCount }).map((_, index) => (
            <IconButton key={index} {...getItemProps(index + 1)}>
              {index + 1}
            </IconButton>
          ))}
        </div>
        <Button
          className="flex items-center gap-2"
          onClick={next}
          disabled={currentPage === pageCount}
        >
          Siguiente
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
