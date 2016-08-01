const { subscriptions } = require('../../io/loki');

exports.addSubscription = (subscription) => subscriptions.insert(subscription);

exports.getSubscriptions = (data) => subscriptions.find(
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
