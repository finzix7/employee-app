const { Schema, model } = require('mongoose');

const ColaboradorSchema = Schema({

    avatar: {
        type: String,
    },
    infoPersonal: {
        type: Object,
        ref: 'InfoPersonal',
        required: true,
    },
    infoColaborador: {
        type: Object,
        ref: 'InfoColaborador',
        required: true,
    },
    files: {
        type: [String],
    },
});

ColaboradorSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Colaborador', ColaboradorSchema);