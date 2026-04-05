import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Pencil, Save } from "lucide-react";
import toast from "react-hot-toast";

export default function Settings() {
  const { settings, setSettings } = useContext(AppContext);

  const [editSalary, setEditSalary] = useState(false);
  const [editLimit, setEditLimit] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        ⚙️ Settings
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-md transition">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg text-gray-700 dark:text-white">
              Monthly Salary
            </h2>

            <button
              onClick={() => setEditSalary(!editSalary)}
              className="text-indigo-600 flex items-center gap-1 text-sm"
            >
              <Pencil size={16} />
              {editSalary ? "Cancel" : "Edit"}
            </button>
          </div>

          {editSalary ? (
            <>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">
                    Monthly Salary
                  </label>

                  <input
                    type="number"
                    placeholder="Enter your monthly salary (₹)"
                    value={settings.salaryAmount || ""}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        salaryAmount: e.target.value,
                      })
                    }
                    className="w-full mt-1 p-3 rounded-lg border bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">
                    Salary Credit Date
                  </label>

                  <input
                    type="number"
                    min="1"
                    max="31"
                    placeholder="Enter date (e.g. 5 for 5th)"
                    value={settings.salaryDate || ""}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        salaryDate: e.target.value,
                      })
                    }
                    className="w-full mt-1 p-3 rounded-lg border bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  setEditSalary(false);
                  toast.success("Salary updated successfully 💰");
                }}
                className="w-full mt-6 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2"
              >
                <Save size={16} />
                Save Salary
              </button>
            </>
          ) : (
            <div className="space-y-2">
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                ₹{settings.salaryAmount || 0}
              </p>
              <p className="text-sm text-gray-500">
                Credited on day {settings.salaryDate || "-"}
              </p>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-md transition">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg text-gray-700 dark:text-white">
              Expense Limit
            </h2>

            <button
              onClick={() => setEditLimit(!editLimit)}
              className="text-indigo-600 flex items-center gap-1 text-sm"
            >
              <Pencil size={16} />
              {editLimit ? "Cancel" : "Edit"}
            </button>
          </div>

          {editLimit ? (
            <>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">
                    Monthly Expense Limit
                  </label>

                  <input
                    type="number"
                    placeholder="Enter your monthly expense limit (₹)"
                    value={settings.expenseLimit || ""}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        expenseLimit: e.target.value,
                      })
                    }
                    className="w-full mt-1 p-3 rounded-lg border bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  setEditLimit(false);
                  toast.success("Expense limit set successfully 🎯");
                }}
                className="w-full mt-6 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2"
              >
                <Save size={16} />
                Save Limit
              </button>
            </>
          ) : (
            <div className="space-y-2">
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                ₹{settings.expenseLimit || 0}
              </p>
              <p className="text-sm text-gray-500">Monthly spending cap</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
