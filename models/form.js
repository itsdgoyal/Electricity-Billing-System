const mongoose = require('mongoose')
const formschema = mongoose.Schema({
    id: Number,
    cid: Number,
    name: String,
    address: String,
    unit: Number,
    amount:Number
})
module.exports = mongoose.model('form',formschema)