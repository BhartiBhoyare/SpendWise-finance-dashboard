import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const formatCurrency = (num) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(num);
};
export default function DashboardCards() {
  const { filteredTransactions } = useContext(AppContext);

  const income = filteredTransactions 
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const expense = filteredTransactions 
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const balance = income - expense;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card title="Balance" value={balance} />
      <Card title="Income" value={income} />
      <Card title="Expenses" value={expense} />
    </div>
  );
}

const Card = ({ title, value }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.04 }}
    transition={{ duration: 0.3 }}
    className="bg-white/70 dark:bg-gray-800/70 backdrop-blur p-5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm"
  >
    <div className="hover:-translate-y-1 rounded-2xl p-1 hover:shadow-lg transition duration-300">
      <p className="text-gray-500 dark:text-gray-300 font-bold text-lg mb-1">
        {title}
      </p>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
        {formatCurrency(value)}
      </h2>
    </div>
  </motion.div>
);
