const { subscriptions } = require('../../io/loki');

exports.addSubscription = (subscription) => subscriptions.insert(subscription);

exports.getSubscriptions = (data) => subscriptions.find(
  {
    $and: [
      {
        DataFullName: `${data.catalog}.${data.parameter}<${data.type}>`,
        //DataFullName: `${data.catalog}.${data.parameter}<ReportingParameter>`,
      }, {
        'VisuWindow.dInf': {
          $lte: data.timestamp,
        },
      }, {
        'VisuWindow.dSup': {
          $gte: data.timestamp,
        },
      }, {
        SessionId: data.session,
      },
    ],
  }
);
