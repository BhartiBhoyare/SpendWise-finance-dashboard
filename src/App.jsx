import { AppProvider } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  return (
    <AppProvider>
      <Dashboard />
    </AppProvider>
  );
}

export default App;
