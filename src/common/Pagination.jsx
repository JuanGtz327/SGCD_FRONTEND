import { IconButton, Button } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const Pagination = ({ prev, currentPage, pageCount, next, getItemProps }) => {
  return (
    <>
      {pageCount > 1 && (
        <div className="flex justify-center items-center h-full">
          <div className="lg:absolute lg:bottom-10 w-fit">
            <div className="flex items-center justify-center gap-4 mt-10">
              <Button
                className="flex items-center gap-2"
                color="blue"
                onClick={prev}
                disabled={currentPage === 1}
              >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Anterior
              </Button>
              <div className="hidden md:flex items-center gap-2">
                {Array.from({ length: pageCount }).map((_, index) => (
                  <IconButton
                    key={index}
                    {...getItemProps(index + 1)}
                    className={`${
                      currentPage === index + 1
                        ? "bg-blue-400 text-gray-100"
                        : "bg-blue-100 text-gray-900"
                    }  text-sm`}
                  >
                    {index + 1}
                  </IconButton>
                ))}
              </div>
              <Button
                className="flex items-center gap-2"
                color="blue"
                onClick={next}
                disabled={currentPage === pageCount}
              >
                Siguiente
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Pagination;
