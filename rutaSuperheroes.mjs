import express from 'express';
import SuperHero from './modeloheroes.mjs';
import { obtenersuperheroes } from './obtenersuperheroes.mjs';
import { handleValidationErrors } from './middleware.mjs';

const router = express.Router();

// Lista de superhéroes (GET)
router.get('/heroes', async (req, res) => {
    try {
        const todosSuperheroes = await SuperHero.find({});
        res.status(200).json({
            success: true,
            data: todosSuperheroes
        });
    } catch (error) {
        console.error('Error GET /heroes:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno al obtener los superhéroes',
            error: error.message
        });
    }
});

// Crear superhéroe (POST)
router.post('/heroes', 
    obtenersuperheroes(),
    handleValidationErrors,
    async (req, res) => {
        try {
            const nuevoHeroe = new SuperHero(req.body);
            await nuevoHeroe.save();
            
            console.log('Superhéroe creado:', nuevoHeroe);
            
            res.status(201).json({
                success: true,
                message: 'Superhéroe creado exitosamente',
                data: nuevoHeroe
            });
        } catch (error) {
            console.error('Error POST /heroes:', error);
            res.status(400).json({
                success: false,
                message: 'Error al crear el superhéroe',
                error: error.message
            });
        }
    }
);

// Actualizar superhéroe (PUT)
router.put('/heroes/:id', 
    obtenersuperheroes(),
    handleValidationErrors,
    async (req, res) => {
        try {
            const heroActualizado = await SuperHero.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );

            if (!heroActualizado) {
                return res.status(404).json({
                    success: false,
                    message: 'Superhéroe no encontrado'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Superhéroe actualizado',
                data: heroActualizado
            });
        } catch (error) {
            console.error('Error PUT /heroes/:id:', error);
            res.status(500).json({
                success: false,
                message: 'Error al actualizar el superhéroe',
                error: error.message
            });
        }
    }
);

// Eliminar superhéroe por ID (DELETE)
router.delete('/heroes/:id', async (req, res) => {
    try {
        const heroEliminado = await SuperHero.findByIdAndDelete(req.params.id);
        
        if (!heroEliminado) {
            return res.status(404).json({
                success: false,
                message: 'Superhéroe no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Superhéroe eliminado exitosamente',
            data: heroEliminado
        });
    } catch (error) {
        console.error('Error DELETE /heroes/:id:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el superhéroe',
            error: error.message
        });
    }
});

// Eliminar superhéroe por nombre (DELETE)
router.delete('/heroes/nombre/:nombreSuperHeroe', async (req, res) => {
    try {
        const heroEliminado = await SuperHero.findOneAndDelete({
            nombreSuperHeroe: req.params.nombreSuperHeroe
        });

        if (!heroEliminado) {
            return res.status(404).json({
                success: false,
                message: 'Superhéroe no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Superhéroe eliminado exitosamente',
            data: heroEliminado
        });
    } catch (error) {
        console.error('Error DELETE /heroes/nombre/:nombreSuperHeroe:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el superhéroe',
            error: error.message
        });
    }
});

export default router;

