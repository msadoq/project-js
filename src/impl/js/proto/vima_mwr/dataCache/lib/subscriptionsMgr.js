var loki = require('lokijs');
var subscrDb = new loki('subscriptions.json');

var subscriptions = subscrDb.addCollection('subscriptions');

exports.addSubscription = function (subscription) {
    subscriptions.insert(subscription);
}

exports.getSubscriptions = function (data) {
    return subscriptions.find({
        '$and': [{ 
            'DataFullName' : data.dataId
            },{ 
            'VisuWindow.dInf' : {
                '$lte': data.dataTime
                }
            },{ 
            'VisuWindow.dSup' : {
                '$gte': data.dataTime
                }
            },{ 
            'SessionId' : data.session
        }]
    });
}