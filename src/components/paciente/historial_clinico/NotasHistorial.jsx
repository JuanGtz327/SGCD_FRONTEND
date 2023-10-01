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

const NotasHistorial = ({ register, Controller, control, errors }) => {
  return (
    <>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Notas
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        En este apartado se incluyen las notas del paciente.
      </p>
    </>
  );
};

export default NotasHistorial;
