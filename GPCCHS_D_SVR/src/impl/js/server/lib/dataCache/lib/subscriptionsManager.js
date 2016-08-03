const { subscriptionColl } = require('../../io/loki');

exports.addSubscription = (subscription) => subscriptionColl.insert(subscription);

exports.getSubscriptions = (data) => subscriptionColl.find(
  {
    $and: [
      {
        dataFullName: `${data.catalog}.${data.parameter}<${data.type}>`,
      }, {
        'visuWindow.lower': {
          $lte: data.timestamp,
        },
      }, {
        'visuWindow.upper': {
          $gte: data.timestamp,
        },
      }, {
        sessionId: data.session,
      },
    ],
  }
);
