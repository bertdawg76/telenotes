var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var config = require('./server/config/passport.js');
var db = require('./server/config/database.js');
var app = express();
var router = express.Router(app);
var ContactsCtrl = require('./server/Contacts/ContactsCtrl.js')(app, express, router);
var UsersCtrl = require('./server/Users/UsersCtrl.js')(app, express, router);
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