import express from 'express';
import { validacionHeroe } from '../middlewares/obtenersuperheroes.mjs';
import { handleValidationErrors } from '../middlewares/middleware.mjs';
import {
    getHeroByIdController,
    getAllHeroesController,
    searchHeroesByAttributeController,
    getHeroesOver30Controller,
    showAddHeroFormController,
    showEditHeroFormController,
    showDeleteConfirmationController,
    createHeroController,
    updateHeroController,
    deleteHeroController
} from '../controllers/superheroesController.mjs';

const router = express.Router();

// API Endpoints
router.get('/api/heroes', getAllHeroesController);
router.get('/api/heroes/over-30', getHeroesOver30Controller);
router.get('/api/heroes/:id', getHeroByIdController);
router.get('/api/heroes/search/:attribute/:value', searchHeroesByAttributeController);

// UI Forms
router.get('/heroes/add', showAddHeroFormController);
router.get('/heroes/edit/:id', showEditHeroFormController);
router.get('/heroes/delete/:id', showDeleteConfirmationController);

// CRUD Operations
router.post('/api/heroes',
    validacionHeroe(),
    handleValidationErrors,
    createHeroController
);

router.put('/api/heroes/:id',
    validacionHeroe(),
    handleValidationErrors,
    updateHeroController
);

router.delete('/api/heroes/:id', deleteHeroController);

export default router;
