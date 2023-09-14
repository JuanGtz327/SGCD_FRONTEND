import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

import SignUp from "./pages/Signup.jsx";
import LogIn from "./pages/Login.jsx";
import DoctorPanel from "./components/doctor/DoctorPanel.jsx";
import AddPatient from "./components/doctor/AddPatient.jsx";

import ProtectedRoute from "./pages/ProtectedRoute.jsx";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/main" element={<DoctorPanel />} />
            <Route path="/addPatient" element={<AddPatient />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
