const { subscriptionColl } = require('../../io/loki');

exports.addSubscription = (subscription) => subscriptionColl.insert(subscription);

exports.getSubscriptions = (data) => subscriptionColl.find(
  {
    $and: [
      {
        dataFullName: `${data.catalog}.${data.parameter}<${data.type}>`,
      }, {
        'visuWindow.dInf': {
          $lte: data.timestamp,
        },
      }, {
        'visuWindow.dSup': {
          $gte: data.timestamp,
        },
      }, {
        sessionId: data.session,
      },
    ],
  }
);
