import { Router } from "express";
import TipoDoc from "../Models/tipoDoc.model.js";

export const router = Router();

router.get("/", async (req, res) => {
  try {
    const TipoDocs = await TipoDoc.findAll();

    if (!TipoDocs) {
      return res.status(204).json({ message: "No hay registros disponibles para mostrar" });
    }

    res.json(TipoDocs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los tipos." });
  }
});

router.get("/:Id_docTipo", async (req, res) => {
  try {
    const { Id_docTipo } = req.params;

    if (!Id_docTipo) {
      return res.status(400).json({ error: "El parámetro Id_docTipo es requerido" });
    }

    const TipoDocs = await TipoDoc.findOne({ where: { Id_docTipo } });

    if (!TipoDocs) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.json(TipoDocs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el tipo." });
  }
});

router.post("/", async (req, res) => {
  try {
    const { Descripcion } = req.body;

    const newTipoDoc = await TipoDoc.create({ Descripcion });
    res.status(201).json(newTipoDoc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el tipo." });
  }
});

router.put("/:Id_docTipo", async (req, res) => {
  try {
    const { Id_docTipo } = req.params;

    if (!Id_docTipo) {
      return res
        .status(400)
        .json({ error: "El parámetro Id_docTipo es requerido" });
    }

    const { Descripcion } = req.body;

    const TipoDocs = await TipoDoc.findOne({ where: { Id_docTipo } });

    if (!TipoDocs) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    TipoDocs.Descripcion = Descripcion || TipoDocs.Descripcion;

    await TipoDocs.save();
    res.json(TipoDocs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el tipo." });
  }
});

router.delete("/:Id_docTipo", async (req, res) => {
  try {
    const { Id_docTipo } = req.params;

    if (!Id_docTipo) {
      return res.status(400).json({ error: "El parámetro Id_docTipo es requerido" });
    }

    const TipoDocs = await TipoDoc.findOne({ where: { Id_docTipo } });

    if (!TipoDocs) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    await TipoDocs.destroy();
    res.json({ message: "Registro eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el tipo." });
  }
});
