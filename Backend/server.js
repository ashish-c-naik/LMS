var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
mongoose.Promise = Promise
var User = require('./models/User.js')
var Book = require('./models/Book.js')
var Issue = require('./models/Issue.js')
var bcrypt = require('bcrypt-nodejs')
var auth = require('./auth')
var jwt = require('jwt-simple')

app.use(cors())
app.use(bodyParser.json())



app.get('/browse/:param', async (req,res) => {
    var category = req.params.param
    var books = await Book.find({category})
    res.send(books)
})

app.get('/issue/:param',  async (req,res) => {
    var email = req.params.param
    var issues = await Issue.find({email}, '-__v -_id');
    console.log(issues);
    res.send(issues)
})

// app.post('/post', auth.checkAuthenticated, (req,res) => {
//     var postData = req.body
//     postData.author = req.userId

//     var post = new Post(postData)
//     post.save((err, result) => {
//         if (err){
//             console.error('saving post error')
//             return res.status(500).send({message: 'saving post error'})
//         }
//         res.sendStatus(200)
//     })
// })
// app.get('/users',  async (req,res) => {
//     try{
//         var users = await User.find({}, '-__v -password');
//         res.send(users)
//     }catch(error){
//         console.log(error)
//         res.sendStatus(500)
//     }
// })

// app.get('/profile/:id', async (req,res) => {
//     var id = req.params.id;
//     try{
//         var users = await User.findById(req.params.id, '-__v -password');
//         res.send(users)
//     }catch(error){
//         console.log(error)
//         res.sendStatus(500)
//     }
// })



mongoose.connect('mongodb://lms_user:Chandrakant1@ds035907.mlab.com:35907/lms_spyashu', (err) => {
    if(!err)
    console.log('connected to mongo')
    else console.log('Error', err);
})

app.use('/auth', auth.router)
app.listen(process.env.PORT || 3000)
