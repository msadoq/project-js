var loki = require('lokijs');
var subscriptiondb = new loki('subscription.json');
var dataCache = require('../../dataCache');

var subscriptions = subscriptiondb.addCollection('subscriptions');

var addSubscription = function(subscriptionJson) {
    dataCache.sendConnectedData(subscriptionJson);
    return subscriptions.insert(JSON.parse(subscriptionJson));
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
