const Loki = require('lokijs');

const subscriptiondb = new Loki('subscription.json');
const subscriptions = subscriptiondb.addCollection('subscriptions');

module.exports = { subscriptions };
