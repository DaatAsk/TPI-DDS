import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";
import service from "../Services/services.js";
import Consulta from "./Consulta.jsx";
import FormularioActualizacion from "./FormularioActualizacion.jsx";
import FormularioAlta from "./FormularioAlta.jsx";

export default function Usuarios({ sub, onVolver }) {
  const [rows, setRows] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const data = await service.searchData("/usuarios", sub);
      if (Array.isArray(data)) {
        setRows(data);
      } else {
        console.error("Error: los datos no son un array.");
      }
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  }, [sub]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onEliminar = async (item) => {
    try {
      const confirmarEliminacion = window.confirm(
        `¿Estás seguro que deseas eliminar el registro '${item.Nombre}'?`
      );

      if (confirmarEliminacion) {
        const id = `${item.Nombre}/${sub}`;
        const res = await service.deleteData("/usuarios", id);

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
      const id = `${data.Nombre}/${sub}`;

      const res = await service.updateData("/usuarios", id, data);
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
      const dataToSend = {
        ...data,
        NroSub: sub,
      };
      const res = await service.saveData("/usuarios", dataToSend);
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

  const columns = [
    { key: "Nombre", label: "Nombre" },
    { key: "FechaNacimiento", label: "Fecha de Nacimiento" },
    { key: "Imagen", label: "Imagen" },
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
      <button onClick={onVolver} className="volver-btn">
        Volver
      </button>
      {isEditing ? (
        <FormularioActualizacion
          currentData={editData}
          editableFields={["FechaNacimiento", "Imagen"]}
          actions={actionsUpdate}
        />
      ) : isCreating ? (
        <FormularioAlta
          allFields={["Nombre", "FechaNacimiento", "Imagen"]}
          requiredFields={["Nombre", "FechaNacimiento"]}
          actions={actionsAlta}
          options={{}}
        />
      ) : (
        <Consulta
          data={rows}
          columns={columns}
          actions={actionsConsul}
          customButtons={[]}
        />
      )}
    </div>
  );
}

Usuarios.propTypes = {
  sub: PropTypes.string.isRequired,
  onVolver: PropTypes.func.isRequired,
};