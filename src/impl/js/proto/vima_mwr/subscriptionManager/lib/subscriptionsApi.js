var loki = require('lokijs');
var subscriptiondb = new loki('subscription.json');
var dataCache = require('../../dataCache');
var zmq = require("zmq"),
    socketOut = zmq.socket("push");
    
socketOut.bindSync("tcp://*:4000");

var subscriptions = subscriptiondb.addCollection('subscriptions');

var addSubscription = function(subscriptionJson) {
    //dataCache.sendConnectedData(subscriptionJson);
    var subId = subscriptions.insert(JSON.parse(subscriptionJson));
    dataCache.newSubscription(subscriptionJson);
    socketOut.send(subscriptionJson);
    return subId;
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

exports.addSubscription = addSubscription;
exports.updateSubscription = updateSubscription;
exports.getSubscriptionById = getSubscriptionById;
exports.findSubscriptionById = findSubscriptionById;
exports.getAllsubscriptions = getAllsubscriptions;
exports.deleteSubscriptionByFindId = deleteSubscriptionByFindId;
exports.deleteSubscriptionById = deleteSubscriptionById;


var searchLimits = function(subscription) {
    s1 = { 'rawData' : 'a', 'sessionId' : 0, 'domainId' : 0, 'dInf' : 1, 'dSup' : 2}
    s2 = { 'rawData' : 'a', 'sessionId' : 0, 'domainId' : 0, 'dInf' : 1, 'dSup' : 3}
    s3 = { 'rawData' : 'a', 'sessionId' : 0, 'domainId' : 0, 'dInf' : 9, 'dSup' : 40}
    s4 = { 'rawData' : 'a', 'sessionId' : 0, 'domainId' : 0, 'dInf' : 7, 'dSup' : 9}
    s5 = { 'rawData' : 'a', 'sessionId' : 0, 'domainId' : 0, 'dInf' : 4, 'dSup' : 5}
    subColl.insert(s1);
    subColl.insert(s2);
    subColl.insert(s3);
    subColl.insert(s4);
    subColl.insert(s5);
    var dataSet = subColl.chain().find({'$and' : [{'rawData' : subscription.rawData}, {'sessionId' : subscription.sessionId}, {'domainId' : subscription.domainId}]});
    var limits = recursiveSearch(dataSet,subscription.dInf,subscription.dSup);
    for (limit of limits) {
        console.log(limit);
    } 
}

var recursiveSearch = function(set,dInf,max) {
    var limits = [];
    var branch = set.branch();
    var lowestData = branch.find({'dInf' : { '$lte' : dInf}}).simplesort('dSup').data();
    var ldl = lowestData.length;
    if (ldl === 0) {
        var branch4 = set.branch();
        var lowestInnerData = branch4.find({'dInf' : { '$lt' : max}}).simplesort('dInf').data();
        var lidl = lowestInnerData.length;
        if (lidl === 0) {
            console.log('No data limits existing');
        } else {
            var nextDinf = lowestInnerData[0].dInf;
            console.log('LOW: '+nextDinf);
            limits.push({'dInf' : dInf, 'dSup' : nextDinf});
            var nextLimits = recursiveSearch(set,nextDinf,max);
            limits.push(...nextLimits);
        }
    } else {
        var dSup = lowestData[ldl-1].dSup;
        var branch2 = set.branch();
        var nextInnerData = branch2.find({'$and' : [{'dInf' : {'$lte' : dSup, '$gte' : dInf}},{'dSup' : {'$gt' : dSup}}]}).simplesort('dSup').data();
        var nidl = nextInnerData.length;
        if ( nidl === 0) {
            var branch3 = set.branch();
            var nextOutterData = branch3.find({'$and' : [{'dInf' : {'$gte' : dSup}},{'dSup' : {'$gt' : dSup}}]}).simplesort('dInf').data();
            var nodl = nextOutterData.length;
            if (nodl === 0) {
                console.log("FAIL");
                limits.push({'dInf' : dSup, 'dSup' : max});
            } else {
                var nextDinf = nextOutterData[0].dInf;
                console.log('OUT: '+nextDinf);
                limits.push({'dInf' : dSup, 'dSup' : nextDinf});
                var nextLimits = recursiveSearch(set,nextDinf,max);
                limits.push(...nextLimits);
                //limits.concat(recursiveSearch(set,nextDinf,max));
            }
        } else {
            console.log('IN: '+nextInnerData[nidl-1].dSup);
        }
    }
    
    return limits;
}

exports.searchLimits = searchLimits;