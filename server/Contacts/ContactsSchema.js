var mongoose = require('mongoose');

var ContactsSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: Number, require: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    createdOn: { type: Date, default: Date.now }
});

// the third argument is the collection name
module.exports = mongoose.model('Contact', ContactsSchema, 'contacts');