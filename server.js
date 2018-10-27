var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.use(express.static('public'))
app.use(bodyParser.urlencoded());

// This responds a POST request for the homepage
app.post('/create_user', function (req, res) {
   console.log(req.body);
})

var server = app.listen(8081, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})