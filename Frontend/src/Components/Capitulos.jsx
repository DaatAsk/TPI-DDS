import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";
import service from "../Services/services.js";
import Consulta from "./Consulta.jsx";
import FormularioActualizacion from "./FormularioActualizacion.jsx";
import FormularioAlta from "./FormularioAlta.jsx";

export default function Capitulos({ codcont, temp}) {
  const [rows, setRows] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const nrotemp = temp.NroTemp;

  const loadData = useCallback(async () => {
    try {
      const id = `${codcont}/${nrotemp}`;
      const data = await service.searchData("/Capitulos", id);
      if (Array.isArray(data)) {
        setRows(data);
      } else {
        console.error("Error: los datos no son un array.");
      }
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  }, [codcont, nrotemp]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onEliminar = async (item) => {
    try {
      const confirmarEliminacion = window.confirm(
        `¿Estás seguro que deseas eliminar el registro '${item.Nombre}'?`
      );

      if (confirmarEliminacion) {
        const id = `${codcont}/${nrotemp}/${item.CodCap}`;
        const res = await service.deleteData("/capitulos", id);

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
      const id = `${codcont}/${nrotemp}/${data.CodCap}`;

      const res = await service.updateData("/capitulos", id, data);
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
        CodCont: codcont,
        NroTemp: nrotemp
      };
      const res = await service.saveData("/capitulos", dataToSend);
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
    { key: "Descripcion", label: "Sinopsis" },
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
          editableFields={["Nombre", "Descripcion"]}
          actions={actionsUpdate}
        />
      ) : isCreating ? (
        <FormularioAlta
          allFields={["Nombre", "Descripcion"]}
          requiredFields={["Nombre", "Descripcion"]}
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

Capitulos.propTypes = {
  codcont: PropTypes.string.isRequired,
  temp: PropTypes.object.isRequired,
  onVolver: PropTypes.func.isRequired,
};