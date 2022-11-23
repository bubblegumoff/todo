const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    text: {type: String, required: true},
    owner: {type: Types.ObjectId, required: true}
},{
    timestamps: true
})

module.exports = model('Todo', schema)