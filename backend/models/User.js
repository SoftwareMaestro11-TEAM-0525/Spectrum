const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    user_id: {
        type: String,
        trim: true,
        unique: true,
        required:true
    },
    user_pw: {
        type: String
    },
    user_email: {
        type: String,
        index:true,
        match:/.+|@.+@..+/
    }
})

module.exports = mongoose.model('User',User)