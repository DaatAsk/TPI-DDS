import { Router } from "express";
import Idioma from "../Models/idioma.model.js";

export const router = Router();

router.get('/', async (_,res)=>{
    try {
        const idiomas = await Idioma.findAll()

        if (!idiomas) {
        return res.status(204).json({ message: "No hay registros disponibles para mostrar" });
      }

        res.json(idiomas)
    }catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener los idiomas" });
    }
})

router.get("/:IdIdioma", async (req, res) => {
  try {
    const { IdIdioma } = req.params

    if (!IdIdioma) {
        return res.status(400).json({ error: "El parámetro IdIdioma es requerido" });
      }
      
    const idioma = await Idioma.findOne({
        where: { IdIdioma },
    });

    if (!idioma) {
        return res 
        .status(404)
        .json({ error: "Registro de Idioma no encontrado"})
    }
    res.json(idioma);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los idiomas" });
  }
});

router.post("/", async (req, res) => {
    try {
        const { Descripcion } = req.body

        if (!Descripcion) {
            return res
            .status(400)
            .json({ error: "Descripcion es requerido"})
        }

        const newIdioma = await Idioma.create({ Descripcion })
        res.status(201).json(newIdioma)
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al crear el registro de Idioma" });
    }
})

router.put("/:IdIdioma", async (req, res) => {
    try {
      const { IdIdioma } = req.params;

      if (!IdIdioma) {
        return res.status(400).json({ error: "El parámetro IdIdioma es requerido" });
      }

      const idioma = await Idioma.findOne({
        where: { IdIdioma },
      });

      if (!idioma) {
        return res
          .status(404)
          .json({ error: "Registro de Idioma no encontrado" });
      }

      idioma.Descripcion = req.body.Descripcion;

      await idioma.save();

      res.json(idioma);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al actualizar el registro de idioma" });
    }
})

router.delete("/:IdIdioma", async (req, res) => {
    try {
        const { IdIdioma } = req.params

        if (!IdIdioma) {
        return res.status(400).json({ error: "El parámetro IdIdioma es requerido" });
      }

        const result = await Idioma.destroy({
            where: { IdIdioma }
        })

        if (result === 0) {
            return res
            .status(404)
            .json({ error: "Registro de Idioma no encontrado"})
        }

        res
        .status(200)
        .json({ message: "Registro de idioma eliminado correctamente"} )    
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el registro de Idioma" });
  }
})