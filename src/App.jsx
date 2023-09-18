import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

import SignUp from "./pages/Signup.jsx";
import LogIn from "./pages/Login.jsx";
import DoctorPanel from "./components/doctor/DoctorPanel.jsx";
import AddPatient from "./components/doctor/AddPatient.jsx";
import Patients from "./components/doctor/Patients.jsx";
import Appointments from "./components/doctor/Appointments.jsx";

import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import Layout from "./common/Layout.jsx";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/main"
              element={
                <Layout>
                  <DoctorPanel />
                </Layout>
              }
            />
            <Route
              path="/addPatient"
              element={
                <Layout>
                  <AddPatient />
                </Layout>
              }
            />
            <Route
              path="/listPatients"
              element={
                <Layout>
                  <Patients />
                </Layout>
              }
            />
            <Route
              path="/appointments"
              element={
                <Layout>
                  <Appointments />
                </Layout>
              }
            />
          </Route>
          <Route path="*" element={ <h1>No se encotnro</h1> } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
