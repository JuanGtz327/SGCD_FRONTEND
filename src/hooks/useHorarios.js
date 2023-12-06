import { useEffect, useState } from "react";
import { useAppointments } from "./useAppointments";
import dayjs from "dayjs";
import "dayjs/locale/es";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("es");
const currentDate = dayjs().tz("America/Mexico_City");

const generarHorarios = (rangoTiempo, duracionCita) => {
  // Parseamos el rango de tiempo en horas
  const [horaInicio, horaFin] = rangoTiempo
    .split("-")
    .map((hora) => parseInt(hora, 10));

  // Calculamos el número total de minutos en el rango de tiempo
  const totalMinutos = (horaFin - horaInicio) * 60;

  // Calculamos la cantidad de citas que pueden ocurrir en el rango de tiempo
  const cantidadCitas = Math.floor(totalMinutos / duracionCita);

  // Generamos los horarios de las citas
  const horarios = [];
  let horaActual = horaInicio;

  for (let i = 0; i < cantidadCitas; i++) {
    const minutos = (horaActual % 1) * 60;

    let checkValidHour = `${Math.floor(horaActual)}`
    if (checkValidHour.length < 2) checkValidHour = "0" + checkValidHour;

    const horaFormateada = `${checkValidHour}:${minutos === 0 ? "00" : minutos
      }`;

    horarios.push(horaFormateada);

    // Incrementamos la hora actual por la duración de la cita
    horaActual += duracionCita / 60;
  }

  return horarios;
};

export const useHorarios = (docConfigs, appointments, selectDate) => {
  const { appointments: EditAppointmentsTime } = useAppointments();
  const [horarios, setHorarios] = useState([]);
  const [horariosCita, setHorariosCita] = useState([]);
  const [horariosOcupados, setHorariosOcupados] = useState([]);

  useEffect(() => {

    if (docConfigs === undefined || !docConfigs)
      return;

    if (docConfigs.length === 0)
      return;

    if (docConfigs === 'all' || docConfigs >= 0)
      return;

    const horarios = generarHorarios(
      docConfigs.Configuracione.Horario,
      docConfigs.Configuracione.Duracion_cita
    );
    setHorarios(horarios);
  }, [docConfigs]);

  useEffect(() => {
    if (selectDate === undefined)
      return;

    setHorariosOcupados(
      appointments
        .filter(
          ({ Fecha, CancelacionCitum }) => {

            if (CancelacionCitum !== null)
              return false;

            return Fecha.split(" ")[0] === selectDate.format().split("T")[0]
          }
        )
        .map(({ Fecha }) => {
          const horarioOcupado = Fecha.split(" ")[1];
          return horarioOcupado.substring(0, horarioOcupado.lastIndexOf(":"));
        })
    );
  }, [horarios, appointments, selectDate]);

  useEffect(() => {
    //Si la fecha seleccionada es mayor a la fecha actual, cargar todos los horarios
    if (currentDate.isBefore(selectDate)) {
      setHorariosCita(horarios.filter((cita1) => !horariosOcupados.includes(cita1)));
      return;
    }
    // Si la fecha seleccionada es igual a la fecha actual, cargar los horarios disponibles
    const arrHoras = horarios.filter((cita1) => !horariosOcupados.includes(cita1))
    const horasValidas = arrHoras.filter(hora => {
      const [hour, minute] = hora.split(':');
      const horaDayjs = currentDate.set('hour', parseInt(hour)).set('minute', parseInt(minute));
      return horaDayjs.isAfter(currentDate);
    });
    setHorariosCita(horasValidas);
  }, [horarios, horariosOcupados]);

  const getHorariosEdit = (filterDate) => {
    //Si la fecha seleccionada es mayor a la fecha actual, cargar todos los horarios
    const ocupados = EditAppointmentsTime.filter(
      ({ Fecha, CancelacionCitum }) => {

        if (CancelacionCitum !== null)
          return false;

        return Fecha.split(" ")[0] === filterDate.format().split("T")[0]
      }
    )
      .map(({ Fecha }) => {
        const horarioOcupado = Fecha.split(" ")[1];
        return horarioOcupado.substring(0, horarioOcupado.lastIndexOf(":"));
      })

    const arrHoras = horarios.filter((cita1) => !ocupados.includes(cita1))

    // Si la fecha seleccionada es igual a la fecha actual, cargar los horarios disponibles
    const horasValidas = arrHoras.filter(hora => {
      const [hour, minute] = hora.split(':');
      const horaDayjs = currentDate.set('hour', parseInt(hour)).set('minute', parseInt(minute));
      return horaDayjs.isAfter(currentDate);
    });

    if (currentDate.isBefore(filterDate)) {
      return arrHoras;
    } else {
      return horasValidas;
    }

  }

  return {
    horariosCita,
    getHorariosEdit
  }
}