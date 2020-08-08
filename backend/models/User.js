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

User.statics.findOneByUser_id = function(user_id){
    return this.findOne({
        user_id
    }).exec();
}

User.methods.verify = function(user_pw){
    return this.user_pw === user_pw
}

module.exports = mongoose.model('User',User)