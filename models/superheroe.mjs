import mongoose from 'mongoose';

// Definición del esquema para el modelo de superhéroe
const superheroSchema = new mongoose.Schema({
    nombreSuperHeroe: {
        type: String,
        required: [true, "El nombre del superhéroe es obligatorio"],
        trim: true,
        minlength: [3, "El nombre del superhéroe debe tener al menos 3 caracteres"],
        maxlength: [60, "El nombre del superhéroe no puede superar los 60 caracteres"],
    },
    nombreReal: {
        type: String,
        required: [true, "El nombre real es obligatorio"],
        trim: true,
        minlength: [3, "El nombre real debe tener al menos 3 caracteres"],
        maxlength: [60, "El nombre real no puede superar los 60 caracteres"],
    },
    edad: {
        type: Number,
        min: [0, "La edad no puede ser negativa"],
        required: [true, "La edad es obligatoria"],
    },
    planetaOrigen: {
        type: String,
        default: 'Desconocido',
        trim: true,
    },
    debilidad: {
        type: String,
        trim: true,
    },
    poderes: {
        type: [String],
        required: [true, "Los poderes son obligatorios"],
        validate: {
            validator: (arr) => Array.isArray(arr) && arr.length > 0,
            message: "Los poderes deben ser un array no vacío.",
        },
    },
    aliados: {
        type: [String],
        default: ["Sin registro"],
    },
    enemigos: {
        type: [String],
        default: ["Sin registro"],
    },
    creador: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { collection: 'Grupo-09' });

// Creación del modelo de superhéroe
const SuperHero = mongoose.model('SuperHero', superheroSchema);

export default SuperHero;
