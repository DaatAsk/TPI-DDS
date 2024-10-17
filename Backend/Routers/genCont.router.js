import { Router } from "express";
import GenCont from "../Models/genCont.model.js";
import Cont from "../Models/cont.model.js";
import Genero from "../Models/genero.model.js";
import { where } from "sequelize";

export const router = Router()

router.get("/:CodCont", async (req, res) => {
  try {
    const {CodCont} = req.params
    const genConts = await GenCont.findAll({
      where: {CodCont},
      include: [
        { model: Cont, attributes: ["Title"] },
        { model: Genero, attributes: ["Descripcion"] },
      ],
    });

    if (!genConts) {
        return res.status(204).json({ message: "No hay registros disponibles para mostrar" });
      }

    const transformedGenConts = genConts.map((genCont) => ({
      Contenido: genCont.Cont.Title, // Nombre del contenido
      Genero: genCont.Genero.Descripcion, // Descripción del género
    }));

    res.json(transformedGenConts);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener los registros de GenCont" });
  }
}); 

router.post("/", async (req, res) => {
  try {
    const { CodCont, DescripcionGenero } = req.body;

    if (!CodCont || !DescripcionGenero) {
      return res
        .status(400)
        .json({ error: "CodCont y DescripcionGenero son requeridos" });
    }

    // Buscar el IdGenero basado en la descripción del género
    const genero = await Genero.findOne({
      where: { Descripcion: DescripcionGenero },
    });

    if (!genero) {
      return res.status(404).json({ error: "Género no encontrado." });
    }

    const newGenCont = await GenCont.create({
      CodCont,
      IdGenero: genero.IdGenero,
    });
    res.status(201).json(newGenCont);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el registro de GenCont" });
  }
});


router.put("/:CodCont/:DescripcionGenero", async (req, res) => {
  try {
    const { CodCont, DescripcionGenero } = req.params;

    if (!CodCont || !DescripcionGenero) {
      return res
        .status(400)
        .json({
          error: "Los parámetros CodCont y DescripcionGenero son requeridos",
        });
    }

    // Buscar el IdGenero basado en la descripción del género
    const genero = await Genero.findOne({
      where: { Descripcion: DescripcionGenero },
    });

    if (!genero) {
      return res.status(404).json({ error: "Género no encontrado." });
    }

    const genCont = await GenCont.findOne({
      where: { CodCont, IdGenero: genero.IdGenero },
      include: [
        { model: Cont, attributes: [] },
        { model: Genero, attributes: ["IdGenero", "Descripcion"] },
      ],
    });

    if (!genCont) {
      return res
        .status(404)
        .json({ error: "Registro de GenCont no encontrado" });
    }

    genCont.IdGenero = genero.IdGenero;

    await genCont.save();

    res.json(genCont);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al actualizar el registro de GenCont" });
  }
});


router.delete("/:CodCont/:DescripcionGenero", async (req, res) => {
  try {
    const { CodCont, DescripcionGenero } = req.params;

    if (!CodCont || !DescripcionGenero) {
      return res
        .status(400)
        .json({
          error: "Los parámetros CodCont y DescripcionGenero son requeridos",
        });
    }

    // Buscar el IdGenero basado en la descripción del género
    const genero = await Genero.findOne({
      where: { Descripcion: DescripcionGenero },
    });

    if (!genero) {
      return res.status(404).json({ error: "Género no encontrado." });
    }

    const result = await GenCont.destroy({
      where: { CodCont, IdGenero: genero.IdGenero },
    });

    if (result === 0) {
      return res
        .status(404)
        .json({ error: "Registro de GenCont no encontrado" });
    }

    res
      .status(200)
      .json({ message: "Registro de GenCont eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el registro de GenCont" });
  }
});
