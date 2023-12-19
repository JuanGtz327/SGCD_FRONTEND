import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { editProfileRequest, getProfileRequest } from "../../api/api";
import Loader from "../../common/Loader";
import { Button, Input } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import PasswordModal from "./custom/PasswordModal";
import { useToast } from "../../hooks/useToast";

const Perfil = () => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [perfil, setPerfil] = useState({});
  const [domicilio, setDomicilio] = useState({});
  const { showToast } = useToast();
  const [editPasswordDialog, setEditPasswordDialog] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    (async () => {
      const response = await getProfileRequest(user.token);
      setPerfil(response.data);
      if (user.is_doctor && !user.is_admin) {
        setDomicilio(response.data.Doctor.Domicilio);
      } else if (!user.is_doctor && !user.is_admin) {
        setDomicilio(response.data.Paciente.Domicilio);
      }
      setLoading(false);
    })();
  }, [loading]);

  const onSubmit = handleSubmit(async (values) => {
    setBtnLoading(true);
    const NombrePayload = {
      Nombre: values.Nombre,
      ApellidoM: values.ApellidoM,
      ApellidoP: values.ApellidoP,
    };
    const CredencialesPayload = {
      Correo: values.Correo,
    };
    delete values.Nombre;
    delete values.ApellidoM;
    delete values.NombApellidoPre;
    delete values.Correo;

    const DomicilioPayload = values;

    const Data = { NombrePayload, CredencialesPayload, DomicilioPayload };
    if (!user.is_admin && user.is_doctor)
      Data.idDomicilio = perfil.Doctor.idDomicilio;
    else if (!user.is_doctor) Data.idDomicilio = perfil.Paciente.idDomicilio;

    Data.id = user.id;

    try {
      await editProfileRequest(Data, user.token);
      
      if (editEmail) {
        await logout();
        showToast("success", "Perfil Actualizado, inicie sesion nuevamente");
        return;
      }
      
      showToast("success", "Perfil Actualizado");
      setLoading(true);
    } catch (error) {
      showToast("error", error.response.data.message, "center");
    }
    setBtnLoading(false);
  });

  const handleInputChange = (event) => {
    setDomicilio({
      ...domicilio,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="2xl:px-16">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-6 mx-auto">
          <div className="text-center mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
              Perfil
            </h1>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">
              En este apartado puede consultar su perfil de usuario, y
              editar sus datos personales.
            </p>
            <div className="flex mt-6 justify-center">
              <div className="w-64 h-1 rounded-full bg-indigo-500 inline-flex"></div>
            </div>
          </div>
        </div>
      </section>
      {!loading ? (
        <div className="bg-white md:shadow-2xl rounded-sm md:px-8 md:py-10 py-4 md:mt-8 border-t border-gray-100 md:min-h-[500px]">
          <form onSubmit={onSubmit}>
            <dl className="divide-y divide-gray-100">
              {!user.is_admin && (
                <div className="px-4 md:py-6 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-3">
                  <dt className="text-base font-medium leading-6 text-gray-900">
                    Nombre Completo
                  </dt>
                  <div className="col-span-full lg:col-span-5">
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-0">
                      {user.is_doctor ? (
                        <div className="sm:grid gap-x-6 gap-y-4 sm:grid-cols-12">
                          <div className="col-span-full lg:col-span-4">
                            <div className="mt-6">
                              <Input
                                color="blue"
                                value={perfil.Doctor.Nombre}
                                label="Nombre"
                                variant="standard"
                                {...register("Nombre", { required: true })}
                                error={errors.Nombre ? true : false}
                                onChange={(e) => {
                                  setPerfil({
                                    ...perfil,
                                    Doctor: {
                                      ...perfil.Doctor,
                                      Nombre: e.target.value,
                                    },
                                  });
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-span-full lg:col-span-4">
                            <div className="mt-6">
                              <Input
                                color="blue"
                                value={perfil.Doctor.ApellidoP}
                                label="Apellido paterno"
                                variant="standard"
                                {...register("ApellidoP", { required: true })}
                                error={errors.ApellidoP ? true : false}
                                onChange={(e) => {
                                  setPerfil({
                                    ...perfil,
                                    Doctor: {
                                      ...perfil.Doctor,
                                      ApellidoP: e.target.value,
                                    },
                                  });
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-span-full lg:col-span-4">
                            <div className="mt-6">
                              <Input
                                color="blue"
                                value={perfil.Doctor.ApellidoM}
                                label="Apellido materno"
                                variant="standard"
                                {...register("ApellidoM", { required: true })}
                                error={errors.ApellidoM ? true : false}
                                onChange={(e) => {
                                  setPerfil({
                                    ...perfil,
                                    Doctor: {
                                      ...perfil.Doctor,
                                      ApellidoM: e.target.value,
                                    },
                                  });
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="sm:grid gap-x-6 gap-y-4 sm:grid-cols-12">
                            <div className="col-span-full lg:col-span-4">
                              <div className="mt-6">
                                <Input
                                  color="blue"
                                  value={perfil.Paciente.Nombre}
                                  label="Nombre"
                                  variant="standard"
                                  {...register("Nombre", { required: true })}
                                  error={errors.Nombre ? true : false}
                                  onChange={(e) => {
                                    setPerfil({
                                      ...perfil,
                                      Paciente: {
                                        ...perfil.Paciente,
                                        Nombre: e.target.value,
                                      },
                                    });
                                  }}
                                />
                              </div>
                            </div>
                            <div className="lg:col-span-4">
                              <div className="mt-6">
                                <Input
                                  color="blue"
                                  value={perfil.Paciente.ApellidoP}
                                  label="Apellido paterno"
                                  variant="standard"
                                  {...register("ApellidoP", { required: true })}
                                  error={errors.ApellidoP ? true : false}
                                  onChange={(e) => {
                                    setPerfil({
                                      ...perfil,
                                      Paciente: {
                                        ...perfil.Paciente,
                                        ApellidoP: e.target.value,
                                      },
                                    });
                                  }}
                                />
                              </div>
                            </div>
                            <div className="lg:col-span-4">
                              <div className="mt-6">
                                <Input
                                  color="blue"
                                  value={perfil.Paciente.ApellidoM}
                                  label="Apellido materno"
                                  variant="standard"
                                  {...register("ApellidoM", { required: true })}
                                  error={errors.ApellidoM ? true : false}
                                  onChange={(e) => {
                                    setPerfil({
                                      ...perfil,
                                      Paciente: {
                                        ...perfil.Paciente,
                                        ApellidoM: e.target.value,
                                      },
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </dd>
                  </div>
                </div>
              )}
              <div className="px-4 py-6 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-3">
                <dt className="text-base font-medium leading-6 text-gray-900">
                  Credenciales
                </dt>
                <div className="col-span-full  lg:col-span-5">
                  <div className="sm:grid gap-x-6 gap-y-4 sm:grid-cols-6">
                    <dd className="mt-6 text-sm leading-6 text-gray-700 sm:mt-0 col-span-4">
                      <Input
                        color="blue"
                        value={perfil.Correo}
                        label="Correo"
                        variant="standard"
                        type="email"
                        {...register("Correo", { required: true })}
                        error={errors.Correo ? true : false}
                        onChange={(e) => {
                          setPerfil({
                            ...perfil,
                            [e.target.name]: e.target.value,
                          });
                          if (editEmail === false) setEditEmail(true);
                        }}
                      />
                    </dd>
                    <div className="mt-6 sm:mt-0 flex mx-auto items-center sm:justify-end sm:col-span-2 ">
                      <Button
                        color="blue"
                        variant="outlined"
                        className="w-full sm:w-fit h-fit"
                        size="sm"
                        onClick={() => setEditPasswordDialog(true)}
                      >
                        Cambiar contraseña
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              {!user.is_admin && (
                <div className=" px-4 py-6 grid grid-cols-1 sm:grid-cols-6 sm:gap-4 sm:px-3">
                  <dt className="text-base font-medium leading-6 text-gray-900">
                    Domicilio
                  </dt>
                  <div className="col-span-full lg:col-span-5">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-12">
                      <div className="col-span-full lg:col-span-3">
                        <div className="mt-6">
                          <Input
                            color="blue"
                            size="lg"
                            value={domicilio.Telefono}
                            label="Número telefónico"
                            variant="standard"
                            type="number"
                            {...register("Telefono", { required: true })}
                            error={errors.Telefono ? true : false}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-span-full lg:col-span-3">
                        <div className="mt-6">
                          <Input
                            color="blue"
                            value={domicilio.Estado}
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

                      <div className="col-span-full lg:col-span-3">
                        <div className="mt-6">
                          <Input
                            color="blue"
                            value={domicilio.Municipio}
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

                      <div className="col-span-full lg:col-span-3">
                        <div className="mt-6">
                          <Input
                            color="blue"
                            value={domicilio.Colonia}
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

                      <div className="col-span-full lg:col-span-3">
                        <div className="mt-6">
                          <Input
                            color="blue"
                            value={domicilio.CP}
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

                      <div className="col-span-full lg:col-span-3">
                        <div className="mt-6">
                          <Input
                            color="blue"
                            value={domicilio.Calle}
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

                      <div className="col-span-full lg:col-span-3">
                        <div className="mt-6">
                          <Input
                            color="blue"
                            value={domicilio.Num_ext}
                            size="lg"
                            label="Número exterior"
                            maxLength={5}
                            type="text"
                            variant="standard"
                            {...register("Num_ext", { required: true })}
                            error={errors.Num_ext ? true : false}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-span-full lg:col-span-3">
                        <div className="mt-6">
                          <Input
                            color="blue"
                            value={domicilio.Num_int}
                            size="lg"
                            label="Número interior"
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
              )}
            </dl>
            <div className="flex md:justify-end justify-center mt-10">
              <div className="w-full max-w-xs">
                {!btnLoading ? (
                  <Button type="submit" color="blue" className="h-fit w-full">
                    Actualizar Perfil
                  </Button>
                ) : (
                  <Loader top="0" />
                )}
              </div>
            </div>
          </form>
        </div>
      ) : (
        <Loader top="mt-16" />
      )}
      <PasswordModal
        show={editPasswordDialog}
        setShow={setEditPasswordDialog}
      />
    </div>
  );
};

export default Perfil;
