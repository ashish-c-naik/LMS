var mongoose = require('mongoose')
var issueSchema = new mongoose.Schema({
    email: String,
    isbn: Number,
    author: String,
    title: String,
    issue: Date,
    due: Date
})
module.exports = mongoose.model('Issue', issueSchema)