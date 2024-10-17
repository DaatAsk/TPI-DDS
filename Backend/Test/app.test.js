import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import router from "../Routers/subs.router.js";
import Subs from "../Models/Subs.js"; // Importar Subs desde su archivo
import TipoDoc from "../Models/TipoDoc.js"; // Importar TipoDoc desde su archivo
import { jest } from "@jest/globals";
import moment from "moment";

const app = express();
app.use(bodyParser.json());
app.use("/api/subs", router);

// Mocks
jest.mock("../Models/Subs.js"); // Mockear Subs
jest.mock("../Models/TipoDoc.js"); // Mockear TipoDoc

describe("Subscripción API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/subs/:NroSub", () => {
    it("debería devolver un objeto de subscripción con código 200", async () => {
      Subs.findOne.mockResolvedValue({
        NroSub: 1,
        NroDni: "12345678",
        FechaAlta: "2020-05-04",
        NroTarjeta: "1234-5678-9012-3456",
        Nombre: "Juan",
        Apellido: "Perez",
        Telefono: "555-1234",
        TipoDocumento: { Descripcion: "DNI" },
      });

      const res = await request(app).get("/api/subs/1");

      expect(res.statusCode).toBe(200);
      expect(res.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
      expect(res.body).toEqual({
        NroSub: 1,
        TipoDocumento: "DNI",
        NroDni: "12345678",
        FechaAlta: "2020-05-04",
        NroTarjeta: "1234-5678-9012-3456",
        Nombre: "Juan",
        Apellido: "Perez",
        Telefono: "555-1234",
      });
    });

    it("debería devolver un error 404 si la subscripción no existe", async () => {
      Subs.findOne.mockResolvedValue(null);

      const res = await request(app).get("/api/subs/99");

      expect(res.statusCode).toBe(404);
      expect(res.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
      expect(res.body).toEqual({
        error: "Subscripción no encontrada.",
      });
    });

    it("debería manejar errores internos con código 500", async () => {
      Subs.findOne.mockRejectedValue(new Error("Error interno"));

      const res = await request(app).get("/api/subs/1");

      expect(res.statusCode).toBe(500);
      expect(res.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
      expect(res.body).toEqual({
        error: "Error al obtener la subscripción.",
      });
    });
  });

  describe("POST /api/subs", () => {
    it("debería crear una subscripción y devolverla con código 201", async () => {
      TipoDoc.findOne.mockResolvedValue({ Id_docTipo: 1 });
      Subs.findOne.mockResolvedValue(null);
      Subs.create.mockResolvedValue({
        NroSub: 1,
        Id_docTipo: 1,
        NroDni: "12345678",
        FechaAlta: moment().format("YYYY-MM-DD"),
        NroTarjeta: "1234-5678-9012-3456",
        Nombre: "Juan",
        Apellido: "Perez",
        Telefono: "555-1234",
        toJSON: function () {
          return this;
        },
      });

      const res = await request(app).post("/api/subs").send({
        TipoDocumento: "DNI",
        NroDni: "12345678",
        NroTarjeta: "1234-5678-9012-3456",
        Nombre: "Juan",
        Apellido: "Perez",
        Telefono: "555-1234",
      });

      expect(res.statusCode).toBe(201);
      expect(res.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
      expect(res.body).toEqual({
        NroSub: 1,
        Id_docTipo: 1,
        NroDni: "12345678",
        FechaAlta: moment().format("DD-MM-YYYY"),
        NroTarjeta: "1234-5678-9012-3456",
        Nombre: "Juan",
        Apellido: "Perez",
        Telefono: "555-1234",
      });
    });

    it("debería devolver un error 400 si el tipo de documento no se encuentra", async () => {
      TipoDoc.findOne.mockResolvedValue(null);

      const res = await request(app).post("/api/subs").send({
        TipoDocumento: "Pasaporte",
        NroDni: "12345678",
        NroTarjeta: "1234-5678-9012-3456",
        Nombre: "Juan",
        Apellido: "Perez",
        Telefono: "555-1234",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({
        error: "Tipo de documento no encontrado.",
      });
    });

    it("debería devolver un error 400 si ya existe una subscripción con el mismo tipo y número de DNI", async () => {
      TipoDoc.findOne.mockResolvedValue({ Id_docTipo: 1 });
      Subs.findOne.mockResolvedValue(true); // Simulamos que ya existe

      const res = await request(app).post("/api/subs").send({
        TipoDocumento: "DNI",
        NroDni: "12345678",
        NroTarjeta: "1234-5678-9012-3456",
        Nombre: "Juan",
        Apellido: "Perez",
        Telefono: "555-1234",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({
        error: "Ya existe una subscripción con este tipo y número de DNI.",
      });
    });

    it("debería manejar errores internos con código 500", async () => {
      TipoDoc.findOne.mockRejectedValue(new Error("Error interno"));

      const res = await request(app).post("/api/subs").send({
        TipoDocumento: "DNI",
        NroDni: "12345678",
        NroTarjeta: "1234-5678-9012-3456",
        Nombre: "Juan",
        Apellido: "Perez",
        Telefono: "555-1234",
      });

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({
        error: "Error al crear la subscripción.",
      });
    });
  });

  describe("PUT /api/subs/:NroSub", () => {
    it("debería actualizar la subscripción y devolverla con código 200", async () => {
      TipoDoc.findOne.mockResolvedValue({ Id_docTipo: 1 });
      Subs.findOne.mockResolvedValue({
        NroSub: 1,
        save: jest.fn().mockResolvedValue(true), // mock save
      });

      const res = await request(app).put("/api/subs/1").send({
        TipoDocumento: "DNI",
        NroDni: "12345678",
        FechaAlta: "2020-05-04",
        NroTarjeta: "1234-5678-9012-3456",
        Nombre: "Juan",
        Apellido: "Perez",
        Telefono: "555-1234",
      });

      expect(res.statusCode).toBe(200);
      expect(res.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
      expect(res.body).toEqual({
        NroSub: 1,
        Id_docTipo: 1,
        NroDni: "12345678",
        FechaAlta: "2020-05-04",
        NroTarjeta: "1234-5678-9012-3456",
        Nombre: "Juan",
        Apellido: "Perez",
        Telefono: "555-1234",
      });
    });
  })})
