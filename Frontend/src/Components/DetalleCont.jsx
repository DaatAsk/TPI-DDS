import PropTypes from "prop-types";
import { useState } from "react";
import Generos from "./Generos";
import Subtitulos from "./Subtitulos";
import Traducciones from "./Traducciones";
import Temporadas from "./Temporadas"; // Asegúrate de tener estos componentes

import "../Styles/master.css";

export default function DetalleContenido({ cont, onVolver }) {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const codcont = cont.CodCont;

  const componentsMap = {
    Generos: (
      <Generos codcont={codcont} onVolver={() => setSelectedComponent(null)} />
    ),
    Subtitulos: (
      <Subtitulos
        codcont={codcont}
        onVolver={() => setSelectedComponent(null)}
      />
    ),
    Traducciones: (
      <Traducciones
        codcont={codcont}
        onVolver={() => setSelectedComponent(null)}
      />
    ),
    Temporadas: (
      <Temporadas
        codcont={codcont}
        onVolver={() => setSelectedComponent(null)}
      />
    ),
  };

  const cardsData = [
    {
      title: "Géneros",
      text: "Explore diferentes géneros.",
      component: "Generos",
      img: "/Images/Generos.png",
    },
    {
      title: "Subtítulos",
      text: "Encuentra subtítulos.",
      component: "Subtitulos",
      img: "/Images/Subtitulos.jpg",
    },
    {
      title: "Traducción",
      text: "Accede a traducciones.",
      component: "Traducciones",
      img: "/Images/Traducciones.jpeg",
    },
  ];

  if (cont.TipoContenido === "Serie") {
    cardsData.push({
      title: "Temporadas",
      text: "Información de temporadas.",
      component: "Temporadas",
      img: "/Images/Temporadas.png",
    });
  }

  const renderCard = ({ title, text, component, img }) => (
    <div className="card" key={title}>
      <div
        className="card-img-top"
        style={{
          backgroundImage: `url(${img})`,
        }}
      ></div>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{text}</p>
        <button
          onClick={() => setSelectedComponent(component)}
          className="btn btn-primary"
        >
          Ver
        </button>
      </div>
    </div>
  );

  return (
    <div>
      {!selectedComponent && (
        <button className="volver-btn" onClick={onVolver}>
          Volver
        </button>
      )}
      {selectedComponent ? (
        componentsMap[selectedComponent]
      ) : (
        <div className="card-container">{cardsData.map(renderCard)}</div>
      )}
    </div>
  );
}

DetalleContenido.propTypes = {
  cont: PropTypes.shape({
    CodCont: PropTypes.string.isRequired,
    TipoContenido: PropTypes.string.isRequired,
  }).isRequired,
  onVolver: PropTypes.func.isRequired,
};