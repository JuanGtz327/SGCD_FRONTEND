import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  IconButton,
  Button,
  Spinner,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import AlertCustom from "../../common/AlertCustom";
import { useForm } from "react-hook-form";

import {
  getDoctorsRequest,
  deleteDoctorRequest,
  editDoctorRequest,
} from "../../api/api";
import { useAuth } from "../../context/AuthContext";

const Doctors = () => {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const [loading, setLoading] = useState(true);

  const itemsPerPage = 6;
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);

  const [alertConfig, setAlertConfig] = useState({});
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(!openEdit);
  const [editingDoctor, setEditingDoctor] = useState({});
  const [editingEmail, setEditingEmail] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    (async () => {
      const response = await getDoctorsRequest(user.token);
      setDoctors(response.data);
      setTotalItems(response.data.length);
      setPageCount(Math.ceil(response.data.length / itemsPerPage));
      setLoading(false);
    })();
  }, []);

  const getItemProps = (index) => ({
    variant: currentPage === index ? "filled" : "text",
    color: "white",
    onClick: () => setCurrentPage(index),
  });

  const next = () => {
    if (currentPage === pageCount) return;
    setCurrentPage(currentPage + 1);
  };

  const prev = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    (async () => {
      const response = await getDoctorsRequest(user.token);
      setDoctors(response.data);
      setTotalItems(response.data.length);
      setPageCount(Math.ceil(response.data.length / itemsPerPage));
    })();
  }, [loading]);

  const doctorsToDisplay = doctors.slice(startIndex, endIndex + 1);

  const onEditSubmit = handleSubmit(async (values) => {
    setLoading(true);
    try {
      if (values.Password === "") {
        delete values.Password;
      }
      if (editingEmail === false) {
        delete values.Correo;
      }
      const res = await editDoctorRequest(editingDoctor.id, values, user.token);
      if (res.status == 200) {
        setOpenEdit(false);
        setAlertConfig({
          msg: "Doctor actualizado",
          type: "success",
          isopen: true,
        });
      } else {
        setAlertConfig({
          msg: "No se pudo actualizar",
          type: "error",
          isopen: true,
        });
      }
    } catch (error) {
      setOpenEdit(false);
      setAlertConfig({
        msg: error.response.data.message,
        type: "error",
        isopen: true,
      });
    }
    setLoading(false);
  });

  const handleInputChange = (event) => {
    if (event.target.name === "Correo") {
      setEditingEmail(true);
      setEditingDoctor({
        ...editingDoctor,
        User: {
          [event.target.name]: event.target.value,
        },
      });
    }else{
      setEditingDoctor({
        ...editingDoctor,
        [event.target.name]: event.target.value,
      });
    }
  };

  return (
    <>
      {loading ? (
        <Spinner className="h-8 w-8 mx-auto mt-[25%]" />
      ) : (
        <>
          <AlertCustom
            msg={alertConfig.msg}
            type={alertConfig.type}
            isopen={alertConfig.isopen}
          />
          <div className="flex flex-wrap gap-y-10">
            {doctorsToDisplay.map((doctor, key) => (
              <Card key={key} className="w-full max-w-[45%] mx-auto px-10 py-5">
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
                          {doctor.Nombre} {doctor.ApellidoP} {doctor.ApellidoM}
                        </Typography>
                        <Typography color="blue-gray">
                          Cedula {doctor.Cedula}
                        </Typography>
                      </div>
                      <div className="flex flex-col gap-y-3">
                        <IconButton
                          onClick={() => {
                            setOpenEdit(true);
                            setEditingDoctor(doctor);
                          }}
                        >
                          <AiFillEdit className="w-6 h-6" />
                        </IconButton>
                        <IconButton
                          color="red"
                          onClick={async () => {
                            setLoading(true);
                            try {
                              await deleteDoctorRequest(doctor.id, user.token);
                              setAlertConfig({
                                msg: "Doctor eliminado",
                                type: "success",
                                isopen: true,
                              });
                            } catch (error) {
                              console.log(error);
                            }
                            setLoading(false);
                          }}
                        >
                          <AiFillDelete className="w-6 h-6" />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="mb-6 p-0">
                  <Typography>Especialidad en {doctor.Especialidad}</Typography>
                </CardBody>
              </Card>
            ))}
          </div>
          <div className="absolute bottom-10 left-[48.5%]">
            <div className="flex items-center gap-4 mt-10">
              <Button
                className="flex items-center gap-2"
                onClick={prev}
                disabled={currentPage === 1}
              >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Anterior
              </Button>
              <div className="flex items-center gap-2">
                {Array.from({ length: pageCount }).map((_, index) => (
                  <IconButton key={index} {...getItemProps(index + 1)}>
                    {index + 1}
                  </IconButton>
                ))}
              </div>
              <Button
                className="flex items-center gap-2"
                onClick={next}
                disabled={currentPage === pageCount}
              >
                Siguiente
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Dialog
            open={openEdit}
            handler={handleOpenEdit}
            size="xs"
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0.9, y: -100 },
            }}
          >
            <DialogHeader>Doctor: {editingDoctor.Nombre}</DialogHeader>
            <form className="mt-4 mb-2 w-[100%]" onSubmit={onEditSubmit}>
              <DialogBody divider>
                <Card shadow={false} className="w-96 px-5 py-5 mx-auto">
                  <Typography variant="h4" color="blue-gray">
                    Editar doctor
                  </Typography>
                  <div className="mt-4 mb-4 flex flex-col gap-6">
                    <Input
                      size="lg"
                      label="Nombre"
                      type="text"
                      {...register("Nombre", { required: true })}
                      error={errors.Nombre ? true : false}
                      value={editingDoctor.Nombre}
                      onChange={handleInputChange}
                    />
                    <div className="flex items-center gap-4">
                      <Input
                        label="Apellido Paterno"
                        maxLength={15}
                        containerProps={{ className: "min-w-[72px]" }}
                        type="text"
                        {...register("ApellidoP", { required: true })}
                        error={errors.ApellidoP ? true : false}
                        value={editingDoctor.ApellidoP}
                        onChange={handleInputChange}
                      />
                      <Input
                        label="Apellido Materno"
                        maxLength={15}
                        containerProps={{ className: "min-w-[72px]" }}
                        type="text"
                        {...register("ApellidoM", { required: true })}
                        error={errors.ApellidoM ? true : false}
                        value={editingDoctor.ApellidoM}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <Input
                        label="Especialidad"
                        maxLength={20}
                        containerProps={{ className: "min-w-[72px]" }}
                        type="text"
                        {...register("Especialidad", { required: true })}
                        error={errors.Especialidad ? true : false}
                        value={editingDoctor.Especialidad}
                        onChange={handleInputChange}
                      />
                      <Input
                        label="Cedula"
                        maxLength={20}
                        containerProps={{ className: "min-w-[72px]" }}
                        type="text"
                        {...register("Cedula", { required: true })}
                        error={errors.Cedula ? true : false}
                        value={editingDoctor.Cedula}
                        onChange={handleInputChange}
                      />
                    </div>
                    <Input
                      size="lg"
                      label="Correo"
                      type="email"
                      {...register("Correo", { required: true })}
                      value={editingDoctor?.User?.Correo}
                      onChange={handleInputChange}
                    />
                    <Input
                      size="lg"
                      label="Contraseña"
                      type="password"
                      {...register("Password")}
                      error={errors.Password ? true : false}
                    />
                    {errors.Password ? (
                      <Typography variant="small" color="red" className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-4 mr-1 mt-1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Usa al menos 8 caracteres, una mayuscula y un numero
                      </Typography>
                    ) : (
                      <></>
                    )}
                  </div>
                </Card>
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={() => {
                    setOpenEdit(false);
                    setEditingDoctor({});
                  }}
                  className="mr-1"
                >
                  <span>Cancelar</span>
                </Button>
                <Button variant="gradient" color="blue" type="sumbit">
                  <span>Confirmar</span>
                </Button>
              </DialogFooter>
            </form>
          </Dialog>
        </>
      )}
    </>
  );
};

export default Doctors;
