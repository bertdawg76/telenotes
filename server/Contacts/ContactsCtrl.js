var Contact = require('./ContactsSchema.js');

module.exports = function (app, express) {
    var router = express.Router();

   

    router.route('/')
        .post(function (req, res) {
            console.log('LOG: Posting a Contact');

            // two ways of doing this the first:
            var newContact = new Contact(req.body);

            newContact.save(function (err, contact) {
                if (!!err) {
                    if (err.code === 11000) {
                        console.log('ERROR: Contact already exists.');
                        return res.status(400).json({ success: false, message: 'Contact already exists.' });
                    }

                    Object.keys(err.errors).forEach(function (key) {
                        var message = err.errors[key].message;
                        console.log('ERROR: Validation error for "%s": %s', key, message);
                    });
                        console.log(err);
                    return res.status(400).json({ success: false, message: 'Could not save the contact.' });
                } else {
                    res.status(201).json({
                        success: true,
                        data: question
                    });
                }
            });
           
        })
        .get(function (req, res) {

           
            

            Contact.find().exec(function (err, contact) {
                if (err) {
                    return res.status(500).json({ success: false, message: 'Could not get the contact.' });
                }

                res.status(200).json(contacts);
            });

        });

    router.route('/:id')
        .get(function (req, res) {
            Contact.findById(req.params.id).exec(function (err, contact) {
                if (err) {
                    return res.status(500).json({ success: false, message: 'Could not get the contact.' });
                }

                if (!!contact) {
                    res.status(200).json({ success: true, data: contact });
                } else {
                    return res.status(404).json({ success: false, message: 'The contact was not found.' });
                }
            });
        })
        .put(function (req, res) {
            // using update(), findOneAndUpdate() or findByIdAndUpdate methods
            // do not apply default values, validation, middleware or setter specified in the schema
            // use a combination of find, edit and save instead to apply those
            Contact.findById(req.params.id, function (err, contact) {
                if (err) {
                    console.log('ERROR: Did not find contact.');
                    return res.status(404).json({ success: false, message: 'contact not found.' });
                }

                var modifiedContact = req.body.contact;

                if (modifiedContact) {
                    console.log('updating: ' + contact.title);
                    contact.title = modifiedContact.title;
                    contact.description = modifiedContact.description;

                    contact.save(function (err, contact) {
                        if (err) return res.status(500).json({ success: false, message: 'Could not update the contact.' });

                        res.status(200).json({ success: true, data: contact });
                    });
                }
            });
        })
        .delete(function (req, res) {
            Contact.findByIdAndRemove(req.params.id, function (err, contact) {
                if (err) return res.status(500).json({ success: false, message: 'Could not delete the contact.' });

                console.log('LOG: Deleted ' + contact.name);
                res.status(200).json(contact);
            });
        });

    return router;
};