import PropTypes from "prop-types";
import { useState } from "react";
import "../Styles/master.css";

export default function FormularioAlta({
  allFields,
  actions,
  options,
  requiredFields,
}) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (requiredFields.includes(name) && value.trim() === "") {
      setErrors({ ...errors, [name]: "Este campo es obligatorio" });
    } else {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleCreate = () => {
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        newErrors[field] = "Este campo es obligatorio";
      }
    });

    if (Object.keys(newErrors).length === 0) {
      actions.find((a) => a.label === "Crear").handler(formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="form-container">
      <form className="create-form" onSubmit={(e) => e.preventDefault()}>
        {allFields.map((field) => (
          <div key={field} className="form-group">
            <label htmlFor={field}>{field}</label>
            {options[field] ? (
              <select
                name={field}
                value={formData[field] || ""}
                onChange={handleChange}
              >
                <option value="">Seleccionar</option>
                {options[field].map((option) => (
                  <option key={option.id} value={option.Descripcion}>
                    {option.Descripcion}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                name={field}
                value={formData[field] || ""}
                onChange={handleChange}
              />
            )}
            {errors[field] && <span className="error">{errors[field]}</span>}
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
          <button type="button" onClick={handleCreate}>
            Crear
          </button>
        </div>
      </form>
    </div>
  );
}

FormularioAlta.propTypes = {
  allFields: PropTypes.arrayOf(PropTypes.string).isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      handler: PropTypes.func.isRequired,
    })
  ).isRequired,
  options: PropTypes.object.isRequired,
  requiredFields: PropTypes.arrayOf(PropTypes.string).isRequired,
};