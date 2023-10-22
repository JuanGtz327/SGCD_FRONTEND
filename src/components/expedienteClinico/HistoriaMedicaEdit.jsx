import {
  Textarea,
  Checkbox,
  Typography,
  Switch,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import { editHistoriaMedicaRequest } from "../../api/api";

const HistoriaMedicaEdit = ({ data }) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [editingData, setEditingData] = useState(data);
  const [habitosNegativos, setHabitosNegativos] = useState([]);
  const [habitosPositivos, setHabitosPositivos] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleInputChange = (event) => {
    setEditingData({
      ...editingData,
      [event.target.name]: event.target.value,
    });
  };

  const onEditSubmit = handleSubmit(async (values) => {
    let habitos_salud = [...habitosPositivos, ...habitosNegativos];
    if (habitos_salud.length === 0) {
      habitos_salud = ["Ninguno"];
    }
    values.Habitos_salud = habitos_salud.join(",");
    const res = await editHistoriaMedicaRequest(data.id,values,user.token);
    if (res.status !== 200) {
      showToast("error", "Ocurrio un error al actualizar la historia medica");
      return;
    }
    showToast("success", "Historia Medica actualizada");
  });

  const onNewHP = (newHN, adding) => {
    if (adding) {
      setHabitosPositivos([...habitosPositivos, newHN]);
      return;
    } else {
      setHabitosPositivos(habitosPositivos.filter((item) => item !== newHN));
      return;
    }
  };

  const onNewHN = (newHN, adding) => {
    if (adding) {
      setHabitosNegativos([...habitosNegativos, newHN]);
      return;
    } else {
      setHabitosNegativos(habitosNegativos.filter((item) => item !== newHN));
      return;
    }
  };

  return (
    <>
      <h2 className="text-base font-semibold leading-7 text-gray-900 md:mt-5">
        Historia Medica
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        En este apartado debe incluir la informacion medica por la que su
        paciente ha pasado.
      </p>

      <form onSubmit={onEditSubmit}>
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 xl:grid-cols-6">
          <div className="xl:col-span-3">
            <div className="mt-2">
              <Textarea
                value={editingData.Enfermedades_hereditarias}
                variant="standard"
                label="Enfermedades Hereditarias"
                {...register("Enfermedades_hereditarias", { required: true })}
                error={errors.Enfermedades_hereditarias ? true : false}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="xl:col-span-3">
            <div className="mt-2">
              <Textarea
                value={editingData.Enfermedades_previas}
                variant="standard"
                label="Enfermedades Previas"
                {...register("Enfermedades_previas", { required: true })}
                error={errors.Enfermedades_previas ? true : false}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="xl:col-span-3">
            <div className="mt-2">
              <Textarea
                value={editingData.Cirugias}
                variant="standard"
                label="Cirugias"
                {...register("Cirugias", { required: true })}
                error={errors.Cirugias ? true : false}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="xl:col-span-3">
            <div className="mt-2">
              <Textarea
                value={editingData.Alergias}
                variant="standard"
                label="Alergias"
                {...register("Alergias", { required: true })}
                error={errors.Alergias ? true : false}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="xl:col-span-3">
            <div className="mt-2">
              <Textarea
                value={editingData.Traumatismos}
                variant="standard"
                label="Traumatismos"
                {...register("Traumatismos", { required: true })}
                error={errors.Traumatismos ? true : false}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="xl:col-span-3">
            <div className="mt-2">
              <div className="w-fit mx-auto mt-8">
                <Switch
                  crossOrigin={undefined}
                  checked={editingData.Vacunas}
                  onClick={(e) => {
                    setEditingData({
                      ...editingData,
                      Vacunas: e.target.checked,
                    });
                  }}
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
                  checked={habitosNegativos.includes("Tabaquismo")}
                  color="indigo"
                  value="Tabaquismo"
                  onChange={(e) => {
                    onNewHN(e.target.value, e.target.checked);
                  }}
                  crossOrigin={undefined}
                />
                <Typography color="gray" className="self-center">
                  Tabaquismo
                </Typography>
              </div>
              <div className="flex">
                <Checkbox
                  checked={habitosNegativos.includes("Alcohol")}
                  color="indigo"
                  value="Alcohol"
                  onChange={(e) => {
                    onNewHN(e.target.value, e.target.checked);
                  }}
                  crossOrigin={undefined}
                />
                <Typography color="gray" className="self-center">
                  Consume Alcohol
                </Typography>
              </div>
              <div className="flex">
                <Checkbox
                  checked={habitosNegativos.includes("Drogas")}
                  color="indigo"
                  value="Drogas"
                  onChange={(e) => {
                    onNewHN(e.target.value, e.target.checked);
                  }}
                  crossOrigin={undefined}
                />
                <Typography color="gray" className="self-center">
                  Consume Drogas
                </Typography>
              </div>
              <div className="flex">
                <Checkbox
                  checked={habitosNegativos.includes("No_dormir")}
                  color="indigo"
                  value="No_dormir"
                  onChange={(e) => {
                    onNewHN(e.target.value, e.target.checked);
                  }}
                  crossOrigin={undefined}
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
                  checked={habitosPositivos.includes("Dieta")}
                  color="indigo"
                  value="Dieta"
                  onChange={(e) => {
                    onNewHP(e.target.value, e.target.checked);
                  }}
                  crossOrigin={undefined}
                />
                <Typography color="gray" className="self-center">
                  Dieta Equilibrada
                </Typography>
              </div>
              <div className="flex">
                <Checkbox
                  checked={habitosPositivos.includes("Ejercicio")}
                  color="indigo"
                  value="Ejercicio"
                  onChange={(e) => {
                    onNewHP(e.target.value, e.target.checked);
                  }}
                  crossOrigin={undefined}
                />
                <Typography color="gray" className="self-center">
                  Ejercicio Regular
                </Typography>
              </div>
              <div className="flex">
                <Checkbox
                  checked={habitosPositivos.includes("Higiene")}
                  color="indigo"
                  value="Higiene"
                  onChange={(e) => {
                    onNewHP(e.target.value, e.target.checked);
                  }}
                  crossOrigin={undefined}
                />
                <Typography color="gray" className="self-center">
                  Higiene Personal
                </Typography>
              </div>
              <div className="flex">
                <Checkbox
                  checked={habitosPositivos.includes("Autocuidado")}
                  color="indigo"
                  value="Autocuidado"
                  onChange={(e) => {
                    onNewHP(e.target.value, e.target.checked);
                  }}
                  crossOrigin={undefined}
                />
                <Typography color="gray" className="self-center">
                  Autocuidado
                </Typography>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between md:justify-start md:gap-5 md:mt-10">
          <Link
            to={`${
              import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173/"
            }patient/2`}
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

export default HistoriaMedicaEdit;
