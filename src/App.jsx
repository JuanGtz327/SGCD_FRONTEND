import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ClinicProvider } from "./context/ClinicContext.jsx";

import PaginaInicio from "./components/inicio/PaginaInicio.jsx";

import SignUp from "./pages/Signup.jsx";
import LogIn from "./pages/Login.jsx";

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
import Perfil from "./components/general/Perfil.jsx";
import DocPac from "./components/admin/DocPac.jsx";
import Clinic from "./components/general/Clinic.jsx";
import MainPanel from "./components/general/MainPanel.jsx";
import DoctorDetails from "./components/doctor/DoctorDetails.jsx";
import DoctorAdministration from "./components/doctor/DoctorAdministration.jsx";
import PacDoc from "./components/admin/PacDoc.jsx";
import DoctorConfigs from "./components/doctor/DoctorConfigs.jsx";
import Recipe from "./components/recetas/Recipe.jsx";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ClinicProvider>
          <Routes>
            <Route path="/" element={<PaginaInicio />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<ProtectedRoute />}>
              <Route
                path="/main"
                element={
                  <Layout>
                    <MainPanel />
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
                path="/doctor/:doctorID"
                element={
                  <Layout>
                    <DoctorDetails />
                  </Layout>
                }
              />
              <Route
                path="/doctorHandle/:doctorID"
                element={
                  <Layout>
                    <DoctorAdministration />
                  </Layout>
                }
              />
              <Route
                path="/doctorConfigs"
                element={
                  <Layout>
                    <DoctorConfigs />
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
              <Route
                path="/profile"
                element={
                  <Layout>
                    <Perfil />
                  </Layout>
                }
              />
              <Route
                path="/newDocPac/:patientID"
                element={
                  <Layout>
                    <DocPac />
                  </Layout>
                }
              />
              <Route
                path="/newPacDoc/:doctorID"
                element={
                  <Layout>
                    <PacDoc />
                  </Layout>
                }
              />
              <Route
                path="/clinic"
                element={
                  <Layout>
                    <Clinic />
                  </Layout>
                }
              />
              <Route
                path="/newRecipe/:patientID/:padecimientoID"
                element={
                  <Layout>
                    <Recipe />
                  </Layout>
                }
              />
            </Route>
            <Route path="*" element={<h1>No se encontro</h1>} />
          </Routes>
        </ClinicProvider>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
