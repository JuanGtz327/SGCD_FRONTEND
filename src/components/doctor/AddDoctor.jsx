import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Card,
  Button,
  Typography,
  Checkbox,
  Select,
  Option,
} from "@material-tailwind/react";
import DatosDoctor from "./datos_doctor/DatosDoctor.jsx";
import StepperC from "../../common/StepperC.jsx";
import { createDoctorRequest } from "../../api/api";
import { useAuth } from "../../context/AuthContext.jsx";
import { useToast } from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/outline";
import { AiOutlineSetting } from "react-icons/ai";
import Loader from "../../common/Loader.jsx";

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

const AddDoctor = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [configuraciones, setConfiguraciones] = useState({
    dias_laborables: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"],
  });

  const onSubmit = handleSubmit(async (values) => {
    const showErrors = [];

    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;

    if (!passwordRegex.test(values.Password))
      showErrors.push(
        "La contraseña del doctor no cumple con los requisitos"
      );

    const curpRegex = /^[A-Z]{4}[0-9]{6}[HM][A-Z0-9]{7}$/;

    if (!curpRegex.test(values.CURP))
      showErrors.push("El formato de la CURP no es valido");

    if (showErrors.length > 0) {
      for (let i = 0; i < showErrors.length; i++) {
        showToast("error", showErrors[i]);
      }
      setLoading(false);
      return;
    }

    values.Dias_laborales = configuraciones.dias_laborables.join(",");
    if (!values.Inicio || !values.Fin) {
      return showToast("error", "Debe ingresar una hora de entrada y salida", "center");
    }
    values.Horario = `${values.Inicio}-${values.Fin}`;
    delete values.Inicio;
    delete values.Fin;

    const [horasInicio, minutosInicio] = values.Horario.split("-")[0]
      .split(":")
      .map(Number);
    const [horasFin, minutosFin] = values.Horario.split("-")[1]
      .split(":")
      .map(Number);

    if (
      !(
        horasInicio < horasFin ||
        (horasInicio === horasFin && minutosInicio < minutosFin)
      )
    ) {
      showToast("error", "La hora de inicio debe ser menor a la hora de fin");
      return;
    }

    setLoading(true);
    try {
      await createDoctorRequest(values, user.token);
      showToast("success", "Registro completo");
      navigate("/listDoctors");
    } catch (error) {
      showToast("error", error.response.data.message);
    }
    setLoading(false);
  });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      showToast("error", "Debes llenar todos los campos", "center");
    }
  }, [errors, showToast]);

  const onLaborableDay = (day, checked) => {
    if (!checked) {
      if (configuraciones.dias_laborables.length == 1) {
        showToast("error", "Debe seleccionar al menos un día laborable");
        return;
      }
      setConfiguraciones({
        ...configuraciones,
        dias_laborables: configuraciones.dias_laborables.filter(
          (dia) => dia !== day
        ),
      });
    } else {
      setConfiguraciones({
        ...configuraciones,
        dias_laborables: [...configuraciones.dias_laborables, day],
      });
    }
  };

  return (
    <>
      <div className="flex flex-col h-full 2xl:px-16">
        <Card
          shadow={false}
          className="bg-white rounded-sm w-full shadow-none md:shadow-2xl md:min-h-[730px] px-5 lg:px-16 py-5 mx-auto"
        >
          <Typography
            variant="h3"
            color="blue-gray"
            className="text-center mb-5"
          >
            Nuevo doctor
          </Typography>
          <hr />
          <form className="mt-4 mb-2 w-[100%]" onSubmit={onSubmit}>
            <div className={`${step != 0 && "hidden"}`}>
              <DatosDoctor
                register={register}
                errors={errors}
                control={control}
                Controller={Controller}
              />
            </div>
            <div className={`${step != 1 && "hidden"}`}>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Configuraciones
              </h2>
              <p className="mt-1 mb-10 text-sm leading-6 text-gray-600">
                En este apartado puede establecer las configuraciones del
                doctor.
              </p>
              <div className="flex flex-col gap-8">
                <div>
                  <h2 className="text-sm font-semibold leading-7 text-gray-900">
                    Días laborales
                  </h2>
                  <div className="mt-5 grid grid-cols-2 sm:grid-cols-7 gap-x-6">
                    <div className="flex">
                      <Checkbox
                        color="indigo"
                        value="Lunes"
                        checked={configuraciones.dias_laborables.includes(
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
                        checked={configuraciones.dias_laborables.includes(
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
                        checked={configuraciones.dias_laborables.includes(
                          "Miercoles"
                        )}
                        onChange={(e) => {
                          onLaborableDay(e.target.value, e.target.checked);
                        }}
                      />
                      <Typography color="gray" className="self-center">
                        Miércoles
                      </Typography>
                    </div>
                    <div className="flex">
                      <Checkbox
                        color="indigo"
                        value="Jueves"
                        checked={configuraciones.dias_laborables.includes(
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
                        checked={configuraciones.dias_laborables.includes(
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
                        checked={configuraciones.dias_laborables.includes(
                          "Sabado"
                        )}
                        onChange={(e) => {
                          onLaborableDay(e.target.value, e.target.checked);
                        }}
                      />
                      <Typography color="gray" className="self-center">
                        Sábado
                      </Typography>
                    </div>
                    <div className="flex">
                      <Checkbox
                        color="indigo"
                        value="Domingo"
                        checked={configuraciones.dias_laborables.includes(
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
                    Horario de trabajo
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-5">
                    <Controller
                      name="Inicio"
                      rules={{ required: true }}
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          color="blue"
                          label="Horario de entrada"
                          variant="standard"
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
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          color="blue"
                          label="Horario de salida"
                          variant="standard"
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
                          label="Duración de la cita"
                          variant="standard"
                          error={errors.Duracion ? true : false}
                        >
                          <Option value="15">15 minutos</Option>
                          <Option value="30">30 minutos</Option>
                        </Select>
                      )}
                    />
                  </div>
                </div>
              </div>
              <hr className="mt-6" />
              {loading ? (
                <Loader top="mt-6" />
              ) : (
                <div className="flex">
                  <Button
                    color="blue"
                    className="mt-6 mx-auto w-full max-w-sm"
                    type="submit"
                  >
                    Agregar Doctor
                  </Button>
                </div>
              )}
            </div>
          </form>
        </Card>
        <StepperC
          steps={[
            {
              Details: "Datos del doctor",
              Icon: UserIcon,
            },
            {
              Details: "Configuraciones",
              Icon: AiOutlineSetting,
            },
          ]}
          onStepChange={(step) => setStep(step)}
        />
      </div>
    </>
  );
};

export default AddDoctor;
