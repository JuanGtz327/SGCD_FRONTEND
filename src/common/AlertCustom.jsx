import { useEffect, useState } from "react";
import { Alert } from "@material-tailwind/react";
import { AiFillCheckCircle } from "react-icons/ai";
import { BiSolidErrorAlt } from "react-icons/bi";

const AlertCustom = ({ msg, type, isopen }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isopen) {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    }
  }, [isopen]);

  return (
    <>
      <Alert
        icon={type === "success" ? <AiFillCheckCircle /> : <BiSolidErrorAlt />}
        className={`fixed top-10 right-10 z-50 w-[300px] sm:w-[350px] md:w-[450px] ${
          type === "success" ? "bg-green-500" : "bg-red-500"
        }`}
        open={visible}
        onClose={() => setVisible(false)}
      >
        <>{msg}</>
      </Alert>
    </>
  );
};

export default AlertCustom;
