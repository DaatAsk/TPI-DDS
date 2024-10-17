import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";
import service from "../Services/services.js";
import Consulta from "./Consulta.jsx";
import FormularioActualizacion from "./FormularioActualizacion.jsx";
import FormularioAlta from "./FormularioAlta.jsx";
import Capitulos from "./Capitulos.jsx";

export default function Temporadas({ codcont, onVolver }) {
  const [rows, setRows] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedTemp, setSelectedTemp] = useState(null);

  const loadData = useCallback(async () => {
    try {
      const data = await service.searchData("/temporadas", codcont);
      if (Array.isArray(data)) {
        setRows(data);
      } else {
        console.error("Error: los datos no son un array.");
      }
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  }, [codcont]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onEliminar = async (item) => {
    try {
      const confirmarEliminacion = window.confirm(
        `¿Estás seguro que deseas eliminar el registro '${item.NroTemp}'?`
      );

      if (confirmarEliminacion) {
        const id = `${codcont}/${item.NroTemp}`;
        const res = await service.deleteData("/temporadas", id);

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
      const id = `${data.Nombre}/${codcont}`;

      const res = await service.updateData("/temporadas", id, data);
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
      };
      const res = await service.saveData("/temporadas", dataToSend);
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

  const onVerCapitulos = (temporada) => {
    setSelectedTemp(temporada);
  };

  const onVolverTemp = () => {
    setSelectedTemp(null);
  };

  const onCancel = () => {
    setIsEditing(false);
    setIsCreating(false);
  };

  const columns = [
    { key: "NroTemp", label: "Numero de Temporada" },
    { key: "FechaLanz", label: "Fecha de Lanzamiento" },
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
      {selectedTemp ? (
        <>
          <button onClick={onVolverTemp} className="volver-btn">
            Volver
          </button>
          <Capitulos
            codcont={codcont}
            temp={selectedTemp}
            onVolver={onVolverTemp}
          />
        </>
      ) : (
        <>
          <button onClick={onVolver} className="volver-btn">
            Volver
          </button>
          {isEditing ? (
            <FormularioActualizacion
              currentData={editData}
              editableFields={["FechaLanz"]}
              actions={actionsUpdate}
            />
          ) : isCreating ? (
            <FormularioAlta
              allFields={["NroTemp", "FechaLanz"]}
              requiredFields={["NroTemp", "FechaLanz"]}
              actions={actionsAlta}
              options={{}}
            />
          ) : (
            <Consulta
              data={rows}
              columns={columns}
              actions={actionsConsul}
              customActions={[
                { label: "Ver Capitulos", handler: onVerCapitulos },
              ]}
            />
          )}
        </>
      )}
    </div>
  );
}

Temporadas.propTypes = {
  codcont: PropTypes.string.isRequired,
  onVolver: PropTypes.func.isRequired,
};