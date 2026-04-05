import DashboardCards from "../components/DashboardCards";
import Charts from "../components/Charts";
import TransactionsTable from "../components/TransactionsTable";
import Insights from "../components/Insights";
import RoleSwitcher from "../components/RoleSwitcher";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import AddTransactionModal from "../components/AddTransactionModal";
import Sidebar from "../components/Sidebar";
import SettingsPage from "../components/SettingsPage";
import { Menu } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";
import { IoMdAdd } from "react-icons/io";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import {
  Calendar1,
  CalendarCheck,
  Infinity,
  SlidersHorizontal,
} from "lucide-react";
import CustomDatePicker from "../components/CustomDatePicker";

export default function Dashboard() {
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { activePage } = useContext(AppContext);
  const {
    theme,
    dateFilter,
    setDateFilter,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = useContext(AppContext);
  const filterOptions = {
    monthly: {
      label: "This Month",
      icon: <Calendar1 size={20} />,
    },
    yearly: {
      label: "This Year",
      icon: <CalendarCheck size={20} />,
    },
    lifetime: {
      label: "All Time",
      icon: <Infinity size={20} />,
    },
    custom: {
      label: "Custom",
      icon: <SlidersHorizontal size={20} />,
    },
  };
  useEffect(() => {
    if (dateFilter !== "custom") {
      setStartDate("");
      setEndDate("");
    }
  }, [dateFilter]);
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "12px",
            padding: "12px 16px",
            fontSize: "14px",
            background: theme === "dark" ? "#1f2937" : "#ffffff",
            color: theme === "dark" ? "#ffffff" : "#111827",
            border: "1px solid #e5e7eb",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
      <motion.div
        key={activePage}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.3 }}
      >
        <div className="min-h-screen bg-gradient-to-br from-sky-100 via-fuchsia-100 to-cyan-100 dark:from-cyan-950 dark:via-fuchsia-950 dark:to-blue-950 text-gray-900 dark:text-white flex transition-colors duration-300">
          <div className="hidden lg:block">
            <Sidebar />
          </div>
          {sidebarOpen && (
            <div className="fixed inset-0 bg-black/40 z-50 flex">
              <div className="w-64 bg-white dark:bg-gray-800">
                <Sidebar onClose={() => setSidebarOpen(false)} />
              </div>
              <div className="flex-1" onClick={() => setSidebarOpen(false)} />
            </div>
          )}

          <div className="flex-1 p-4">
            <div className="flex justify-between mb-6 items-center">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden"
                >
                  <Menu />
                </button>

                <RoleSwitcher />
              </div>

              <div className="flex items-center gap-4">
                <ThemeToggle />

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setOpenModal(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-200 to-indigo-200 dark:from-indigo-500 dark:to-purple-600 text-violet-950 dark:text-white font-bold px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.03] transition duration-300"
                >
                  <IoMdAdd size={23} />{" "}
                  <div className="hidden md:flex">Add Transaction</div>
                </motion.button>
              </div>
            </div>
            {activePage !== "settings" && (
              <div className="flex flex-col gap-3 mb-6 items-start md:items-center xl:flex-row justify-between">
                <div className="flex gap-2 w-3/5">
                  {["monthly", "yearly", "lifetime", "custom"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setDateFilter(type)}
                      className={`flex items-center gap-2 px-7 py-2 md:px-4 rounded-xl text-sm font-medium transition 
        ${
          dateFilter === type
            ? "bg-indigo-600 text-white shadow-md"
            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
        }`}
                    >
                      {filterOptions[type].icon}
                      <div className="hidden md:flex">
                        {filterOptions[type].label}
                      </div>
                    </button>
                  ))}
                </div>
                {dateFilter === "custom" && (
                  <div className=" flex items-center w-full md:w-2/5 justify-center gap-2">
                    <CustomDatePicker
                      value={startDate}
                      onChange={(date) => setStartDate(date)}
                      placeholder="Start Date"
                      className="w-32 px-2 py-1 rounded-lg border border-gray-500 focus:outline-none cursor-pointer bg-white dark:bg-gray-800"
                    />

                    <CustomDatePicker
                      value={endDate}
                      onChange={(date) => setEndDate(date)}
                      placeholder="End Date"
                      className="w-32 px-2 py-1 rounded-lg border border-gray-500 focus:outline-none cursor-pointer bg-white dark:bg-gray-800"
                    />
                  </div>
                )}
              </div>
            )}
            {activePage === "dashboard" && (
              <>
                <DashboardCards />
                <Charts />
              </>
            )}

            {activePage === "transactions" && (
              <TransactionsTable
                setEditData={setEditData}
                setOpenModal={setOpenModal}
              />
            )}

            {activePage === "insights" && <Insights />}

            {activePage === "settings" && <SettingsPage />}
          </div>

          <AddTransactionModal
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            editData={editData}
            setEditData={setEditData}
          />
        </div>
      </motion.div>
    </>
  );
}
