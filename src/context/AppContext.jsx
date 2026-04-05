import { transactionsData } from "../data/dummyData";
import { createContext, useState, useEffect } from "react";
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    const parsed = saved ? JSON.parse(saved) : [];

    return parsed.length > 0 ? parsed : transactionsData;
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("settings");
    return saved
      ? JSON.parse(saved)
      : {
          salaryAmount: 0,
          salaryDate: 5,
          expenseLimit: 0,
        };
  });

  const [role, setRole] = useState("admin");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState("light");
  const [activePage, setActivePage] = useState("dashboard");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateFilter, setDateFilter] = useState("monthly");

  const getFilteredTransactions = () => {
    const today = new Date();

    return transactions.filter((t) => {
      const tDate = new Date(t.date);

      if (dateFilter === "monthly") {
        return (
          tDate.getMonth() === today.getMonth() &&
          tDate.getFullYear() === today.getFullYear()
        );
      }

      if (dateFilter === "yearly") {
        return tDate.getFullYear() === today.getFullYear();
      }

      if (dateFilter === "custom") {
        return (
          (!startDate || tDate >= new Date(startDate)) &&
          (!endDate || tDate <= new Date(endDate))
        );
      }

      return true;
    });
  };
  const filteredTransactions = getFilteredTransactions();

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    const today = new Date();
    const todayDate = today.getDate();

    const alreadyAdded = transactions.some(
      (t) =>
        t.type === "income" &&
        t.category === "Salary" &&
        new Date(t.date).getMonth() === today.getMonth() &&
        new Date(t.date).getFullYear() === today.getFullYear(),
    );

    if (
      Number(settings.salaryAmount) > 0 &&
      todayDate == settings.salaryDate &&
      !alreadyAdded
    ) {
      const newSalary = {
        id: Date.now(),
        amount: Number(settings.salaryAmount),
        category: "Salary",
        type: "income",
        date: new Date().toISOString().split("T")[0],
      };

      setTransactions((prev) => [...prev, newSalary]);
    }
  }, [settings, transactions]);

  useEffect(() => {
    const today = new Date();
    const todayDate = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const alreadyAdded = transactions.some((t) => {
      const d = new Date(t.date);
      return (
        t.type === "income" &&
        t.category === "Salary" &&
        d.getMonth() === currentMonth &&
        d.getFullYear() === currentYear
      );
    });

    if (
      Number(settings.salaryAmount) > 0 &&
      Number(settings.salaryDate) > 0 &&
      todayDate === Number(settings.salaryDate) &&
      !alreadyAdded
    ) {
      const newSalary = {
        id: Date.now(),
        amount: Number(settings.salaryAmount),
        category: "Salary",
        type: "income",
        date: new Date().toISOString().split("T")[0],
      };

      setTransactions((prev) => [...prev, newSalary]);
    }
  }, [settings, transactions]);

  useEffect(() => {
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];

    const creditDate = Number(settings.salaryDate);

    const todayDate = today.getDate();

    if (todayDate !== creditDate) return;

    const alreadyExists = transactions.some(
      (t) =>
        t.type === "income" && t.category === "Salary" && t.date === todayStr,
    );

    if (alreadyExists) return;

    const newSalary = {
      id: Date.now(),
      amount: Number(settings.salaryAmount),
      category: "Salary",
      type: "income",
      date: todayStr,
    };

    setTransactions((prev) => [...prev, newSalary]);
  }, [settings.salaryDate, settings.salaryAmount, transactions]);

  return (
    <AppContext.Provider
      value={{
        transactions,
        setTransactions,
        role,
        setRole,
        filter,
        setFilter,
        search,
        setSearch,
        theme,
        setTheme,
        activePage,
        setActivePage,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        dateFilter,
        setDateFilter,
        filteredTransactions,
        settings,
        setSettings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
