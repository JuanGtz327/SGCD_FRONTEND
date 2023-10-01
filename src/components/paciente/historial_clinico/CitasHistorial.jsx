import {
  Card,
  Input,
  Select,
  Option,
  Textarea,
  ListItemPrefix,
  ListItem,
  List,
  Checkbox,
  Typography,
  Switch,
} from "@material-tailwind/react";
import React from "react";

const CitasHistorial = ({ register, Controller, control, errors }) => {
  return (
    <>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Citas
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        En este apartado puede consultar las citas de este paciente, o en su caso agregar una nueva.
      </p>
    </>
  );
};

export default CitasHistorial;
