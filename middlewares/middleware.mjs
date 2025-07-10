import { validationResult } from "express-validator";

// Middleware para manejar errores de validación
export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            message: 'Validación fallida',
            errors: errors.array().map(error => ({
                field: error.param,
                message: error.msg,
            })),
        });
    }
    
    next();
};
