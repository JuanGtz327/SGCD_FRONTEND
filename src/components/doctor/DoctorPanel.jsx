import { useAuth } from "../../context/AuthContext";

const DoctorPanel = () => {
  const { user } = useAuth();

  return (
    <div>
      <p className="text-2xl">Este sera el panel principal</p>
      <code> {JSON.stringify(user) } </code>
    </div>
  );
};

export default DoctorPanel;
