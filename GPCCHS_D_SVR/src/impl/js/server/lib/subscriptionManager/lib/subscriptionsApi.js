const debug = require('../../io/debug')('subscriptionManager:subscriptionApi');

const { subscriptionPushSocket } = require('../../io/zmq');

const { subscriptions } = require('../../io/loki');

const cacheMgr = require('../../dataCache');

let globalSubscriptionId = 2;

function getSubscriptionId() {
  globalSubscriptionId = (globalSubscriptionId === 2)
    ? 1
    : 2;
  return globalSubscriptionId;
}

const addSubscription = (subscriptionJson) => {
  const newSub = JSON.parse(subscriptionJson);
  const newSub2 = JSON.parse(subscriptionJson);
  const subId = getSubscriptionId();
  newSub.subId = subId;
  newSub2.subId = subId;
  cacheMgr.newSubscription(newSub);
  const newSubSubs = [];
  const limits = searchLimits(newSub2);
  if (limits.length === 0) {
    debug.info('ALL INTERVALS FOUND IN CACHE');
  }
  for (const limit of limits) {
    const newSubSub = newSub;
    newSubSub.VisuWindow = limit.VisuWindow;
    newSubSubs.push(newSubSub);
    debug.info(`NEED INTERVAL : ${JSON.stringify(limit)}`);
  }
  subscriptionPushSocket.send(JSON.stringify(newSubSubs));
  subscriptions.insert(newSub2);

  return newSub.subId;
};

const updateSubscription = (subscriptionLokiId, subscriptionUpdates) => {
  // On récupère la subscription avec son lokiId
  const subscription = subscriptions.get(parseInt(subscriptionLokiId, 10));
  const jsonUpdates = JSON.parse(subscriptionUpdates);

  // On boucle sur les modifications à apporter
  for (const update of jsonUpdates.updates) {
    const attributeName = jsonUpdates.updates[update].attributeName;
    const attributeValue = jsonUpdates.updates[update].attributeValue;
    // on met à jour la subscription
    subscription.subscription[attributeName] = attributeValue;
  }
  // on stocke la timeline
  return subscriptions.update(subscription);
};

const getSubscriptionById = (id) => subscriptions.get(id);

const findSubscriptionById = (id) => subscriptions.find({ subId: parseInt(id, 10) });

const deleteSubscriptionByFindId =
    (id) => subscriptions.removeWhere({ subId: parseInt(id, 10) });

const deleteSubscriptionById = (id) => subscriptions.remove(parseInt(id, 10));

const getAllsubscriptions = () => subscriptions.find();


exports.addSubscription = addSubscription;
exports.updateSubscription = updateSubscription;
exports.getSubscriptionById = getSubscriptionById;
exports.findSubscriptionById = findSubscriptionById;
exports.getAllsubscriptions = getAllsubscriptions;
exports.deleteSubscriptionByFindId = deleteSubscriptionByFindId;
exports.deleteSubscriptionById = deleteSubscriptionById;


const searchLimits = (subscription) => {
  const dataSet = subscriptions.chain().find(
    {
      $and: [{
        DataFullName: subscription.DataFullName,
      }, {
        SessionId: subscription.SessionId,
      }, {
        DomainId: subscription.DomainId,
      }],
    });
  const limits = recursiveSearch(dataSet,
  subscription.VisuWindow.dInf, subscription.VisuWindow.dSup);
  return limits;
};

const dInfSort = (obj1, obj2) => {
  let returnValue = null;
  if (obj1.VisuWindow.dInf === obj2.VisuWindow.dInf) returnValue = 0;
  if (obj1.VisuWindow.dInf > obj2.VisuWindow.dInf) returnValue = 1;
  if (obj1.VisuWindow.dInf < obj2.VisuWindow.dInf) returnValue = -1;
  return returnValue;
};

const dSupSort = (obj1, obj2) => {
  let returnValue = null;
  if (obj1.VisuWindow.dSup === obj2.VisuWindow.dSup) returnValue = 0;
  if (obj1.VisuWindow.dSup > obj2.VisuWindow.dSup) returnValue = 1;
  if (obj1.VisuWindow.dSup < obj2.VisuWindow.dSup) returnValue = -1;
  return returnValue;
};

const recursiveSearch = (set, dInf, max) => {
  const limits = [];
  // search lowest down limit outside range
  const branch = set.branch();
  const lowestData = branch
    .find({ $and: [
      { 'VisuWindow.dInf': { $lte: dInf } },
      { 'VisuWindow.dSup': { $gt: dInf } },
    ] })
    .sort(dSupSort)
    .data();
  const ldl = lowestData.length;
  if (ldl === 0) {
    // if none, search lowest down limit inside range
    const branch4 = set.branch();
    const lowestInnerData = branch4
        .find({ $and: [
          { 'VisuWindow.dInf': { $lt: max } },
          { 'VisuWindow.dInf': { $gt: dInf } },
        ] })
        .sort(dInfSort)
        .data();
    const lidl = lowestInnerData.length;
    if (lidl === 0) {
      // if none, no limits existing
      limits.push({ VisuWindow: { dInf, dSup: max } });
    } else {
      // store from last down limit to this one 
      const nextDinf = lowestInnerData[0].VisuWindow.dInf;
      debug.debug(`LOW: ${nextDinf}`);
      limits.push({ VisuWindow: { dInf, dSup: nextDinf } });
      const nextLimits = recursiveSearch(set, nextDinf, max);
      limits.push(...nextLimits);
    }
  } else {
    // then check the greatest up limit associated to this down limit
    const dSup = lowestData[ldl - 1].VisuWindow.dSup;
    // and search next greatest down limit inferior to this last greatest limit
    const branch2 = set.branch();
    const nextInnerData = branch2
        .find({ $and: [
            { 'VisuWindow.dInf': { $lte: dSup, $gt: dInf } },
            { 'VisuWindow.dSup': { $gt: dSup } },
        ] })
        .sort(dSupSort)
        .data();
    const nidl = nextInnerData.length;
    if (nidl === 0) {
      // if none, search next downest limit superior to this last greatest limit
      const branch3 = set.branch();
      const nextOutterData = branch3
        .find({ 'VisuWindow.dInf': { $gt: dSup, $lt: max } })
        .sort(dInfSort)
        .data();
      const nodl = nextOutterData.length;
      if (nodl === 0) {
        // if none
        const downLimit = (dSup < dInf)
            ? dInf
            : dSup;
        if (downLimit < max) {
          limits.push({ VisuWindow: { dInf: downLimit, dSup: max } });
        }
      } else {
        // then check the greatest up limit associated to this down limit
        // and store from last up limit from this down limit
        const nextDinf = nextOutterData[0].VisuWindow.dInf;
        debug.debug(`OUT: ${nextDinf}`);
        limits.push({ VisuWindow: { dInf: dSup, dSup: nextDinf } });
        // and do it again
        const nextLimits = recursiveSearch(set, nextDinf, max);
        limits.push(...nextLimits);
      }
    } else {
      const nextDinf = nextInnerData[nidl - 1].VisuWindow.dSup;
      debug.debug(`IN: ${nextDinf}`);
      if (nextDinf !== max) {
        const nextLimits = recursiveSearch(set, nextDinf, max);
        limits.push(...nextLimits);
      }
    }
  }

  return limits;
};

exports.searchLimits = searchLimits;

