var loki = require('lokijs'),
    binCacheDB = new loki('binCache.json'),
    jsonCache = require('./jsonCache.js'),
    binCache = binCacheDB.addCollection('binCache');

exports.addData = function(metaData, binData) {
    metaData.binPayload = binData;
    return new Promise(function(resolve, reject) {
        resolve(binCache.insert(metaData))
    });
}

exports.findData = function(query) {
    return new Promise(function(resolve, reject) {
        resolve(binCache.find({
            '$and': [{ 
                'dataId' : query.DataFullName
                },{ 
                'dataTime' : {
                    '$gte': data.VisuWindow.dInf
                    }
                },{ 
                'dataTime' : {
                    '$lte': data.VisuWindow.dSup
                    }
                },{ 
                'session' : data.SessionId
            }]
        })
        )
    });
}

