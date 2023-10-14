import { Input, Textarea } from "@material-tailwind/react";

const HistoriaClinicaActual = ({ register, errors }) => {
  return (
    <>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Historia Clinica Actual
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        En este apartado se incluyen los motivos de la visita actual.
      </p>
      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="mt-2">
            <Input
              size="lg"
              label="Motivo de la consulta"
              type="text"
              variant="standard"
              {...register("Motivo_consulta", { required: true })}
              error={errors.Motivo_consulta ? true : false}
            />
          </div>
        </div>
        <div className="lg:col-span-4">
          <div className="mt-2">
            <Input
              size="lg"
              label="Fecha inicio de sintomas"
              type="date"
              variant="standard"
              {...register("Fecha_inicio_sintomas", { required: true })}
              error={errors.Fecha_inicio_sintomas ? true : false}
            />
          </div>
        </div>
        <div className="lg:col-span-full">
          <div className="mt-2">
            <Textarea
              variant="standard"
              label="Sintomas"
              {...register("Sintomas", { required: true })}
              rows={8}
              error={errors.Sintomas ? true : false}
            />
          </div>
        </div>
        <div className="lg:col-span-full">
          <div className="mt-2">
            <Textarea
              variant="standard"
              label="Plan de tratamiento"
              rows={8}
              {...register("Plan_tratamiento", { required: true })}
              error={errors.Plan_tratamiento ? true : false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoriaClinicaActual;
