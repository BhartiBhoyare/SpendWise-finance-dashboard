import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { TrendingUp, Wallet, BarChart3, IndianRupee } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import * as Recharts from "recharts";

export default function Insights() {
  const { filteredTransactions, settings } = useContext(AppContext);

  const totalTransactions = filteredTransactions.length;

  const expenseTransactions = filteredTransactions.filter(
    (t) => t.type === "expense",
  );

  const totalExpense = expenseTransactions.reduce(
    (acc, t) => acc + Number(t.amount),
    0,
  );

  const totalExpenses = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const limit = settings.expenseLimit;

  const overSpent = totalExpense - limit;
  const percentage = limit > 0 ? Math.round((overSpent / limit) * 100) : 0;

  const avgExpense =
    expenseTransactions.length > 0
      ? Math.round(totalExpense / expenseTransactions.length)
      : 0;

  const categoryMap = {};
  expenseTransactions.forEach((t) => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + Number(t.amount);
  });

  const pieData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  const topCategory =
    pieData.sort((a, b) => b.value - a.value)[0]?.name || "N/A";
  const dateMap = {};

  expenseTransactions.forEach((t) => {
    dateMap[t.date] = (dateMap[t.date] || 0) + Number(t.amount);
  });
  const Card = ({ title, value, icon }) => (
    <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {value}
        </h2>
      </div>
      <div className="text-indigo-500">{icon}</div>
    </div>
  );

  const income = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const expense = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const savings = income - expense;

  const now = new Date();

  const currentMonthExpense = filteredTransactions
    .filter((t) => {
      const d = new Date(t.date);
      return (
        t.type === "expense" &&
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      );
    })
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const prevMonthExpense = filteredTransactions
    .filter((t) => {
      const d = new Date(t.date);
      return t.type === "expense" && d.getMonth() === now.getMonth() - 1;
    })
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const trend =
    prevMonthExpense === 0
      ? 0
      : Math.round(
          ((currentMonthExpense - prevMonthExpense) / prevMonthExpense) * 100,
        );
  const sparkData = filteredTransactions.slice(-7).map((t, i) => ({
    day: i,
    value: Number(t.amount),
  }));

  return (
    <>
      <div className="space-y-6">
        {limit > 0 && totalExpenses > limit && (
          <div className="bg-red-100 dark:bg-red-900/30 text-red-600 p-3 rounded-lg">
            ⚠️ You spent {percentage}% (₹{overSpent}) more than your limit
          </div>
        )}
        {limit === 0 && (
          <div className="text-gray-500 text-sm">
            Set your expense limit in settings ⚙️
          </div>
        )}

        <div className="grid grid-cols-2 xl:grid-cols-4 mb-6 gap-4">
          <Card title="Top Category" value={topCategory} icon={<BarChart3 />} />
          <Card
            title="Transactions"
            value={totalTransactions}
            icon={<Wallet />}
          />
          <Card
            title="Avg Expense"
            value={`₹${avgExpense}`}
            icon={<IndianRupee />}
          />
          <Card title="Trend" value="Growing" icon={<TrendingUp />} />
        </div>
      </div>
      <div className="grid xl:grid-cols-3 mt-6 gap-5">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow hover:shadow-xl transition">
          <p className="text-sm text-gray-500 mb-3">Income vs Expense</p>

          <div className="flex justify-between">
            <div>
              <p className="text-green-500 text-xs">Income</p>
              <h2 className="text-lg font-semibold">
                ₹{income.toLocaleString()}
              </h2>
            </div>
            <div>
              <p className="text-red-500 text-xs">Expense</p>
              <h2 className="text-lg font-semibold">
                ₹{expense.toLocaleString()}
              </h2>
            </div>
          </div>

          <div className="mt-3 h-16">
            <Recharts.ResponsiveContainer width="100%" height="100%">
              <Recharts.AreaChart data={sparkData}>
                <Recharts.Area
                  dataKey="value"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.2}
                />
              </Recharts.AreaChart>
            </Recharts.ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-200 to-emerald-300 text-green-950 dark:from-green-600 dark:to-emerald-700 dark:text-white p-5 rounded-2xl shadow hover:scale-[1.02] transition">
          <p className="text-sm opacity-80 mb-2">Savings</p>

          <h2 className="text-2xl font-bold">
            ₹{Math.abs(savings).toLocaleString()}
          </h2>

          <p className="text-sm mt-2">
            {savings >= 0 ? "You saved money 🎉" : "You overspent ⚠️"}
          </p>

          <div className="mt-3 h-16">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparkData}>
                <Area
                  dataKey="value"
                  stroke="#ffffff"
                  fill="#ffffff"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow hover:shadow-xl transition">
          <p className="text-sm text-gray-500 mb-3">Monthly Trend</p>

          <h2
            className={`text-xl font-semibold ${
              trend > 0 ? "text-red-500" : "text-green-500"
            }`}
          >
            {trend > 0 ? `+${trend}%` : `${trend}%`}
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            {trend > 0 ? "Spending increased" : "Spending decreased"}
          </p>

          <div className="mt-3 h-16">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparkData}>
                <Area
                  dataKey="value"
                  stroke={trend > 0 ? "#ef4444" : "#22c55e"}
                  fill={trend > 0 ? "#ef4444" : "#22c55e"}
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
          <p className="text-sm text-gray-500">Expense Limit</p>

          <h2 className="text-xl font-bold">
            ₹{totalExpense} / ₹{limit || 0}
          </h2>

          <div className="mt-2 h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-red-500 rounded-full"
              style={{
                width: `${
                  limit > 0 ? Math.min((totalExpense / limit) * 100, 100) : 0
                }%`,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
