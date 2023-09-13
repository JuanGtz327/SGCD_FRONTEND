import React from "react";
import { useAuth } from "../../context/AuthContext";

const PanelDoctor = () => {
  const { user,logout } = useAuth();

  const handleLogOut = async () => {
    await logout();
  };

  return (
    <div>
      <h1 className="text-cyan-50">Bienvenido doctor {user.name}</h1>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
};

export default PanelDoctor;
