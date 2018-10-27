const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//mongodb stuff
mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;

db.on('error', console.error.bind(console, "connection error: "));
db.once('open', () => {
    console.log("Connected to DB!");
    
    var userSchema = new mongoose.Schema({
        name: String,
        password: String
    });
    
    var User = mongoose.model('User', userSchema);
});

app.use(express.static('public'))
app.use(bodyParser.urlencoded());

// This responds a POST request for the homepage
app.post('/register', (req, res) => {
   console.log(req.body);
   res.redirect("/");
});

var server = app.listen(8081, () => {
   const host = server.address().address
   const port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
});
