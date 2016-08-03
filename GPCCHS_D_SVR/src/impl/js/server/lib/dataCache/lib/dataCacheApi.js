const { jsonDataColl } = require('../../io/loki');

exports.addDataId = (connectedDataJson) => new Promise(
  (resolve, reject) => {
    resolve(jsonDataColl.insert(connectedDataJson));
  });

exports.findConnectedData = (jsonFilter) => jsonDataColl.find({ session: jsonFilter.sessionId });

/*var addDataId = function(dataIdJson) {
    return dataIds.insert(JSON.parse(dataIdJson));
}*/

/*var updateItem = function(key, value, res) {
    myCache.set(key, value, function( err, success ){
        if( !err && success ){
            console.log( success );
            res.json({ message: 'Item updated'});  
        }
    });
}*/

/*var getItemByKey = function(key) {
    var returnValue;
    myCache.get(key, function( err, value ){
        if( !err ){
            if(value == undefined){
                console.log('Key not found'); 
            }else{
                console.log('Get value of key:' + value);
                returnValue = value;
            } 
        }
    });
    return returnValue;
}*/

/*var deleteItemByKey = function(key, res) {
    myCache.del( "myKey", function( err, count ){
        if( !err ){
            console.log( count ); 
            res.json({message : 'Item deleted'});
        }
    });
}*/

/*var getAllKeys = function(res) {
    myCache.keys( function( err, mykeys ){
    if( !err ){
        console.log( mykeys );
        res.json(mykeys);
    }
    });
}*/

