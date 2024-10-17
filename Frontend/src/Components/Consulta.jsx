import PropTypes from "prop-types";
import "../Styles/master.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useMemo } from "react";

export default function Consulta({
  data,
  columns,
  actions,
  customActions = [],
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      columns.some((column) =>
        item[column.key]
          ?.toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [data, columns, searchTerm]);

  const handleSearch = () => {
    data.find((item) =>
      columns.some((column) =>
        item[column.key]
          ?.toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  };

  if (!Array.isArray(data) || data.length === 0) {
    console.error("Error: 'data' no es un array o está vacío.");
    return <p>No hay datos disponibles</p>;
  }

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Listado de Datos</h2>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Buscar"
            className="me-2"
            aria-label="Buscar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline-success" onClick={handleSearch}>
            Buscar
          </Button>
        </Form>
        <button
          onClick={() => actions.find((a) => a.label === "Nuevo").handler()}
          className="new-button"
        >
          Nuevo
        </button>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.key}>{item[column.key]}</td>
                ))}
                <td>
                  {customActions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => action.handler(item)}
                      className="accion"
                    >
                      {action.label}
                    </button>
                  ))}
                  <button
                    onClick={() =>
                      actions
                        .find((a) => a.label === "Actualizar")
                        .handler(item)
                    }
                  >
                    Actualizar
                  </button>
                  <button
                    onClick={() =>
                      actions.find((a) => a.label === "Eliminar").handler(item)
                    }
                    className="eliminar"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

Consulta.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      handler: PropTypes.func.isRequired,
    })
  ).isRequired,
  customActions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      handler: PropTypes.func.isRequired,
    })
  ),
};