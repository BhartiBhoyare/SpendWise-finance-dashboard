import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  AreaChart,
  ResponsiveContainer,
} from "recharts";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";

export default function Charts() {
  const generateColor = (str) => {
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 255;
      color += value.toString(16).padStart(2, "0");
    }

    return color;
  };
  const { filteredTransactions } = useContext(AppContext);

  const expenseMap = {};

  filteredTransactions.forEach((t) => {
    if (t.type === "expense") {
      if (!expenseMap[t.date]) {
        expenseMap[t.date] = 0;
      }
      expenseMap[t.date] += Number(t.amount);
    }
  });

  const lineData = Object.keys(expenseMap)
    .sort()
    .map((date) => ({
      date,
      amount: expenseMap[date],
    }));

  const categoryMap = {};
  filteredTransactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const pieData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  const total = pieData.reduce((acc, item) => acc + Number(item.value), 0);

  return (
    <>
      <div className="grid xl:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md p-5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-gray-700 dark:text-white font-medium mb-3">
              Daily Expense Trend
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={lineData}>
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e01eeb" stopOpacity={0.4} />
                    <stop
                      offset="200%"
                      stopColor="#10b981"
                      stopOpacity={0.01}
                    />
                  </linearGradient>
                </defs>

                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />

                <Tooltip
                  contentStyle={{
                    background: "#c1abf5",
                    border: "none",
                    borderRadius: "8px",
                    color: "#7fmk9a",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#6366f1"
                  style={{ filter: "drop-shadow(0 0 6px #6366f1)" }}
                  fill="url(#gradient)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <h3 className="text-gray-800 dark:text-white font-semibold mb-4">
            Expenses Breakdown
          </h3>

          <div className="flex flex-col md:flex-row items-center gap-5">
            <div className="relative">
              <ResponsiveContainer width={220} height={220}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    innerRadius={65}
                    outerRadius={100}
                    paddingAngle={4}
                    animationDuration={800}
                  >
                    {pieData.map((entry, i) => (
                      <Cell
                        key={i}
                        fill={generateColor(entry.name)}
                        style={{
                          filter: "drop-shadow(0 0 6px rgba(0,0,0,0.15))",
                        }}
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    wrapperStyle={{zIndex:50}}
                    formatter={(value) => {
                      const total = pieData.reduce(
                        (acc, item) => acc + item.value,
                        0,
                      );
                      const percent = ((value / total) * 100).toFixed(1);

                      return [`₹${value} (${percent}%)`, ""];
                    }}
                    contentStyle={{
                      background: "#ffff",
                      border: "none",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Total
                </p>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  ₹{total}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-3 lg:grid-cols-2 w-full gap-2">
              {pieData.map((entry, i) => {
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-white/60 dark:bg-gray-700/50 p-2 rounded-lg hover:scale-[1.02] transition"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: generateColor(entry.name) }}
                      />
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {entry.name}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
