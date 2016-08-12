const debug = require('../../io/debug')('subscriptionManager:intervalApi');

const lowerSort = (obj1, obj2) => {
  let returnValue = null;
  if (obj1.visuWindow.lower === obj2.visuWindow.lower) returnValue = 0;
  if (obj1.visuWindow.lower > obj2.visuWindow.lower) returnValue = 1;
  if (obj1.visuWindow.lower < obj2.visuWindow.lower) returnValue = -1;
  return returnValue;
};

const upperSort = (obj1, obj2) => {
  let returnValue = null;
  if (obj1.visuWindow.upper === obj2.visuWindow.upper) returnValue = 0;
  if (obj1.visuWindow.upper > obj2.visuWindow.upper) returnValue = 1;
  if (obj1.visuWindow.upper < obj2.visuWindow.upper) returnValue = -1;
  return returnValue;
};

const recursiveIntervalSearch = (set, lower, max) => {
  const intervals = [];
  // search lowest down limit outside range
  const branch = set.branch();
  const lowestData = branch
    .find({ $and: [
      { 'visuWindow.lower': { $lte: lower } },
      { 'visuWindow.upper': { $gt: lower } },
    ] })
    .sort(upperSort)
    .data();
  const ldl = lowestData.length;
  if (ldl === 0) {
    // if none, search lowest down limit inside range
    const branch4 = set.branch();
    const lowestInnerData = branch4
        .find({ $and: [
          { 'visuWindow.lower': { $lt: max } },
          { 'visuWindow.lower': { $gt: lower } },
        ] })
        .sort(lowerSort)
        .data();
    const lidl = lowestInnerData.length;
    if (lidl === 0) {
      // if none, no limits existing
      intervals.push({ visuWindow: { lower, upper: max } });
    } else {
      // store from last down limit to this one
      const nextLower = lowestInnerData[0].visuWindow.lower;
      debug.debug(`LOW: ${nextLower}`);
      intervals.push({ visuWindow: { lower, upper: nextLower } });
      const nextIntervals = recursiveIntervalSearch(set, nextLower, max);
      intervals.push(...nextIntervals);
    }
  } else {
    // then check the greatest up limit associated to this down limit
    const upper = lowestData[ldl - 1].visuWindow.upper;
    // and search next greatest down limit inferior to this last greatest limit
    const branch2 = set.branch();
    const nextInnerData = branch2
        .find({ $and: [
            { 'visuWindow.lower': { $lte: upper, $gt: lower } },
            { 'visuWindow.upper': { $gt: upper } },
        ] })
        .sort(upperSort)
        .data();
    const nidl = nextInnerData.length;
    if (nidl === 0) {
      // if none, search next downest limit superior to this last greatest limit
      const branch3 = set.branch();
      const nextOutterData = branch3
        .find({ 'visuWindow.lower': { $gt: upper, $lt: max } })
        .sort(lowerSort)
        .data();
      const nodl = nextOutterData.length;
      if (nodl === 0) {
        // if none
        const downLimit = (upper < lower)
            ? lower
            : upper;
        if (downLimit < max) {
          intervals.push({ visuWindow: { lower: downLimit, upper: max } });
        }
      } else {
        // then check the greatest up limit associated to this down limit
        // and store from last up limit from this down limit
        const nextLower = nextOutterData[0].visuWindow.lower;
        debug.debug(`OUT: ${nextLower}`);
        intervals.push({ visuWindow: { lower: upper, upper: nextLower } });
        // and do it again
        const nextIntervals = recursiveIntervalSearch(set, nextLower, max);
        intervals.push(...nextIntervals);
      }
    } else {
      const nextLower = nextInnerData[nidl - 1].visuWindow.upper;
      debug.debug(`IN: ${nextLower}`);
      if (nextLower !== max) {
        const nextIntervals = recursiveIntervalSearch(set, nextLower, max);
        intervals.push(...nextIntervals);
      }
    }
  }

  return intervals;
};

const searchIntervals = (subscriptionsCollection, subscription, callback) => {
  const dataSet = subscriptionsCollection.chain().find(
    {
      $and: [{
        dataFullName: subscription.dataFullName,
      }, {
        sessionId: subscription.sessionId,
      }, {
        domainId: subscription.domainId,
      }],
    });
  const limits = recursiveIntervalSearch(dataSet,

  subscription.visuWindow.lower, subscription.visuWindow.upper);
  callback(null, limits);
};

module.exports = { searchIntervals };
