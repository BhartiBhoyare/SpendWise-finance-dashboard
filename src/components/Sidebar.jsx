import { LayoutDashboard, Receipt, BarChart2, Settings } from "lucide-react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";

export default function Sidebar({ onClose }) {
  const { activePage, setActivePage } = useContext(AppContext);

  return (
    <>
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
        className="w-64 min-h-full p-5 border-r border-gray-200 
  bg-white/80 backdrop-blur-md 
  dark:bg-gray-900/80 dark:border-gray-800 
  text-gray-700 dark:text-gray-300"
      >
        <h1 className="text-xl font-bold mb-8">SpendWise</h1>

        <nav className="space-y-3">
          <MenuItem
            label="Dashboard"
            icon={<LayoutDashboard size={18} />}
            active={activePage === "dashboard"}
            onClick={() => {
              setActivePage("dashboard");
              onClose && onClose();
            }}
          />

          <MenuItem
            label="Transactions"
            icon={<Receipt size={18} />}
            active={activePage === "transactions"}
            onClick={() => setActivePage("transactions")}
          />

          <MenuItem
            label="Insights"
            icon={<BarChart2 size={18} />}
            active={activePage === "insights"}
            onClick={() => setActivePage("insights")}
          />
          <MenuItem
            label="Settings"
            icon={<Settings size={18} />}
            active={activePage === "settings"}
            onClick={() => setActivePage("settings")}
          />
        </nav>
      </motion.div>
    </>
  );
}
const MenuItem = ({ icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
      active
        ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
        : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
    }`}
    >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </div>
);