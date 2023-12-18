import {
  Card,
  CardHeader,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import fondo from "../assets/fondo.svg";
import { TbError404 } from "react-icons/tb";
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <>
      <div className="flex w-full h-full">
        <div className="px-5 w-full my-auto z-10">
          <Card
            className="shadow-lg mx-auto max-w-[400px] px-0 sm:px-5 md:py-2 h-auto"
            color="white"
          >
            <CardHeader
              variant="gradient"
              className="grid h-28 place-items-center bgClinic"
            >
              <Typography variant="h4" color="white">
                SGCD
              </Typography>
            </CardHeader>
            <CardBody className="py-12">
              <TbError404 className="h-16 w-16 mx-auto" />
              <Typography color="gray">
                <h1 className="text-4xl font-bold text-center">
                  No se encontró
                </h1>
              </Typography>

              <Typography color="gray">
                <h1 className="mt-5 text-base text-center">
                  La página que buscas no existe
                </h1>
              </Typography>

              <Typography color="gray">
                <Link to="/main">
                  <h1 className="mt-5 text-base text-center text-blue-500">
                    Volver a la página principal
                  </h1>
                </Link>
              </Typography>
            </CardBody>
          </Card>
        </div>
        <div className="absolute w-full h-full">
          <svg className="w-full h-full">
            <image href={fondo} className="2xl:w-full 2xl:h-full" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default Notfound;
