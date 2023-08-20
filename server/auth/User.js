const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    createdAt: Date,
    updatedAt: Date,
    status: Boolean,
    token: String
})

module.exports = mongoose.model('user', UserSchema)