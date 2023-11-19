import {
  Alert,
  Avatar,
  Card,
  CardBody,
  CardHeader,
  List,
  ListItem,
  ListItemPrefix,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import { useAuth } from "../../context/AuthContext";
import { FaCalendarCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppointments } from "../../hooks/useAppointments";
import { useCalendar } from "../../hooks/useCalendar";
import { createElement, useEffect, useState } from "react";
import { BsInfoCircleFill } from "react-icons/bs";
import AppointmentsAccordion from "../citas/custom/AppointmentsAccordion";
import { useDoctors } from "../../hooks/useDoctors";
import { usePatients } from "../../hooks/usePatients";
import { useDay } from "../../hooks/useDay";
import { getClinicaRequest, getProfileRequest } from "../../api/api";
import Loader from "../../common/Loader";
import { FaUser } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";

const data = [
  {
    label: "Doctores",
    value: "doctors",
    icon: FaUserDoctor,
    desc: `Because it's about motivating the doers. Because I'm here
    to follow my dreams and inspire other people to follow their dreams, too.`,
  },
  {
    label: "Pacientes",
    value: "patients",
    icon: FaUser,
    desc: `We're not always in the position that we want to be at.
    We're constantly growing. We're constantly making mistakes. We're
    constantly trying to express ourselves and actualize our dreams.`,
  },
];

const MainPanel = () => {
  const { user } = useAuth();
  const { currentDate } = useCalendar();
  const { appointments } = useAppointments();
  const {
    doctors,
    docConfigs,
    setLoading: setDoctorLoading,
    loading,
  } = useDoctors();
  const { pacientes } = usePatients();
  const { convertToBirthDate, findNext } = useDay();
  const [nextAppointment, setNextAppointment] = useState(null);
  const [clinica, setClinica] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingClinica, setLoadingClinica] = useState(true);
  const [loadingAppointments, setLoadingAppointments] = useState(true);

  useEffect(() => {
    if (appointments[findNext(appointments)] === undefined) return;

    if (
      appointments[findNext(appointments)].Fecha.split(" ")[0] !=
      currentDate.format().split("T")[0]
    ) {
      setLoadingAppointments(false);
      return;
    }

    setNextAppointment([appointments[findNext(appointments)]]);
    setLoadingAppointments(false);
  }, [appointments, currentDate]);

  useEffect(() => {
    (async () => {
      const response = await getClinicaRequest(user.token);
      const response2 = await getProfileRequest(user.token);
      setClinica(response.data);
      setLoadingClinica(false);
      setPerfil(response2.data);
      setLoadingProfile(false);
    })();
  }, [user]);

  return (
    <section className="text-gray-600 body-font">
      {!loading ? (
        <div className="container md:px-5 md:py-8 mx-auto flex flex-wrap">
          <div className="flex w-full lg:mb-16 mb-5 flex-wrap">
            {!loadingProfile ? (
              <div className="w-full md:w-1/3 text-center">
                {!user.is_admin ? (
                  <Typography variant="h3" color="gray">
                    {user.is_doctor ? (
                      "Dr. " +
                      perfil?.Doctor.Nombre +
                      " " +
                      perfil?.Doctor.ApellidoP +
                      " " +
                      perfil?.Doctor.ApellidoM
                    ) : (
                      <Typography variant="h3" color="gray">
                        {perfil?.Paciente.Nombre +
                          " " +
                          perfil?.Paciente.ApellidoP +
                          " " +
                          perfil?.Paciente.ApellidoM}
                      </Typography>
                    )}
                  </Typography>
                ) : (
                  <Typography variant="h3" color="gray">
                    {user.email}
                  </Typography>
                )}
                <div className="flex my-2 md:mt-6 justify-center">
                  <div className="w-full h-1 rounded-full bg-indigo-500 inline-flex"></div>
                </div>
              </div>
            ) : (
              <Loader />
            )}
            <p className="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-base text-justify">
              Bienvenido a su panel de control, aqui podra ver sus citas
              agendadas asi como los pacientes que tiene asociados a su cuenta.
              Tambien puede ver detalles de su cuenta asi como de la clinica a
              la que pertenece.
            </p>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-1">
            <div className="flex flex-wrap gap-1 ">
              <div className=" md:p-2 p-1 lg:w-full md:h-[275px] ">
                <div className="bg-white md:shadow-2xl h-full md:p-4 flex flex-col justify-between">
                  {!loadingAppointments ? (
                    <>
                      <Typography
                        variant="h4"
                        className="flex gap-2 items-center"
                      >
                        <FaCalendarCheck className="text-indigo-500" /> Proxima
                        cita
                      </Typography>
                      {nextAppointment ? (
                        <AppointmentsAccordion
                          appointments={nextAppointment}
                          selectDate={currentDate}
                          docConfigs={docConfigs}
                          setDoctorLoading={setDoctorLoading}
                          view={
                            user.is_admin
                              ? "admin"
                              : user.is_doctor && !user.is_admin
                              ? "doctor"
                              : "patient"
                          }
                        />
                      ) : (
                        <Alert
                          className="mt-3 md:mt-0 rounded border-blue-500 bg-blue-500/10 font-medium text-blue-600 h-3/5 flex items-center"
                          open
                          icon={<BsInfoCircleFill />}
                        >
                          No cuenta con citas agendadas para el dia de hoy.
                        </Alert>
                      )}
                      <div className="flex justify-end mt-3">
                        <Link to={`${user.is_admin?'/adminAppointments':user.is_doctor?'/appointments':'/patientAppointments'}`}>
                          <Typography
                            variant="small"
                            color="blue"
                            className="flex gap-2 items-center hover:underline text-right"
                          >
                            Calendario de citas
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                              className="h-4 w-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                              />
                            </svg>
                          </Typography>
                        </Link>
                      </div>
                    </>
                  ) : (
                    <Loader />
                  )}
                </div>
              </div>
              <hr className="md:hidden w-full border-blue-200 p-2" />
              <div className="md:p-2 p-1 w-full md:h-[400px]">
                <Card className="shadow-none w-full h-full flex-row rounded-none md:shadow-2xl">
                  <CardHeader
                    shadow={false}
                    floated={false}
                    className="m-0 md:w-3/5 rounded-none"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1631248055158-edec7a3c072b?q=80&w=2061&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="card-image"
                      className="h-full w-full object-cover"
                    />
                  </CardHeader>
                  <CardBody className="flex flex-col justify-between md:w-2/5">
                    {!loadingClinica ? (
                      <div>
                        <Typography
                          variant="h4"
                          color="blue-gray"
                          className="mb-2"
                        >
                          {clinica?.Nombre}
                        </Typography>
                        <Typography color="gray" className="mb-8 font-normal">
                          {clinica?.Descripcion}
                        </Typography>
                      </div>
                    ) : (
                      <Loader />
                    )}
                    <div className="flex justify-end mt-3">
                      <Link to="/clinic">
                        <Typography
                          variant="small"
                          color="blue"
                          className="flex gap-2 items-center hover:underline text-right"
                        >
                          Mi Clinica
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            className="h-4 w-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                            />
                          </svg>
                        </Typography>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              <div className="md:p-2 p-1 w-full md:h-[475px]">
                <Card className="shadow-none flex flex-col justify-between w-full h-full rounded-none md:shadow-2xl">
                  <hr className="md:hidden w-full border-blue-200 p-2" />
                  <div className="w-full">
                    {user.is_admin ? (
                      <Tabs value="dashboard" className="w-full md:p-3">
                        <TabsHeader>
                          {data.map(({ label, value, icon }) => (
                            <Tab
                              key={value}
                              value={value}
                              className="place-items-start"
                            >
                              <div className="flex items-center gap-2">
                                {createElement(icon, { className: "w-5 h-5" })}
                                {label}
                              </div>
                            </Tab>
                          ))}
                        </TabsHeader>
                        <TabsBody>
                          <TabPanel value="dashboard">
                            <div className="text-center py-24">
                              <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
                                Usuarios Clinica
                              </h1>
                              <p className="text-base leading-relaxed lg:w-3/4 mx-auto text-gray-500s">
                                Seleccion el tipo de usuario que desea
                                consultar.
                              </p>
                              <div className="flex mt-6 justify-center">
                                <div className="w-64 h-1 rounded-full bg-indigo-500 inline-flex"></div>
                              </div>
                            </div>
                          </TabPanel>
                          <TabPanel value="doctors" className="py-0 px-0">
                            <List className="px-0">
                              {doctors.slice(0, 4).map((doctor) => (
                                <ListItem
                                  key={doctor.id}
                                  className="px-1 md:px-4"
                                >
                                  <ListItemPrefix>
                                    <Avatar
                                      variant="circular"
                                      alt="candice"
                                      className="w-10 h-10"
                                      src="https://docs.material-tailwind.com/img/face-1.jpg"
                                    />
                                  </ListItemPrefix>
                                  <div className="w-full">
                                    <div className="flex justify-between items-center w-full">
                                      <Typography
                                        variant="h6"
                                        color="blue-gray"
                                        className="flex"
                                      >
                                        {doctor.Nombre}
                                        <p className="hidden md:block">
                                          {doctor.ApellidoP} {doctor.ApellidoM}
                                        </p>
                                      </Typography>
                                      <Typography
                                        variant="small"
                                        color="gray"
                                        className="font-normal"
                                      >
                                        {doctor.Especialidad}
                                      </Typography>
                                    </div>
                                    <Typography
                                      variant="small"
                                      color="gray"
                                      className="font-normal"
                                    >
                                      {doctor.User.Correo}
                                    </Typography>
                                  </div>
                                </ListItem>
                              ))}
                            </List>
                          </TabPanel>
                          <TabPanel value="patients" className="py-0 px-0">
                            <List className="px-0">
                              {pacientes.slice(0, 4).map((paciente) => (
                                <ListItem
                                  key={paciente.id}
                                  className="px-1 md:px-4"
                                >
                                  <ListItemPrefix>
                                    <Avatar
                                      variant="circular"
                                      alt="candice"
                                      className="w-10 h-10"
                                      src="https://docs.material-tailwind.com/img/face-1.jpg"
                                    />
                                  </ListItemPrefix>
                                  <div className="w-full">
                                    <div className="flex justify-between items-center w-full">
                                      <Typography
                                        variant="h6"
                                        color="blue-gray"
                                        className="flex"
                                      >
                                        {paciente.Nombre}{" "}
                                        <p className="hidden md:block">
                                          {paciente.ApellidoP}{" "}
                                          {paciente.ApellidoM}
                                        </p>
                                      </Typography>
                                      <Typography
                                        variant="small"
                                        color="gray"
                                        className="font-normal"
                                      >
                                        {convertToBirthDate(
                                          paciente.Fecha_nacimiento
                                        )}
                                      </Typography>
                                    </div>
                                    <Typography
                                      variant="small"
                                      color="gray"
                                      className="font-normal"
                                    >
                                      {paciente.User.Correo}
                                    </Typography>
                                  </div>
                                </ListItem>
                              ))}
                            </List>
                          </TabPanel>
                        </TabsBody>
                      </Tabs>
                    ) : (
                      <>
                        <Typography
                          variant="h4"
                          className="flex gap-2 items-center p-5 pb-0"
                        >
                          <FaCalendarCheck className="text-indigo-500" />
                          {user.is_admin
                            ? "admin"
                            : user.is_doctor && !user.is_admin
                            ? "Mis pacientes"
                            : "Mis doctores"}
                        </Typography>
                        <div className="flex mt-2 justify-center px-5">
                          <div className="w-full h-1 rounded-full bg-indigo-500 inline-flex"></div>
                        </div>
                        <List className="px-0">
                          {pacientes.slice(0, 4).map((paciente) => (
                            <ListItem
                              key={paciente.id}
                              className="px-1 md:px-4"
                            >
                              <ListItemPrefix>
                                <Avatar
                                  variant="circular"
                                  alt="candice"
                                  className="w-10 h-10"
                                  src="https://docs.material-tailwind.com/img/face-1.jpg"
                                />
                              </ListItemPrefix>
                              <div className="w-full">
                                <div className="flex justify-between items-center w-full">
                                  <Typography
                                    variant="h6"
                                    color="blue-gray"
                                    className="flex"
                                  >
                                    {paciente.Nombre}{" "}
                                    <p className="hidden md:block">
                                      {paciente.ApellidoP} {paciente.ApellidoM}
                                    </p>
                                  </Typography>
                                  <Typography
                                    variant="small"
                                    color="gray"
                                    className="font-normal"
                                  >
                                    {convertToBirthDate(
                                      paciente.Fecha_nacimiento
                                    )}
                                  </Typography>
                                </div>
                                <Typography
                                  variant="small"
                                  color="gray"
                                  className="font-normal"
                                >
                                  {paciente.User.Correo}
                                </Typography>
                              </div>
                            </ListItem>
                          ))}
                          {!user.is_doctor &&
                            doctors.slice(0, 4).map((doctor) => (
                              <ListItem
                                key={doctor.id}
                                className="px-1 md:px-4"
                              >
                                <ListItemPrefix>
                                  <Avatar
                                    variant="circular"
                                    alt="candice"
                                    className="w-10 h-10"
                                    src="https://docs.material-tailwind.com/img/face-1.jpg"
                                  />
                                </ListItemPrefix>
                                <div className="w-full">
                                  <div className="flex justify-between items-center w-full">
                                    <Typography
                                      variant="h6"
                                      color="blue-gray"
                                      className="flex"
                                    >
                                      {doctor.Nombre}
                                      <p className="hidden md:block">
                                        {doctor.ApellidoP} {doctor.ApellidoM}
                                      </p>
                                    </Typography>
                                    <Typography
                                      variant="small"
                                      color="gray"
                                      className="font-normal"
                                    >
                                      {doctor.Especialidad}
                                    </Typography>
                                  </div>
                                  <Typography
                                    variant="small"
                                    color="gray"
                                    className="font-normal"
                                  >
                                    {doctor.User.Correo}
                                  </Typography>
                                </div>
                              </ListItem>
                            ))}
                        </List>
                      </>
                    )}
                  </div>
                  {user.is_doctor && (
                    <div className="flex flex-wrap justify-between md:p-6">
                      <Link to="/addPatient">
                        <Typography
                          variant="small"
                          color="blue"
                          className="flex gap-2 items-center hover:underline text-right"
                        >
                          Agregar nuevo paciente
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            className="h-4 w-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                            />
                          </svg>
                        </Typography>
                      </Link>
                      <Link to="/listPatients">
                        <Typography
                          variant="small"
                          color="blue"
                          className="flex gap-2 items-center hover:underline text-right"
                        >
                          Todos los pacientes
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            className="h-4 w-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                            />
                          </svg>
                        </Typography>
                      </Link>
                      {user.is_admin && (
                        <>
                          <Link to="/addDoctor">
                            <Typography
                              variant="small"
                              color="blue"
                              className="flex gap-2 items-center hover:underline text-right"
                            >
                              Agregar nuevo doctor
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                                className="h-4 w-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                />
                              </svg>
                            </Typography>
                          </Link>
                          <Link to="/listDoctors">
                            <Typography
                              variant="small"
                              color="blue"
                              className="flex gap-2 items-center hover:underline text-right"
                            >
                              Todos los doctores
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                                className="h-4 w-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                />
                              </svg>
                            </Typography>
                          </Link>
                        </>
                      )}
                    </div>
                  )}
                </Card>
              </div>
              <hr className="md:hidden w-full border-blue-200 p-2" />
              <div className="md:p-2 p-1 w-full md:h-[200px] ">
                <div className="divide-x flex flex-row gap-3 bg-white h-full items-center md:p-3 md:shadow-2xl">
                  <div className="sm:w-32 sm:h-32 h-20 w-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="sm:w-16 sm:h-16 w-10 h-10"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div className="w-full flex flex-col h-[90%] justify-between px-6">
                    <Typography variant="h4">Mi perfil</Typography>
                    <div className="py-2">
                      {!user.is_admin && (
                        <Typography variant="paragraph" color="gray">
                          {user.is_doctor ? (
                            perfil?.Doctor.Nombre +
                            " " +
                            perfil?.Doctor.ApellidoP +
                            " " +
                            perfil?.Doctor.ApellidoM
                          ) : (
                            <Typography variant="paragraph" color="gray">
                              {perfil?.Paciente.Nombre +
                                " " +
                                perfil?.Paciente.ApellidoP +
                                " " +
                                perfil?.Paciente.ApellidoM}
                            </Typography>
                          )}
                        </Typography>
                      )}
                      <Typography variant="paragraph" color="gray">
                        {user.email}
                      </Typography>
                    </div>
                    <div className="flex justify-end">
                      <Link to="/profile">
                        <Typography
                          variant="small"
                          color="blue"
                          className="flex gap-2 items-center hover:underline text-right"
                        >
                          Actualizar mi perfil
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            className="h-4 w-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                            />
                          </svg>
                        </Typography>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default MainPanel;
