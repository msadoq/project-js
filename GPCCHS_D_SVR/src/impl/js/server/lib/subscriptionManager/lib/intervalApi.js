const debug = require('../../io/debug')('subscriptionManager:intervalApi');

const dInfSort = (obj1, obj2) => {
  let returnValue = null;
  if (obj1.visuWindow.dInf === obj2.visuWindow.dInf) returnValue = 0;
  if (obj1.visuWindow.dInf > obj2.visuWindow.dInf) returnValue = 1;
  if (obj1.visuWindow.dInf < obj2.visuWindow.dInf) returnValue = -1;
  return returnValue;
};

const dSupSort = (obj1, obj2) => {
  let returnValue = null;
  if (obj1.visuWindow.dSup === obj2.visuWindow.dSup) returnValue = 0;
  if (obj1.visuWindow.dSup > obj2.visuWindow.dSup) returnValue = 1;
  if (obj1.visuWindow.dSup < obj2.visuWindow.dSup) returnValue = -1;
  return returnValue;
};

const recursiveIntervalSearch = (set, dInf, max) => {
  const intervals = [];
  // search lowest down limit outside range
  const branch = set.branch();
  const lowestData = branch
    .find({ $and: [
      { 'visuWindow.dInf': { $lte: dInf } },
      { 'visuWindow.dSup': { $gt: dInf } },
    ] })
    .sort(dSupSort)
    .data();
  const ldl = lowestData.length;
  if (ldl === 0) {
    // if none, search lowest down limit inside range
    const branch4 = set.branch();
    const lowestInnerData = branch4
        .find({ $and: [
          { 'visuWindow.dInf': { $lt: max } },
          { 'visuWindow.dInf': { $gt: dInf } },
        ] })
        .sort(dInfSort)
        .data();
    const lidl = lowestInnerData.length;
    if (lidl === 0) {
      // if none, no limits existing
      intervals.push({ visuWindow: { dInf, dSup: max } });
    } else {
      // store from last down limit to this one
      const nextDinf = lowestInnerData[0].visuWindow.dInf;
      debug.debug(`LOW: ${nextDinf}`);
      intervals.push({ visuWindow: { dInf, dSup: nextDinf } });
      const nextIntervals = recursiveIntervalSearch(set, nextDinf, max);
      intervals.push(...nextIntervals);
    }
  } else {
    // then check the greatest up limit associated to this down limit
    const dSup = lowestData[ldl - 1].visuWindow.dSup;
    // and search next greatest down limit inferior to this last greatest limit
    const branch2 = set.branch();
    const nextInnerData = branch2
        .find({ $and: [
            { 'visuWindow.dInf': { $lte: dSup, $gt: dInf } },
            { 'visuWindow.dSup': { $gt: dSup } },
        ] })
        .sort(dSupSort)
        .data();
    const nidl = nextInnerData.length;
    if (nidl === 0) {
      // if none, search next downest limit superior to this last greatest limit
      const branch3 = set.branch();
      const nextOutterData = branch3
        .find({ 'visuWindow.dInf': { $gt: dSup, $lt: max } })
        .sort(dInfSort)
        .data();
      const nodl = nextOutterData.length;
      if (nodl === 0) {
        // if none
        const downLimit = (dSup < dInf)
            ? dInf
            : dSup;
        if (downLimit < max) {
          intervals.push({ visuWindow: { dInf: downLimit, dSup: max } });
        }
      } else {
        // then check the greatest up limit associated to this down limit
        // and store from last up limit from this down limit
        const nextDinf = nextOutterData[0].visuWindow.dInf;
        debug.debug(`OUT: ${nextDinf}`);
        intervals.push({ visuWindow: { dInf: dSup, dSup: nextDinf } });
        // and do it again
        const nextIntervals = recursiveIntervalSearch(set, nextDinf, max);
        intervals.push(...nextIntervals);
      }
    } else {
      const nextDinf = nextInnerData[nidl - 1].visuWindow.dSup;
      debug.debug(`IN: ${nextDinf}`);
      if (nextDinf !== max) {
        const nextIntervals = recursiveIntervalSearch(set, nextDinf, max);
        intervals.push(...nextIntervals);
      }
    }
  }

  return intervals;
};

const searchIntervals = (subscriptions, subscription) => {
  const dataSet = subscriptions.chain().find(
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
  subscription.visuWindow.dInf, subscription.visuWindow.dSup);
  return limits;
};

module.exports = { searchIntervals };
