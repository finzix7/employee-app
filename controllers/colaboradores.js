const { response } = require('express');
const Colaborador = require('../models/Colaborador');

const getColaboradores = async (req, res = response) => {

    try {
        const colaborador = await Colaborador.find().populate();

        res.json({
            ok: true,
            colaborador,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con admin',
        });
    }
}

const getColaborador = async (req, res = response) => {

    let colaboradorId = req.params.id;

    try {
        const colaborador = await Colaborador.findById(colaboradorId).populate();

        res.json({
            ok: true,
            colaborador,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con admin',
        });
    }
}

const crearColaborador = async (req, res = response) => {

    const colaborador = new Colaborador(req.body);

    try {

        /*const { rut } = colaborador.infoPersonal;
        console.log(rut);
        let existeColaborador = await Colaborador.findOne({ rut });
        console.log(existeColaborador);

        if (existeColaborador) {
            return res.status(404).json({
                ok: false,
                msg: 'Ya existe este colaborador',
            });
        }*/

        const colaboradorGuardado = await colaborador.save();

        res.json({
            ok: true,
            colaborador: colaboradorGuardado,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con admin',
            error
        });
    }

}

const actualizarColaborador = async (req, res = response) => {

    const colaboradorId = req.params.id;
    //const uid = req.uid;

    try {

        const colaborador = await Colaborador.findById(colaboradorId);

        if (!colaborador) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe este colaborador',
            });
        }

        /*if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para editar este evento',
            });
        }*/

        const nuevoColaborador = {
            ...req.body,
        }

        const colaboradorActualizado = await Colaborador.findByIdAndUpdate(colaboradorId, nuevoColaborador, { new: true });

        res.json({
            ok: true,
            colaborador: colaboradorActualizado,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con admin',
        });
    }

}

const eliminarColaborador = async (req, res = response) => {

    const colaboradorId = req.params.id;
    //const uid = req.uid;

    try {

        const colaborador = await Colaborador.findById(colaboradorId);

        if (!colaborador) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe colaborador por ID',
            });
        }

        /* if (evento.user.toString() !== uid) {
             return res.status(401).json({
                 ok: false,
                 msg: 'No tiene privilegios para editar este evento',
             });
         }*/

        await Colaborador.findByIdAndDelete(colaboradorId);

        res.json({
            ok: true,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con admin',
        });
    }
}

module.exports = {
    crearColaborador,
    getColaboradores,
    getColaborador,
    actualizarColaborador,
    eliminarColaborador,
}