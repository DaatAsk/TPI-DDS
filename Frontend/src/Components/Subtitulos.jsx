import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";
import service from "../Services/services.js";
import Consulta from "./Consulta.jsx";
import FormularioActualizacion from "./FormularioActualizacion.jsx";
import FormularioAlta from "./FormularioAlta.jsx";

export default function Subtitulos({ codcont, onVolver }) {
  const [rows, setRows] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [idiomas, setIdiomas] = useState([]);

  const loadData = useCallback(async () => {
    try {
      const data = await service.searchData("/subtitulos", codcont);
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

  useEffect(() => {
    const loadIdiomas = async () => {
      try {
        const idiomasData = await service.getData("/idiomas");
        if (Array.isArray(idiomasData)) {
          setIdiomas(idiomasData);
        } else {
          console.error("Error: los idiomas no son un array.");
        }
      } catch (error) {
        console.error("Error al cargar los idiomas:", error);
      }
    };

    loadIdiomas();
  }, []);

  const onEliminar = async (item) => {
    try {
      const confirmarEliminacion = window.confirm(
        `¿Estás seguro que deseas eliminar el registro '${item.Idioma}'?`
      );

      if (confirmarEliminacion) {
        const id = `${codcont}/${item.Idioma}`;
        const res = await service.deleteData("/subtitulos", id);

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
      const id = `${codcont}/${data.Idioma}`;

      const res = await service.updateData("/subtitulos", id, data);
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
        CodCont: codcont,
        IdiomaDescripcion: data.Idioma,
        SubtituloTexto: data.Subtitulo,
      };
      const res = await service.saveData("/subtitulos", dataToSend);
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
    { key: "Idioma", label: "Idioma" },
    { key: "Subtitulo", label: "Subtitulo" },
  ]

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
          editableFields={["Subtitulo"]}
          actions={actionsUpdate}
        />
      ) : isCreating ? (
        <FormularioAlta
          allFields={["Idioma", "Subtitulo"]}
          requiredFields={["Idioma"]}
          actions={actionsAlta}
          options={{ Idioma: idiomas }}
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

Subtitulos.propTypes = {
  codcont: PropTypes.string.isRequired,
  onVolver: PropTypes.func.isRequired,
};