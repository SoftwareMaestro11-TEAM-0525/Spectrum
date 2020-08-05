const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    user_id: String,
    user_pw: String,
    user_email: String
})

module.exports = mongoose.model('User',User)