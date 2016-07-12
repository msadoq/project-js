const { subCache } = require('../../io/loki');

exports.addSubscription = (subscription) => subCache.insert(subscription);

exports.getSubscriptions = (data) => subCache.find(
  {
    $and: [
      {
        DataFullName: data.dataId,
      }, {
        'VisuWindow.dInf': {
          $lte: data.dataTime,
        },
      }, {
        'VisuWindow.dSup': {
          $gte: data.dataTime,
        },
      }, {
        SessionId: data.session,
      },
    ],
  }
);
