var mongoose = require('mongoose'),
    dbAddress = 'mongodb://bert:adminpassword@ds051943.mongolab.com:51943/rtc-practice',
    telenotesdb = 'telenotes',
    localDb = 'mongodb://localhost/telenotes';

mongoose.connection.on('connected', function () {
    console.log('EVENT: Connected to: ' + localDb);
});

mongoose.connection.on('error', function () {
    console.log('EVENT: ERROR: Cannot connect to database.');
});

mongoose.connection.on('disconnected', function () {
    console.log('EVENT: Disconnected from: ' + localDb);
});

mongoose.connection.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('EVENT: Database connection terminated because application was closed.');
        process.exit(0);
    });
});

module.exports = {
    connect: function (url, dbName) {
        var dbUri = url || dbAddress;
        var name = dbName || telenotesdb;
        dbUri += name;

        mongoose.connect(dbAddress);

        // alternate syntax when connecting to multiple dbs and passing optional options (json object)
        // var studentsDb = odm.createConnection(dbUri, credentials.s3db);
        mongoose.connection.once('open', function () {
            console.log('All your data are belong to us!. Connected to: ' + dbUri);
        });
    },
    close: function (db) {
        // use this if using default connection (mongoose.connect())
        // alternative a callback function can be passed like so odm.connection.close(callback)
        mongoose.connection.close();

        // when using named connections use this. An optional callback is also permitted
        // db.close(function() {}). db is the parameter passed in (database connection name)
    }
};