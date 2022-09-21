const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');

const { getEvento, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const isDate = require('../helpers/isDate');

const router = Router();

//Valiidacion genererica
router.use(validarJwt);

//Obtener eventos
router.get('/', getEvento);

//Crear nuevo evento
router.post('/',
    [
        check('title', 'El titulo es oblogatorio').not().isEmpty(),
        check('start', 'Fecha inicio obligatorio').custom(isDate),
        check('end', 'Fecha de termino obligatorio').custom(isDate),
        validarCampos,
    ],
    crearEvento);

//Actualiza evento
router.put('/:id', actualizarEvento);

//Borrar evento
router.delete('/:id', eliminarEvento);

module.exports = router