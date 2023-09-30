import {
  Card,
  Input,
  Select,
  Option,
  Textarea,
  ListItemPrefix,
  ListItem,
  List,
  Checkbox,
  Typography,
  Switch,
} from "@material-tailwind/react";
import React from "react";

const ExamenFisico = ({ register, Controller, control, errors }) => {
  return (
    <>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Examen Fisico
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        En este apartado debe incluir las mediciones clincias de su paciente.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <div className="mt-2 relative flex">
            <Input
              size="lg"
              label="Peso"
              type="number"
              variant="standard"
              className="pr-8"
              {...register("Peso", { required: true })}
              error={errors.Peso ? true : false}
            />
            <Typography
              variant="small"
              color="gray"
              className="font-normal !absolute right-1 bottom-0 transform -translate-y-1/2"
            >
              kg
            </Typography>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="mt-2 relative flex">
            <Input
              size="lg"
              label="Estatura"
              type="number"
              variant="standard"
              className="pr-8"
              {...register("Estatura", { required: true })}
              error={errors.Estatura ? true : false}
            />
            <Typography
              variant="small"
              color="gray"
              className="font-normal !absolute right-1 bottom-0 transform -translate-y-1/2"
            >
              cm
            </Typography>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="mt-2 relative flex">
            <Input
              size="lg"
              label="Presion Arterial"
              type="number"
              variant="standard"
              className="pr-16"
              {...register("Presion_arterial", { required: true })}
              error={errors.Presion_arterial ? true : false}
            />
            <Typography
              variant="small"
              color="gray"
              className="font-normal !absolute right-1 bottom-0 transform -translate-y-1/2"
            >
              (mm Hg)
            </Typography>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="mt-2 relative flex">
            <Input
              size="lg"
              label="Frecuencia Cardiaca"
              type="number"
              variant="standard"
              className="pr-24"
              {...register("Frecuencia_cardiaca", { required: true })}
              error={errors.Frecuencia_cardiaca ? true : false}
            />
            <Typography
              variant="small"
              color="gray"
              className="font-normal !absolute right-1 bottom-0 transform -translate-y-1/2"
            >
              (latidos/min)
            </Typography>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="mt-2 relative flex">
            <Input
              size="lg"
              label="Frecuencia Respiratoria"
              type="number"
              variant="standard"
              className="pr-36"
              {...register("Frecuencia_respiratoria", { required: true })}
              error={errors.Frecuencia_respiratoria ? true : false}
            />
            <Typography
              variant="small"
              color="gray"
              className="font-normal !absolute right-1 bottom-0 transform -translate-y-1/2"
            >
              (respiraciones/min)
            </Typography>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="mt-2 relative flex">
            <Input
              size="lg"
              label="Temperatura"
              type="number"
              variant="standard"
              className="pr-24"
              {...register("Temperatura", { required: true })}
              error={errors.Temperatura ? true : false}
            />
            <Typography
              variant="small"
              color="gray"
              className="font-normal !absolute right-1 bottom-0 transform -translate-y-1/2"
            >
              °C
            </Typography>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="mt-2 relative flex">
            <Input
              size="lg"
              label="Grupo Sanquineo"
              type="text"
              variant="standard"
              {...register("Grupo_sanguinieo", { required: true })}
              error={errors.Grupo_sanguinieo ? true : false}
            />
          </div>
        </div>
      </div>

      <div className="lg:col-span-full">
        <h2 className="mt-16 text-base font-semibold leading-7 text-gray-900">
          Detalles del examen fisico
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          En este apartado puede incluir mas detalles del examen medico de su paciente.
        </p>
        <div className="mt-6">
          <Textarea
            variant="standard"
            label="Detalle de examen fisico"
            rows={9}
            {...register("Detalles", { required: true })}
            error={errors.Detalles ? true : false}
          />
        </div>
      </div>
    </>
  );
};

export default ExamenFisico;
