import express from "express";
import {
  buscarSuperheroesPorAtributoController,
  obtenerSuperheroePorIdController,
  obtenerSuperheroesMayoresDe30Controller,
  obtenerTodosLosSuperheroesController,
} from "../controllers/superheroesController.mjs";

const router = express.Router();

router.get("/heroes/mayores-30", obtenerSuperheroesMayoresDe30Controller);
router.get("/heroes", obtenerTodosLosSuperheroesController);
router.get("/heroes/:id", obtenerSuperheroePorIdController);
router.get("/heroes/:atributo/:valor", buscarSuperheroesPorAtributoController);


export default router;