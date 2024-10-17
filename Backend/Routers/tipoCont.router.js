import { Router } from "express";
import TipoCont from "../Models/tipoCont.model.js";

export const router = Router()

router.get("/", async (req, res) => {
  try {
    const tipoConts = await TipoCont.findAll();

    if (!tipoConts) {
      return res.status(204).json({ message: "No hay registros disponibles para mostrar" });
    }

    res.json(tipoConts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los tipos." });
  }
});

router.get("/:Id_tipo", async (req, res) => {
  try {
    const { Id_tipo } = req.params;

    if (!Id_tipo) {
      return res.status(400).json({ error: "El parámetro Id_tipo es requerido" });
    }

    const tipoCont = await TipoCont.findOne({ where: { Id_tipo } });

    if (!tipoCont) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.json(tipoCont);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el tipo." });
  }
});

router.post("/", async (req, res) => {
    try {
        const { Descripcion } = req.body;

        const newTipoCont = await TipoCont.create({ Descripcion });
        res.status(201).json(newTipoCont);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear el tipo." });
    }
});

router.put("/:Id_tipo", async (req, res) => {
  try {
    const { Id_tipo } = req.params;

    if (!Id_tipo) {
        return res.status(400).json({ error: "El parámetro Id_tipo es requerido" });
    }
    
    const { Descripcion } = req.body;

    const tipoCont = await TipoCont.findOne({ where: { Id_tipo } });

    if (!tipoCont) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    tipoCont.Descripcion = Descripcion || tipoCont.Descripcion;

    await tipoCont.save();
    res.json(tipoCont);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el tipo." });
  }
});

router.delete("/:Id_tipo", async (req, res) => {
  try {
    const { Id_tipo } = req.params;

    if (!Id_tipo) {
        return res.status(400).json({ error: "El parámetro Id_tipo es requerido" });
    }

    const tipoCont = await TipoCont.findOne({ where: { Id_tipo } });

    if (!tipoCont) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    await tipoCont.destroy();
    res.json({ message: "Registro eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el tipo." });
  }
});