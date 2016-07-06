const express = require('express');
const router = express.Router();
const binCache = require('../vima_mwr/dataCache');
const fs = require('fs');


// on routes that end in /binCache
// ----------------------------------------------------
router.route('/dataCache')

    // create anItem (accessed at POST http://localhost:1337/api/binCache)
    .post(function(req, res, next) {
        //binCache.addItem(req.body.itemid, req.body.value, res);
    })
    // get all items (accessed at GET http://localhost:1337/api/binCache)
    .get(function(req, res, next) {
        //binCache.getAllKeys(res);
    })
    // update Item value (accessed at PUT http://localhost:1337/api/binCache)
    .put(function(req, res, next) {
        //binCache.updateItem(req.body.itemid, req.body.value, res);
    });



router.route('/dataCache/:cache_id')

    // get the item with that id (accessed at GET http://localhost:1337/api/binCache/:cache_id)
    .get(function(req, res, next) {
        binCache.getItemByKey(req.params.cache_id, res);
    })
    // delete the item with that id (accessed at DELETE http://localhost:1337/api/binCache/:cache_id)
    .delete(function(req, res, next) {
        binCache.deleteItemByKey(req.params.cache_id, res);
    });

module.exports = router;


