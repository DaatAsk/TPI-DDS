import sequelize from "./connectionToDB.js";
import moment from "moment";
import TipoDoc from "../Models/tipoDoc.model.js";
import TipoCont from "../Models/tipoCont.model.js";
import Idioma from "../Models/idioma.model.js";
import Genero from "../Models/genero.model.js";
import Subs from "../Models/subs.model.js";
import Uss from "../Models/uss.model.js";
import Cont from "../Models/cont.model.js";
import Subtitulo from "../Models/subtitulo.model.js";
import Traduccion from "../Models/traduccion.model.js";
import GenCont from "../Models/genCont.model.js";
import TempSerie from "../Models/tempSerie.model.js";
import CapTemp from "../Models/capTemp.model.js";

// Función para generar fechas para contenidos
const fechaFin = new Date(); // Fecha actual

function generarFechaAleatoria(desde, hasta) {
  const fechaAleatoria = new Date(
    desde.getTime() + Math.random() * (hasta.getTime() - desde.getTime())
  );
  fechaAleatoria.setHours(0, 0, 0, 0);
  return moment(fechaAleatoria).format("YYYY-MM-DD");
}

function randomChoice(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

// Crear Tablas y cargar DB
async function iniciarDB() {
  await sequelize.sync({ force: true });

  await TipoDoc.bulkCreate([
    { Descripcion: "DNI" },
    { Descripcion: "Pasaporte" },
  ]);

  await TipoCont.bulkCreate([
    { Descripcion: "Película" },
    { Descripcion: "Serie" },
    { Descripcion: "Documental" },
  ]);

  await Idioma.bulkCreate([
    { Descripcion: "Español" },
    { Descripcion: "Inglés" },
    { Descripcion: "Francés" },
    { Descripcion: "Alemán" },
    { Descripcion: "Italiano" },
    { Descripcion: "Portugués" },
    { Descripcion: "Chino" },
    { Descripcion: "Japonés" },
    { Descripcion: "Coreano" },
    { Descripcion: "Ruso" },
  ]);

  await Genero.bulkCreate([
    { Descripcion: "Acción" },
    { Descripcion: "Comedia" },
    { Descripcion: "Drama" },
    { Descripcion: "Fantasía" },
    { Descripcion: "Terror" },
    { Descripcion: "Misterio" },
    { Descripcion: "Romance" },
    { Descripcion: "Ciencia Ficción" },
    { Descripcion: "Thriller" },
    { Descripcion: "Western" },
  ]);

  const primAlta = new Date("2012-03-07"); // Primera fecha posible de Alta
  await Subs.bulkCreate([
    {
      Id_docTipo: 1,
      NroDni: 12345678,
      FechaAlta: generarFechaAleatoria(primAlta, fechaFin),
      NroTarjeta: "1234-5678-9012-3456",
      Nombre: "Juan",
      Apellido: "Perez",
      Telefono: "555-1234",
    },
    {
      Id_docTipo: 2,
      NroDni: 87654321,
      FechaAlta: generarFechaAleatoria(primAlta, fechaFin),
      NroTarjeta: "6543-2109-8765-4321",
      Nombre: "Ana",
      Apellido: "Lopez",
      Telefono: "555-5678",
    },
    {
      Id_docTipo: 1,
      NroDni: 23456789,
      FechaAlta: generarFechaAleatoria(primAlta, fechaFin),
      NroTarjeta: "5678-9012-3456-7890",
      Nombre: "Carlos",
      Apellido: "Garcia",
      Telefono: "555-2345",
    },
    {
      Id_docTipo: 2,
      NroDni: 98765432,
      FechaAlta: generarFechaAleatoria(primAlta, fechaFin),
      NroTarjeta: "4321-0987-6543-2109",
      Nombre: "Maria",
      Apellido: "Fernandez",
      Telefono: "555-6789",
    },
    {
      Id_docTipo: 1,
      NroDni: 34567890,
      FechaAlta: generarFechaAleatoria(primAlta, fechaFin),
      NroTarjeta: "9012-3456-7890-1234",
      Nombre: "Pedro",
      Apellido: "Martinez",
      Telefono: "555-3456",
    },
    {
      Id_docTipo: 2,
      NroDni: 87654322,
      FechaAlta: generarFechaAleatoria(primAlta, fechaFin),
      NroTarjeta: "5432-1098-7654-3210",
      Nombre: "Laura",
      Apellido: "Gonzalez",
      Telefono: "555-7890",
    },
    {
      Id_docTipo: 1,
      NroDni: 45678901,
      FechaAlta: generarFechaAleatoria(primAlta, fechaFin),
      NroTarjeta: "7890-1234-5678-9012",
      Nombre: "Luis",
      Apellido: "Rodriguez",
      Telefono: "555-4567",
    },
    {
      Id_docTipo: 2,
      NroDni: 76543210,
      FechaAlta: generarFechaAleatoria(primAlta, fechaFin),
      NroTarjeta: "3210-9876-5432-1098",
      Nombre: "Elena",
      Apellido: "Gomez",
      Telefono: "555-8901",
    },
    {
      Id_docTipo: 1,
      NroDni: 56789012,
      FechaAlta: generarFechaAleatoria(primAlta, fechaFin),
      NroTarjeta: "8901-2345-6789-0123",
      Nombre: "Miguel",
      Apellido: "Sanchez",
      Telefono: "555-5678",
    },
    {
      Id_docTipo: 2,
      NroDni: 65432109,
      FechaAlta: generarFechaAleatoria(primAlta, fechaFin),
      NroTarjeta: "2109-8765-4321-0987",
      Nombre: "Patricia",
      Apellido: "Ramirez",
      Telefono: "555-9012",
    },
  ]);

  // Obtener todas las subscripciones existentes
  const subscripciones = await Subs.findAll();

  // Crear usuarios para esta subscripción
  const usuarios = [];

  for (const subscripcion of subscripciones) {
    // Generar un número aleatorio de usuarios entre 5 y 10 para cada subscripción
    const numUsuarios = Math.floor(Math.random() * 6) + 5;

    for (let i = 1; i <= numUsuarios; i++) {
      usuarios.push({
        Nombre: `Usuario_${i}_Sub${subscripcion.NroSub}`, // Nombre de usuario único para cada subscripción
        NroSub: subscripcion.NroSub,
        Imagen: null, // Puedes agregar imágenes si lo deseas
        FechaNacimiento: generarFechaAleatoria(
          new Date("1952-01-01"),
          new Date("2010-12-31")
        ), // Fecha de nacimiento aleatoria
      });
    }
  }

  await Uss.bulkCreate(usuarios);

  const primFilm = new Date("1952-12-24"); // Primera fecha posible de Lanzamiento
  await Cont.bulkCreate([
    {
      Title: "Pelicula 1",
      FechaLanzamiento: generarFechaAleatoria(primFilm, fechaFin),
      Id_tipo: 1,
    },
    {
      Title: "Serie 1",
      FechaLanzamiento: generarFechaAleatoria(primFilm, fechaFin),
      Id_tipo: 2,
    },
    {
      Title: "Documental 1",
      FechaLanzamiento: generarFechaAleatoria(primFilm, fechaFin),
      Id_tipo: 3,
    },
    {
      Title: "Pelicula 2",
      FechaLanzamiento: generarFechaAleatoria(primFilm, fechaFin),
      Id_tipo: 1,
    },
    {
      Title: "Serie 2",
      FechaLanzamiento: generarFechaAleatoria(primFilm, fechaFin),
      Id_tipo: 2,
    },
    {
      Title: "Documental 2",
      FechaLanzamiento: generarFechaAleatoria(primFilm, fechaFin),
      Id_tipo: 3,
    },
    {
      Title: "Pelicula 3",
      FechaLanzamiento: generarFechaAleatoria(primFilm, fechaFin),
      Id_tipo: 1,
    },
    {
      Title: "Serie 3",
      FechaLanzamiento: generarFechaAleatoria(primFilm, fechaFin),
      Id_tipo: 2,
    },
    {
      Title: "Documental 3",
      FechaLanzamiento: generarFechaAleatoria(primFilm, fechaFin),
      Id_tipo: 3,
    },
    {
      Title: "Pelicula 4",
      FechaLanzamiento: generarFechaAleatoria(primFilm, fechaFin),
      Id_tipo: 1,
    },
  ]);

  // Obtener el número total de contenidos
  const numContenidos = 10;

  // Crear instancias de subtitulos y traducciones para cada contenido
  const subtitulos = [];
  const traducciones = [];
  const idi = [];
  const idiomas = await Idioma.findAll();

  for (let i = 1; i <= idiomas.length; i++) {
    idi.push(i);
  }

  for (let i = 1; i <= numContenidos; i++) {
    // Crear al menos 2 instancias para cada contenido
    for (let j = 1; j <= 2; j++) {
      const dat = randomChoice(idi);
      subtitulos.push({
        CodCont: i,
        IdIdioma: dat,
        Subtitulo: null,
      });
      traducciones.push({
        CodCont: i,
        IdIdioma: dat,
        Traduccion: null,
      });
    }
  }

  await Subtitulo.bulkCreate(subtitulos);
  await Traduccion.bulkCreate(traducciones);

  // Crear instancias de GenerosCont para cada contenido
  const generosCont = [];
  const gen = [];
  const generos = await Genero.findAll();

  for (let i = 1; i <= generos.length; i++) {
    gen.push(i);
  }

  for (let i = 1; i <= numContenidos; i++) {
    // Asignar al menos 2 géneros a cada contenido
    for (let j = 1; j <= 2; j++) {
      generosCont.push({
        CodCont: i,
        IdGenero: randomChoice(gen),
      });
    }
  }

  await GenCont.bulkCreate(generosCont);

  // Cargar datos en TempSerie
  const series = await Cont.findAll({ where: { Id_tipo: 2 } });
  const temporadas = [];

  for (const serie of series) {
    let lanzSerie = serie.FechaLanzamiento;
    const numTemporadas = Math.floor(Math.random() * 5) + 1; // Genera entre 1 y 5 temporadas
    for (let i = 1; i <= numTemporadas; i++) {
      let fechaLanz;
      if (i === 1) {
        fechaLanz = lanzSerie;
      } else {
        const siguienteFecha = new Date(
          lanzSerie.split("-").reverse().join("-")
        );
        siguienteFecha.setMonth(siguienteFecha.getMonth() + 6);
        fechaLanz = generarFechaAleatoria(
          siguienteFecha,
          new Date(
            siguienteFecha.getFullYear(),
            siguienteFecha.getMonth() + 6,
            0
          )
        );
        lanzSerie = fechaLanz;
      }
      temporadas.push({
        CodCont: serie.CodCont,
        NroTemp: i,
        FechaLanz: fechaLanz,
      });
    }
  }

  await TempSerie.bulkCreate(temporadas);

  // Cargar datos en CapTemp
  const temporadasExis = await TempSerie.findAll();
  const episodios = [];

  for (const temporadaE of temporadasExis) {
    for (let i = 1; i <= 3; i++) {
      episodios.push({
        CodCont: temporadaE.CodCont,
        NroTemp: temporadaE.NroTemp,
        CodCap: `S${temporadaE.CodCont}T${temporadaE.NroTemp}E${i}`,
        Nombre: `Episodio ${i}`,
        Descripcion: `Descripción del episodio ${i}`,
      });
    }
  }

  await CapTemp.bulkCreate(episodios);
}

export default iniciarDB;