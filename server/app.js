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

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, '../client', 'index.html'));
	console.log('Welcome to contactbook');
})

app.get('/api/contacts', function(req, res){
	Contact.find({})
		.exec(function(err, results){
			if(err){
				res.send("error retrieving contacts");
			}else{
				res.json(results);
			}
		})
})

app.post('/api/contacts', function(req, res){
	var newContact = Contact();

	newContact.name = req.body.name;
	newContact.phone = req.body.phone;
	newContact.email = req.body.email;
	newContact.message = req.body.message;

	newContact.save(function(err, result){
		if(err){
			console.log('Error saving contact.');
		}else{
			res.send(result);
		}
	})
})

app.listen(PORT, function(){
	console.log('App is listening on port: ' + PORT);
})
