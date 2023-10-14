import { useAuth } from "../../context/AuthContext";

const DoctorPanel = () => {
  const { user } = useAuth();

  console.log(user);

  return (
    <div>
      <p className="text-2xl">Este sera el panel principal</p>
    </div>
  );
};

export default DoctorPanel;
