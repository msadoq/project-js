var loki = require('lokijs');
var subscriptiondb = new loki('subscription.json');
var dataCache = require('../../dataCache');
var zmq = require("zmq"),
    socketOut = zmq.socket("push");
    
socketOut.bindSync("tcp://*:4000");

var subscriptions = subscriptiondb.addCollection('subscriptions');

var addSubscription = function(subscriptionJson) {
    var newSub = JSON.parse(subscriptionJson);
    var newSub2 = JSON.parse(subscriptionJson);
    newSub.subId = getSubscriptionId();
    //dataCache.sendConnectedData(subscriptionJson);
    
    limits = searchLimits(newSub2);
    
    subscriptions.insert(newSub2);
    dataCache.newSubscription(newSub);    
    
    socketOut.send(JSON.stringify(newSub));
    
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
    return subscriptions.find({'subscription.id' : parseInt(id)});
}

var deleteSubscriptionByFindId = function(id) {
    return subscriptions.removeWhere({'subscription.id' : parseInt(id)});
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
    /*s1 = { 'DataFullName' : 'a', 'SessionId' : 0, 'DomainId' : 0, 'VisuWindow' : {'dInf' : 1, 'dSup' : 2}}
    s2 = { 'DataFullName' : 'a', 'SessionId' : 0, 'DomainId' : 0, 'VisuWindow' : {'dInf' : 1, 'dSup' : 3}}
    s3 = { 'DataFullName' : 'a', 'SessionId' : 0, 'DomainId' : 0, 'VisuWindow' : {'dInf' : 9, 'dSup' : 40}}
    s4 = { 'DataFullName' : 'a', 'SessionId' : 0, 'DomainId' : 0, 'VisuWindow' : {'dInf' : 4, 'dSup' : 8}}
    s5 = { 'DataFullName' : 'a', 'SessionId' : 0, 'DomainId' : 0, 'VisuWindow' : {'dInf' : 2, 'dSup' : 5}}
    subColl.insert(s1);
    subColl.insert(s2);
    subColl.insert(s3);
    subColl.insert(s4);
    subColl.insert(s5);*/
    var dataSet = subscriptions.chain().find({'$and' : [{'DataFullName' : subscription.DataFullName}, {'SessionId' : subscription.SessionId}, {'DomainId' : subscription.DomainId}]});
    var limits = recursiveSearch(dataSet,subscription.VisuWindow.dInf,subscription.VisuWindow.dSup);
    /*for (limit of limits) {
        console.log(limit);
    } */
    return limits;
}

dInfSort = function(obj1, obj2) {
    if (obj1.VisuWindow.dInf === obj2.VisuWindow.dInf) return 0;
    if (obj1.VisuWindow.dInf > obj2.VisuWindow.dInf) return 1;
    if (obj1.VisuWindow.dInf < obj2.VisuWindow.dInf) return -1;
};

dSupSort = function(obj1, obj2) {
    if (obj1.VisuWindow.dSup === obj2.VisuWindow.dSup) return 0;
    if (obj1.VisuWindow.dSup > obj2.VisuWindow.dSup) return 1;
    if (obj1.VisuWindow.dSup < obj2.VisuWindow.dSup) return -1;
};

var recursiveSearch = function(set,dInf,max) {
    var limits = [];
    // search lowest down limit outside range
    var branch = set.branch();
    var lowestData = branch.find({'VisuWindow.dInf' : { '$lte' : dInf}}).sort(dSupSort).data();
    var ldl = lowestData.length;
    if (ldl === 0) {
        // if none, search lowest down limit inside range
        var branch4 = set.branch();
        var lowestInnerData = branch4.find({'VisuWindow.dInf' : { '$lt' : max}}).sort(dInfSort).data();
        var lidl = lowestInnerData.length;
        if (lidl === 0) {
            // if none, no limits existing
            limits.push({'VisuWindow' : {'dInf' : dInf, 'dSup' : max}});
        } else {
            // store from last down limit to this one 
            var nextDinf = lowestInnerData[0].VisuWindow.dInf;
            //console.log('LOW: '+nextDinf);
            limits.push({'VisuWindow' : {'dInf' : dInf, 'dSup' : nextDinf}});
            var nextLimits = recursiveSearch(set,nextDinf,max);
            limits.push(...nextLimits);
        }
    } else {
        // then check the greatest up limit associated to this down limit
        var dSup = lowestData[ldl-1].VisuWindow.dSup;
        // and search next greatest down limit inferior to this last greatest limit 
        var branch2 = set.branch();
        var nextInnerData = branch2.find({'$and' : [{'VisuWindow.dInf' : {'$lte' : dSup, '$gt' : dInf}},{'VisuWindow.dSup' : {'$gt' : dSup}}]}).sort(dSupSort).data();
        var nidl = nextInnerData.length;
        if ( nidl === 0) {
            // if none, search next downest limit superior to this last greatest limit
            var branch3 = set.branch();
            var nextOutterData = branch3.find({'VisuWindow.dInf' : {'$gt' : dSup, '$lt' : max}}).sort(dInfSort).data();
            var nodl = nextOutterData.length;
            if (nodl === 0) {
                // if none
            } else {
                // then check the greatest up limit associated to this down limit
                // and store from last up limit from this down limit
                var nextDinf = nextOutterData[0].VisuWindow.dInf;
                //console.log('OUT: '+nextDinf);
                limits.push({'VisuWindow' : {'dInf' : dSup, 'dSup' : nextDinf}});
                // and do it again
                var nextLimits = recursiveSearch(set,nextDinf,max);
                limits.push(...nextLimits);
            }
        } else {
            var nextDinf = nextInnerData[nidl-1].VisuWindow.dSup;
            //console.log('IN: '+nextDinf);
            var nextLimits = recursiveSearch(set,nextDinf,max);
            limits.push(...nextLimits);
        }
    }
    
    return limits;
}

exports.searchLimits = searchLimits;