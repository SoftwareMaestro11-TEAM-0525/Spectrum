const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Cytoscape_info = new Schema({
    user_id: {
        type: String,
        trim: true,
        unique: true,
        index:true,
        required:true
    },
    cyjson: {
        type: Object
    },
})

module.exports = mongoose.model('Cytoscape_info',Cytoscape_info)