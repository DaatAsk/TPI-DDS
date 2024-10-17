import { useState, useEffect } from "react";
import service from "../Services/services.js";
import Consulta from "./Consulta.jsx";
import FormularioActualizacion from "./FormularioActualizacion.jsx";
import FormularioAlta from "./FormularioAlta.jsx";
import Usuarios from "./Usuarios.jsx";

export default function Subscripciones() {
  const [rows, setRows] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await service.getData("/subscripciones");
      if (Array.isArray(data)) {
        setRows(data);
      } else {
        console.error("Error: los datos no son un array.");
      }
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  };

  const onEliminar = async (item) => {
    try {
      const confirmarEliminacion = window.confirm(
        `¿Estás seguro que deseas eliminar el registro '${item.NroSub}'?`
      );

      if (confirmarEliminacion) {
        const res = await service.deleteData("/subscripciones", item.NroSub);
        if (res) {
          loadData();
        } else {
          console.error("Error al eliminar el registro.");
        }
      }
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
    }
  };

  const onActualizarClick = (item) => {
    setEditData(item);
    setIsEditing(true);
    setIsCreating(false);
  };

  const onNuevoClick = () => {
    setEditData(null);
    setIsEditing(false);
    setIsCreating(true);
  };

  const onUpdate = async (data) => {
    try {
      const res = await service.updateData(
        "/subscripciones",
        data.NroSub,
        data
      );
      if (res) {
        loadData();
        setIsEditing(false);
      } else {
        console.error("Error al actualizar el registro");
      }
    } catch (error) {
      console.error("Error al actualizar el registro", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const res = await service.saveData("/subscripciones", data);
      if (res) {
        loadData();
        setIsCreating(false);
      } else {
        console.error("Error al crear el registro");
      }
    } catch (error) {
      console.error("Error al crear el registro", error);
    }
  };

  const onCancel = () => {
    setIsEditing(false);
    setIsCreating(false);
  };

  const onVerUsuarios = (subscription) => {
    setSelectedSubscription(subscription);
  };

  const onVolver = () => {
    setSelectedSubscription(null);
  };

  const columns = [
    { key: "NroSub", label: "Número" },
    { key: "TipoDocumento", label: "Tipo Documento" },
    { key: "NroDni", label: "Número Documento" },
    { key: "FechaAlta", label: "Fecha Alta" },
    { key: "NroTarjeta", label: "Número Tarjeta" },
    { key: "Nombre", label: "Nombre" },
    { key: "Apellido", label: "Apellido" },
    { key: "Telefono", label: "Teléfono" },
  ];

  const actionsConsul = [
    { label: "Eliminar", handler: onEliminar },
    { label: "Actualizar", handler: onActualizarClick },
    { label: "Nuevo", handler: onNuevoClick },
  ];

  const actionsUpdate = [
    { label: "Cancelar", handler: onCancel },
    { label: "Actualizar", handler: onUpdate },
  ];

  const actionsAlta = [
    { label: "Cancelar", handler: onCancel },
    { label: "Crear", handler: onSubmit },
  ];

  return (
    <div>
      {isEditing ? (
        <FormularioActualizacion
          currentData={editData}
          editableFields={["NroTarjeta", "Telefono"]}
          actions={actionsUpdate}
        />
      ) : isCreating ? (
        <FormularioAlta
          allFields={[
            "TipoDocumento",
            "NroDni",
            "NroTarjeta",
            "Nombre",
            "Apellido",
            "Telefono",
          ]}
          requiredFields={[
            "TipoDocumento",
            "NroDni",
            "NroTarjeta",
            "Nombre",
            "Apellido",
            "Telefono",
          ]}
          actions={actionsAlta}
          options={{}}
        />
      ) : selectedSubscription ? (
        <Usuarios sub={selectedSubscription.NroSub} onVolver={onVolver} />
      ) : (
        <Consulta
          data={rows}
          columns={columns}
          actions={actionsConsul}
          customActions={[{ label: "Ver usuarios", handler: onVerUsuarios }]}
        />
      )}
    </div>
  );
}