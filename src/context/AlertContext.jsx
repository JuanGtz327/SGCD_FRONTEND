import { createContext, useState, useContext } from "react";
import AlertCustom from "../common/AlertCustom";

export const AlertContext = createContext();

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert debe estar dentro del proveedor AlertContext");
  }
  return context;
};

export const AlertProvider = ({ children }) => {
  const [alertConfig, setAlertConfig] = useState({});

  return (
    <AlertContext.Provider
      value={{
        setAlertConfig,
        alertConfig
      }}
    >
      <AlertCustom
        msg={alertConfig.msg}
        type={alertConfig.type}
        isopen={alertConfig.isopen}
      />
      {children}
    </AlertContext.Provider>
  );
};
