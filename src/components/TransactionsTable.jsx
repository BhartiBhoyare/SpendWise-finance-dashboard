import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDeleteForever } from "react-icons/md";
import { PiExportBold } from "react-icons/pi";
import { motion } from "framer-motion";
import ConfirmModal from "./ConfirmModal";
import { ChevronDown } from "lucide-react";

export default function TransactionsTable({ setEditData, setOpenModal }) {
  const {
    setTransactions,
    role,
    filter,
    search,
    setSearch,
    setFilter,
    startDate,
    endDate,
  } = useContext(AppContext);
  const { filteredTransactions } = useContext(AppContext);

  const filtered = filteredTransactions.filter((t) => {
    const matchSearch = t.category.toLowerCase().includes(search.toLowerCase());

    const matchFilter = filter === "all" || t.type === filter;

    const matchDate =
      (!startDate || new Date(t.date) >= new Date(startDate)) &&
      (!endDate || new Date(t.date) <= new Date(endDate));
    return matchSearch && matchFilter && matchDate;
  });
  const sortedTransactions = [...filtered].sort((a, b) => {
    const dateDiff = new Date(b.date) - new Date(a.date);

    if (dateDiff !== 0) return dateDiff;

    return b.id - a.id;
  });
  const handleExport = () => {
    const csv = [
      ["Date", "Category", "Amount", "Type"],
      ...filtered.map((t) => [t.date, t.category, t.amount, t.type]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.download = "filteredTransactions.csv";
    a.click();
  };

  const latestId = Math.max(...filtered.map((t) => t.id));
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [openFilter, setOpenFilter] = useState(false);

  const filterOptions = [
    { value: "all", label: "All" },
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-3 mb-4 ">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 max-w-64 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <div className="relative">
            <button
              onClick={() => setOpenFilter(!openFilter)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition"
            >
              <span className="text-sm font-medium capitalize">
                {filterOptions.find((o) => o.value === filter)?.label}
              </span>
              <ChevronDown size={16} />
            </button>

            {openFilter && (
              <div className="absolute mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden z-50">
                {filterOptions.map((opt) => (
                  <div
                    key={opt.value}
                    onClick={() => {
                      setFilter(opt.value);
                      setOpenFilter(false);
                    }}
                    className={`px-4 py-2 cursor-pointer text-sm transition
            ${
              filter === opt.value
                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
                  >
                    {opt.label}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none cursor-pointer bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-gray-300 dark:border-gray-700 px-4 py-2 pr-8 rounded-xl shadow-sm text-sm focus:outline-none"
            >
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <span className="absolute right-2 top-2 text-gray-400 pointer-events-none">
              ▼
            </span>
          </div> */}
        </div>
      </div>
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur p-2 md:p-5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Transactions
          </h2>
          <button
            onClick={handleExport}
            className="text-violet-600 dark:text-violet-400 px-4 h-7 rounded-lg hover:animate-bounce"
          >
            <PiExportBold size={20} />
          </button>
        </div>

        <table className="text-sm max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-track-neutral-700 scrollbar-thumb-neutral-900">
          <thead className="sticky block mr-1 lg:mr-3">
            <tr className="text-gray-500 table table-fixed w-full dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
              <th className="py-3 text-[0.75rem] md:text-[0.95rem]">Date</th>
              <th className="py-3 text-[0.75rem] md:text-[0.95rem]">
                Category
              </th>
              <th className="py-3 text-[0.75rem] md:text-[0.95rem]">Amount</th>
              <th className="py-3 text-[0.75rem] md:text-[0.95rem]">Type</th>
              {role === "admin" && (
                <th className="py-3 text-[0.75rem] md:text-[0.95rem]">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody className="block text-center max-h-[50vh] md:max-h-[25vh] xl:max-h-[40vh] overflow-y-auto scrollbar-thin">
            {sortedTransactions.map((t) => (
              <motion.tr
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  backgroundColor:
                    t.id === latestId ? "rgba(99,102,241,0.15)" : "",
                  borderRadius: t.id === latestId ? "2rem" : "",
                }}
                transition={{ duration: 0.4 }}
                className="table table-fixed text-[0.7rem] md:text-sm w-full border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/40 transition duration-200"
              >
                <td className="py-3 text-gray-600 dark:text-gray-300">
                  {t.date}
                </td>
                <td className="font-medium text-gray-800 dark:text-white">
                  {t.category}
                </td>
                <td
                  className={`font-semibold ${
                    t.type === "income" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  ₹{t.amount}
                </td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      t.type === "income"
                        ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {t.type}
                  </span>
                </td>
                {role === "admin" && (
                  <td className="py-3 text-gray-700">
                    <button
                      onClick={() => {
                        setEditData(t);
                        setOpenModal(true);
                      }}
                      className="text-blue-500 cursor-pointer hover:text-blue-600"
                    >
                      <TbEdit size={20} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedId(t.id);
                        setShowConfirm(true);
                      }}
                      className="text-red-500 ml-2 cursor-pointer hover:text-red-600"
                    >
                      <MdOutlineDeleteForever size={20} />
                    </button>
                  </td>
                )}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => {
          setTransactions((prev) =>
            prev.filter((item) => item.id !== selectedId),
          );
        }}
      />
    </>
  );
}
