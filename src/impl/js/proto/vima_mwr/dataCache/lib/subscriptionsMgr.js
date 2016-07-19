var loki = require('lokijs');
var subscrDb = new loki('cacheSubDB.json');

var cacheSub = subscrDb.addCollection('cacheSub');

exports.addSubscription = function (subscription) {
    cacheSub.insert(subscription);
}

exports.getSubscriptions = function (data) {
    return cacheSub.find({
        '$and': [{ 
            'DataFullName' : data.catalog+'.'+data.parameter+'<'+data.type+'>'
            },{ 
            'VisuWindow.dInf' : {
                '$lte': data.timestamp
                }
            },{ 
            'VisuWindow.dSup' : {
                '$gte': data.timestamp
                }
            },{ 
            'SessionId' : data.session
        }]
    });
}