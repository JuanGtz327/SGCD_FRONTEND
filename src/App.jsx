import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUp from "./pages/Signup.jsx";
import LogIn from "./pages/Login.jsx";
import PanelDoctor from "./components/doctor/PanelDoctor.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/main" element={<PanelDoctor />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
