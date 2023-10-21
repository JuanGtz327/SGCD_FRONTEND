import {
  Textarea,
  Checkbox,
  Typography,
  Switch,
} from "@material-tailwind/react";

const HistoriaMedica = ({ register, errors, onNewHN, onNewHP }) => {
  return (
    <>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Historia Medica
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        En este apartado debe incluir la informacion medica por la que su
        paciente ha pasado.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 xl:grid-cols-6">
        <div className="xl:col-span-3">
          <div className="mt-2">
            <Textarea
              variant="standard"
              label="Enfermedades Hereditarias"
              {...register("Enfermedades_hereditarias", { required: true })}
              error={errors.Enfermedades_hereditarias ? true : false}
            />
          </div>
        </div>
        <div className="xl:col-span-3">
          <div className="mt-2">
            <Textarea
              variant="standard"
              label="Enfermedades Previas"
              {...register("Enfermedades_previas", { required: true })}
              error={errors.Enfermedades_previas ? true : false}
            />
          </div>
        </div>
        <div className="xl:col-span-3">
          <div className="mt-2">
            <Textarea
              variant="standard"
              label="Cirugias"
              {...register("Cirugias", { required: true })}
              error={errors.Cirugias ? true : false}
            />
          </div>
        </div>
        <div className="xl:col-span-3">
          <div className="mt-2">
            <Textarea
              variant="standard"
              label="Alergias"
              {...register("Alergias", { required: true })}
              error={errors.Alergias ? true : false}
            />
          </div>
        </div>
        <div className="xl:col-span-3">
          <div className="mt-2">
            <Textarea
              variant="standard"
              label="Traumatismos"
              {...register("Traumatismos", { required: true })}
              error={errors.Traumatismos ? true : false}
            />
          </div>
        </div>
        <div className="xl:col-span-3">
          <div className="mt-2">
            <div className="w-fit mx-auto mt-8">
              <Switch
                label={
                  <div>
                    <Typography color="blue-gray" className="font-medium">
                      Vacunas
                    </Typography>
                    <Typography
                      variant="small"
                      color={errors.Vacunas ? "red" : "gray"}
                      className="font-normal"
                    >
                      El paciente cuenta con las vacunas escenciales.
                    </Typography>
                  </div>
                }
                {...register("Vacunas")}
                color="indigo"
              />
            </div>
          </div>
        </div>
        <div className="xl:col-span-3">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Habitos Negativos
          </h2>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6">
            <div className="flex">
              <Checkbox
                color="indigo"
                value="Tabaquismo"
                onChange={(e) => {
                  onNewHN(e.target.value, e.target.checked);
                }}
              />
              <Typography color="gray" className="self-center">
                Tabaquismo
              </Typography>
            </div>
            <div className="flex">
              <Checkbox
                color="indigo"
                value="Alcohol"
                onChange={(e) => {
                  onNewHN(e.target.value, e.target.checked);
                }}
              />
              <Typography color="gray" className="self-center">
                Consume Alcohol
              </Typography>
            </div>
            <div className="flex">
              <Checkbox
                color="indigo"
                value="Drogas"
                onChange={(e) => {
                  onNewHN(e.target.value, e.target.checked);
                }}
              />
              <Typography color="gray" className="self-center">
                Consume Drogas
              </Typography>
            </div>
            <div className="flex">
              <Checkbox
                color="indigo"
                value="No_dormir"
                onChange={(e) => {
                  onNewHN(e.target.value, e.target.checked);
                }}
              />
              <Typography color="gray" className="self-center">
                No dormir
              </Typography>
            </div>
          </div>
        </div>
        <div className="xl:col-span-3">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Habitos Positivos
          </h2>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6">
            <div className="flex">
              <Checkbox
                color="indigo"
                value="Dieta"
                onChange={(e) => {
                  onNewHP(e.target.value, e.target.checked);
                }}
              />
              <Typography color="gray" className="self-center">
                Dieta Equilibrada
              </Typography>
            </div>
            <div className="flex">
              <Checkbox
                color="indigo"
                value="Ejercicio"
                onChange={(e) => {
                  onNewHP(e.target.value, e.target.checked);
                }}
              />
              <Typography color="gray" className="self-center">
                Ejercicio Regular
              </Typography>
            </div>
            <div className="flex">
              <Checkbox
                color="indigo"
                value="Higiene"
                onChange={(e) => {
                  onNewHP(e.target.value, e.target.checked);
                }}
              />
              <Typography color="gray" className="self-center">
                Higiene Personal
              </Typography>
            </div>
            <div className="flex">
              <Checkbox
                color="indigo"
                value="Autocuidado"
                onChange={(e) => {
                  onNewHP(e.target.value, e.target.checked);
                }}
              />
              <Typography color="gray" className="self-center">
                Autocuidado
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoriaMedica;
