var User = require('./models/User')
var Book = require('./models/Book')
var Issue = require('./models/Issue')
var jwt = require('jwt-simple')
var bcrypt = require('bcrypt-nodejs')
var express = require('express')
var router = express.Router()

router.post('/removeIssue', (req, res) => {
    var data = req.body
    Issue.findOne({ isbn: data.isbn, returned: false, email:data.email }, function (err, obj) {
        if (err)
            res.status(500).send({ message: "Error" })
        obj.returned = true
        obj.save((err, o) => {
            if (err)
                res.status(500).send({ message: "Error" })
            Book.findOne({ isbn: data.isbn }, function (err, obj) {
                obj.availability = obj.availability + 1;
                obj.save(function (err, uo) {
                    if (err)
                        res.status(500).send({ message: 'Error' });
                    res.status(200).send({ message: "Success" })
                })
            })
        }) 
        
    }
    )
});

router.post('/makeIssue', (req, res) => {
    var data = req.body
    var book;
    Issue.findOne({ email: data.email, isbn: data.isbn, returned: false }, function (err, obj) {
        if (err) {}
        if (!obj) {
            Book.findOne({ isbn: data.isbn }, function (err, obj) {
                if (err)
                    res.status(500).send({ message: "Error" })
                if (obj == null) {
                    res.status(500).send({ message: "Error" })
                } else {
                    obj.availability = obj.availability - 1;
                    obj.save(function (err, uo) {
                        if (err)
                            res.status(500).send({ message: 'Error' });
                    })
                    today = new Date();
                    due = new Date();
                    due.setDate(due.getDate() + 7)
                    var issue = new Issue({
                        email: data.email,
                        isbn: data.isbn,
                        author: obj.author,
                        title: obj.title,
                        issue: today,
                        due: due,
                        returned: false
                    });
                    issue.save((err, obj) => {
                        if (err)
                            res.status(500).send({ message: "Error" })
                        res.status(200).send({ message: "Success" })
                    })
                }
            }
            )
        } else {
            res.status(400).send({ message: "Error" })
        }
    })
});

router.post('/updateBook', (req, res) => {
    var data = req.body
    Book.findOne({ isbn: data.isbn }, function (err, obj) {
        if (err || obj == null)
            res.status(500).send({ message: "Error" })
        else {
            obj.author = data.author
            obj.title = data.title
            obj.location = data.location
            obj.category = data.category
            obj.availability = data.availability
            obj.save((err, obj) => {
                if (err)
                    res.status(500).send({ message: "Error" })
                res.status(200).send({ message: "Success" })
            })
        }
    }
    )
});

router.post('/removeBook', (req, res) => {
    var data = req.body
    Book.findOneAndRemove({ isbn: data.isbn }, function (err) {
        if (err)
            res.status(500).send({ message: "Error" })
        res.status(200).send({ message: "Success" })
    }
    )
});

router.post('/changeUser', (req, res) => {
    var data = req.body
    User.findOne({ email: data.email }, function (err, fo) {
        if (err)
            res.status(500).send({ message: 'Error' });
        else {
            if (!fo)
                res.status(404).send({ message: 'Error' });
            else {
                fo.email = data.email;
                fo.password = data.password;

                fo.save(function (err, uo) {
                    if (err)
                        res.status(500).send({ message: 'Error' });
                    else {
                        res.send(uo)
                    }
                })
            }
        }
    })
});

router.post('/registerb', (req, res) => {
    var bookData = req.body
    var book = new Book(bookData)
    Book.findOne({ isbn: bookData.isbn }, function (err, fo) {
        if (err) {}
        if (!fo) {
            book.save((err, newBook) => {
                if (err)
                    res.status(500).send({ message: "Error" })
                res.status(200).send({ message: 'Success' })
            })
        } else {
            res.status(400).send({ message: "Error" })
        }
    });
    
});

router.post('/register', (req, res) => {
    var userData = req.body
    var user = new User(userData)
    user.save((err, newUser) => {
        if (err)
            res.status(500).send({ message: "Error" })
        var payload = { sub: newUser._id }
        var token = jwt.encode(payload, "123")
        console.log(token)
        res.status(200).send({ token })
    })
});

router.post('/login', async (req, res) => {
    var loginData = req.body
    var user = await User.findOne({ email: loginData.email })
    if (!user) {
        res.status(401).send({ message: "Email or Password invalid" })
    }    
    else {
            bcrypt.compare(loginData.password, user.password, (error, isMatch) => {
            if (!isMatch)
                return res.status(401).send({ message: "Email or Password invalid" })
            var payload = { sub: user._id }
            var token = jwt.encode(payload, "123")
            console.log(token)
            res.status(200).send({ token })
        })
    }
});

var auth = {
    router,
    checkAuthenticated: (req, res, next) => {
        if (!req.header('authorization')) {
            return res.status(401).send({ message: 'Unauthorized. Missing Auth header' })
        }
        var token = req.header('authorization').split(' ')[1]
        var payload = jwt.decode(token, '123')

        if (!payload)
            return res.status(401).send({ message: 'Unauthorized. Auth header invalid' })
        req.userId = payload.sub
        next()
    }
}
module.exports = auth;