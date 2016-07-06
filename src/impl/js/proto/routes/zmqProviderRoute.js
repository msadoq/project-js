const express = require('express');
const router = express.Router();
const zmqProvider = require('../tests_modules/zmqProvider');
const fs = require('fs');


// on routes that end in /zmqProvider
// ----------------------------------------------------
router.route('/zmqProvider')

    // create anItem (accessed at POST http://localhost:1337/api/zmqProvider)
    .post(function(req, res, next) {
        zmqProvider.zmqPush();
        res.json({ message: 'ok' });
    })
    // get all items (accessed at GET http://localhost:1337/api/zmqProvider)
    .get(function(req, res, next) {
        
    })
    // update Item value (accessed at PUT http://localhost:1337/api/zmqProvider)
    .put(function(req, res, next) {
        
    });

module.exports = router;