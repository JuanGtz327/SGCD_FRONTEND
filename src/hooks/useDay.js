import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
const currentDate = dayjs().tz("America/Mexico_City");

export const useDay = () => {

  const isAfter = (Fecha)=>{
    return currentDate.isAfter(Fecha);
  }

  const isBefore = (Fecha)=>{
    return currentDate.isBefore(Fecha);
  }

  const inProgress = (Fecha)=>{
    return currentDate.isBetween(Fecha, Fecha.add(30, "minute"));
  }

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
  }

  return {
    isBefore,
    isAfter,
    inProgress,
    findNext
  };
};
