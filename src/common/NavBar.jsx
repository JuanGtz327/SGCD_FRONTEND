import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  FaceSmileIcon,
  PlusIcon,
  QueueListIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronDownIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { FaUserDoctor } from "react-icons/fa6";

import { useAuth } from "../context/AuthContext.jsx";

const NavBar = () => {
  const [open, setOpen] = React.useState(0);
  const [open2, setOpen2] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);

  const { user, logout } = useAuth();

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const handleOpen2 = (value) => setOpen2(open2 === value ? 0 : value);

  return (
    <Card className="hidden md:flex h-[calc(100vh)] w-full lg:w-[30%] max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 rounded-none">
      <div className="mb-2 flex items-center gap-4 p-4">
        <Typography variant="h5" color="blue-gray">
          Bienvenido {user.email}
        </Typography>
      </div>
      <div className="p-2">
        <Input
          icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          label="Buscar"
        />
      </div>
      <List>
        <Link to="/main">
          <ListItem>
            <ListItemPrefix>
              <ClipboardDocumentListIcon className="h-5 w-5" />
            </ListItemPrefix>
            Inicio
          </ListItem>
        </Link>
        {user.is_admin && (
          <Accordion
            open={open2 === 1}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open2 === 1 ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={open2 === 1}>
              <AccordionHeader
                onClick={() => handleOpen2(1)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <FaUserDoctor className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Doctores
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <Link to="/addDoctor">
                  <ListItem>
                    <ListItemPrefix>
                      <PlusIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Nuevo Doctor
                  </ListItem>
                </Link>
                <Link to="/listDoctors">
                  <ListItem>
                    <ListItemPrefix>
                      <QueueListIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Mis Doctores
                  </ListItem>
                </Link>
              </List>
            </AccordionBody>
          </Accordion>
        )}
        {user.is_doctor && (
          <Accordion
            open={open === 1}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 1 ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 1}>
              <AccordionHeader
                onClick={() => handleOpen(1)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <FaceSmileIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Pacientes
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <Link to="/addPatient">
                  <ListItem>
                    <ListItemPrefix>
                      <PlusIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Nuevo Paciente
                  </ListItem>
                </Link>
                <Link to="/listPatients">
                  <ListItem>
                    <ListItemPrefix>
                      <QueueListIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Mis Pacientes
                  </ListItem>
                </Link>
              </List>
            </AccordionBody>
          </Accordion>
        )}
        <Link to="/appointments">
          <ListItem>
            <ListItemPrefix>
              <CalendarIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Typography color="blue-gray" className="mr-auto font-normal">
              Citas
            </Typography>
          </ListItem>
        </Link>
        <hr className="my-2 border-blue-gray-50" />
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Mensajes
          <ListItemSuffix>
            <Chip
              value="14"
              size="sm"
              variant="ghost"
              color="blue-gray"
              className="rounded-full"
            />
          </ListItemSuffix>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Perfil
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Configuracion
        </ListItem>
        <button
          onClick={async () => {
            await logout();
          }}
        >
          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Cerrar Sesion
          </ListItem>
        </button>
      </List>
      <Alert
        open={openAlert}
        className="mt-auto hidden"
        onClose={() => setOpenAlert(false)}
      >
        <CubeTransparentIcon className="mb-4 h-12 w-12" />
        <Typography variant="h6" className="mb-1">
          Upgrade to PRO
        </Typography>
        <Typography variant="small" className="font-normal opacity-80">
          Upgrade to Material Tailwind PRO and get even more components,
          plugins, advanced features and premium.
        </Typography>
        <div className="mt-4 flex gap-3">
          <Typography
            as="a"
            href="#"
            variant="small"
            className="font-medium opacity-80"
            onClick={() => setOpenAlert(false)}
          >
            Dismiss
          </Typography>
          <Typography as="a" href="#" variant="small" className="font-medium">
            Upgrade Now
          </Typography>
        </div>
      </Alert>
    </Card>
  );
};

export default NavBar;
