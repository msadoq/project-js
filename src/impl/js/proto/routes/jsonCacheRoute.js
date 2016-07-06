const express = require('express');
const router = express.Router();
const jsonCache = require('../vima_mwr/jsonCache');
const fs = require('fs');


// on routes that end in /jsonCache
// ----------------------------------------------------
router.route('/jsonCache')

    // create anItem (accessed at POST http://localhost:1337/api/jsonCache)
    .post(function(req, res, next) {
        jsonCache.addItem('1', req.body.jsonElem, res);
    })
    // get all items (accessed at GET http://localhost:1337/api/jsonCache)
    .get(function(req, res, next) {
        jsonCache.getAllKeys(res);
    })
    // update Item value (accessed at PUT http://localhost:1337/api/jsonCache)
    .put(function(req, res, next) {
        jsonCache.updateItem(req.body.itemid, req.body.value, res);
    });

router.route('/jsonCache/:cache_id')

    // get the item with that id (accessed at GET http://localhost:1337/api/jsonCache/:cache_id)
    .get(function(req, res, next) {
        jsonCache.getItemByKey(req.params.cache_id, res);
    })
    // delete the item with that id (accessed at DELETE http://localhost:1337/api/jsonCache/:cache_id)
    .delete(function(req, res, next) {
        jsonCache.deleteItemByKey(req.params.cache_id, res);
    });
    
// on routes that end in /jsonCache
// ----------------------------------------------------
router.route('/jsonCache/subscribes')

    // create anItem (accessed at POST http://localhost:1337/api/jsonCache/subscribes)
    .post(function(req, res, next) {
        
    })
    // get all items (accessed at GET http://localhost:1337/api/jsonCache/subscribes)
    .get(function(req, res, next) {
        
    })
    // update Item value (accessed at PUT http://localhost:1337/api/jsonCache/subscribes)
    .put(function(req, res, next) {
        
    }); 

router.route('/jsonCache/subscribes/:subscription_id')

    // get the item with that id (accessed at GET http://localhost:1337/api/jsonCache/subscribes/:subscription_id)
    .get(function(req, res, next) {
        
    })
    // delete the item with that id (accessed at DELETE http://localhost:1337/api/jsonCache/subscribes/:subscription_id)
    .delete(function(req, res, next) {
        
    });
    
router.route('/jsonCache/subscribes/:view_id')

    // get all the subscriptions for the view identified with view_id (accessed at GET http://localhost:1337/api/jsonCache/subscribes/:view_id)
    .get(function(req, res, next) {
        
    })
    // delete all the subscriptions for the view identified with view_id (accessed at DELETE http://localhost:1337/api/jsonCache/subscribes/:view_id)
    .delete(function(req, res, next) {
        
    });

module.exports = router;


