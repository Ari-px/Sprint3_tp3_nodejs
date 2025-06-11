import express from "express";
import {
  buscarSuperheroesPorAtributoControllers,
  obtenerSuperheroePorIdControllers,
  obtenerSuperheroesMayoresDe30Controllers,
  obtenerTodosLosSuperheroesControllers,
} from "../controllers/superheroesControllers.mjs";

const router = express.Router();

router.get("/heroes/mayores-30", obtenerSuperheroesMayoresDe30Controllers);
router.get("/heroes", obtenerTodosLosSuperheroesControllers);
router.get("/heroes/:id", obtenerSuperheroePorIdControllers);
router.get("/heroes/:atributo/:valor", buscarSuperheroesPorAtributoControllers);


export default router;
