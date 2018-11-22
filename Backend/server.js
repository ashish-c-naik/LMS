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
    var books = await Book.find({category: category, availability: {$gt: 0}})
    res.send(books)
})

app.get('/issue/:param',  async (req,res) => {
    var email = req.params.param
    var issues = await Issue.find({email}, '-__v -_id');
    res.send(issues)
})

app.get('/issues',  async (req,res) => {
    var issues = await Issue.find({}, '-__v -_id');
    res.send(issues)
})

mongoose.connect('mongodb://lms_user:Chandrakant1@ds035907.mlab.com:35907/lms_spyashu', (err) => {
    if(!err)
    console.log('connected to mongo')
    else console.log('Error', err);
})

app.use('/auth', auth.router)
app.listen(process.env.PORT || 3000)
