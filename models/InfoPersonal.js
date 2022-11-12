const { Schema, model } = require('mongoose');

const InfoPersonalSchema = Schema({

    nombre: {
        type: String,
        required: true,
    },
    rut: {
        type: String,
        unique: true,
        required: true,
    },
    nacionalidad: {
        type: String,
        required: true,
    },
    direccion: {
        type: String,
        required: true,
    },
    genero: {
        type: String,
        required: true,
    },
    fechaNacimiento: {
        type: Date,
        required: true,
    },
    contactoEmergencia: {
        type: String,
        required: true,
    },
    emailPersonal: {
        type: String,
        required: true,
    },
});

module.exports = model('InfoPersonal', InfoPersonalSchema);