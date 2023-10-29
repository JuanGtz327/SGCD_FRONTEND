import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { AlertProvider } from "./context/AlertContext.jsx";

import PaginaInicio from "./components/inicio/PaginaInicio.jsx";

import SignUp from "./pages/Signup.jsx";
import LogIn from "./pages/Login.jsx";

import DoctorPanel from "./components/doctor/DoctorPanel.jsx";
import Doctors from "./components/doctor/Doctors.jsx";
import AddDoctor from "./components/doctor/AddDoctor.jsx";

import Patients from "./components/paciente/Patients.jsx";
import AddPatient from "./components/paciente/AddPatient.jsx";

import Appointments from "./components/citas/Appointments.jsx";

import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import Layout from "./common/Layout.jsx";
import PatientDetails from "./components/paciente/PatientDetails.jsx";
import ClinicDetail from "./components/expedienteClinico/ClinicDetail.jsx";
import MedicalCondition from "./components/expedienteClinico/MedicalCondition.jsx";
import PatientAppointments from "./components/citas/PatientAppointments.jsx";
import AdminAppointments from "./components/citas/custom/AdminAppointments.jsx";
import ExpedienteClinico from "./components/paciente/ExpedienteClinico.jsx";

const App = () => {
  return (
    <AuthProvider>
      <AlertProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PaginaInicio />} />
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
                path="/addDoctor"
                element={
                  <Layout>
                    <AddDoctor />
                  </Layout>
                }
              />
              <Route
                path="/listDoctors"
                element={
                  <Layout>
                    <Doctors />
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
                path="/listPatients/:clinicID"
                element={
                  <Layout>
                    <Patients />
                  </Layout>
                }
              />
              <Route
                path="/patient/:patientID"
                element={
                  <Layout>
                    <PatientDetails />
                  </Layout>
                }
              />
              <Route
                path="/patientAppointments"
                element={
                  <Layout>
                    <PatientAppointments />
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
              <Route
                path="/adminAppointments"
                element={
                  <Layout>
                    <AdminAppointments />
                  </Layout>
                }
              />
              <Route
                path="/clinicDetail/:patientID"
                element={
                  <Layout>
                    <ClinicDetail />
                  </Layout>
                }
              />
              <Route
                path="/medicalCondition/:patientID"
                element={
                  <Layout>
                    <MedicalCondition />
                  </Layout>
                }
              />
              <Route
                path="/medicalRecord/:patientID"
                element={
                  <Layout>
                    <ExpedienteClinico />
                  </Layout>
                }
              />
            </Route>
            <Route path="*" element={<h1>No se encontro</h1>} />
          </Routes>
        </BrowserRouter>
      </AlertProvider>
    </AuthProvider>
  );
};

export default App;
