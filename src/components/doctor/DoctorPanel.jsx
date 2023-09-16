import React from "react";
import { useAuth } from "../../context/AuthContext";

const DoctorPanel = () => {
  const { user,logout } = useAuth();

  return (
    <div>
      <p className="text-2xl">Este sera el panel del doctor</p>
    </div>
  );
};

export default DoctorPanel;
