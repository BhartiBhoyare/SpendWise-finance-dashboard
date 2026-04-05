import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { MdDarkMode, MdLightMode  } from "react-icons/md";

export default function ThemeToggle() {
  const { theme, setTheme } = useContext(AppContext);

  const toggleTheme = () => {
    const root = document.documentElement;

    if (theme === "light") {
      root.classList.add("dark");
      setTheme("dark");
    } else {
      root.classList.remove("dark");
      setTheme("light");
    }

  };

  return (
    <button
      onClick={toggleTheme}
      className="md:h-11 md:w-14 flex justify-center items-center md:px-3 md:py-3 py-2.5 px-4 cursor-pointer rounded-xl bg-gradient-to-r from-purple-200 to-indigo-200 dark:from-indigo-500 dark:to-purple-600 text-black dark:text-white shadow-md hover:shadow-lg hover:scale-[1.03] transition duration-300"
    >
      {theme === "light" ? <MdDarkMode size={23} /> : <MdLightMode size={23} />}
    </button>
  );
}