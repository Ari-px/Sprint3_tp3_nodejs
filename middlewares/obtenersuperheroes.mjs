import { body } from 'express-validator';

// Función para sanitizar y dividir cadenas en arrays
const sanitizarYDividir = (value) => {
    if (typeof value === 'string') {
        return value.split(',').map(p => p.trim()).filter(p => p !== '');
    }
    return value;
};

export const obtenersuperheroes = () => [
    body('nombreSuperHeroe')
        .trim()
        .escape()
        .notEmpty()
        .withMessage('Nombre del superhéroe requerido')
        .isLength({ min: 3, max: 60 })
        .withMessage('El nombre del superhéroe debe tener entre 3 y 60 caracteres'),

    body('nombreReal')
        .trim()
        .escape()
        .notEmpty()
        .withMessage('Nombre real del superhéroe requerido')
        .isLength({ min: 3, max: 60 })
        .withMessage('El nombre real del superhéroe debe tener entre 3 y 60 caracteres'),

    body('edad')
        .notEmpty()
        .withMessage('Edad debe ser requerida')
        .isInt({ min: 0 })
        .withMessage('La edad debe ser un número entero no negativo'),

    body('poderes')
        .notEmpty()
        .withMessage('Los poderes son requeridos.')
        .customSanitizer(sanitizarYDividir)
        .isArray({ min: 1 })
        .withMessage('Poderes debe ser un array con al menos un elemento'),

    body('poderes.*')
        .trim()
        .escape()
        .isLength({ min: 3, max: 60 })
        .withMessage('Cada poder debe ser una cadena de texto con entre 3 y 60 caracteres'),
];
