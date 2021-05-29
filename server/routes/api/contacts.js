const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const Contact = require('../../models/Contact');

// To post a new contact

router.post('/', async (req, res) => {
    var data = JSON.stringify((req.body));
    try {
        if (JSON.parse(data)) {
            var obj = JSON.parse(data);
            const newContact = new Contact({
                firstName: obj["firstName"],
                lastName: obj["lastName"],
                telNum: obj["telNum"],
                email: obj["email"],
                agree: obj["agree"],
                message: obj["message"]
            });
            const newContactSaved = await newContact.save();
            console.log(newContactSaved);
            res.json(newContactSaved);
        }

    } catch (err) {
        res.status(500).send('Server Error');
    }
});


module.exports = router;