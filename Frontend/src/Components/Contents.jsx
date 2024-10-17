import { useState, useEffect } from "react";
import service from "../Services/services.js";
import Consulta from "./Consulta.jsx";
import FormularioActualizacion from "./FormularioActualizacion.jsx";
import FormularioAlta from "./FormularioAlta.jsx";
import DetalleContenido from "./DetalleCont.jsx";

export default function Contents() {
  const [rows, setRows] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [tipoContenidos, setTipoContenidos] = useState([]);
  const [selectedCont, setSelectedCont] = useState(null);

  useEffect(() => {
    loadData(), loadTipoContenidos();
  }, []);

  const loadData = async () => {
    try {
      const data = await service.getData("/contenidos");
      if (Array.isArray(data)) {
        setRows(data);
      } else {
        console.error("Error: los datos no son un array.");
      }
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  };

  const loadTipoContenidos = async () => {
    try {
      const tipos = await service.getData("/tiposContenido");
      if (Array.isArray(tipos)) {
        setTipoContenidos(tipos);
      } else {
        console.error("Error: los tipos de contenido no son un array.");
      }
    } catch (error) {
      console.error("Error al cargar los tipos de contenido:", error);
    }
  };

  const onEliminar = async (item) => {
    try {
      const confirmarEliminacion = window.confirm(
        `¿Estás seguro que deseas eliminar el registro '${item.Title}'?`
      );

      if (confirmarEliminacion) {
        const res = await service.deleteData("/contenidos", item.CodCont);
        if (res) {
          console.log("Registro eliminado correctamente");
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
      const res = await service.updateData("/contenidos", data.CodCont, data);
      if (res) {
        console.log("Registro actualizado o creado con éxito");
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
      const res = await service.saveData("/contenidos", data);
      if (res) {
        console.log("Registro creado con éxito");
        loadData();
        setIsCreating(false);
      } else {
        console.error("Error al crear el registro");
      }
    } catch (error) {
      console.error("Error al crear el registro", error);
    }
  };

  const onVerDetalle = (contenido) => {
    setSelectedCont(contenido);
  };

  const onVolver = () => {
    setSelectedCont(null);
  };

  const onCancel = () => {
    setIsEditing(false);
    setIsCreating(false);
  };

  const columns = [
    { key: "CodCont", label: "Código de Contenido" },
    { key: "Title", label: "Título" },
    { key: "FechaLanzamiento", label: "Fecha Lanzamiento" },
    { key: "TipoContenido", label: "Tipo" },
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
          editableFields={["FechaLanzamiento"]}
          actions={actionsUpdate}
        />
      ) : isCreating ? (
        <FormularioAlta
          allFields={["TipoContenido", "Title", "FechaLanzamiento"]}
          requiredFields={["TipoContenido", "Title", "FechaLanzamiento"]}
          actions={actionsAlta}
          options={{
            TipoContenido: tipoContenidos,
          }}
        />
      ) : selectedCont ? (
        <DetalleContenido cont={selectedCont} onVolver={onVolver} />
      ) : (
        <Consulta
          data={rows}
          columns={columns}
          actions={actionsConsul}
          customActions={[{ label: "Ver detalle", handler: onVerDetalle }]}
        />
      )}
    </div>
  );
}