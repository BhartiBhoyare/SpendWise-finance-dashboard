import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { ChevronDown, Shield, Eye } from "lucide-react";

export default function RoleSwitcher() {
  const { role, setRole } = useContext(AppContext);
  const [open, setOpen] = useState(false);

  const options = [
    { value: "admin", label: "Admin", icon: <Shield size={16} /> },
    { value: "viewer", label: "Viewer", icon: <Eye size={16} /> },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition"
      >
        {options.find((o) => o.value === role)?.icon}
        <span className="text-sm font-medium capitalize">{role}</span>
        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="absolute mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden z-50">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                setRole(opt.value);
                setOpen(false);
              }}
              className={`flex items-center gap-2 px-4 py-2 cursor-pointer text-sm transition
                ${
                  role === opt.value
                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
            >
              {opt.icon}
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
