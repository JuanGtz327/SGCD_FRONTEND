import { useEffect, useState } from "react";
import { Alert } from "@material-tailwind/react";
import { AiFillCheckCircle } from "react-icons/ai";
import { BiSolidErrorAlt } from "react-icons/bi";

const AlertCustom = ({ msg, type }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (msg && type) {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    }
  }, [msg, type]);

  return (
    <>
      <Alert
        icon={type === "success" ? <AiFillCheckCircle /> : <BiSolidErrorAlt />}
        className={`absolute top-10 right-11 z-[9999] w-[300px] md:w-[24%] md:right-[5%] md:top-16 ${
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
