var loki = require('lokijs'),
    binCacheDB = new loki('binCache.json'),
    jsonCache = require('./jsonCache.js'),
    binCache = binCacheDB.addCollection('binCache');

exports.addData = function(metadata, data) {
    metadata.binPayload = data;
    return new Promise(function(resolve, reject) {
        resolve(binCache.insert(metadata))
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

