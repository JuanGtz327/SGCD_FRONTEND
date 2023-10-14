import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useState } from "react";

const generateCalendar = (month = dayjs().month(), year = dayjs().year()) => {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
  const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

  const arrayOfDate = [];

  for (let i = 0; i < firstDateOfMonth.day(); i++) {
    const date = firstDateOfMonth.day(i);

    arrayOfDate.push({
      currentMonth: false,
      date,
    });
  }

  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    arrayOfDate.push({
      currentMonth: true,
      date: firstDateOfMonth.date(i),
      today:
        firstDateOfMonth.date(i).toDate().toDateString() ===
        dayjs().toDate().toDateString(),
    });
  }

  const remaining = 42 - arrayOfDate.length;

  for (
    let i = lastDateOfMonth.date() + 1;
    i <= lastDateOfMonth.date() + remaining;
    i++
  ) {
    arrayOfDate.push({
      currentMonth: false,
      date: lastDateOfMonth.date(i),
    });
  }
  return arrayOfDate;
};

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Augosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const days = [
  "Dominigo",
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
];

dayjs.extend(utc);
dayjs.extend(timezone);
const currentDate = dayjs().tz("America/Mexico_City");

export const useCalendar = () => {
  const [today, setToday] = useState(currentDate);

  const setTodayDate = () => {
    setToday(currentDate);
    return currentDate;
  };

  const getDia = (date) => {
    return days[date.day()];
  };

  const getMes = (date) => {
    return months[date.month()];
  };

  const getCalendarHeader = () => {
    return `${months[today.month()]}, ${today.year()}`;
  };

  const onNextMonth = () => {
    setToday(today.month(today.month() + 1));
  };

  const onPrevMonth = () => {
    setToday(today.month(today.month() - 1));
  };

  const calendar = generateCalendar(today.month(), today.year());

  return {
    currentDate,
    calendar,
    setTodayDate,
    getMes,
    getDia,
    getCalendarHeader,
    onNextMonth,
    onPrevMonth,
    dayjs
  };
};
