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
        Historia medica
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
      En este apartado debe incluir la información médica del paciente, como enfermedades hereditarias, enfermedades previas, cirugías, alergias,
       traumatismos, vacunas, hábitos negativos y positivos.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 xl:grid-cols-6">
        <div className="xl:col-span-3">
          <div className="mt-2">
            <Textarea
              variant="standard"
              color="blue"
              label="Enfermedades hereditarias"
              {...register("Enfermedades_hereditarias", { required: true })}
              error={errors.Enfermedades_hereditarias ? true : false}
            />
          </div>
        </div>
        <div className="xl:col-span-3">
          <div className="mt-2">
            <Textarea
              variant="standard"
              color="blue"
              label="Enfermedades previas"
              {...register("Enfermedades_previas", { required: true })}
              error={errors.Enfermedades_previas ? true : false}
            />
          </div>
        </div>
        <div className="xl:col-span-3">
          <div className="mt-2">
            <Textarea
              variant="standard"
              color="blue"
              label="Cirugías"
              {...register("Cirugias", { required: true })}
              error={errors.Cirugias ? true : false}
            />
          </div>
        </div>
        <div className="xl:col-span-3">
          <div className="mt-2">
            <Textarea
              variant="standard"
              color="blue"
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
              color="blue"
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
                      El paciente cuenta con las vacunas esenciales.
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
            Hábitos negativos
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
                Consume alcohol
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
                Consume drogas
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
            Hábitos positivos
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
                Dieta equilibrada
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
                Ejercicio regular
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
                Higiene personal
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
