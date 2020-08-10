const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Cytoscape_info = new Schema({
    user_id: {
        type: String,
        trim: true,
        unique: true,
        index:true,
    },
    cyjson: {
        type: Object
    },
})

Cytoscape_info.statics.findOneByUser_id = function(user_id){
    return this.findOne({user_id});
}

Cytoscape_info.statics.updateByUser_id = function(user_id,cyjson){
    return this.findOneAndUpdate({user_id},{cyjson}, {returnNewDocument:true});
}

Cytoscape_info.statics.create = function(user_id,cyjson){
    const cytoscape_info = new this({'user_id':user_id,'cyjson':cyjson});
    return cytoscape_info.save();
}
module.exports = mongoose.model('Cytoscape_info',Cytoscape_info)