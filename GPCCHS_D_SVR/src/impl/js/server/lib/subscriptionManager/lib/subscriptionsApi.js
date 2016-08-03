const debug = require('../../io/debug')('subscriptionManager:subscriptionApi');

const { subscriptionPushSocket } = require('../../io/zmq');

const { subscriptionColl } = require('../../io/loki');

const { searchIntervals } = require('./intervalApi');

const { createNewSubscription } = require('../../dataCache');

let globalSubscriptionId = 1;

const getSubscriptionId = () => globalSubscriptionId++;
const resetSubscriptionId = () => {
  globalSubscriptionId = 1;
};

const addSubscription = (subscription) => {
  const subId = getSubscriptionId();
  const newSubscription = Object.assign({}, subscription, { subId });
  createNewSubscription(newSubscription);
  const intervals = searchIntervals(subscriptionColl, newSubscription);
  if (intervals.length === 0) {
    debug.info('ALL INTERVALS FOUND IN CACHE');
  } else {
    const newIntervalSubs = [];
    for (const interval of intervals) {
      const newSub = newSubscription;
      newSub.visuWindow = interval.visuWindow;
      newIntervalSubs.push(newSub);
      debug.info(`NEED INTERVAL : ${JSON.stringify(interval)}`);
    }
    subscriptionPushSocket.send(JSON.stringify(newIntervalSubs));
  }

  subscriptionColl.insert(newSubscription);

  return newSubscription.subId;
};

const updateSubscription = (subscriptionLokiId, subscriptionUpdates) => {
  // On récupère la subscription avec son lokiId
  const subscription = subscriptionColl.get(parseInt(subscriptionLokiId, 10));
  const jsonUpdates = JSON.parse(subscriptionUpdates);

  // On boucle sur les modifications à apporter
  for (const update of jsonUpdates.updates) {
    const attributeName = jsonUpdates.updates[update].attributeName;
    const attributeValue = jsonUpdates.updates[update].attributeValue;
    // on met à jour la subscription
    subscription.subscription[attributeName] = attributeValue;
  }
  // on stocke la timeline
  return subscriptionColl.update(subscription);
};

const getSubscriptionById = (id) => subscriptionColl.get(id);

const findSubscriptionById = (id) => subscriptionColl.find({ subId: parseInt(id, 10) });

const deleteSubscriptionByFindId =
    (id) => subscriptionColl.removeWhere({ subId: parseInt(id, 10) });

const deleteSubscriptionById = (id) => subscriptionColl.remove(parseInt(id, 10));

const getAllsubscriptions = () => subscriptionColl.find();


module.exports = {
  resetSubscriptionId,
  addSubscription,
  updateSubscription,
  getSubscriptionById,
  findSubscriptionById,
  getAllsubscriptions,
  deleteSubscriptionByFindId,
  deleteSubscriptionById,
};
