var mongoose = require('mongoose')
var bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    isbn: Number,
    category: String,
    location: String,
    availability: Number,
})

// userSchema.pre('save', function(next) {
//     var user = this

//     if(!user.isModified('password'))
//         return next()

//     bcrypt.hash(user.password, null, null, (error,hash) => {
//         if(error) return next(error)

//         user.password = hash
//         next()
//     });
// })

module.exports = mongoose.model('Book', bookSchema)
