var Contact = require('./ContactsSchema.js');

module.exports = function (app, express) {
    var router = express.Router();

   

    router.route('/')
        .post(function (req, res) {
          

        
            var newContact = new Contact(req.body);

            newContact.save(function (err, contact) {

                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(200).json(contact);
                }
                
            });
        })
           
        
        .get(function (req, res) {

           
            

            Contact.find(req.query).exec(function (err, contact) {
                if (err) {
                    return res.status(500).json({ success: false, message: 'Could not get the contact.' });
                }

                res.status(200).json(contact);
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
            
            Contact.findByIdAndUpdate(req.params.id, req.body, function (err, contact) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(200).json(contact);
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