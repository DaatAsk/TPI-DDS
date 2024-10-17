import { Router } from "express";
import Subs from "../Models/subs.model.js";
import TipoDoc from "../Models/tipoDoc.model.js";
import moment from 'moment'

export const router = Router();

router.get("/", async (_, res) => {
    try {
      const subs = await Subs.findAll({
        include: {
          model: TipoDoc,
          attributes: ["Descripcion"],
        },
      });

      if (!subs) {
        return res.status(204).json({ message: "No hay registros disponibles para mostrar" });
      }

      const result = subs.map((sub) => ({
        NroSub: sub.NroSub,
        TipoDocumento: sub.TipoDocumento.Descripcion,
        NroDni: sub.NroDni,
        FechaAlta: sub.FechaAlta,
        NroTarjeta: sub.NroTarjeta,
        Nombre: sub.Nombre,
        Apellido: sub.Apellido,
        Telefono: sub.Telefono,
      }));

      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener las subscripciones." });
    }
});

router.get("/:NroSub", async (req, res) => {
    try {
      const { NroSub } = req.params;

      const sub = await Subs.findOne({
        where: { NroSub: NroSub },
        include: {
          model: TipoDoc,
          attributes: ["Descripcion"],
        },
      });

      if (!sub) {
        return res.status(404).json({ error: "Subscripción no encontrada." });
      }

      const result = {
        NroSub: sub.NroSub,
        TipoDocumento: sub.TipoDocumento.Descripcion,
        NroDni: sub.NroDni,
        FechaAlta: sub.FechaAlta,
        NroTarjeta: sub.NroTarjeta,
        Nombre: sub.Nombre,
        Apellido: sub.Apellido,
        Telefono: sub.Telefono,
      };

      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener la subscripción." });
    }
});

router.get("/:Id_docTipo/:NroDni", async (req, res) => {
 try {
   const { Id_docTipo, NroDni } = req.params;
   const sub = await Subs.findOne({
     where: {
       Id_docTipo: Id_docTipo,
       NroDni: NroDni,
     },
     include: {
       model: TipoDoc,
       attributes: ["Descripcion"],
     },
   });

   if (!sub) {
     return res.status(404).json({ error: "Subscripción no encontrada." });
   }

   const result = {
     NroSub: sub.NroSub,
     TipoDocumento: sub.TipoDocumento.Descripcion,
     NroDni: sub.NroDni,
     FechaAlta: sub.FechaAlta,
     NroTarjeta: sub.NroTarjeta,
     Nombre: sub.Nombre,
     Apellido: sub.Apellido,
     Telefono: sub.Telefono,
   };

   res.json(result);
 } catch (error) {
   console.error(error);
   res.status(500).json({ error: "Error al obtener la subscripción." });
 }
});

router.post("/", async (req, res) => {
  try {
    const { TipoDocumento, NroDni, NroTarjeta, Nombre, Apellido, Telefono } =
      req.body;

    // Buscar el Id_docTipo basado en la descripción
    const tipoDoc = await TipoDoc.findOne({
      where: { Descripcion: TipoDocumento },
    });

    if (!tipoDoc) {
      return res.status(400).json({
        error: "Tipo de documento no encontrado.",
      });
    }

    const { Id_docTipo } = tipoDoc;
    const FechaAlta = moment().format("DD-MM-YYYY");

    // Verificar si ya existe una subscripción con el mismo Id_docTipo y NroDni
    const existingSub = await Subs.findOne({
      where: { Id_docTipo, NroDni },
    });

    if (existingSub) {
      return res.status(400).json({
        error: "Ya existe una subscripción con este tipo y número de DNI.",
      });
    }

    const newSub = await Subs.create({
      Id_docTipo,
      NroDni,
      FechaAlta,
      NroTarjeta,
      Nombre,
      Apellido,
      Telefono,
    });

    // Formatear la fecha para la respuesta
    const response = {
      ...newSub.toJSON(),
      FechaAlta: moment(newSub.FechaAlta).format("DD-MM-YYYY"),
    };

    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la subscripción." });
  }
});

router.put("/:NroSub", async (req, res) => {
  try {
    const { NroSub } = req.params;

    if (!NroSub) {
      return res
        .status(400)
        .json({ error: "El parámetro NroSub es requerido" });
    }

    const {
      TipoDocumento,
      NroDni,
      FechaAlta,
      NroTarjeta,
      Nombre,
      Apellido,
      Telefono,
    } = req.body;

    // Buscar el Id_docTipo basado en la descripción
    const tipoDoc = await TipoDoc.findOne({
      where: { Descripcion: TipoDocumento},
    });

    if (!tipoDoc) {
      return res.status(400).json({
        error: "Tipo de documento no encontrado.",
      });
    }

    const { Id_docTipo } = tipoDoc;

    const sub = await Subs.findOne({
      where: { NroSub: NroSub },
    });

    if (!sub) {
      return res.status(404).json({ error: "Subscripción no encontrada." });
    }

    sub.Id_docTipo = Id_docTipo;
    sub.NroDni = NroDni;
    sub.FechaAlta = FechaAlta;
    sub.NroTarjeta = NroTarjeta;
    sub.Nombre = Nombre;
    sub.Apellido = Apellido;
    sub.Telefono = Telefono;

    await sub.save();

    res.json(sub);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la subscripción." });
  }
});


router.delete("/:NroSub", async (req, res) => {
  try {
    const { NroSub } = req.params;

    if ( !NroSub ) {
        return res.status(400).json({ error: "El parámetro NroSub es requerido" });
      }

    const sub = await Subs.findOne({
      where: { NroSub: NroSub },
    });

    if (!sub) {
      return res.status(404).json({ error: "Subscripción no encontrada." });
    }

    await sub.destroy();

    res.json({ message: "Subscripción eliminada con éxito." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la subscripción." });
  }
});