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
import React from 'react'

const ExamenFisico = () => {
  return (
    <>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Examen Fiscio
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        En este apartado debe incluir las mediciones clincias de su paciente.
      </p>
    </>
  )
}

export default ExamenFisico