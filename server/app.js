var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

var Contact = require('./models/contact.model');
var db = 'mongodb://localhost/contactbook';

var PORT = 8080;

mongoose.connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended:true	
}))

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, '../client', 'index.html'));
	console.log('Welcome to contactbook');
})

app.listen(PORT, function(){
	console.log('App is listening on port: ' + PORT);
})
