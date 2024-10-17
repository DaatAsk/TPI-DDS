import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import "../Styles/master.css";

export default function FormularioActualizacion({
  currentData,
  editableFields,
  actions,
}) {
  const [formData, setFormData] = useState(currentData || {});

  useEffect(() => {
    setFormData(currentData || {});
  }, [currentData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="form-container">
      <form className="update-form" onSubmit={(e) => e.preventDefault()}>
        {Object.keys(formData).map((field) => (
          <div key={field} className="form-group">
            <label htmlFor={field}>{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field] || ""}
              onChange={handleChange}
              disabled={!editableFields.includes(field)}
            />
          </div>
        ))}
        <div className="form-actions">
          <button
            type="button"
            onClick={() =>
              actions.find((a) => a.label === "Cancelar").handler()
            }
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() =>
              actions.find((a) => a.label === "Actualizar").handler(formData)
            }
          >
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
}

FormularioActualizacion.propTypes = {
  currentData: PropTypes.object,
  editableFields: PropTypes.arrayOf(PropTypes.string).isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      handler: PropTypes.func.isRequired,
    })
  ).isRequired,
};