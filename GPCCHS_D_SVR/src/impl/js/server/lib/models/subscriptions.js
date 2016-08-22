const database = require('../io/loki');

const collection = database.addCollection('subscriptions');

collection.findBySubId = subId => collection.find({
  subId,
});
collection.removeBySubId = subId => collection.removeWhere({
  subId,
});
collection.retrieveBySubscription = subscription => collection.find(
  {
    $and: [
      {
        dataFullName: `${subscription.catalog}.${subscription.parameter}<${subscription.type}>`,
      },
      {
        'visuWindow.lower': {
          $lte: subscription.timestamp,
        },
      },
      {
        'visuWindow.upper': {
          $gte: subscription.timestamp,
        },
      },
      {
        sessionId: subscription.session,
      },
    ],
  }
);

// TODO : unit test

module.exports = collection;
