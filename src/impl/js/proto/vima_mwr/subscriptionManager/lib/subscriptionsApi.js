var loki = require('lokijs');
var subscriptiondb = new loki('subscription.json');
var dataCache = require('../../dataCache');
const zmq = require('zmq');


var subscriptions = subscriptiondb.addCollection('subscriptions');

let socketOut = null;

var addSubscription = function(subscriptionJson) {
    const socketOut = zmq.socket('push');
    socketOut.connect('tcp://127.0.0.1:4000');
    var newSub = JSON.parse(subscriptionJson);
    var newSub2 = JSON.parse(subscriptionJson);
    var subId = getSubscriptionId();
    newSub.subId = subId;
    newSub2.subId = subId;
    dataCache.newSubscription(newSub);
    var newSubSubs = [];
    limits = searchLimits(newSub2);
    for (limit of limits) {
        var newSubSub = newSub;
        newSubSub.visuWindow = limit.visuWindow;
        newSubSubs.push(newSubSub);
        console.log('LIMIT : ' + JSON.stringify(limit));
    }
    //console.log('LIMITS: '+JSON.stringify(newSubSubs));
    socketOut.send(JSON.stringify(newSubSubs));
    subscriptions.insert(newSub2);
    socketOut.close();
    return newSub.subId;
}



var updateSubscription = function(subscriptionLokiId, subscriptionUpdates) {
    // On récupère la subscription avec son lokiId
    var subscription = subscriptions.get(parseInt(subscriptionLokiId));
    var jsonUpdates = JSON.parse(subscriptionUpdates);
    var attributeName;
    var attributeValue;

    //on boucle sur les modifications à apporter
    for (var update in jsonUpdates.updates) {
        attributeName = jsonUpdates.updates[update].attributeName;
        attributeValue = jsonUpdates.updates[update].attributeValue;
        // on met à jour la subscription
        subscription.subscription[attributeName] = attributeValue;
    }
    // on stock la timeline
    return subscriptions.update(subscription);
}

var getSubscriptionById = function(id) {
    return subscriptions.get(id);
}

var findSubscriptionById = function(id) {
    return subscriptions.find({'subId' : parseInt(id)});
}

var deleteSubscriptionByFindId = function(id) {
    return subscriptions.removeWhere({'subId' : parseInt(id)});
}

var deleteSubscriptionById = function(id) {
    return subscriptions.remove(parseInt(id));
}

var getAllsubscriptions = function() {
    return subscriptions.find();
}
var subId = 2;
function getSubscriptionId(){
    subId = (subId === 2)
          ? 1
          : 2;
    return subId;
}

exports.addSubscription = addSubscription;
exports.updateSubscription = updateSubscription;
exports.getSubscriptionById = getSubscriptionById;
exports.findSubscriptionById = findSubscriptionById;
exports.getAllsubscriptions = getAllsubscriptions;
exports.deleteSubscriptionByFindId = deleteSubscriptionByFindId;
exports.deleteSubscriptionById = deleteSubscriptionById;


var searchLimits = function(subscription) {
    /*s1 = { 'DataFullName' : 'a', 'SessionId' : 0, 'DomainId' : 0, 'visuWindow' : {'lower' : 1, 'upper' : 2}}
    s2 = { 'DataFullName' : 'a', 'SessionId' : 0, 'DomainId' : 0, 'visuWindow' : {'lower' : 1, 'upper' : 3}}
    s3 = { 'DataFullName' : 'a', 'SessionId' : 0, 'DomainId' : 0, 'visuWindow' : {'lower' : 9, 'upper' : 40}}
    s4 = { 'DataFullName' : 'a', 'SessionId' : 0, 'DomainId' : 0, 'visuWindow' : {'lower' : 4, 'upper' : 8}}
    s5 = { 'DataFullName' : 'a', 'SessionId' : 0, 'DomainId' : 0, 'visuWindow' : {'lower' : 2, 'upper' : 5}}
    subColl.insert(s1);
    subColl.insert(s2);
    subColl.insert(s3);
    subColl.insert(s4);
    subColl.insert(s5);*/
    var dataSet = subscriptions.chain().find({'$and' : [{'DataFullName' : subscription.DataFullName}, {'SessionId' : subscription.SessionId}, {'DomainId' : subscription.DomainId}]});
    var limits = recursiveSearch(dataSet,subscription.visuWindow.lower,subscription.visuWindow.upper);
    /*for (limit of limits) {
        console.log(limit);
    } */
    return limits;
}

