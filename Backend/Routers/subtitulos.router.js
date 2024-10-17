import { Router } from "express";
import Subtitulo from "../Models/subtitulo.model.js";
import Cont from "../Models/cont.model.js";
import Idioma from "../Models/idioma.model.js";

export const router = Router()

router.get("/:CodCont", async (req, res) => {
  try {
    const { CodCont } = req.params
    const subtitulos = await Subtitulo.findAll({
      where: {CodCont},
      include: [
        { model: Idioma, attributes: ["Descripcion"] },
        { model: Cont, attributes: ["Title"] },
      ],
    });

    if (subtitulos.length === 0) {
      return res
        .status(204)
        .json({ message: "No hay registros disponibles para mostrar" });
    }

    const result = subtitulos.map((sub) => ({
      Contenido: sub.Cont.Title,
      Idioma: sub.Idioma.Descripcion,
      Subtitulo: sub.Subtitulo,
    }));

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los subtítulos." });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      CodCont,
      IdiomaDescripcion,
      Subtitulo: SubtituloTexto,
    } = req.body;

    // Buscar el IdIdioma basado en la descripción del idioma
    const idioma = await Idioma.findOne({
      where: { descripcion: IdiomaDescripcion },
    });

    if (!idioma) {
      return res.status(404).json({ error: "Idioma no encontrado." });
    }
    const newSubtitulo = await Subtitulo.create({
      CodCont,
      IdIdioma: idioma.IdIdioma,
      Subtitulo: SubtituloTexto,
    });

    res.status(201).json(newSubtitulo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el subtítulo." });
  }
});

router.put("/:CodCont/:IdIdioma", async (req, res) => {
  try {
    const { CodCont, IdIdioma } = req.params;

    if (!IdIdioma || !CodCont) {
        return res.status(400).json({ error: "Los parámetros IdIdioma y CodCont son requeridos" });
      }

    const { Subtitulo: SubtituloTexto } = req.body;

    const sub = await Subtitulo.findOne({
      where: { CodCont, IdIdioma },
    });

    if (!sub) {
      return res.status(404).json({ error: "Subtítulo no encontrado." });
    }

    sub.Subtitulo = SubtituloTexto;

    await sub.save();

    res.json(sub);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el subtítulo." });
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

    const sub = await Subtitulo.findOne({
      where: { CodCont, IdIdioma: idioma.IdIdioma },
    });

    if (!sub) {
      return res.status(404).json({ error: "Subtítulo no encontrado." });
    }

    await sub.destroy();

    res.json({ message: "Subtítulo eliminado con éxito." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el subtítulo." });
  }
});