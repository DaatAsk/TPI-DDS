import { Router } from "express";
import TempSerie from "../Models/tempSerie.model.js";
import Cont from "../Models/cont.model.js";
import moment from "moment";

export const router = Router()

router.get("/:CodCont", async (req, res) => {
  try {
    const { CodCont } = req.params;
    const temps = await TempSerie.findAll({
      where: { CodCont },
      include: { model: Cont, attributes: ["Title"] },
    });

    if (!temps) {
      return res
        .status(204)
        .json({ message: "No hay registros disponibles para mostrar" });
    }

    const transformedTemps = temps.map((temp) => {
      const plainTemp = temp.get({ plain: true });
      return {
        Contenido: plainTemp.Cont.Title,
        NroTemp: plainTemp.NroTemp,
        FechaLanz: plainTemp.FechaLanz,
      };
    });

    res.json(transformedTemps);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los subtítulos." });
  }
});

router.post("/", async (req, res) => {
  try {
    const { CodCont, NroTemp, FechaLanz } = req.body;

    const newTempSerie = await TempSerie.create({
      CodCont,
      NroTemp,
      FechaLanz,
    });
    res.status(201).json(newTempSerie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la temporada." });
  }
});


router.put("/:CodCont/:NroTemp", async (req, res) => {
  try {
    const { CodCont, NroTemp } = req.params;

    if (!CodCont || !NroTemp) {
        return res.status(400).json({ error: "Los parámetros CodCont y NroTemp son requeridos." });
        }

    const { FechaLanz } = req.body;
    const tempSerie = await TempSerie.findOne({ where: { CodCont, NroTemp } });

    if (!tempSerie) {
      return res.status(404).json({ error: "Registro no encontrado" });
    }

    tempSerie.FechaLanz = FechaLanz || tempSerie.FechaLanz;

    await tempSerie.save();
    res.json(tempSerie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el subtítulo." });
  }
});

router.delete("/:CodCont/:NroTemp", async (req, res) => {
  try {
    const { CodCont, NroTemp } = req.params;

    if (!CodCont || !NroTemp) {
      return res
        .status(400)
        .json({ error: "Los parámetros CodCont y NroTemp son requeridos." });
    }
    const tempSerie = await TempSerie.findOne({ where: { CodCont, NroTemp } });

    if (!tempSerie) {
      return res.status(404).json({ error: "Registro no encontrado" });
    }

    await tempSerie.destroy();
    res.json({ message: "Registro eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la temporada." });
  }
});