// Commented by dbrugne on 2016-08-22 : not used anywhere, should be moved in models/subscriptions

// const debug = require('../io/debug')('subscriptionManager:subscriptionApi');
// const subscriptionsModel = require('../models/subscriptions');
//
// const updateSubscription = (subscriptionLokiId, subscriptionUpdates) => {
//   // On récupère la subscription avec son lokiId
//   const subscription = subscriptionsModel.get(parseInt(subscriptionLokiId, 10));
//   const jsonUpdates = JSON.parse(subscriptionUpdates);
//
//   // On boucle sur les modifications à apporter
//   for (const toUpdate of jsonUpdates.updates) {
//     const attributeName = jsonUpdates.updates[toUpdate].attributeName;
//     const attributeValue = jsonUpdates.updates[toUpdate].attributeValue;
//     // on met à jour la subscription
//     subscription.subscription[attributeName] = attributeValue;
//   }
//   // on stocke la timeline
//   return subscriptionsModel.update(subscription);
// };
//
// module.exports = {
//   updateSubscription,
// };
