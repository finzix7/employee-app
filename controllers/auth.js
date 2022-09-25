const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJwt } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {

    const { email, password } = new Usuario(req.body);

    try {
        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: ('Correo ya esta registrado'),
            });
        }

        usuario = new Usuario(req.body);

        //Ecnriptacion de clave
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte al admin',
            err: error,
        });
    }
}

const loginUsuario = async (req, res) => {

    const { email, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario o password no son correctos',
            });
        }

        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecta',
            });
        }

        //Generar JWT
        const token = await generarJwt(usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte al admin',
            err: error,
        });
    }


}

const revalidarToken = async (req, res = response) => {

    const { uid, name } = req;

    //Generar JWT
    const token = await generarJwt(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token,
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
};