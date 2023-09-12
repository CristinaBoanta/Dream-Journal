const mongoose = require('mongoose')

const Schema = mongoose.Schema

const dreamSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Dream', dreamSchema)