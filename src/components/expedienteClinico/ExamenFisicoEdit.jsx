import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useToast } from "../../hooks/useToast";
import { useState } from "react";
import { Link } from "react-router-dom";
import { editExamenFisicoRequest } from "../../api/api";
import { useAuth } from "../../context/AuthContext";

const ExamenFisicoEdit = ({ data, patientID }) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [editingData, setEditingData] = useState(data);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleInputChange = (event) => {
    if (event.target.name === "Detalles") {
      setEditingData({
        ...editingData,
        Exploracion_detallada: event.target.value,
      });
      return;
    }
    setEditingData({
      ...editingData,
      [event.target.name]: event.target.value,
    });
  };

  const onEditSubmit = handleSubmit(async (values) => {
    const res = await editExamenFisicoRequest(data.id, values, user.token);
    if (res.status !== 200) {
      showToast("error", "Ocurrio un error al actualizar el examen fisico");
      return;
    }
    showToast("success", "Examen Fisico actualizado");
  });

  return (
    <>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Examen Fisico
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        En este apartado debe incluir las mediciones clincias de su paciente.
      </p>

      <form onSubmit={onEditSubmit}>
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <div className="mt-2 relative flex">
              <Input
                value={editingData.Peso}
                size="lg"
                label="Peso"
                type="number"
                variant="standard"
                className="pr-8"
                {...register("Peso", { required: true })}
                error={errors.Peso ? true : false}
                onChange={handleInputChange}
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
                value={editingData.Estatura}
                size="lg"
                label="Estatura"
                type="number"
                variant="standard"
                className="pr-8"
                {...register("Estatura", { required: true })}
                error={errors.Estatura ? true : false}
                onChange={handleInputChange}
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
                value={editingData.Presion_arterial}
                size="lg"
                label="Presion Arterial"
                type="number"
                variant="standard"
                className="pr-16"
                {...register("Presion_arterial", { required: true })}
                error={errors.Presion_arterial ? true : false}
                onChange={handleInputChange}
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
                value={editingData.Frecuencia_cardiaca}
                size="lg"
                label="Frecuencia Cardiaca"
                type="number"
                variant="standard"
                className="pr-24"
                {...register("Frecuencia_cardiaca", { required: true })}
                error={errors.Frecuencia_cardiaca ? true : false}
                onChange={handleInputChange}
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
                value={editingData.Frecuencia_respiratoria}
                size="lg"
                label="Frecuencia Respiratoria"
                type="number"
                variant="standard"
                className="pr-36"
                {...register("Frecuencia_respiratoria", { required: true })}
                error={errors.Frecuencia_respiratoria ? true : false}
                onChange={handleInputChange}
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
                value={editingData.Temperatura}
                size="lg"
                label="Temperatura"
                type="number"
                variant="standard"
                className="pr-24"
                {...register("Temperatura", { required: true })}
                error={errors.Temperatura ? true : false}
                onChange={handleInputChange}
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
                value={editingData.Grupo_sanguineo}
                size="lg"
                label="Grupo Sanquineo"
                type="text"
                variant="standard"
                {...register("Grupo_sanguineo", { required: true })}
                error={errors.Grupo_sanguinieo ? true : false}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-full">
          <h2 className="mt-16 text-base font-semibold leading-7 text-gray-900">
            Detalles del examen fisico
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            En este apartado puede incluir mas detalles del examen medico de su
            paciente.
          </p>
          <div className="mt-6">
            <Textarea
              value={editingData.Exploracion_detallada}
              variant="standard"
              label="Detalle de examen fisico"
              rows={9}
              {...register("Exploracion_detallada", { required: true })}
              error={errors.Exploracion_detallada ? true : false}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex justify-between md:justify-start md:gap-5 md:mt-10">
          <Link
            to={`${
              import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173/"
            }patient/${patientID}`}
          >
            <Button className="mt-5 w-fit bg-cerise-500" color="blue">
              Cancelar
            </Button>
          </Link>
          <Button type="submit" className="w-fit mt-5" color="blue">
            Actualizar
          </Button>
        </div>
      </form>
    </>
  );
};

export default ExamenFisicoEdit;
