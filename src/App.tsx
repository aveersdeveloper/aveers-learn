import "./App.css";
import { AuthProvider } from "./auth/AuthContext";
import Links from "./Routes";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./pages/home/DataContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <DataProvider>
            <Links />
          </DataProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
