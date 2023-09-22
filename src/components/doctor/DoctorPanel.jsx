import React from "react";
import { useAuth } from "../../context/AuthContext";

const DoctorPanel = () => {
  const { user,logout } = useAuth();

  console.log(user);

  return (
    <div>
      <p className="text-2xl">Este sera el panel del doctor</p>
    </div>
  );
};

export default DoctorPanel;
