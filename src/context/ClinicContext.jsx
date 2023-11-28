import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { getClinicaRequest } from "../api/api";
import { CompleteClinicModal } from "../components/generalModals/CompleteClinicModal";

export const ClinicContext = createContext();

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error("useAlert debe estar dentro del proveedor ClinicContext");
  }
  return context;
};

export const ClinicProvider = ({ children }) => {
  const [clinicState, setClinicState] = useState({});
  const {user} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (user) {
        const { data } = await getClinicaRequest(user.token);
        setClinicState(data);
      }
    })();
  }, [user]);

  return (
    <ClinicContext.Provider
      value={{
        setClinicState,
        clinicState
      }}
    >
      <CompleteClinicModal
        show={clinicState.Domicilio===null}
        onConfirm={() => navigate("/clinic")}
      />
      {children}
    </ClinicContext.Provider>
  );
};
