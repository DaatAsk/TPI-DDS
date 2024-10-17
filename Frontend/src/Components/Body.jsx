import "../Styles/App.css";
import { Routes, Route } from "react-router-dom";
import Navigationbar from "./Navbar";
import Home from "./Home";
import Contents from "./Contents";
import Subscripciones from "./Subscripciones";

export default function Body() {
  return (
    <div className="background-container">
      <Navigationbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contenidos" element={<Contents />} />
          <Route path="/subscripciones" element={<Subscripciones />} />
        </Routes>
      </div>
    </div>
  );
}