// Requires
const express = require('express');
const bcrypt = require('bcryptjs');
const mdAuth = require('../middlewares/auth');

// Init vars
const app = express();

// Models
const Usuario = require('../models/usuario');

// =============================================
// Obtener usuarios
// =============================================
app.get('/', mdAuth.tokenVerify, (req, res, next) => {
    Usuario.find({}, 'name email img role')
        .exec((errors, usuarios) => {
            if (errors) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error desde la base de datos.',
                    errors
                });
            }
            res.status(200).json({
                ok: true,
                usuarios
            });
        });
});


// =============================================
// Obtener un Usuario
// =============================================


// =============================================
// Crear un usuario
// =============================================
app.post('/', mdAuth.tokenVerify, (req, res) => {
    const body = req.body;
    const usuario = new Usuario({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });
    usuario.save((errors, data) => {
        if (errors) {
            return res.status(400).json({
                ok: true,
                message: 'Error al guardar el usuario.',
                errors
            });
        }
        res.status(201).json({
            ok: true,
            usuario: data
        });
    });

});

// =============================================
// Editar un usuario
// =============================================
app.put('/:id', mdAuth.tokenVerify, (req, res) => {
    const userId = req.params.id;
    const body = req.body;
    Usuario.findById(userId, 'name email role').exec((errors, data) => {
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
                message: `No existe el recurso con el id: ${userId}.`,
                errors: {
                    errors: {
                        message: `No existe el recurso con el id: ${userId}.`
                    }
                }
            });
        }
        data.name = body.name;
        data.email = body.email;
        data.role = body.role;
        data.save((errors, data) => {
            if (errors) {
                return res.status(400).json({
                    ok: true,
                    message: 'Error al actualizar el usuario.',
                    errors
                });
            }

            res.status(200).json({
                ok: true,
                usuario: data
            });
        });
    });

});

// =============================================
// Eliminar un usuario
// =============================================
app.delete('/:id', mdAuth.tokenVerify, (req, res) => {
    const userId = req.params.id;
    Usuario.findByIdAndRemove(userId, (errors, data) => {
        if (errors) {
            return res.status(500).json({
                ok: true,
                message: 'Error al borrar el usuario.',
                errors
            });
        }
        if (!data) {
            return res.status(404).json({
                ok: true,
                message: `No existe el recurso con el id: ${userId}.`,
                errors: {
                    errors: {
                        message: `No existe el recurso con el id: ${userId}.`
                    }
                }
            });
        }
        res.status(200).json({
            ok: true,
            usuario: data
        });
    });
});

module.exports = app;
