const { Schema, model } = require('mongoose');

const InfoColaboradorSchema = Schema({

    emailColaborador: {
        type: String,
        required: true,
    },
    rol: {
        type: String,
        required: true,
    },
    lider: {
        type: String,
        required: true,
    },
    area: {
        type: String,
    },
    fechaIngreso: {
        type: Date,
        required: true,
    },
});

module.exports = model('InfoColaborador', InfoColaboradorSchema);