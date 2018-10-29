const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//mongodb stuff
mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;

//models
var User;

db.on('error', console.error.bind(console, "connection error: "));
db.once('open', () => {
    console.log("Connected to DB!");

    var userSchema = new mongoose.Schema({
        name: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        email: {
            type: String,
            unique: true,
            required: true,
            trim: true
        }
    });

    User = mongoose.model('User', userSchema);

});

app.use(express.static('public'))
app.use(bodyParser.urlencoded());

// This responds a POST request for the homepage
app.post('/register', (req, res) => {
    //console.log(req.body);

    User.find({ email: req.body['email'] }, (err, users) => {
        if (err) console.error(err);
        else {
            console.log(users);
            if (users.length == 0) {
                var user = new User({
                    name: req.body['user'],
                    password: req.body['pass'],
                    email: req.body['email']
                })

                user.save((err, user) => {
                    if (err) {
                        console.error(err);
                        res.status(400).send("Bad Request");
                    }
                });
            }
            else {
                console.log(`${req.body['email']} already registered!`);
            }
        }
    });
    res.redirect("/");
});

app.post('/login', (req, res) => {
    User.where({ email: req.body['email']}).findOne((err, user) => {
        if (err) console.error(err);
        else {
            if(req.body['pass'] == user.password){
                res.send("Logged in.");
            } else {
                res.redirect("/");
            }
        }
    });
});

var server = app.listen(8081, () => {
    const host = server.address().address
    const port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
});
