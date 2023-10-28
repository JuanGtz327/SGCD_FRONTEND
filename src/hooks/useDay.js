import dayjs from "dayjs";
import "dayjs/locale/es";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("es");
const currentDate = dayjs().tz("America/Mexico_City");

export const useDay = () => {
  const isToday = (Fecha) => {
    if (
      Fecha.year() === currentDate.year() &&
      Fecha.month() === currentDate.month() &&
      Fecha.date() === currentDate.date()
    ) {
      return true;
    }
    return false;
  };

  const isAfter = (Fecha) => {
    return currentDate.isAfter(Fecha);
  };

  const isBeforeOneDay = (Fecha) => {
    const original = dayjs(Fecha)
    return currentDate.isBefore(original.subtract(2, "hour"));
  };

  const isValidHour = (Fecha,time) => {
    const original = dayjs(Fecha)
    const minutos = currentDate.minute();
    const redondeadoMinutos = Math.floor(minutos / time) * time;
    const horaRedondeada = currentDate.set('minute', redondeadoMinutos);
    return horaRedondeada.isBefore(original);
  }

  const isBefore = (Fecha) => {
    return currentDate.isBefore(dayjs(Fecha));
  };

  const inProgress = (Fecha) => {
    return currentDate.isBetween(Fecha, Fecha.add(30, "minute"));
  };

  const findNext = (Appointments) => {
    const horaActual = dayjs();

    const citasOrdenadas = Appointments.slice();

    citasOrdenadas.sort((a, b) => {
      const horaCitaA = dayjs(a.hora);
      const horaCitaB = dayjs(b.hora);
      return horaCitaA - horaCitaB;
    });

    let indiceCitaMasCercana = -1;
    let tiempoMinimoHastaCita = Infinity;

    for (let i = 0; i < citasOrdenadas.length; i++) {
      const cita = citasOrdenadas[i];
      const horaCita = dayjs(cita.Fecha);
      const tiempoHastaCita = horaCita.diff(horaActual);
      if (tiempoHastaCita > 0 && tiempoHastaCita < tiempoMinimoHastaCita) {
        indiceCitaMasCercana = Appointments.indexOf(cita);
        tiempoMinimoHastaCita = tiempoHastaCita;
      }
    }

    return indiceCitaMasCercana;
  };

  const convertToBirthDate = (dateString) => {
    const [datePart] = dateString.split(' ');
    const birthDate = dayjs(datePart).add(1, 'day');
    return birthDate.format('DD MMMM YYYY');
  }

  return {
    currentDate,
    isToday,
    isBefore,
    isBeforeOneDay,
    isAfter,
    isValidHour,
    inProgress,
    findNext,
    convertToBirthDate
  };
};
