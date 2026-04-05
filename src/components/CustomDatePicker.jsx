import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDays } from "lucide-react";

export default function CustomDatePicker({
  value,
  onChange,
  placeholder = "Select date",
  className = "",
}) {
  return (
    <div className="relative w-full">
      <CalendarDays
        size={16}
        className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-400"
      />
        <DatePicker
          selected={value ? new Date(value) : null}
          onChange={(date) => onChange(date)}
          maxDate={new Date()}
          placeholderText={placeholder}
          wrapperClassName="w-full"
          className={className}
          calendarClassName="!bg-white dark:!bg-gray-600 !border !border-gray-200 dark:!border-gray-700 rounded-xl"
          dayClassName={() =>
            "hover:bg-indigo-100 dark:hover:bg-indigo-900/40 rounded-md"
          }
        />
    </div>
  );
}
