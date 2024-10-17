import { Router } from "express";
import Uss from "../Models/uss.model.js";
import Subs from "../Models/subs.model.js";

export const router = Router()

router.get("/:NroSub", async (req, res) => {
  try {
    const { NroSub } = req.params;

    if (!NroSub) {
      return res
        .status(400)
        .json({ error: "El parámetro NroSub es requerido" });
    }

    const usuarios = await Uss.findAll({
      where: { NroSub },
      include: [{ model: Subs, attributes: ["NroSub"] }],
    });

    if (usuarios.length === 0) {
      return res
        .status(204)
        .json({ message: "No hay registros disponibles para mostrar" });
    }

    const result = usuarios.map((usuario) => ({
      Nombre: usuario.Nombre,
      Subscripcion: usuario.NroSub,
      Imagen: usuario.Imagen,
      FechaNacimiento: usuario.FechaNacimiento,
    }));

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los usuarios." });
  }
});

router.post("/", async (req, res) => {
  try {
    const { Nombre, NroSub, Imagen: text, FechaNacimiento } = req.body;

    const newUsuario = await Uss.create({
      Nombre,
      NroSub,
      Imagen: text,
      FechaNacimiento,
    });

    res.status(201).json(newUsuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el usuario." });
  }
});

router.put("/:Nombre/:NroSub", async (req, res) => {
  try {
    const { Nombre, NroSub } = req.params;

    if (!Nombre || !NroSub) {
      return res
        .status(400)
        .json({ error: "Los parámetros Nombre y NroSub son requeridos" });
    }

    const { Imagen: text, FechaNacimiento } = req.body;

    const usuario = await Uss.findOne({
      where: { Nombre, NroSub },
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    usuario.Imagen = text;
    usuario.FechaNacimiento = FechaNacimiento;

    await usuario.save();

    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el usuario." });
  }
});

router.delete("/:Nombre/:NroSub", async (req, res) => {
  try {
    const { Nombre, NroSub } = req.params;

    if (!Nombre || !NroSub) {
      return res
        .status(400)
        .json({ error: "Los parámetros Nombre y NroSub son requeridos" });
    }

    const usuario = await Uss.findOne({
      where: { Nombre, NroSub },
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    await usuario.destroy();

    res.json({ message: "Usuario eliminado con éxito." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el usuario." });
  }
});