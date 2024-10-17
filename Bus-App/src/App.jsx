// .\src\App.jsx

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage";
import ContactUs from "./components/ContactUs";
import BusDashboard from "./components/BusDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import BusRoutes from "./components/BusRoutes";
// import BusDashboardTestCode from "./components/BusDashboardTestCode";
import GetBusStop from "./components/GetBusStop";

function App() {
  const projectManage = "Jimmy";
  const scrumManage = "Joshua";
  const developer = "Chooi Chin";
  const designer = "Vincent";

  return (
    // Setup rounter with routes for main page and contact page
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} /> {/* home page */}
        <Route
          path="contact"
          element={
            <ContactUs
              projectManage={projectManage}
              scrumManage={scrumManage}
              developer={developer}
              designer={designer}
            />
          }
        />
        <Route
          path="busdashboard"
          element={
            <ProtectedRoute>
              <BusDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="busroutes"
          element={
            <ProtectedRoute>
              <BusRoutes />
            </ProtectedRoute>
          }
        />
        <Route
           path="testcode"
           element={
             <ProtectedRoute>
               <GetBusStop />
             </ProtectedRoute>
           }
        />
      </Routes>
    </Router>
  );
}
export default App;

// const apiKey = import.meta.env.VITE_APP_API_KEY;

// console.log(apiKey);
