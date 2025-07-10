import {
    crearSuperheroe,
    obtenerSuperheroePorId,
    obtenerTodosLosSuperheroes,
    buscarSuperheroesPorAtributo,
    obtenerSuperheroesMayoresDe30,
    actualizarSuperheroe,
    eliminarSuperheroe
} from '../services/superheroesService.mjs';

import { Types } from 'mongoose'; // Para validar IDs de MongoDB

// ----------------------------------------------------
// CONTROLADORES DE LECTURA (GET)
// ----------------------------------------------------

export async function obtenerSuperheroePorIdController(req, res) {
    try {
        const { id } = req.params;

        // Validar que el ID sea un ObjectId válido de Mongoose
        if (!Types.ObjectId.isValid(id)) {
            if (req.accepts('json')) {
                return res.status(400).json({ message: 'ID de superhéroe no válido.' });
            }
            return res.status(400).send('ID de superhéroe no válido.');
        }

        const superheroe = await obtenerSuperheroePorId(id);

        if (!superheroe) {
            if (req.accepts('json')) {
                return res.status(404).json({ message: 'Superhéroe no encontrado.' });
            }
            return res.status(404).send('Superhéroe no encontrado.');
        }

        if (req.accepts('html')) {
            // Si el cliente prefiere HTML, redirige al dashboard principal
            res.redirect('/api/heroes');
        } else if (req.accepts('json')) {
            // Si el cliente prefiere JSON, envía los datos del superhéroe.
            res.json(superheroe);
        } else {
            res.status(406).send('Not Acceptable: Solo se soportan respuestas HTML o JSON.');
        }
    } catch (error) {
        console.error('Error en obtenerSuperheroePorIdController:', error);
        res.status(500).send({ mensaje: 'Error al obtener el superhéroe', error: error.message });
    }
}

export async function obtenerTodosLosSuperheroesController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperheroes();

        if (req.accepts('html')) {
            // Si el cliente prefiere HTML (navegador), renderiza el dashboard
            res.render('dashboard', { superheroes });
        } else if (req.accepts('json')) {
            // Si el cliente prefiere JSON (Postman), envía los datos
            res.json(superheroes);
        } else {
            // Si no se soporta el tipo de contenido, responde con 406 Not Acceptable
            res.status(406).send('Not Acceptable: Solo se soportan respuestas HTML o JSON.');
        }
    } catch (error) {
        console.error('Error en obtenerTodosLosSuperheroesController:', error);
        res.status(500).send({ mensaje: 'Error al obtener los superhéroes', error: error.message });
    }
}

export async function buscarSuperheroesPorAtributoController(req, res) {
    try {
        const { atributo, valor } = req.params;
        const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);

        if (superheroes.length === 0) {
            if (req.accepts('json')) {
                return res.status(404).json({ mensaje: 'No se encontraron superhéroes con ese atributo.' });
            }
            return res.status(404).send('No se encontraron superhéroes con ese atributo.');
        }

        if (req.accepts('html')) {
            // Para HTML, renderiza el dashboard con los resultados filtrados
            res.render('dashboard', { superheroes });
        } else if (req.accepts('json')) {
            // Si el cliente prefiere JSON, envía los datos.
            res.json(superheroes);
        } else {
            res.status(406).send('Not Acceptable: Solo se soportan respuestas HTML o JSON.');
        }
    } catch (error) {
        console.error('Error en buscarSuperheroesPorAtributoController:', error);
        res.status(500).send({ mensaje: 'Error al buscar los superhéroes', error: error.message });
    }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
    try {
        const superheroes = await obtenerSuperheroesMayoresDe30();

        if (superheroes.length === 0) {
            if (req.accepts('json')) {
                return res.status(404).json({ mensaje: 'No se encontraron superhéroes mayores de 30 años.' });
            }
            return res.status(404).send('No se encontraron superhéroes mayores de 30 años.');
        }

        if (req.accepts('html')) {
            // Renderiza el dashboard con los resultados filtrados
            res.render('dashboard', { superheroes });
        } else if (req.accepts('json')) {
            // Si el cliente prefiere JSON, envía los datos.
            res.json(superheroes);
        } else {
            res.status(406).send('Not Acceptable: Solo se soportan respuestas HTML o JSON.');
        }
    } catch (error) {
        console.error('Error en obtenerSuperheroesMayoresDe30Controller:', error);
        res.status(500).send({ mensaje: 'Error al obtener superhéroes mayores de 30', error: error.message });
    }
}

// ----------------------------------------------------
// CONTROLADORES DE FORMULARIOS (Siempre HTML)
// ----------------------------------------------------

export async function formAgregarHeroController(req, res) {
    // Este siempre es para el navegador, así que siempre renderiza HTML
    // CORREGIDO: Ahora renderiza 'agregarHero' para que coincida con tu archivo EJS
    res.render('agregarHero');
}

export async function formActualizarHeroeController(req, res) {
    try {
        const { id } = req.params;
        // Validar que el ID sea un ObjectId válido de Mongoose
        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).send('ID de superhéroe no válido para edición.');
        }
        const superheroe = await obtenerSuperheroePorId(id);

        if (!superheroe) {
            return res.status(404).send('Superhéroe no encontrado para editar.');
        }

        res.render('editarHero', { info: superheroe });
    } catch (error) {
        console.error('Error en formActualizarHeroeController:', error);
        res.status(500).send('Error interno al cargar el formulario de edición.');
    }
}