lowerSort = function(obj1, obj2) {
    if (obj1.visuWindow.lower === obj2.visuWindow.lower) return 0;
    if (obj1.visuWindow.lower > obj2.visuWindow.lower) return 1;
    if (obj1.visuWindow.lower < obj2.visuWindow.lower) return -1;
};

upperSort = function(obj1, obj2) {
    if (obj1.visuWindow.upper === obj2.visuWindow.upper) return 0;
    if (obj1.visuWindow.upper > obj2.visuWindow.upper) return 1;
    if (obj1.visuWindow.upper < obj2.visuWindow.upper) return -1;
};

var recursiveSearch = function(set,lower,max) {
    var limits = [];
    // search lowest down limit outside range
    var branch = set.branch();
    var lowestData = branch.find({'visuWindow.lower' : { '$lte' : lower}}).sort(upperSort).data();
    var ldl = lowestData.length;
    if (ldl === 0) {
        // if none, search lowest down limit inside range
        var branch4 = set.branch();
        var lowestInnerData = branch4.find({'visuWindow.lower' : { '$lt' : max}}).sort(lowerSort).data();
        var lidl = lowestInnerData.length;
        if (lidl === 0) {
            // if none, no limits existing
            limits.push({'visuWindow' : {'lower' : lower, 'upper' : max}});
        } else {
            // store from last down limit to this one
            var nextLower = lowestInnerData[0].visuWindow.lower;
            //console.log('LOW: '+nextLower);
            limits.push({'visuWindow' : {'lower' : lower, 'upper' : nextLower}});
            var nextLimits = recursiveSearch(set,nextLower,max);
            limits.push(...nextLimits);
        }
    } else {
        // then check the greatest up limit associated to this down limit
        var upper = lowestData[ldl-1].visuWindow.upper;
        // and search next greatest down limit inferior to this last greatest limit
        var branch2 = set.branch();
        var nextInnerData = branch2.find({'$and' : [{'visuWindow.lower' : {'$lte' : upper, '$gt' : lower}},{'visuWindow.upper' : {'$gt' : upper}}]}).sort(upperSort).data();
        var nidl = nextInnerData.length;
        if ( nidl === 0) {
            // if none, search next downest limit superior to this last greatest limit
            var branch3 = set.branch();
            var nextOutterData = branch3.find({'visuWindow.lower' : {'$gt' : upper, '$lt' : max}}).sort(lowerSort).data();
            var nodl = nextOutterData.length;
            if (nodl === 0) {
                // if none
                var downLimit = (upper < lower)
                              ? lower
                              : upper;
                if (downLimit < max) {
                    limits.push({'visuWindow' : {'lower' : downLimit, 'upper' : max}});
                }
            } else {
                // then check the greatest up limit associated to this down limit
                // and store from last up limit from this down limit
                var nextLower = nextOutterData[0].visuWindow.lower;
                //console.log('OUT: '+nextLower);
                limits.push({'visuWindow' : {'lower' : upper, 'upper' : nextLower}});
                // and do it again
                var nextLimits = recursiveSearch(set,nextLower,max);
                limits.push(...nextLimits);
            }
        } else {
            var nextLower = nextInnerData[nidl-1].visuWindow.upper;
            //console.log('IN: '+nextLower);
            var nextLimits = recursiveSearch(set,nextLower,max);
            limits.push(...nextLimits);
        }
    }

    return limits;
}

exports.searchLimits = searchLimits;
