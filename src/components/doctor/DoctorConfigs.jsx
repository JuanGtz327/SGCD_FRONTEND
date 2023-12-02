import {
  Alert,
  Button,
  Checkbox,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { Controller, useForm } from "react-hook-form";
import { IoIosWarning } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";
import { useDoctors } from "../../hooks/useDoctors";
import { useEffect, useState } from "react";
import { useToast } from "../../hooks/useToast";
import { editDoctorConfigsRequest } from "../../api/api";
import Loader from "../../common/Loader";

const horarios = [
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

const DoctorConfigs = () => {
  const { user } = useAuth();
  const { getDoctor } = useDoctors();
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const [configuraciones, setConfiguraciones] = useState({});

  const { control } = useForm();

  useEffect(() => {
    (async () => {
      const res = await getDoctor(user.idDoctor);
      setConfiguraciones({
        ...res.Configuracione,
        Dias_laborables: res.Configuracione.Dias_laborables?.includes(",")
          ? res.Configuracione.Dias_laborables.split(",")
          : [res.Configuracione.Dias_laborables],
      });
    })();
    setLoading(false);
  }, [user.idDoctor]);

  const onLaborableDay = (day, checked) => {
    if (!checked) {
      if (configuraciones.Dias_laborables.length == 1) {
        showToast("error", "Debe seleccionar al menos un dia laborable");
        return;
      }

      setConfiguraciones({
        ...configuraciones,
        Dias_laborables: configuraciones.Dias_laborables.filter(
          (dia) => dia !== day
        ),
      });
    } else {
      setConfiguraciones({
        ...configuraciones,
        Dias_laborables: [...configuraciones.Dias_laborables, day],
      });
    }
  };

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-6 mx-auto">
          <div className="text-center mb-0 ">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
              Configuraciones
            </h1>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">
              En este apartado puede modificar los dias laborales, asi como los
              horarios de trabajo y la duracion de las citas.
            </p>
            <div className="flex mt-6 justify-center">
              <div className="w-64 h-1 rounded-full bg-indigo-500 inline-flex"></div>
            </div>
          </div>
        </div>
      </section>
      {!loading && configuraciones ? (
        <div className="container md:px-12">
          <div className="bg-white md:shadow-2xl min-h-[600px] flex flex-col h-full md:px-10">
            <form className="mt-4 mb-2 w-[100%]">
              <div>
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Configuraciones
                    </h2>
                    <p className="mt-1 md:mb-10 text-sm leading-6 text-gray-600">
                      En este apartado puede establecer las configuraciones del
                      doctor.
                    </p>
                  </div>
                  <div className="w-full md:w-fit flex flex-col md:flex-row justify-between md:justify-start md:gap-5">
                    <Button
                      onClick={async () => {
                        const configuracionesPayload = {
                          Dias_laborables:
                            configuraciones.Dias_laborables.join(","),
                          Horario: configuraciones.Horario,
                          Duracion_cita: configuraciones.Duracion_cita,
                        };
                        try {
                          await editDoctorConfigsRequest(
                            user.idDoctor,
                            { configuracionesPayload },
                            user.token
                          );
                          showToast("success", "Configuraciones actualizadas");
                        } catch (error) {
                          console.log(error);
                          showToast(
                            "error",
                            error.response.data.message,
                            "center"
                          );
                        }
                      }}
                      className="md:w-fit my-5 md:my-0 md:mt-5"
                      color="blue"
                    >
                      Actualizar
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col gap-8">
                  <Alert
                    className="rounded-none border-l-4 border-saffron-200 bg-saffron-500/10 font-medium text-saffron-500 items-center"
                    open
                    icon={<IoIosWarning />}
                  >
                    Para poder actualizar las configuraciones debe tener en
                    cuenta que no puede tener citas agendadas en los nuevos
                    horarios que quiera establecer.
                  </Alert>
                  <div>
                    <h2 className="text-sm font-semibold leading-7 text-gray-900">
                      Dias Laborales
                    </h2>
                    <div className="mt-5 grid grid-cols-2 sm:grid-cols-7 gap-x-6">
                      <div className="flex">
                        <Checkbox
                          color="indigo"
                          value="Lunes"
                          checked={configuraciones.Dias_laborables?.includes(
                            "Lunes"
                          )}
                          onChange={(e) => {
                            onLaborableDay(e.target.value, e.target.checked);
                          }}
                        />
                        <Typography color="gray" className="self-center">
                          Lunes
                        </Typography>
                      </div>
                      <div className="flex">
                        <Checkbox
                          color="indigo"
                          value="Martes"
                          checked={configuraciones.Dias_laborables?.includes(
                            "Martes"
                          )}
                          onChange={(e) => {
                            onLaborableDay(e.target.value, e.target.checked);
                          }}
                        />
                        <Typography color="gray" className="self-center">
                          Martes
                        </Typography>
                      </div>
                      <div className="flex">
                        <Checkbox
                          color="indigo"
                          value="Miercoles"
                          checked={configuraciones.Dias_laborables?.includes(
                            "Miercoles"
                          )}
                          onChange={(e) => {
                            onLaborableDay(e.target.value, e.target.checked);
                          }}
                        />
                        <Typography color="gray" className="self-center">
                          Miercoles
                        </Typography>
                      </div>
                      <div className="flex">
                        <Checkbox
                          color="indigo"
                          value="Jueves"
                          checked={configuraciones.Dias_laborables?.includes(
                            "Jueves"
                          )}
                          onChange={(e) => {
                            onLaborableDay(e.target.value, e.target.checked);
                          }}
                        />
                        <Typography color="gray" className="self-center">
                          Jueves
                        </Typography>
                      </div>
                      <div className="flex">
                        <Checkbox
                          color="indigo"
                          value="Viernes"
                          checked={configuraciones.Dias_laborables?.includes(
                            "Viernes"
                          )}
                          onChange={(e) => {
                            onLaborableDay(e.target.value, e.target.checked);
                          }}
                        />
                        <Typography color="gray" className="self-center">
                          Viernes
                        </Typography>
                      </div>
                      <div className="flex">
                        <Checkbox
                          color="indigo"
                          value="Sabado"
                          checked={configuraciones.Dias_laborables?.includes(
                            "Sabado"
                          )}
                          onChange={(e) => {
                            onLaborableDay(e.target.value, e.target.checked);
                          }}
                        />
                        <Typography color="gray" className="self-center">
                          Sabado
                        </Typography>
                      </div>
                      <div className="flex">
                        <Checkbox
                          color="indigo"
                          value="Domingo"
                          checked={configuraciones.Dias_laborables?.includes(
                            "Domingo"
                          )}
                          onChange={(e) => {
                            onLaborableDay(e.target.value, e.target.checked);
                          }}
                        />
                        <Typography color="gray" className="self-center">
                          Domingo
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold leading-7 text-gray-900">
                      Horario de Trabajo
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-5">
                      <Controller
                        name="Inicio"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            color="blue"
                            label="Horario de Entrada"
                            variant="standard"
                            value={configuraciones.Horario?.split("-")[0]}
                            onChange={(e) => {
                              setConfiguraciones({
                                ...configuraciones,
                                Horario: `${e}-${
                                  configuraciones.Horario?.split("-")[1]
                                }`,
                              });
                            }}
                          >
                            {horarios.map((horario) => (
                              <Option key={horario} value={`${horario}`}>
                                {horario}
                              </Option>
                            ))}
                          </Select>
                        )}
                      />
                      <Controller
                        name="Fin"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            color="blue"
                            label="Horario de Salida"
                            variant="standard"
                            value={configuraciones.Horario?.split("-")[1]}
                            onChange={(e) => {
                              setConfiguraciones({
                                ...configuraciones,
                                Horario: `${
                                  configuraciones.Horario?.split("-")[0]
                                }-${e}`,
                              });
                            }}
                          >
                            {horarios.map((horario) => (
                              <Option key={horario} value={`${horario}`}>
                                {horario}
                              </Option>
                            ))}
                          </Select>
                        )}
                      />
                      <Controller
                        name="Duracion"
                        rules={{ required: true }}
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            color="blue"
                            label="Duracion de la cita"
                            variant="standard"
                            onChange={(e) => {
                              setConfiguraciones({
                                ...configuraciones,
                                Duracion_cita: parseInt(e),
                              });
                            }}
                          >
                            <Option value="15">15 minutos</Option>
                            <Option value="30">30 minutos</Option>
                          </Select>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default DoctorConfigs;
