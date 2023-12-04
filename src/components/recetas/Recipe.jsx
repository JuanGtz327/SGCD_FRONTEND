import { Button, Input, Textarea } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { usePatients } from "../../hooks/usePatients";
import { useParams } from "react-router-dom";
import Loader from "../../common/Loader";
import { useToast } from "../../hooks/useToast";
import { useDay } from "../../hooks/useDay";
import {
  addRecetaRequest,
  getHistoriaClinicaActualRequest,
} from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import { BreadCrumbsPag } from "../../common/BreadCrumbsPag";

const Recipe = () => {
  const { user } = useAuth();
  const { patientID, padecimientoID } = useParams();
  const { getPaciente, loading } = usePatients();
  const { showToast } = useToast();
  const { currentDate } = useDay();
  const [paciente, setPaciente] = useState(null);
  const [padecimiento, setPadecimiento] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [loadingRequest, setLoadingRequest] = useState(false);

  useEffect(() => {
    (async () => {
      setPaciente(await getPaciente(patientID));
      const res = await getHistoriaClinicaActualRequest(
        padecimientoID,
        user.token
      );
      setPadecimiento(res.data);
    })();
  }, [patientID, padecimientoID]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const newMedicine = () => {
    setMedicines([
      ...medicines,
      <div
        className="lg:col-span-12 grid lg:grid-cols-12 gap-3"
        key={medicines.length + 1}
      >
        <div className="lg:hidden flex my-1 lg:col-span-12">
          <div className="w-full h-[1px] rounded-full bg-indigo-500 inline-flex"></div>
        </div>
        <div className="lg:col-span-3">
          <Input
            color="blue"
            variant="standard"
            type="text"
            label="Nombre"
            {...register(`Nombre${medicines.length + 2}`, {
              required: true,
            })}
            className="w-full rounded text-base px-3"
          />
        </div>
        <div className="lg:col-span-2">
          <Input
            color="blue"
            variant="standard"
            label="Dosis"
            type="text"
            {...register(`Dosis${medicines.length + 2}`, { required: true })}
            className="w-full rounded text-base px-3"
          />
        </div>
        <div className="lg:col-span-3">
          <Input
            color="blue"
            variant="standard"
            label="Frecuencia"
            type="text"
            {...register(`Frecuencia${medicines.length + 2}`, {
              required: true,
            })}
            className="w-full rounded text-base px-3"
          />
        </div>
        <div className="lg:col-span-3">
          <Input
            color="blue"
            variant="standard"
            label="Via de administracion"
            type="text"
            {...register(`Via_administracion${medicines.length + 2}`, {
              required: true,
            })}
            className="w-full rounded text-base px-3"
          />
        </div>
        <div className="lg:col-span-1 flex items-center justify-center">
          <Button
            className="bg-cerise-500 p-3"
            onClick={() => {
              setMedicines(
                medicines.filter(
                  (medicine, index) => index !== medicines.length
                )
              );
            }}
          >
            <MdClose className="h-5 w-5" />
          </Button>
        </div>
      </div>,
    ]);
  };

  const handleCreateRecipe = handleSubmit(async (data) => {
    setLoadingRequest(true);
    const payload = {
      idPaciente: paciente.id,
      idHistoriaClinicaActual: padecimiento.id,
      Fecha_fin: data.Fecha_fin + "T00:00:00",
      Fecha_inicio: currentDate,
      Firma: data.Firma,
      Indicaciones: data.Indicaciones,
    };

    delete data.Fecha_fin;
    delete data.Firma;
    delete data.idPaciente;
    delete data.Indicaciones;
    delete data.idHC;

    const Medicamentos = {};

    Object.entries(data).forEach(([key, value]) => {
      const match = key.match(/(\D+)(\d+)/); // Encuentra la parte alfabética y numérica del nombre de la propiedad

      if (match) {
        const [, propName, num] = match;
        if (!Medicamentos[num]) {
          Medicamentos[num] = {}; // Crea un objeto para cada sufijo numérico
        }
        Medicamentos[num][propName] = value; // Agrupa las propiedades con el mismo sufijo en un objeto
      }
    });

    payload.Medicamentos = Object.values(Medicamentos);

    try {
      const res = await addRecetaRequest(payload, user.token);
      if (res.status == 200) {
        showToast("success", "Receta generada");
        window.history.back();
        window.open(
          import.meta.env.VITE_API_URL
            ? `${import.meta.env.VITE_API_URL}/admin/recipePDF/${
                res.data.recipe
              }`
            : `http://localhost:8000/admin/recipePDF/${res.data.recipe}`
        );
      }
    } catch (error) {
      showToast("error", error.response.data.message);
    }
    setLoadingRequest(false);
  });

  return (
    <div className="lg:px-16">
      <BreadCrumbsPag show={[1, 2, 3, 5, 10]} idPaciente={patientID}/>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-6 mx-auto">
          <div className="text-center mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
              Nueva Receta
            </h1>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">
              En este apartado puede generar una nueva receta para el paciente
              previamente seleccionado. Debe indicar la fecha de vigencia de la
              receta, los medicamentos y para confirmar debe ingresar su
              contraseña.
            </p>
            <div className="flex mt-6 justify-center">
              <div className="w-64 h-1 rounded-full bg-indigo-500 inline-flex"></div>
            </div>
          </div>
        </div>
      </section>
      {!loading && paciente && padecimiento ? (
        <section className="text-gray-600 body-font bg-white md:shadow-2xl">
          <div className="container md:px-5 py-5 lg:py-12 mx-auto">
            <form onSubmit={handleCreateRecipe}>
              <div className="grid lg:grid-cols-12 gap-5 lg:mx-7">
                <div className="lg:col-span-4">
                  <label className="leading-7 text-sm text-gray-600">
                    Nombre Paciente
                  </label>
                  <Input
                    color="blue"
                    variant="standard"
                    type="text"
                    disabled
                    value={
                      paciente.Nombre +
                      " " +
                      paciente.ApellidoP +
                      " " +
                      paciente.ApellidoM
                    }
                    {...register("idPaciente", { required: false })}
                    className="w-full rounded text-base px-3"
                  />
                </div>
                <div className="lg:col-span-4">
                  <label className="leading-7 text-sm text-gray-600">
                    Diagnostico
                  </label>
                  <Input
                    color="blue"
                    variant="standard"
                    type="text"
                    disabled
                    value={padecimiento.Motivo_consulta}
                    {...register("idHC", { required: false })}
                    className="w-full rounded text-base px-3"
                  />
                </div>
                <div className="lg:col-span-4">
                  <label className="leading-7 text-sm text-gray-600">
                    Fecha de expiracion de la receta
                  </label>
                  <Input
                    color="blue"
                    variant="standard"
                    type="date"
                    {...register("Fecha_fin", { required: true })}
                    error={errors.Fecha_fin ? true : false}
                    className="w-full rounded text-base px-3"
                  />
                </div>
                <div className="flex my-5 lg:col-span-12">
                  <div className="w-full h-[2px] rounded-full bg-indigo-500 inline-flex"></div>
                </div>

                <div className="lg:col-span-12 grid lg:grid-cols-12 gap-3">
                  <div className="lg:col-span-3">
                    <Input
                      color="blue"
                      variant="standard"
                      type="text"
                      label="Medicamento"
                      {...register("Nombre1", { required: true })}
                      error={errors.Nombre1 ? true : false}
                      className="w-full rounded text-base px-3"
                    />
                  </div>
                  <div className="lg:col-span-3">
                    <Input
                      color="blue"
                      variant="standard"
                      label="Dosis"
                      type="text"
                      {...register("Dosis1", { required: true })}
                      error={errors.Dosis1 ? true : false}
                      className="w-full rounded text-base px-3"
                    />
                  </div>
                  <div className="lg:col-span-3">
                    <Input
                      color="blue"
                      variant="standard"
                      label="Frecuencia"
                      type="text"
                      {...register("Frecuencia1", { required: true })}
                      error={errors.Frecuencia1 ? true : false}
                      className="w-full rounded text-base px-3"
                    />
                  </div>
                  <div className="lg:col-span-3">
                    <Input
                      color="blue"
                      variant="standard"
                      label="Via de administracion"
                      type="text"
                      {...register("Via_administracion1", { required: true })}
                      error={errors.Via_administracion1 ? true : false}
                      className="w-full rounded text-base px-3"
                    />
                  </div>
                </div>

                {medicines.map((medicineForm) => medicineForm)}

                <Button
                  color="blue"
                  className="lg:col-span-3"
                  onClick={newMedicine}
                >
                  Añadir otro medicamento
                </Button>

                <div className="my-5 lg:col-span-12">
                  <Textarea
                    color="blue"
                    variant="standard"
                    label="Indicaciones Adicionales"
                    {...register("Indicaciones", { required: false })}
                    className="w-full"
                  />
                </div>

                <div className="flex my-5 lg:col-span-12">
                  <div className="w-full h-[2px] rounded-full bg-indigo-500 inline-flex"></div>
                </div>

                <div className="lg:col-span-8">
                  <Input
                    color="blue"
                    variant="standard"
                    label="Ingrese su contraseña para confirmar la receta"
                    type="password"
                    {...register("Firma", { required: true })}
                    error={errors.Firma ? true : false}
                    className="w-full rounded border-gray-300 text-base px-3"
                  />
                </div>
                <div className="lg:col-span-4 flex lg:flex-row lg:items-center lg:justify-center lg:gap-5 flex-col gap-2">
                  {!loadingRequest ? (
                    <Button color="blue" type="submit" className="lg:w-1/2">
                      Generar receta
                    </Button>
                  ) : (
                    <Loader top="0" />
                  )}
                  <Button
                    className="bg-cerise-500 lg:w-1/2"
                    onClick={() => {
                      reset();
                      window.history.back();
                    }}
                  >
                    Volver
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </section>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Recipe;
