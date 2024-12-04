const { Schema, model } = require('mongoose');

const schema = new Schema({
    password: { type: String, required: true },
    email: { type: String, required: true },
});

const UserModel = model('User', schema);

module.exports = UserModel;