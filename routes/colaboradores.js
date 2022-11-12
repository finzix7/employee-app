const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');

const { getColaboradores, getColaborador, crearColaborador, actualizarColaborador, eliminarColaborador } = require('../controllers/colaboradores');
const isDate = require('../helpers/isDate');

const router = Router();

const checks = [
    check('infoPersonal.nombre', 'El Nombre es obligatorio').not().isEmpty(),
    check('infoPersonal.rut', 'El RUT es obligatorio').not().isEmpty(),
    check('infoPersonal.nacionalidad', 'La nacionalidad es obligatoria').not().isEmpty(),
    check('infoPersonal.direccion', 'La dirección es obligatoria').not().isEmpty(),
    check('infoPersonal.genero', 'El genero es obligatoria').not().isEmpty(),
    check('infoPersonal.fechaNacimiento', 'La fecha de nacimiento es obligatoria').custom(isDate),
    check('infoPersonal.emailPersonal', 'El correo es obligatorio').not().isEmpty(),
    check('infoColaborador.rol', 'El rol es obligatorio').not().isEmpty(),
    check('infoColaborador.fechaIngreso', 'La fecha de ingreso es obligatoria').custom(isDate),
    check('infoColaborador.emailColaborador', 'El correo corportativo es obligatorio').not().isEmpty(),
];

//Valiidacion genererica
router.use(validarJwt);

//Obtener colaboradores
router.get('/', getColaboradores);

//Crear nuevo colaborador
router.post('/',
    [
        checks,
        validarCampos,
    ],
    crearColaborador);

//Obtener colaborador por id
router.get('/:id', getColaborador);

//Actualiza colaborador
router.put('/:id', actualizarColaborador);

//Borrar colaborador
router.delete('/:id', eliminarColaborador);

module.exports = router