import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePatients } from "../../hooks/usePatients";
import { useToast } from "../../hooks/useToast";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import Loader from "../../common/Loader";
import { useDoctors } from "../../hooks/useDoctors";
import { Controller, useForm } from "react-hook-form";
import { addDocPacRequest } from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import EmptyData from "../../common/EmptyData";
import { useNavigationC } from "../../hooks/useNavigationC";

const PacDoc = () => {
  const { user } = useAuth();
  const { getDoctor } = useDoctors();
  const [doctor, setDoctor] = useState([]);
  const { doctorID } = useParams();
  const {
    pacientes: adminPacientes,
    getPatiensByDoctor,
    loading,
    setLoading,
    filterPatients,
    filtered,
  } = usePatients();
  const [isSearching, setIsSearching] = useState(false);
  const [pacientes, setPacientes] = useState(null);
  const { infoToDisplay } = useNavigationC(isSearching ? filtered : pacientes);
  const { showToast } = useToast();
  const [pacientesChoose, setPacientesChoose] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    (async () => {
      setPacientes(await getPatiensByDoctor(doctorID));
      setDoctor(await getDoctor(doctorID));
    })();
  }, [doctorID]);

  const onNewDocPac = handleSubmit(async (values) => {
    try {
      await addDocPacRequest(
        { idDoctor: doctorID, idPaciente: values.idPaciente },
        user.token
      );
      showToast("success", "Se ha añadido el medico al paciente");
      setLoading(true);
      setPacientes(await getPatiensByDoctor(doctorID));
    } catch (error) {
      showToast(
        "error",
        "No se ha podido añadir el medico al paciente",
        "center"
      );
    }
    handleOpen();
  });

  useEffect(() => {
    if (adminPacientes && pacientes) {
      setPacientesChoose(
        adminPacientes.filter(
          (paciente) => !pacientes.find((pac) => pac.id === paciente.id)
        )
      );
    }
  }, [adminPacientes, pacientes]);

  return (
    <>
      {!loading && doctor && pacientes ? (
        <section className="text-gray-600 body-font">
          <div className="container mx-auto">
            <section className="text-gray-600 body-font">
              <div className="container px-5 py-6 mx-auto">
                <div className="text-center mb-0">
                  <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
                    Doctor-Paciente
                  </h1>
                  <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">
                    A continuacion se muestra una lista de los pacientes del
                    doctor.
                  </p>
                  <div className="flex mt-6 justify-center">
                    <div className="w-64 h-1 rounded-full bg-indigo-500 inline-flex"></div>
                  </div>
                </div>
              </div>
            </section>
            <div className="bg-white shadow-none md:shadow-2xl min-h-[600px] py-4 md:py-8 px-2 md:px-8 md:mt-10">
              <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="col-span-1">
                  <Card className="w-fit md:w-full">
                    <CardHeader floated={false} className="h-80 bg-indigo-100">
                      <div className="h-full w-full inline-flex items-center justify-center rounded-full text-indigo-500 flex-shrink-0">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="sm:w-32 sm:h-32 w-32 h-32"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                    </CardHeader>
                    <CardBody className="text-center">
                      <Typography
                        variant="h4"
                        color="blue-gray"
                        className="mb-2"
                      >
                        Dr. {doctor.Nombre} {doctor.ApellidoP}{" "}
                        {doctor.ApellidoM}
                      </Typography>
                      <Typography
                        color="blue-gray"
                        className="font-medium"
                        textGradient
                      >
                        {doctor.User?.Correo}
                      </Typography>
                      <div className="grid grid-cols-2 gap-3">
                        <Link
                          to={`${
                            import.meta.env.VITE_FRONTEND_URL ||
                            "http://localhost:5173/"
                          }doctor/${doctorID}`}
                        >
                          <Button className="mt-5 w-full bg-cerise-500">
                            Volver
                          </Button>
                        </Link>
                        <Button
                          className="mt-5 w-full"
                          color="blue"
                          onClick={handleOpen}
                          disabled={pacientesChoose.length === 0}
                        >
                          Añadir paciente
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </div>
                <div className="col-span-3 mt-5 md:mt-0">
                  <div className="mx-4">
                    <Input
                      color="blue"
                      type="text"
                      variant="standard"
                      label="Buscar paciente"
                      className="text-base text-gray-900"
                      onChange={(e) => {
                        if (e.target.value.length === 0) setIsSearching(false);
                        if (e.target.value.length > 0 && !isSearching)
                          setIsSearching(true);
                        filterPatients(e.target.value);
                      }}
                    />
                  </div>
                  <div className="grid md:grid-cols-3 mt-2 mx-2">
                    {infoToDisplay.length > 0 ? (
                      infoToDisplay.map(
                        ({
                          id,
                          Nombre,
                          ApellidoP,
                          ApellidoM,
                          User: { Correo },
                        }) => (
                          <div className="p-2" key={id}>
                            <div className="flex items-center border-blue-400 border p-4 rounded-lg">
                              <div className="mr-2 sm:w-16 sm:h-16 h-14 w-14 sm:mr-5 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                                <svg
                                  fill="none"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  className="sm:w-8 sm:h-18 w-10 h-10"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                  <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                              </div>
                              <div className="flex-grow">
                                <h2 className="text-gray-900 title-font text-sm font-medium">
                                  {Nombre} {ApellidoP} {ApellidoM}
                                </h2>
                                <p className="text-gray-500 text-sm">
                                  {Correo}
                                </p>
                              </div>
                            </div>
                          </div>
                        )
                      )
                    ) : (
                      <>
                        <div></div>
                        <EmptyData
                          data={infoToDisplay}
                          title="No se encontro ningun paciente"
                          description={`No se encontraron pacientes para el doctor ${doctor.Nombre} ${doctor.ApellidoP} ${doctor.ApellidoM}`}
                          hideButton
                        />
                        <div></div>
                      </>
                    )}
                  </div>
                  <EmptyData
                    data={pacientes}
                    title="No hay pacientes registrados"
                    description={`El doctor ${doctor.Nombre} ${doctor.ApellidoP} ${doctor.ApellidoM} no tiene pacientes registrados`}
                    btnDesc="Añadir paciente"
                    onNewData={() => navigate(`/addPatient`)}
                  />
                </div>
              </div>
            </div>
          </div>
          <Dialog
            open={open}
            handler={handleOpen}
            size="xs"
            dismiss={{ enabled: false }}
          >
            <div className="flex items-center justify-between">
              <DialogHeader>Agregar nuevo paciente</DialogHeader>
            </div>

            <form onSubmit={onNewDocPac}>
              <DialogBody className="px-5">
                <Controller
                  name="idPaciente"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      color="blue"
                      label="Selecciona un paciente"
                      containerProps={{ className: "min-w-[72px]" }}
                      error={errors.idPaciente ? true : false}
                      variant="standard"
                    >
                      {pacientesChoose.map(
                        ({ Nombre, ApellidoP, ApellidoM, id }) => (
                          <Option key={id} value={id}>
                            {Nombre} {ApellidoP} {ApellidoM}
                          </Option>
                        )
                      )}
                    </Select>
                  )}
                />
                <Typography color="red" variant="small" className="mt-3">
                  {errors.idPaciente &&
                    "Debes seleccionar un paciente para poder continuar"}
                </Typography>
              </DialogBody>
              <DialogFooter className="space-x-2">
                <Button className="bg-cerise-500" onClick={handleOpen}>
                  Cancelar
                </Button>
                <Button color="blue" type="sumbit">
                  Añadir paciente
                </Button>
              </DialogFooter>
            </form>
          </Dialog>
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default PacDoc;
