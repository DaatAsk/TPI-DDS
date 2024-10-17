import { Router } from "express";
import Cont from '../Models/cont.model.js'
import TipoCont from "../Models/tipoCont.model.js";

export const router = Router()

router.get('/', async(_, res)=>{ 
    try {
      const contents = await Cont.findAll({
        include: {model: TipoCont,attributes: ["Descripcion"]},
      });

      if (!contents) {
        return res.status(204).json({ message: "No hay registros disponibles para mostrar" });
      }

      // Transformar los datos
      const transformedContents = contents.map((content) => {
        const plainContent = content.get({ plain: true });
        return {
          CodCont: plainContent.CodCont,
          Title: plainContent.Title,
          FechaLanzamiento: plainContent.FechaLanzamiento,
          TipoContenido: plainContent.TipoCont.Descripcion, // Extraer la descripción directamente
        };
      });

      res.json(transformedContents);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener los contenidos" });
    }
})

router.get('/:CodCont', async(req, res)=>{
    try {
      const { CodCont } = req.params;

      if (!CodCont) {
      return res.status(400).json({ error: "El parámetro CodCont es requerido." });
    }

      const content = await Cont.findOne({
        where: {
          CodCont: CodCont,
        },
        include: {
          model: TipoCont,
          attributes: ["Descripcion"],
        },
      });

      if (!content) {
        return res.status(404).json({ error: "Contenido no encontrado" });
      }

      const plainContent = content.get({ plain: true });

      const responseContent = {
        CodCont: plainContent.CodCont,
        Title: plainContent.Title,
        FechaLanzamiento: plainContent.FechaLanzamiento,
        TipoContenido: plainContent.TipoCont.Descripcion,
      };

      res.json(responseContent);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener el contenido" });
    }
})

router.get('/:Title', async(req, res)=>{
    try{
        const { Title } = req.params;

        if (!Title ) {
      return res.status(400).json({ error: "El parámetro Title es requerido" });
    }
    
      const content = await Cont.findOne({
        where: {
          Title: Title,
        },
        include: {
          model: TipoCont,
          attributes: ["Descripcion"],
        },
      });

      if (!content) {
        return res.status(404).json({ error: "Contenido no encontrado" });
      }

      const plainContent = content.get({ plain: true });

      const responseContent = {
        CodCont: plainContent.CodCont,
        Title: plainContent.Title,
        FechaLanzamiento: plainContent.FechaLanzamiento,
        TipoContenido: plainContent.TipoCont.Descripcion,
      };

      res.json(responseContent);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener el contenido" });
    }
})

router.post("/", async (req, res) => {
  try {
    const { Title, FechaLanzamiento, TipoContenido } = req.body;

    // Verificar que tipoCont no sea nulo
    if (!TipoContenido) {
      return res.status(400).json({ error: "tipoCont es requerido" });
    }

    // Buscar el Id_tipo basándose en tipoCont
    const tipo = await TipoCont.findOne({
      where: { Descripcion: TipoContenido },
    });

    // Verificar si se encontró el tipo
    if (!tipo) {
      return res.status(404).json({ error: "Tipo no encontrado" });
    }

    const newContent = await Cont.create({
      Title,
      FechaLanzamiento,
      Id_tipo: tipo.Id_tipo, 
    });

    res.status(201).json(newContent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el contenido" });
  }
});

router.put("/:CodCont", async (req, res) => {
  try {
    const { CodCont } = req.params;

    if (!CodCont) {
      return res
        .status(400)
        .json({ error: "El parámetro CodCont es requerido" });
    }

    const { Title, FechaLanzamiento, TipoContenido } = req.body;

    // Encontrar el contenido existente
    const content = await Cont.findOne({
      where: { CodCont: CodCont },
    });

    // Buscar el Id_tipo basándose en tipoCont
    const tipo = await TipoCont.findOne({
      where: { Descripcion: TipoContenido },
    });

    if (!content) {
      return res.status(404).json({ error: "Contenido no encontrado" });
    }

    // Actualizar el contenido
    content.Title = Title;
    content.FechaLanzamiento = FechaLanzamiento;
    content.Id_tipo = tipo.Id_tipo;
    await content.save();

    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el contenido" });
  }
});

router.delete("/:CodCont", async (req, res) => {
  try {
    const { CodCont } = req.params;

    if (!CodCont ) {
      return res.status(400).json({ error: "El parámetro CodCont es requerido" });
    }

    const exist = await Cont.findOne({
      where: {
        CodCont: CodCont,
      },
    });

    if (!exist) {
      return res.status(404).json({ error: "Contenido no encontrado" });
    }

    await Cont.destroy({
      where: {
        CodCont: CodCont,
      },
    });

    res.status(200).json({ message: "Contenido eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el contenido" });
  }
});