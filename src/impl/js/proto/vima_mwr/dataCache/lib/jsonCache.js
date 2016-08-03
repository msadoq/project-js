var loki = require('lokijs');
var jsonCacheDB = new loki('jsonCache.json');

var jsonCache = jsonCacheDB.addCollection('jsonCache');

exports.addData = function(metaData, jsonData) {
    metaData.jsonPayload = jsonData;
    return new Promise(function(resolve, reject) {
        resolve(jsonCache.insert(metaData))
    });
}

exports.findData = function(query) {
    return new Promise(function(resolve, reject) {
        resolve(jsonCache.find({
            '$and': [{ 
                'dataId' : query.DataFullName
                },{ 
                'dataTime' : {
                    '$gte': query.visuWindow.lower
                    }
                },{ 
                'dataTime' : {
                    '$lte': query.visuWindow.upper
                    }
                },{ 
                'session' : query.SessionId
            }]
        })
        )
    });
}

