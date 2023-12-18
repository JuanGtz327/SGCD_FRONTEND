import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Rating,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { useToast } from "../../hooks/useToast";
import { editClinicaRequest, getClinicaRequest } from "../../api/api";
import Loader from "../../common/Loader.jsx";
import { useClinic } from "../../context/ClinicContext.jsx";

const Clinic = () => {
  const { user, logout } = useAuth();
  const { clinicState } = useClinic();
  const [rated, setRated] = useState(5);
  const [openEdit, setOpenEdit] = useState(clinicState.Domicilio === null);
  const [loading, setLoading] = useState(false);
  const [clinica, setClinica] = useState({});
  const [direccion, setDireccion] = useState(
    "https://maps.google.com/maps?width=100%&height=600&hl=en&q=EscuelaSuperiorComputo&ie=UTF8&t=8&z=14&iwloc=B&output=embed"
  );
  const { showToast } = useToast();

  const handleOpen = () => setOpenEdit(!openEdit);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    (async () => {
      const response = await getClinicaRequest(user.token);
      setClinica(response.data);
      if (response.data.Domicilio) {
        setDireccion(
          direccion.replace(
            "EscuelaSuperiorComputo",
            encodeURIComponent(
              (
                response.data?.Domicilio.Calle +
                response.data?.Domicilio.Num_ext +
                response.data?.Domicilio.Municipio +
                response.data?.Domicilio.Colonia +
                response.data?.Domicilio.Estado
              ).replace(" ", "")
            )
          )
        );
      }
      setLoading(true);
    })();
  }, [user]);

  const handleInputChange = (event) => {
    setClinica({
      ...clinica,
      Domicilio: {
        ...clinica.Domicilio,
        [event.target.name]: event.target.value,
      },
    });
  };

  const onSubmit = handleSubmit(async (data) => {
    const clinicaPayload = {
      Nombre: data.Nombre,
      Descripcion: data.Descripcion,
    };
    const domicilioPayload = {
      Telefono: data.Telefono,
      Estado: data.Estado,
      Municipio: data.Municipio,
      Colonia: data.Colonia,
      CP: data.CP,
      Calle: data.Calle,
      Num_ext: data.Num_ext,
      Num_int: data.Num_int,
    };

    try {
      await editClinicaRequest(
        { clinicaPayload, domicilioPayload },
        user.token
      );
      showToast("success", "Clínica actualizada");
      handleOpen();
      window.location.reload();
    } catch (error) {
      showToast("error", error.response.data.message);
    }
  });

  return (
    <section className="text-gray-600 body-font relative 2xl:px-16">
      {loading ? (
        <>
          <div className="container px-5 py-6 mx-auto">
            <div className="text-center mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
                Clínica
              </h1>
              <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">
                En este apartado puede consultar la información de la clínica a
                la que pertenece. Detalles como dirección, correo electrónico y
                número de teléfono.
              </p>
              <div className="flex mt-6 justify-center">
                <div className="w-64 h-1 rounded-full bg-indigo-500 inline-flex"></div>
              </div>
            </div>
          </div>
          <div className="container md:py-8 mx-auto flex sm:flex-nowrap flex-wrap md:min-h-[600px]">
            <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
              <iframe
                width="100%"
                height="100%"
                className="absolute inset-0"
                title="map"
                src={direccion}
              ></iframe>
              <div className="md:bg-white relative flex flex-wrap py-6 rounded md:shadow-md">
                <div className="lg:w-1/2 px-6">
                  <h2 className="text-base font-semibold sm:text-gray-900 text-transparent">
                    Dirección
                  </h2>
                  <p className="mt-1 sm:text-gray-900 text-transparent">
                    {clinica.Domicilio != undefined
                      ? clinica.Domicilio?.Calle +
                        " #" +
                        clinica.Domicilio?.Num_ext +
                        " " +
                        clinica.Domicilio?.Municipio +
                        " " +
                        clinica.Domicilio?.Colonia +
                        " " +
                        clinica.Domicilio?.Estado
                      : "No hay direccion registrada"}
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 md:w-1/2 flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
              <Card className="max-w-[24rem] overflow-hidden rounded-sm">
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 rounded-none"
                >
                  <img
                    src="https://images.unsplash.com/photo-1631248055158-edec7a3c072b?q=80&w=2061&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="ui/ux review check"
                  />
                </CardHeader>
                <CardBody>
                  <Typography variant="h4" color="blue-gray">
                    {clinica?.Nombre}
                  </Typography>
                  <Typography
                    variant="lead"
                    color="gray"
                    className="mt-3 text-base"
                  >
                    {clinica?.Descripcion}
                  </Typography>
                  {user.is_admin && (
                    <Button
                      color="blue"
                      className="mt-3 w-full"
                      onClick={handleOpen}
                    >
                      Actualizar Clínica
                    </Button>
                  )}
                </CardBody>
                <CardFooter className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-blue-gray-500">
                    <Rating
                      value={rated}
                      onChange={(value) => setRated(value)}
                    />
                    <p>{rated}</p>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}

      <Dialog
        open={openEdit}
        size="xl"
        handler={handleOpen}
        dismiss={{ enabled: false }}
      >
        <form onSubmit={onSubmit}>
          <DialogHeader>Acutalizar clínica</DialogHeader>
          <DialogBody>
            <div className="px-4 md:py-6 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-3">
              <dt className="text-base font-medium leading-6 text-gray-900">
                Detalles de la clínica
              </dt>
              <div className="col-span-5">
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-0">
                  <div className="sm:grid gap-x-6 gap-y-4 sm:grid-cols-12">
                    <div className="lg:col-span-6">
                      <div className="mt-6">
                        <Input
                          color="blue"
                          value={clinica?.Nombre}
                          label="Nombre"
                          variant="standard"
                          {...register("Nombre", { required: true })}
                          error={errors.Nombre ? true : false}
                          onChange={(event) => {
                            setClinica({
                              ...clinica,
                              [event.target.name]: event.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="lg:col-span-6">
                      <div className="mt-6">
                        <Input
                          color="blue"
                          value={clinica?.Descripcion}
                          label="Descripción de la clínica"
                          variant="standard"
                          {...register("Descripcion", { required: true })}
                          error={errors.Descripcion ? true : false}
                          onChange={(event) => {
                            setClinica({
                              ...clinica,
                              [event.target.name]: event.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </dd>
              </div>
            </div>
            <div className=" px-4 py-6 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-3">
              <dt className="text-base font-medium leading-6 text-gray-900">
                Domicilio
              </dt>
              <div className="col-span-5">
                <div className="sm:grid gap-x-6 gap-y-4 sm:grid-cols-12">
                  <div className="lg:col-span-3">
                    <div className="mt-6">
                      <Input
                        color="blue"
                        size="lg"
                        value={clinica?.Domicilio?.Telefono}
                        label="Numero telefónico"
                        variant="standard"
                        type="number"
                        {...register("Telefono", { required: true })}
                        error={errors.Telefono ? true : false}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-3">
                    <div className="mt-6">
                      <Input
                        color="blue"
                        value={clinica?.Domicilio?.Estado}
                        label="Estado"
                        maxLength={18}
                        variant="standard"
                        size="lg"
                        type="text"
                        {...register("Estado", { required: true })}
                        error={errors.Estado ? true : false}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-3">
                    <div className="mt-6">
                      <Input
                        color="blue"
                        value={clinica?.Domicilio?.Municipio}
                        label="Municipio"
                        maxLength={18}
                        variant="standard"
                        size="lg"
                        type="text"
                        {...register("Municipio", { required: true })}
                        error={errors.Municipio ? true : false}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-3">
                    <div className="mt-6">
                      <Input
                        color="blue"
                        value={clinica?.Domicilio?.Colonia}
                        label="Colonia"
                        maxLength={18}
                        variant="standard"
                        size="lg"
                        type="text"
                        {...register("Colonia", { required: true })}
                        error={errors.Colonia ? true : false}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-3">
                    <div className="mt-6">
                      <Input
                        color="blue"
                        value={clinica?.Domicilio?.CP}
                        size="lg"
                        label="Código postal"
                        type="number"
                        variant="standard"
                        {...register("CP", { required: true })}
                        error={errors.CP ? true : false}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-3">
                    <div className="mt-6">
                      <Input
                        color="blue"
                        value={clinica?.Domicilio?.Calle}
                        size="lg"
                        label="Calle"
                        type="text"
                        variant="standard"
                        {...register("Calle", { required: true })}
                        error={errors.Calle ? true : false}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-3">
                    <div className="mt-6">
                      <Input
                        color="blue"
                        value={clinica?.Domicilio?.Num_ext}
                        size="lg"
                        label="Numero exterior"
                        maxLength={5}
                        type="text"
                        variant="standard"
                        {...register("Num_ext", { required: true })}
                        error={errors.Num_ext ? true : false}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-3">
                    <div className="mt-6">
                      <Input
                        color="blue"
                        value={clinica?.Domicilio?.Num_int}
                        size="lg"
                        label="Numero interior"
                        maxLength={5}
                        type="text"
                        variant="standard"
                        {...register("Num_int", { required: true })}
                        error={errors.Num_int ? true : false}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogBody>
          <DialogFooter className="flex md:justify-end justify-between gap-5">
            {clinicState.Domicilio !== null ? (
              <Button
                onClick={() => handleOpen(null)}
                className="bg-cerise-500"
              >
                <span>Cancelar</span>
              </Button>
            ) : (
              <Button
                className="bg-cerise-500"
                onClick={async () => {
                  await logout();
                }}
              >
                Cerrar Sesion
              </Button>
            )}
            <Button color="blue" type="submit">
              <span>Actualizar</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </section>
  );
};

export default Clinic;