export async function confirmarEliminacionController(req, res) {
    try {
        const { id } = req.params;
        // Validar que el ID sea un ObjectId válido de Mongoose
        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).send('ID de superhéroe no válido para confirmación.');
        }

        const superheroe = await obtenerSuperheroePorId(id);

        if (!superheroe) {
            return res.status(404).send('Superhéroe no encontrado para confirmar eliminación.');
        }

        // CORREGIDO: Ahora renderiza 'confirmarEliminacion' para que coincida con tu archivo EJS
        res.render('confirmarEliminacion', { info: superheroe });
    } catch (error) {
        console.error('Error en confirmarEliminacionController:', error);
        res.status(500).send({ mensaje: 'Error interno al cargar la página de confirmación.' });
    }
}

// ----------------------------------------------------
// CONTROLADORES DE ESCRITURA (POST, PUT, DELETE)
// ----------------------------------------------------

export async function agregarHeroController(req, res) {
    try {
        const body = {
            ...req.body,
            poderes: req.body.poderes || [],
            aliados: req.body.aliados || [],
            enemigos: req.body.enemigos || [],
        };

        const nuevoSuperheroe = await crearSuperheroe(body);

        if (req.accepts('html')) {
            res.redirect('/api/heroes'); // Redirige al dashboard HTML
        } else if (req.accepts('json')) {
            res.status(201).json(nuevoSuperheroe); // Responde con el héroe creado y status 201 (Created)
        } else {
            res.status(406).send('Not Acceptable: Solo se soportan respuestas HTML o JSON.');
        }
    } catch (error) {
        console.error('Error en agregarHeroController:', error);
        if (error.name === 'ValidationError') {
            const errors = Object.keys(error.errors).map(key => error.errors[key].message);
            if (req.accepts('json')) {
                return res.status(400).json({ message: 'Errores de validación', errors });
            } else {
                return res.status(400).send('Error de validación: ' + errors.join(', '));
            }
        }
        res.status(500).send({ mensaje: 'Error al crear un superhéroe nuevo', error: error.message });
    }
}

export async function actualizarHeroController(req, res) {
    try {
        const { id } = req.params;

        if (!Types.ObjectId.isValid(id)) {
            if (req.accepts('json')) {
                return res.status(400).json({ message: 'ID de superhéroe no válido.' });
            }
            return res.status(400).send('ID de superhéroe no válido.');
        }

        const datosActualizados = {
            ...req.body,
            poderes: req.body.poderes || [],
            aliados: req.body.aliados || [],
            enemigos: req.body.enemigos || [],
        };

        const superheroeActualizado = await actualizarSuperheroe(id, datosActualizados);

        if (!superheroeActualizado) {
            if (req.accepts('json')) {
                return res.status(404).json({ message: 'Superhéroe no encontrado para actualizar.' });
            }
            return res.status(404).send('Superhéroe no encontrado para actualizar.');
        }

        if (req.accepts('html')) {
            res.redirect('/api/heroes'); // Redirige al dashboard HTML
        } else if (req.accepts('json')) {
            res.json(superheroeActualizado); // Responde con el héroe actualizado
        } else {
            res.status(406).send('Not Acceptable: Solo se soportan respuestas HTML o JSON.');
        }
    } catch (error) {
        console.error('Error en actualizarHeroController:', error);
        if (error.name === 'ValidationError') {
            const errors = Object.keys(error.errors).map(key => error.errors[key].message);
            if (req.accepts('json')) {
                return res.status(400).json({ message: 'Errores de validación', errors });
            } else {
                return res.status(400).send('Error de validación: ' + errors.join(', '));
            }
        }
        res.status(500).send({ mensaje: 'Error al modificar el superhéroe', error: error.message });
    }
}

export async function eliminarHeroController(req, res) {
    try {
        const { id } = req.params;

        if (!Types.ObjectId.isValid(id)) {
            if (req.accepts('json')) {
                return res.status(400).json({ message: 'ID de superhéroe no válido.' });
            }
            return res.status(400).send('ID de superhéroe no válido.');
        }

        const superheroeEliminado = await eliminarSuperheroe(id); // Asegúrate de usar el nombre correcto de la función

        if (!superheroeEliminado) {
            if (req.accepts('json')) {
                return res.status(404).json({ message: 'Superhéroe no encontrado para eliminar.' });
            }
            return res.status(404).send('Superhéroe no encontrado para eliminar.');
        }

        if (req.accepts('html')) {
            res.redirect('/api/heroes'); // Redirige al dashboard HTML
        } else if (req.accepts('json')) {
            res.status(200).json({ message: 'Superhéroe eliminado correctamente', deletedHero: superheroeEliminado }); // Responde con un mensaje y el héroe eliminado
        } else {
            res.status(406).send('Not Acceptable: Solo se soportan respuestas HTML o JSON.');
        }
    } catch (error) {
        console.error('Error en eliminarHeroController:', error);
        res.status(500).send({ mensaje: 'Error al eliminar el superhéroe.', error: error.message });
    }
}
