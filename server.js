var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var bodyParser = require('bodyParser');
var passport = require('passport');
var db = require('../config/database.js');
var config = require('../config/passport.js');
var app = express();
var router = express.Router(app);
var ContactsCtrl = require('./Contacts/ContactsCtrl.js')(app, express, router),
var UsersCtrl = require('./Users/UsersCtrl.js')(app, express, router),
var port = process.env.PORT || 9000;


var port = process.env.PORT || 9200;


db.connect();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());

app.use('/api/contacts', ContactsCtrl);
app.use('/api/users', UsersCtrl);

app.listen(port, function() {
	console.log('connected to: ', port)
});