import { Router } from "express";
import Genero from "../Models/genero.model.js";

export const router = Router()

router.get('/', async (_, res)=>{
    try {
      const generos = await Genero.findAll();

      if (!generos) {
        return res.status(204).json({ message: "No hay registros disponibles para mostrar" });
      }

      res.json(generos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener los géneros" });
    }
})

router.get('/:IdGenero', async (req, res) => {
  try {
    const { IdGenero } = req.params;

    if (!IdGenero) {
      return res.status(400).json({ error: "El parámetro IdIdioma es requerido" });
    }

    const genero = await Genero.findOne({
      where: { IdGenero },
    });

    if (!genero) {
      return res
        .status(404)
        .json({ error: "Registro de genero no encontrado" });
    }
    res.json(genero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el género" });
  }
})

router.post("/", async (req, res) => {
  try {
    const { Descripcion } = req.body;
    if (!Descripcion) {
      return res.status(400).json({ error: "La descripción es requerIdGeneroa" });
    }

    const newGenero = await Genero.create({ Descripcion });
    res.status(201).json(newGenero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el género" });
  }
});

router.put("/:IdGenero", async (req, res) => {
  try {
    const { IdGenero } = req.params;

    if (!IdGenero) {
      return res.status(400).json({ error: "El parámetro IdGeneroGenero es requerIdGeneroo" });
    }

    const { Descripcion } = req.body;

    const genero = await Genero.findOne({
      where: {
        IdGenero: IdGenero
      }
    });

    if (!genero) {
      return res.status(404).json({ error: "Género no encontrado" });
    }

    genero.Descripcion = Descripcion || genero.Descripcion;
    await genero.save();

    res.json(genero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el género" });
  }
});

router.delete("/:IdGenero", async (req, res) => {
  try {
    const { IdGenero } = req.params;

    if (!IdGenero) {
      return res.status(400).json({ error: "El parámetro IdGenero es requerIdGeneroo" });
    }

    const result = await Genero.destroy({
      where: { IdGenero: IdGenero },
    });

    if (result === 0) {
      return res.status(404).json({ error: "Género no encontrado" });
    }

    res.status(200).json({ message: "Género eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el género" });
  }
});