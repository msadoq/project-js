var loki = require('lokijs');
var subscrDb = new loki('cacheSubDB.json');

var cacheSub = subscrDb.addCollection('cacheSub');

exports.addSubscription = function (subscription) {
        console.log(JSON.stringify(subscription));
    cacheSub.insert(subscription);
}

exports.getSubscriptions = function (data) {
    return cacheSub.find({
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