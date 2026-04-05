import { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import CustomDatePicker from "./CustomDatePicker";
import { ChevronDown } from "lucide-react";

export default function AddTransactionModal({
  isOpen,
  onClose,
  editData,
  setEditData,
}) {
  const { transactions, setTransactions } = useContext(AppContext);
  const [openType, setOpenType] = useState(false);

  useEffect(() => {
    if (editData) {
      setForm(editData);
    }
  }, [editData]);

  useEffect(() => {
    const close = () => setOpenType(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  const [form, setForm] = useState({
    amount: "",
    category: "",
    type: "expense",
    date: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.amount || !form.category || !form.date) {
      alert("Please fill all fields");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      amount: Number(form.amount),
      category: form.category,
      type: form.type,
      date: form.date,
    };

    setTransactions([...transactions, newTransaction]);

    if (editData) {
      const updated = transactions.map((t) =>
        t.id === editData.id ? { ...form, id: editData.id } : t,
      );
      setTransactions(updated);
      setEditData(null);
    } else {
      const newTransaction = {
        id: Date.now(),
        ...form,
        amount: Number(form.amount),
      };
      setTransactions([...transactions, newTransaction]);
    }

    setForm({
      amount: "",
      category: "",
      type: "expense",
      date: "",
    });

    toast.success(
      editData
        ? "Transaction updated successfully ✏️"
        : "Transaction added successfully 🎉",
    );

    onClose();
  };

  const typeOptions = [
    {
      value: "income",
      label: "Income",
    },
    {
      value: "expense",
      label: "Expense",
    },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/80 flex justify-center items-center z-50"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          className="bg-violet-100 dark:bg-violet-950 p-6 rounded-2xl w-full max-w-xs md:max-w-md shadow-lg"
        >
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              {editData ? "Edit Transaction" : "Add Transaction"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <input
                type="number"
                placeholder="Amount"
                className="w-full focus:outline-none border border-purple-300 dark:border-purple-600 bg-violet-100 dark:bg-violet-950 text-gray-900 dark:text-white p-3 rounded-lg"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
              />

              <input
                type="text"
                placeholder="Category"
                className="w-full focus:outline-none border border-purple-300 dark:border-purple-600 bg-violet-100 dark:bg-violet-950 text-gray-900 dark:text-white p-3 rounded-lg"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setOpenType(!openType); }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg 
  border border-purple-300 dark:border-purple-600 
  bg-violet-100 dark:bg-violet-950 
  text-gray-900 dark:text-white"
                >
                  <span className="capitalize">{form.type}</span>
                  <ChevronDown size={16} />
                </button>
                {openType && (
                  <div
                    className="absolute mt-2 w-full bg-white dark:bg-gray-800 
  border border-gray-200 dark:border-gray-700 
  rounded-xl shadow-lg overflow-hidden z-50"
                  >
                    {typeOptions.map((opt) => (
                      <div
                        key={opt.value}
                        onClick={(e) => {
                          e.stopPropagation();
                          setForm({ ...form, type: opt.value });
                          setOpenType(false);
                        }}
                        className={`px-4 py-2 cursor-pointer text-sm transition ${
                          form.type === opt.value
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

              <CustomDatePicker
                value={form.date}
                onChange={(date) =>
                  setForm({ ...form, date: date.toISOString().split("T")[0] })
                }
                placeholder="Add transaction date"
                className="w-full focus:outline-none cursor-pointer rounded-lg border border-purple-300 dark:border-purple-600 bg-violet-100 dark:bg-violet-950 text-gray-900 dark:text-white p-3"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="border dark:border-gray-600 text-white dark:text-gray-300 bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="text-white bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer"
                >
                  {editData ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
