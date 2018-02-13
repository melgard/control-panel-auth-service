// Requires
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SEED = require('../config/config').SEED;

// Init vars
const app = express();

// Models
const Usuario = require('../models/usuario');
app.post('/', (req, res, next) => {
    const body = req.body;
    if (!body.email || !body.password) {
        return res.status(400).json({
            ok: true,
            message: 'Faltan datos para poder procesar la petición, asegurese que nos está enviando el email y la contraseña.',
            errors: {
                errors: {
                    message: 'Faltan datos para poder procesar la petición, asegurese que nos está enviando el email y la contraseña.'
                }
            }
        });
    }

    Usuario.findOne({email: body.email}, (errors, data) => {
        if (errors) {
            return res.status(500).json({
                ok: true,
                message: 'Error al buscar usuario.',
                errors
            });
        }
        if (!data) {
            return res.status(404).json({
                ok: true,
                message: `No existe el recurso con el email: ${body.email}.`,
                errors: {
                    errors: {
                        message: `No existe el recurso con el email: ${body.email}.`,
                    }
                }
            });
        }

        if (!bcrypt.compareSync(body.password, data.password)) {
            return res.status(400).json({
                ok: true,
                message: `Credenciales incorrectas.`,
                errors: {
                    errors: {
                        message: `Credenciales incorrectas.`,
                    }
                }
            });
        }

        const token = jwt.sign({usuario: data}, SEED, {expiresIn: 14400}); // 4horas

        res.status(200).json({
            ok: true,
            message: 'Service alive.',
            userId: data._id,
            usuario: {
                _id: data._id,
                name: data.name,
                email: data.email,
                role: data.role
            },
            token
        });

    });

});


module.exports = app;
