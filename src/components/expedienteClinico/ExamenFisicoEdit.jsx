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
    const showErrors = [];
    const presionRegex = /^\d{2,3}\/\d{2,3}$/;

    if (!presionRegex.test(values.Presion_arterial))
      showErrors.push("El formato de la presion arterial debe ser 00/00");

    //Verificar que el peso sea mayor a 0 y menor a 1000
    if (values.Peso < 0 || values.Peso > 1000)
      showErrors.push("El peso debe ser mayor a 0 y menor a 1000");

    //Verificar que la estatura sea mayor a 0 y menor a 300
    if (values.Estatura < 30 || values.Estatura > 250)
      showErrors.push("La estatura debe ser mayor a 30 y menor a 250");

    //Verificar que la frecuencia cardiaca sea mayor a 0 y menor a 300
    if (values.Frecuencia_cardiaca < 0 || values.Frecuencia_cardiaca > 300)
      showErrors.push(
        "La frecuencia cardiaca debe ser mayor a 0 y menor a 300"
      );

    //Verificar que la frecuencia respiratoria sea mayor a 0 y menor a 300
    if (
      values.Frecuencia_respiratoria < 0 ||
      values.Frecuencia_respiratoria > 300
    )
      showErrors.push(
        "La frecuencia respiratoria debe ser mayor a 0 y menor a 300"
      );

    //Verificar que la temperatura sea mayor a 0 y menor a 100
    if (values.Temperatura < 0 || values.Temperatura > 100)
      showErrors.push("La temperatura debe ser mayor a 0 y menor a 100");

    //Verificar la expresion regular de la temperatura
    const temperaturaRegex = /^\d{2}(\.\d{1})?$/;

    if (!temperaturaRegex.test(values.Temperatura))
      showErrors.push("El formato de la temperatura debe ser 00.0");

    //Verificar que el grupo sanguineo sea valido
    const grupoSanguineoRegex = /^(A|B|AB|O)[+-]$/;

    if (!grupoSanguineoRegex.test(values.Grupo_sanguineo))
      showErrors.push("El grupo sanguineo no es valido, ej: O+");

    if (showErrors.length > 0) {
      for (let i = 0; i < showErrors.length; i++) {
        showToast("error", showErrors[i]);
      }
      return;
    }

    const res = await editExamenFisicoRequest(data.id, values, user.token);
    if (res.status !== 200) {
      showToast("error", "Ocurrio un error al actualizar el examen fisico");
      return;
    }
    showToast("success", "Examen Fisico actualizado");
  });

  return (
    <>
      <h2 className="text-base font-semibold leading-7 text-gray-900 md:mt-5">
        Examen Fisico
      </h2>
      <form onSubmit={onEditSubmit}>
        {!user.idPaciente && (
          <div className="flex items-center justify-between">
            <p className="mt-1 text-sm leading-6 text-gray-600">
              En este apartado debe incluir las mediciones clincias de su
              paciente.
            </p>
            <div className="flex flex-col md:flex-row justify-between md:justify-start md:gap-5">
              <Link
                to={`${
                  import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173/"
                }patient/${patientID}`}
              >
                <Button className="mt-5 w-full bg-cerise-500" color="blue">
                  Volver
                </Button>
              </Link>
              <Button type="submit" className="w-fit mt-5" color="blue">
                Actualizar
              </Button>
            </div>
          </div>
        )}

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
                readOnly={user.idPaciente}
                color="blue"
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
                readOnly={user.idPaciente}
                color="blue"
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
                type="string"
                title="Formato: 120/80"
                variant="standard"
                className="pr-16"
                {...register("Presion_arterial", { required: true })}
                error={errors.Presion_arterial ? true : false}
                onChange={handleInputChange}
                readOnly={user.idPaciente}
                color="blue"
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
                readOnly={user.idPaciente}
                color="blue"
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
                readOnly={user.idPaciente}
                color="blue"
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
                step="any"
                variant="standard"
                className="pr-24"
                {...register("Temperatura", { required: true })}
                error={errors.Temperatura ? true : false}
                onChange={handleInputChange}
                readOnly={user.idPaciente}
                color="blue"
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
                readOnly={user.idPaciente}
                color="blue"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-full">
          {!user.idPaciente && (
            <>
              <h2 className="mt-8 text-base font-semibold leading-7 text-gray-900">
                Detalles del examen fisico
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                En este apartado puede incluir mas detalles del examen medico de
                su paciente.
              </p>
            </>
          )}
          <div className="mt-10">
            <Textarea
              value={editingData.Exploracion_detallada}
              variant="standard"
              label="Detalle de examen fisico"
              color="blue"
              readOnly={user.idPaciente}
              rows={9}
              {...register("Exploracion_detallada", { required: true })}
              error={errors.Exploracion_detallada ? true : false}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default ExamenFisicoEdit;
