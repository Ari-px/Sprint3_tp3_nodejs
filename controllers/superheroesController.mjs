import {
  crearSuperheroe,
  actualizarSuperheroe,
  eliminarSuperheroe,
  obtenerTodosLosSuperheroes,
  eliminarSuperheroePorNombre,
  obtenerSuperheroePorId,
} from "../services/superheroesService.mjs";
import {
  renderizarListaSuperheroes,
  renderizarSuperheroe,
} from "../views/responseView.mjs";

// Función para manejar la respuesta en formato JSON o HTML
const manejarRespuesta = (req, res, status, mensaje, data) => {
  if (req.accepts("json")) {
    return res.status(status).json({ mensaje, data });
  }
  return res.status(status).send(mensaje);
};

export const obtenerTodosLosSuperheroesController = async (req, res) => {
  console.log("📥 GET /api/heroes - Obtener todos los superhéroes");

  try {
    const superheroes = await obtenerTodosLosSuperheroes();
    console.log("✅ Superhéroes obtenidos:", superheroes.length);

    if (req.accepts("html")) {
      return res.render("dashboard", { superheroes });
    }

    return manejarRespuesta(req, res, 200, "Superhéroes obtenidos correctamente.", renderizarListaSuperheroes(superheroes));
  } catch (error) {
    console.error("❌ Error al obtener superhéroes:", error.message);
    return manejarRespuesta(req, res, 500, "Error al obtener los superhéroes", error.message);
  }
};

export const formularioAgregarSuperheroeController = (req, res) => {
  console.log("GET /api/heroes/agregar - Renderizar formulario de agregar");
  res.render("addSuperhero", { errors: [], old: {} });
};

export const crearSuperheroeController = async (req, res) => {
  const old = { ...req.body };

  console.log("📥 POST /api/heroes/agregar - Datos recibidos:", old);

  try {
    const nuevo = await crearSuperheroe(req.body);
    console.log("✅ Superhéroe creado correctamente:", nuevo);
    return req.accepts("html") ? res.redirect("/api/heroes") : manejarRespuesta(req, res, 201, "Superhéroe creado exitosamente.", nuevo);
  } catch (error) {
    console.error("❌ Error al crear superhéroe:", error);
    return manejarRespuesta(req, res, 500, "Error al crear superhéroe.", error.message);
  }
};

export const formularioEditarSuperheroeController = async (req, res) => {
  console.log(`GET /api/heroes/${req.params.id}/editar - Editar superhéroe`);
  try {
    const superhero = await obtenerSuperheroePorId(req.params.id);
    if (!superhero) {
      return manejarRespuesta(req, res, 404, "Superhéroe no encontrado");
    }
    res.render("editSuperhero", { errors: [], old: {}, superhero });
  } catch (error) {
    console.error("Error al buscar superhéroe:", error);
    return manejarRespuesta(req, res, 500, "Error al buscar superhéroe", error.message);
  }
};

export const actualizarSuperheroeController = async (req, res) => {
  const superheroeId = req.params.id;
  console.log(`📝 PUT /api/heroes/${superheroeId}/editar - Datos recibidos`, req.body);

  try {
    const update = await actualizarSuperheroe(superheroeId, req.body);
    if (!update) {
      return manejarRespuesta(req, res, 404, "Superhéroe no encontrado para actualizar.");
    }
    console.log("✅ Superhéroe actualizado:", update);
    return req.accepts("html") ? res.redirect("/api/heroes") : manejarRespuesta(req, res, 200, "Superhéroe actualizado con éxito.", update);
  } catch (error) {
    console.error("❌ Error al actualizar superhéroe:", error);
    return manejarRespuesta(req, res, 400, "Error al actualizar el superhéroe.", error.message);
  }
};

export const eliminarSuperheroeController = async (req, res) => {
  console.log(`DELETE /api/heroes/${req.params.id} - Eliminar superhéroe`);
  try {
    const eliminado = await eliminarSuperheroe(req.params.id);
    if (!eliminado) {
      return manejarRespuesta(req, res, 404, "Superhéroe no encontrado para eliminar");
    }
    console.log("Superhéroe eliminado correctamente:", eliminado);
    return req.accepts("html") ? res.redirect("/api/heroes") : manejarRespuesta(req, res, 200, "Superhéroe eliminado con éxito", eliminado);
  } catch (error) {
    console.error("Error al eliminar superhéroe:", error);
    return manejarRespuesta(req, res, 500, "Error al eliminar", error.message);
  }
};

export const eliminarSuperheroePorNombreController = async (req, res) => {
  const nombre = req.params.nombre;
  console.log(`🗑 DELETE /api/heroes/nombre/${nombre}`);

  try {
    const eliminado = await eliminarSuperheroePorNombre(nombre);
    if (!eliminado) {
      return manejarRespuesta(req, res, 404, "Superhéroe no encontrado por nombre");
    }
    console.log("✅ Superhéroe eliminado por nombre:", eliminado);
    return req.accepts("json") ? manejarRespuesta(req, res, 200, "Superhéroe eliminado por nombre con éxito.", renderizarSuperheroe(eliminado)) : res.render("dashboard", { superheroes: await obtenerTodosLosSuperheroes(), mensaje: `Superhéroe "${eliminado.nombreSuperHeroe}" eliminado con éxito.` });
  } catch (error) {
    console.error("❌ Error al eliminar por nombre:", error);
    return manejarRespuesta(req, res, 500, "Error al eliminar por nombre", error.message);
  }
};
