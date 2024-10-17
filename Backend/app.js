import iniciarDB from "./Data/dataSeed.js";
import express from 'express'
import cors from 'cors'

import * as Contenidos from './Routers/contenidos.router.js'
import * as Generos from './Routers/generos.router.js'
import * as genCont from './Routers/genCont.router.js'
import * as Capitulos from './Routers/capTemp.router.js'
import * as Idioma from './Routers/idioma.router.js'
import * as Subs from './Routers/subs.router.js'
import * as Subtitulos from './Routers/subtitulos.router.js'
import * as Temporadas from './Routers/tempSerie.router.js'
import * as TiposContenidos from './Routers/tipoCont.router.js'
import * as TiposDoc from './Routers/tipoDoc.router.js'
import * as Traducciones from './Routers/traducciones.router.js'
import * as Usuarios from './Routers/uss.router.js'

//Configuramos
const app = express()
app.use(cors())
app.use(express.json())

app.use('/contenidos', Contenidos.router)
app.use('/generos', Generos.router)
app.use('/generosContenido', genCont.router)
app.use('/capitulos', Capitulos.router)
app.use('/idiomas', Idioma.router)
app.use('/subscripciones', Subs.router) 
app.use('/subtitulos', Subtitulos.router)
app.use('/temporadas', Temporadas.router)
app.use('/tiposContenido', TiposContenidos.router)
app.use('/tiposDocumento', TiposDoc.router)
app.use('/traducciones', Traducciones.router)
app.use('/usuarios', Usuarios.router)

iniciarDB().then(() => {
  app.listen(4000, () =>
    console.log("Servidor corriendo en http://Localhost:4000")
  );
});