import React from "react";
import {
  Input,
  Select,
  Option,
  Typography,
} from "@material-tailwind/react";

const DatosPersonales = ({ register, Controller, control, errors }) => {
  return (
    <>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Datos personales
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        En este apartado debe incluir la informacion personal de su paciente.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="mt-2">
            <Input
              size="lg"
              label="Nombre"
              type="text"
              variant="standard"
              {...register("Nombre", { required: true })}
              error={errors.Nombre ? true : false}
            />
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="mt-2">
            <Input
              size="lg"
              label="Apellido Paterno"
              maxLength={15}
              type="text"
              variant="standard"
              {...register("ApellidoP", { required: true })}
              error={errors.ApellidoP ? true : false}
            />
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="mt-2">
            <Input
              size="lg"
              label="Apellido Materno"
              maxLength={15}
              type="text"
              variant="standard"
              {...register("ApellidoM", { required: true })}
              error={errors.ApellidoM ? true : false}
            />
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="mt-2">
            <Input
              label="CURP"
              maxLength={18}
              variant="standard"
              size="lg"
              type="text"
              {...register("CURP", { required: true })}
              error={errors.CURP ? true : false}
            />
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="mt-2">
            <Input
              label="Fecha de nacimiento"
              maxLength={20}
              variant="standard"
              size="lg"
              type="date"
              {...register("Fecha_nacimiento", { required: true })}
              error={errors.Fecha_nacimiento ? true : false}
            />
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="mt-2">
            <Controller
              name="Genero"
              rules={{ required: true }}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Genero"
                  size="lg"
                  variant="standard"
                  error={errors.Genero ? true : false}
                >
                  <Option value="M">Masculino</Option>
                  <Option value="F">Femenino</Option>
                </Select>
              )}
            />
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="mt-2">
            <Input
              size="lg"
              label="Correo"
              type="email"
              variant="standard"
              {...register("Correo", { required: true })}
              error={errors.Correo ? true : false}
            />
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="mt-2">
            <Input
              size="lg"
              label="Contraseña"
              variant="standard"
              type="password"
              {...register("Password", { required: true })}
              error={errors.Password ? true : false}
            />
          </div>
          <Typography variant="small" className="flex mt-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 mr-1 mt-1"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
            Usa al menos 8 caracteres, una mayuscula y un numero
          </Typography>
        </div>

        <div className="lg:col-span-full">
          <hr className="mt-5" />
        </div>
      </div>

      <h2 className="text-base font-semibold leading-7 text-gray-900 mt-5">
        Domicilio
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        En este apartado debe axenar los datos del domicilio en el que reside su
        paciente.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <div className="mt-2">
            <Input
              size="lg"
              label="Numero Telefonico"
              variant="standard"
              type="number"
              {...register("Telefono", { required: true })}
              error={errors.Telefono ? true : false}
            />
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="mt-2">
            <Input
              label="Estado"
              maxLength={18}
              variant="standard"
              size="lg"
              type="text"
              {...register("Estado", { required: true })}
              error={errors.Estado ? true : false}
            />
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="mt-2">
            <Input
              label="Municipio"
              maxLength={18}
              variant="standard"
              size="lg"
              type="text"
              {...register("Municipio", { required: true })}
              error={errors.Municipio ? true : false}
            />
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="mt-2">
            <Input
              label="Colonia"
              maxLength={18}
              variant="standard"
              size="lg"
              type="text"
              {...register("Colonia", { required: true })}
              error={errors.Colonia ? true : false}
            />
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="mt-2">
            <Input
              size="lg"
              label="Codigo Postal"
              type="number"
              variant="standard"
              {...register("CP", { required: true })}
              error={errors.CP ? true : false}
            />
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="mt-2">
            <Input
              size="lg"
              label="Calle"
              type="text"
              variant="standard"
              {...register("Calle", { required: true })}
              error={errors.Calle ? true : false}
            />
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="mt-2">
            <Input
              size="lg"
              label="Numero Exterior"
              maxLength={5}
              type="text"
              variant="standard"
              {...register("Num_ext", { required: true })}
              error={errors.Num_ext ? true : false}
            />
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="mt-2">
            <Input
              size="lg"
              label="Numero Interior"
              maxLength={5}
              type="text"
              variant="standard"
              {...register("Num_int", { required: true })}
              error={errors.Num_int ? true : false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DatosPersonales;
