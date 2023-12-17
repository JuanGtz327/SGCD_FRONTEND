import { Input, Select, Option, Button } from "@material-tailwind/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { editDoctorRequest } from "../../../api/api";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../hooks/useToast";
import Loader from "../../../common/Loader";

const DatosPersonales = ({ doctor, doctorID }) => {
  const { user } = useAuth();
  const [editingData, setEditingData] = useState(doctor);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = handleSubmit(async () => {
    const citaPaylaod = {
      Nombre: editingData.Nombre,
      ApellidoP: editingData.ApellidoP,
      ApellidoM: editingData.ApellidoM,
      CURP: editingData.CURP,
      Cedula: editingData.Cedula,
      Especialidad: editingData.Especialidad,
      DomicilioPayload: {
        Telefono: editingData.Domicilio.Telefono,
        Estado: editingData.Domicilio.Estado,
        Municipio: editingData.Domicilio.Municipio,
        Colonia: editingData.Domicilio.Colonia,
        CP: editingData.Domicilio.CP,
        Calle: editingData.Domicilio.Calle,
        Num_ext: editingData.Domicilio.Num_ext,
        Num_int: editingData.Domicilio.Num_int,
      },
    };

    try {
      setLoading(true);
      await editDoctorRequest(doctorID, citaPaylaod, user.token);
      showToast("success", "Doctor actualizado");
    } catch (error) {
      showToast("error", error.response.data.message);
      return;
    }
    setLoading(false);
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Datos personales
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            En este apartado debe incluir la información personal de su doctor.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between md:justify-start md:gap-5">
          {!loading ? (
            <>
              <Link
                to={`${
                  import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173/"
                }doctor/${doctorID}`}
              >
                <Button className="mt-5 w-full bg-cerise-500" color="blue">
                  Volver
                </Button>
              </Link>
              <Button type="submit" className="w-fit mt-5" color="blue">
                Actualizar
              </Button>
            </>
          ) : (
            <Loader top="mt-0" />
          )}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="mt-2">
            <Input
              color="blue"
              size="lg"
              label="Nombre"
              value={editingData.Nombre}
              type="text"
              variant="standard"
              {...register("Nombre", { required: true })}
              error={errors.Nombre ? true : false}
              onChange={(event) =>
                setEditingData({
                  ...editingData,
                  [event.target.name]: event.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="mt-2">
            <Input
              color="blue"
              size="lg"
              label="Apellido paterno"
              value={editingData.ApellidoP}
              maxLength={15}
              type="text"
              variant="standard"
              {...register("ApellidoP", { required: true })}
              error={errors.ApellidoP ? true : false}
              onChange={(event) =>
                setEditingData({
                  ...editingData,
                  [event.target.name]: event.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="mt-2">
            <Input
              color="blue"
              size="lg"
              label="Apellido materno"
              value={editingData.ApellidoM}
              maxLength={15}
              type="text"
              variant="standard"
              {...register("ApellidoM", { required: true })}
              error={errors.ApellidoM ? true : false}
              onChange={(event) =>
                setEditingData({
                  ...editingData,
                  [event.target.name]: event.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="mt-2">
            <Input
              color="blue"
              label="CURP"
              value={editingData.CURP}
              maxLength={18}
              variant="standard"
              size="lg"
              type="text"
              {...register("CURP", { required: true })}
              pattern="^[A-Z]{4}[0-9]{6}[HM][A-Z0-9]{7}$"
              error={errors.CURP ? true : false}
              onChange={(event) =>
                setEditingData({
                  ...editingData,
                  [event.target.name]: event.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="mt-2">
            <Input
              color="blue"
              label="Cédula profesional"
              value={editingData.Cedula}
              maxLength={8}
              variant="standard"
              size="lg"
              type="text"
              {...register("Cedula", { required: true })}
              error={errors.Cedula ? true : false}
              onChange={(event) =>
                setEditingData({
                  ...editingData,
                  [event.target.name]: event.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="mt-2">
            <Controller
              name="Especialidad"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Especialidad"
                  size="lg"
                  variant="standard"
                  color="blue"
                  value={editingData.Especialidad}
                  onChange={(event) =>
                    setEditingData({
                      ...editingData,
                      Especialidad: event,
                    })
                  }
                >
                  <Option value="Medicina Interna">Medicina Interna</Option>
                  <Option value="Cirugía General">Cirugía General</Option>
                  <Option value="Ginecología y Obstetricia">
                    Ginecología y Obstetricia
                  </Option>
                  <Option value="Pediatría">Pediatría</Option>
                  <Option value="Cardiología">Cardiología</Option>
                  <Option value="Ortopedia y Traumatología">
                    Ortopedia y Traumatología
                  </Option>
                  <Option value="Dermatología">Dermatología</Option>
                  <Option value="Oftalmología">Oftalmología</Option>
                  <Option value="Otorrinolaringología">
                    Otorrinolaringología
                  </Option>
                  <Option value="Psiquiatría">Psiquiatría</Option>
                  <Option value="Anestesiología">Anestesiología</Option>
                  <Option value="Radiología">Radiología</Option>
                </Select>
              )}
            />
          </div>
        </div>
      </div>

      <h2 className="text-base font-semibold leading-7 text-gray-900 mt-20">
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
              color="blue"
              size="lg"
              label="Número telefónico"
              value={editingData.Domicilio.Telefono}
              variant="standard"
              type="number"
              {...register("Telefono", { required: true })}
              error={errors.Telefono ? true : false}
              onChange={(event) =>
                setEditingData({
                  ...editingData,
                  Domicilio: {
                    ...editingData.Domicilio,
                    [event.target.name]: event.target.value,
                  },
                })
              }
            />
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="mt-2">
            <Input
              color="blue"
              label="Estado"
              value={editingData.Domicilio.Estado}
              maxLength={18}
              variant="standard"
              size="lg"
              type="text"
              {...register("Estado", { required: true })}
              error={errors.Estado ? true : false}
              onChange={(event) =>
                setEditingData({
                  ...editingData,
                  Domicilio: {
                    ...editingData.Domicilio,
                    [event.target.name]: event.target.value,
                  },
                })
              }
            />
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="mt-2">
            <Input
              color="blue"
              label="Municipio"
              value={editingData.Domicilio.Municipio}
              maxLength={18}
              variant="standard"
              size="lg"
              type="text"
              {...register("Municipio", { required: true })}
              error={errors.Municipio ? true : false}
              onChange={(event) =>
                setEditingData({
                  ...editingData,
                  Domicilio: {
                    ...editingData.Domicilio,
                    [event.target.name]: event.target.value,
                  },
                })
              }
            />
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="mt-2">
            <Input
              color="blue"
              label="Colonia"
              value={editingData.Domicilio.Colonia}
              maxLength={18}
              variant="standard"
              size="lg"
              type="text"
              {...register("Colonia", { required: true })}
              error={errors.Colonia ? true : false}
              onChange={(event) =>
                setEditingData({
                  ...editingData,
                  Domicilio: {
                    ...editingData.Domicilio,
                    [event.target.name]: event.target.value,
                  },
                })
              }
            />
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="mt-2">
            <Input
              color="blue"
              size="lg"
              label="Código postal"
              value={editingData.Domicilio.CP}
              type="number"
              variant="standard"
              {...register("CP", { required: true })}
              error={errors.CP ? true : false}
              onChange={(event) =>
                setEditingData({
                  ...editingData,
                  Domicilio: {
                    ...editingData.Domicilio,
                    [event.target.name]: event.target.value,
                  },
                })
              }
            />
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="mt-2">
            <Input
              color="blue"
              size="lg"
              label="Calle"
              value={editingData.Domicilio.Calle}
              type="text"
              variant="standard"
              {...register("Calle", { required: true })}
              error={errors.Calle ? true : false}
              onChange={(event) =>
                setEditingData({
                  ...editingData,
                  Domicilio: {
                    ...editingData.Domicilio,
                    [event.target.name]: event.target.value,
                  },
                })
              }
            />
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="mt-2">
            <Input
              color="blue"
              size="lg"
              label="Numero exterior"
              value={editingData.Domicilio.Num_ext}
              maxLength={5}
              type="text"
              variant="standard"
              {...register("Num_ext", { required: true })}
              error={errors.Num_ext ? true : false}
              onChange={(event) =>
                setEditingData({
                  ...editingData,
                  Domicilio: {
                    ...editingData.Domicilio,
                    [event.target.name]: event.target.value,
                  },
                })
              }
            />
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="mt-2">
            <Input
              color="blue"
              size="lg"
              label="Numero interior"
              value={editingData.Domicilio.Num_int}
              maxLength={5}
              type="text"
              variant="standard"
              {...register("Num_int", { required: true })}
              error={errors.Num_int ? true : false}
              onChange={(event) =>
                setEditingData({
                  ...editingData,
                  Domicilio: {
                    ...editingData.Domicilio,
                    [event.target.name]: event.target.value,
                  },
                })
              }
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default DatosPersonales;
