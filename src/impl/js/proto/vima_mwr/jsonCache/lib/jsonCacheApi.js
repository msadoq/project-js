var nodecache = require('node-cache');
var myCache = new nodecache();

var addItem = function(key, value, res) {
    myCache.set(key, value, function( err, success ){
        if( !err && success ){
            console.log( success );
            res.io.emit(1, 'Item stored Key:'+key+' Value: '+ value);
            res.json({ message: 'Item stored'});
        }
    });
}

var updateItem = function(key, value, res) {
    myCache.set(key, value, function( err, success ){
        if( !err && success ){
            console.log( success );
            res.json({ message: 'Item updated'});  
        }
    });
}

var getItemByKey = function(key, res) {
    myCache.get(key, function( err, value ){
        if( !err ){
            console.log( value );
            res.json(value); 
        /*
            {
                "myKeyA": { my: "Special", variable: 123 },
                "myKeyB": { the: "Glory", answer: 42 }
            }
        */
        // ... do something ... 
        }
    });
}

var deleteItemByKey = function(key, res) {
    myCache.del( "myKey", function( err, count ){
        if( !err ){
            console.log( count ); // 1
            res.json({message : 'Item deleted'});
            // ... do something ...
        }
    });
}

var getAllKeys = function(res) {
    myCache.keys( function( err, mykeys ){
    if( !err ){
        console.log( mykeys );
        res.json(mykeys);
    // [ "all", "my", "keys", "foo", "bar" ] 
    }
    });
}

exports.addItem = addItem;
exports.getItemByKey = getItemByKey;
exports.deleteItemByKey = deleteItemByKey;
exports.getAllKeys = getAllKeys;
exports.updateItem = updateItem;