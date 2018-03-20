// Requires
const jwt = require('jsonwebtoken');
const SEED = require('../config/config').publicKey;

exports.tokenVerify = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(403).json({
            ok: false,
            message: 'No tiene el token de authorization.'
        });
    }
    const token = authorization.split(' ')[1];

    jwt.verify(token, SEED, (errors, decoded) => {
        if (errors) {
            return res.status(401).json({
                ok: false,
                message: 'Token incorrecto.',
                errors
            });
        }
        req.usuario = decoded.usuario;
        next();
    });


};