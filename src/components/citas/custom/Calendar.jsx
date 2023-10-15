import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useCalendar } from "../../../hooks/useCalendar";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Calendar = ({ selectDate, onDayChange, onSetToday, customClassName="" }) => {
  const {
    calendar,
    getCalendarHeader,
    setTodayDate,
    onNextMonth,
    onPrevMonth,
  } = useCalendar();

  return (
    <div className={`${customClassName} h-fit p-1 md:p-12`}>
      <div className="flex justify-between items-center">
        <h1 className="select-none font-semibold">{getCalendarHeader()}</h1>
        <div className="flex gap-10 items-center ">
          <GrFormPrevious
            className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
            onClick={() => onPrevMonth()}
          />
          <h1
            className=" cursor-pointer hover:scale-105 transition-all"
            onClick={() => onSetToday(setTodayDate())}
          >
            Hoy
          </h1>
          <GrFormNext
            className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
            onClick={() => onNextMonth()}
          />
        </div>
      </div>
      <div className="grid grid-cols-7 ">
        {["D", "L", "M", "M", "J", "V", "S"].map((day, index) => {
          return (
            <h1
              key={index}
              className="text-sm text-center h-14 w-14 grid place-content-center text-gray-500 select-none"
            >
              {day}
            </h1>
          );
        })}
      </div>
      <div className=" grid grid-cols-7 ">
        {calendar.map(({ date, currentMonth, today }, index) => {
          return (
            <div
              key={index}
              className="p-2 text-center h-14 grid place-content-center text-sm border-t"
            >
              <h1
                className={cn(
                  currentMonth ? "" : "text-gray-400",
                  today ? "bg-indigo-400 text-white" : "",
                  selectDate.toDate().toDateString() ===
                    date.toDate().toDateString()
                    ? "bg-light-blue-500 text-white"
                    : "",
                  "h-10 w-10 rounded-full grid place-content-center hover:bg-cyan-400 hover:text-white transition-all cursor-pointer select-none"
                )}
                onClick={() => onDayChange(date)}
              >
                {date.date()}
              </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
