const { Router } = require('express');
const subscriptionManager = require('../lib/subscriptionManager');
const router = new Router();


// on routes that end in /subscriptions
// ----------------------------------------------------
router.route('/subscriptions')

    // Add subscriptions (accessed at POST http://localhost:1337/api/subscriptions)
    .post((req, res) => {
      console.log(`received : ${JSON.stringify(req.body.jsonElem, null, 4)}`);
      const subscriptionId = subscriptionManager.addSubscription(JSON.stringify(req.body.jsonElem));
      console.log(`SubId: ${subscriptionId}`);
      res.json({ message: `subscription added with id : ${JSON.stringify(subscriptionId)}` });
    })
    // get all subscriptions (accessed at GET http://localhost:1337/api/subscriptions)
    .get((req, res) => {
      /* var subscriptions = subscriptionManager.getAllSubscriptions();
      res.json(subscriptions);*/
      res.json([]);
    });

router.route('/subscriptions/:subscriptionId')

    // Add subscriptions (accessed at POST http://localhost:1337/api/subscriptions)
    .post((req, res) => {
    })
    // get one subscriptions (accessed at GET http://localhost:1337/api/subscriptions)
    .get((req, res) => {
      const subscription = subscriptionManager.getSubscriptionById(req.params.subscriptionId);
      res.json(subscription);
    })
    // delete one subscriptions (accessed at GET http://localhost:1337/api/subscriptions)
    .delete((req, res) => {
      const subscription = subscriptionManager.deleteSubscriptionById(req.params.subscriptionId);
      res.json(subscription);
    })
    // update subscriptions (accessed at PUT http://localhost:1337/api/subscriptions)
    .put((req, res) => {
      const subscriptionId = subscriptionManager
        .updateSubscription(req.params.subscriptionId, req.body.updateJson);
      res.json({ message: `subscriptions updated with id : ${JSON.stringify(subscriptionId)}` });
    });

module.exports = router;