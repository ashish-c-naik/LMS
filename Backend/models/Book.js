var mongoose = require('mongoose')
var bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    isbn: Number,
    category: String,
    location: String,
    availability: Number,
})

module.exports = mongoose.model('Book', bookSchema)
