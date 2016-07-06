const express = require('express');
const subscriptionManager = require('../vima_mwr/subscriptionManager');
const router = express.Router();
const fs = require('fs');


// on routes that end in /subscriptions
// ----------------------------------------------------
router.route('/subscriptions')

    // Add subscriptions (accessed at POST http://localhost:1337/api/subscriptions)
    .post(function(req, res, next) {
        var subscriptionId  = subscriptionManager.addSubscription(req.body.jsonElem);
        res.json({ message: 'subscription added with id : ' + JSON.stringify(subscriptionId)});
    })
    // get all subscriptions (accessed at GET http://localhost:1337/api/subscriptions)
    .get(function(req, res, next) {
        var subscriptions = subscriptionManager.getAllSubscriptions();
        res.json(subscriptions);
    })
    // update subscriptions (accessed at PUT http://localhost:1337/api/subscriptions)
    .put(function(req, res, next) {
        var subscriptionId  = subscriptionManager.updatesubScription(req.body.jsonElem);
        res.json({ message: 'subscription added with id : ' + JSON.stringify(subscriptionId)});
    });

router.route('/subscriptions/:subscriptionId')

    // Add subscriptions (accessed at POST http://localhost:1337/api/subscriptions)
    .post(function(req, res, next) {
    })
    // get one subscriptions (accessed at GET http://localhost:1337/api/subscriptions)
    .get(function(req, res, next) {
        var subscription = subscriptionManager.getSubscriptionById(req.params.subscriptionId);
        res.json(subscription);
    })
    // delete one subscriptions (accessed at GET http://localhost:1337/api/subscriptions)
    .delete(function(req, res, next) {
        var subscription = subscriptionManager.deleteSubscriptionById(req.params.subscriptionId);
        res.json(subscription);
    })
    // update subscriptions (accessed at PUT http://localhost:1337/api/subscriptions)
    .put(function(req, res, next) {
        var subscriptionId  = subscriptionManager.updateSubscription(req.params.subscriptionId, req.body.updateJson);
        res.json({ message: 'subscriptions updated with id : ' + JSON.stringify(subscriptionId)});
    });

module.exports = router;