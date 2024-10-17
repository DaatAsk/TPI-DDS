import { Router } from "express";
import Traduccion from "../Models/traduccion.model.js";
import Cont from "../Models/cont.model.js";
import Idioma from "../Models/idioma.model.js";

export const router = Router();

router.get("/:CodCont", async (req, res) => {
  const { CodCont } = req.params
  try {
    const Traduccions = await Traduccion.findAll({
      where: {CodCont},
      include: [
        { model: Idioma, attributes: ["Descripcion"] },
        { model: Cont, attributes: ["Title"] },
      ],
    });

    if (!Traduccions) {
      return res.status(204).json({ message: "No hay registros disponibles para mostrar" });
    }

    const result = Traduccions.map((trad) => ({
      Contenido: trad.Cont.Title,
      Idioma: trad.Idioma.Descripcion,
      Traduccion: trad.Traduccion,
    }));

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las traducciones." });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      CodCont,
      IdiomaDescripcion,
      Traduccion: TraduccionTexto,
    } = req.body;

    // Buscar el IdIdioma basado en la descripción del idioma
    const idioma = await Idioma.findOne({
      where: { descripcion: IdiomaDescripcion },
    });

    if (!idioma) {
      return res.status(404).json({ error: "Idioma no encontrado." });
    }

    const newTraduccion = await Traduccion.create({
      CodCont,
      IdIdioma: idioma.IdIdioma,
      Traduccion: TraduccionTexto,
    });

    res.status(201).json(newTraduccion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la traducción." });
  }
});

router.put("/:CodCont/:IdiomaDescripcion", async (req, res) => {
  try {
    const { CodCont, IdiomaDescripcion } = req.params;

    // Buscar el IdIdioma basado en la descripción del idioma
    const idioma = await Idioma.findOne({
      where: { descripcion: IdiomaDescripcion },
    });

    if (!idioma) {
      return res.status(404).json({ error: "Idioma no encontrado." });
    }

    const { Traduccion: TraduccionTexto } = req.body;

    const trad = await Traduccion.findOne({
      where: { CodCont, IdIdioma: idioma.id },
    });

    if (!trad) {
      return res.status(404).json({ error: "Traducción no encontrada." });
    }

    trad.Traduccion = TraduccionTexto;

    await trad.save();

    res.json(trad);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la traducción." });
  }
});

router.delete("/:CodCont/:IdiomaDescripcion", async (req, res) => {
  try {
    const { CodCont, IdiomaDescripcion } = req.params;

    // Buscar el IdIdioma basado en la descripción del idioma
    const idioma = await Idioma.findOne({
      where: { Descripcion: IdiomaDescripcion },
    });

    if (!idioma) {
      return res.status(404).json({ error: "Idioma no encontrado." });
    }

    const trad = await Traduccion.findOne({
      where: { CodCont, IdIdioma: idioma.IdIdioma },
    });

    if (!trad) {
      return res.status(404).json({ error: "Traducción no encontrada." });
    }

    await trad.destroy();

    res.json({ message: "Traducción eliminada con éxito." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la traducción." });
  }
});