import { Router } from "express";
import CapTemp from "../Models/capTemp.model.js"; 
import TempSerie from "../Models/tempSerie.model.js";
import Cont from "../Models/cont.model.js";

export const router = Router();

router.get("/:CodCont/:NroTemp", async (req, res) => {
  try {
    const {CodCont, NroTemp} = req.params

    const capTemporadas = await CapTemp.findAll({
      where: {CodCont, NroTemp},
      include: [{ model: Cont, attributes: ["Title"] }],
    });

    if (!capTemporadas) {
      return res
        .status(204)
        .json({ message: "No hay registros disponibles para mostrar" });
    }

    const transformedCapTemporadas = capTemporadas.map((capTemp) => ({
      Contenido: capTemp.Cont.Title,
      NroTemp: capTemp.NroTemp,
      CodCap: capTemp.CodCap,
      Nombre: capTemp.Nombre,
      Descripcion: capTemp.Descripcion,
    }));

    res.json(transformedCapTemporadas);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener las temporadas de capítulos" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { CodCont, NroTemp, Nombre, Descripcion } = req.body;

    if (!CodCont || !NroTemp || !Nombre || !Descripcion) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    // Obtener el número de capítulos existentes para esta temporada
    const existingCaps = await CapTemp.findAll({
      where: {
        CodCont: CodCont,
        NroTemp: NroTemp,
      },
    });

    // Calcular el nuevo índice de capítulo
    const newIndex = existingCaps.length + 1;
    const CodCap = `S${CodCont}T${NroTemp}E${newIndex}`;

    const newCapTemporada = await CapTemp.create({
      CodCont,
      NroTemp,
      CodCap,
      Nombre,
      Descripcion,
    });

    res.status(201).json(newCapTemporada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el capítulo de temporada" });
  }
});


router.put("/:CodCont/:NroTemp/:CodCap", async (req, res) => {
  try {
    const { CodCont, NroTemp, CodCap } = req.params;

    if (!CodCont || !NroTemp || !CodCap) {
      return res.status(400).json({ error: "Los parámetros CodCont, NroTemp y CodCap son requeridos" });
    }

    const { Nombre, Descripcion } = req.body;

    const capTemporada = await CapTemp.findOne({
      where: { CodCont, NroTemp, CodCap },
    });

    if (!capTemporada) {
      return res
        .status(404)
        .json({ error: "Capítulo de temporada no encontrado" });
    }

    // Actualizar los campos especificados si se proporcionan
    capTemporada.Nombre = Nombre || capTemporada.Nombre;
    capTemporada.Descripcion = Descripcion || capTemporada.Descripcion;

    await capTemporada.save();

    res.json(capTemporada);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al actualizar el capítulo de temporada" });
  }
});

// Eliminar un registro de CapTemporada por CodCont, NroTemp y CodCap
router.delete("/:CodCont/:NroTemp/:CodCap", async (req, res) => {
  try {
    const { CodCont, NroTemp, CodCap } = req.params;

    if (!CodCont || !NroTemp || !CodCap) {
      return res.status(400).json({ error: "Los parámetros CodCont, NroTemp y CodCap son requeridos" });
    }

    const result = await CapTemp.destroy({
      where: { CodCont, NroTemp, CodCap },
    });

    if (result === 0) {
      return res
        .status(404)
        .json({ error: "Capítulo de temporada no encontrado" });
    }

    res
      .status(200)
      .json({ message: "Capítulo de temporada eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al eliminar el capítulo de temporada" });
  }
});