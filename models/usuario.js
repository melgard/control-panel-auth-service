const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: 'El valor {VALUE} para el campo {PATH} no es válido.'
};

const usuarioSchema = new Schema({
    name: {type: String, required: [true, 'El nombre es requerido.']},
    email: {type: String, unique: true, required: [true, 'El correo es requerido.']},
    password: {type: String, required: [true, 'El contraseña es requerido.']},
    img: {type: String, required: false},
    role: {type: String, required: true, default: 'USER_ROLE', enum: rolesValidos},
});

usuarioSchema.plugin(uniqueValidator, {message: 'El campo {PATH} ingresado ya fue registrado.'});

module.exports = mongoose.model('Usuario', usuarioSchema);