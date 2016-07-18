const express = require('express');
const router = express.Router();
const dataTypeCtlr = require('../vima_mwr/dataTypeManager');
const fs = require('fs');


// on routes that end in /dataTypesCtlr
// ----------------------------------------------------
router.route('/dataTypesCtlr')

    // create anItem (accessed at POST http://localhost:1337/api/dataTypesCtlr)
    .post(function(req, res, next, formData) {
        console.log(req.body);
        console.log('DataTypesControlerRoute.post OT :' + formData.objecttype + ' session : ' + req.formData.session + ' payload : ' + req.formData.value)
        dataTypeCtlr.binToJson(req.body.objecttype, req.body.session, req.body.payload, res);
    })
    // get all items (accessed at GET http://localhost:1337/api/dataTypesCtlr)
    .get(function(req, res, next) {
        
    })
    // update Item value (accessed at PUT http://localhost:1337/api/dataTypesCtlr)
    .put(function(req, res, next) {
        
    });
    
module.exports = router;