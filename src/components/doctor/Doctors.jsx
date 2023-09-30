import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  IconButton,
  Spinner,
} from "@material-tailwind/react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

import { deleteDoctorRequest } from "../../api/api";
import { useDoctors } from "../../hooks/useDoctors";
import Pagination from "../../common/Pagination";
import EditDoctorDialog from "./custom/EditDoctorDialog";
import { useAuth } from "../../context/AuthContext";
import { useNavigationC } from "../../hooks/useNavigationC";
import { useAlert } from "../../context/AlertContext";

const Doctors = () => {
  const { user } = useAuth();
  const { setAlertConfig } = useAlert();
  const { doctors, loading, setLoading } = useDoctors();

  const { next, prev, currentPage, pageCount, infoToDisplay, getItemProps } =
    useNavigationC(doctors);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState({});

  const onDeleteDoctor = async (idUser) => {
    setLoading(true);
    try {
      await deleteDoctorRequest(idUser, user.token);
      setAlertConfig({
        msg: "Doctor eliminado",
        type: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner className="h-8 w-8 mx-auto mt-[25%]" />
      ) : (
        <>
          <div className="flex flex-col h-full">
            <div className="flex flex-wrap gap-y-10">
              {infoToDisplay.map(({ Correo, Doctor }, key) => (
                <Card
                  key={key}
                  className="w-full max-w-[45%] mx-auto px-10 py-5"
                >
                  <CardHeader
                    color="transparent"
                    floated={false}
                    shadow={false}
                    className="mx-0 flex items-center gap-4 pt-0 pb-8"
                  >
                    <Avatar
                      size="xxl"
                      variant="rounded"
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                    />
                    <div className="flex w-full flex-col gap-0.5">
                      <div className="flex items-center justify-between">
                        <div>
                          <Typography variant="h5" color="blue-gray">
                            {Doctor.Nombre} {Doctor.ApellidoP}{" "}
                            {Doctor.ApellidoM}
                          </Typography>
                          <Typography color="blue-gray">
                            Cedula {Doctor.Cedula}
                          </Typography>
                        </div>
                        <div className="flex flex-col gap-y-3">
                          <IconButton
                            onClick={() => {
                              setOpenEdit(true);
                              setEditingDoctor({ ...Doctor, Correo });
                            }}
                          >
                            <AiFillEdit className="w-6 h-6" />
                          </IconButton>
                          <IconButton
                            color="red"
                            onClick={() => onDeleteDoctor(Doctor.idUser)}
                          >
                            <AiFillDelete className="w-6 h-6" />
                          </IconButton>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody className="mb-6 p-0">
                    <Typography>
                      Especialidad en {Doctor.Especialidad}
                    </Typography>
                    <Typography>{Correo}</Typography>
                  </CardBody>
                </Card>
              ))}
            </div>

            <Pagination
              prev={prev}
              currentPage={currentPage}
              pageCount={pageCount}
              next={next}
              getItemProps={getItemProps}
            />
          </div>

          <EditDoctorDialog
            openEdit={openEdit}
            setOpenEdit={setOpenEdit}
            editingDoctor={editingDoctor}
            setEditingDoctor={setEditingDoctor}
            setAlertConfig={setAlertConfig}
            setLoading={setLoading}
          />
        </>
      )}
    </>
  );
};

export default Doctors;
