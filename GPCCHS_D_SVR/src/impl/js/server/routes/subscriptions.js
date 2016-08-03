const debug = require('../lib/io/debug')('routes:subscriptions');

const ApiError = require('./apiError');

const subscriptionManager = require('../lib/subscriptionManager');

const { operatorMappingObject } = require('../lib/dataCache/lib/filterApi');

const parseDataFullName = (dataFullName, callback) => {
  let err;
  const data = { dataFullName };
  const dataFullNameDotSplitted = dataFullName.split('.');
  if (dataFullNameDotSplitted.length === 2) {
    data.catalog = dataFullNameDotSplitted[0];
    const dataFullNameTagSplitted = dataFullNameDotSplitted[1].split('<');
    if (dataFullNameTagSplitted.length === 2) {
      data.parameter = dataFullNameTagSplitted[0];
      const parameter = dataFullNameTagSplitted[1].split('>');
      if (parameter.length === 2) {
        data.type = parameter[0];
      } else {
        err = 'dataFullName should have a parameter type between tag marks';
      }
    } else {
      err = 'dataFullName should have a parameter type between tag marks';
    }
  } else {
    err = 'dataFullName should be composed of a catalog and a parameter separated by a dot';
  }
  callback(err, data);
};

const timeLineTypes = {
  SESSION: 'session',
  DATASET: 'dataSet',
  RECORDSET: 'recordSet',
};

const subscriptionStates = {
  PLAY: 'play',
  PAUSE: 'pause',
};

const DEFAULT_VISU_SPEED = 0;

module.exports = (req, res, next) => {
  let subscription;

  if (req.body.dataFullName !== undefined) {
    parseDataFullName(req.body.dataFullName, (err, data) => {
      if (err) {
        return next(new ApiError(400, err, '/body/dataFullName'));
      }
      subscription = data;
    });
  } else {
    return next(new ApiError(400, 'dataFullName parameter required', '/body/dataFullName'));
  }

  if (req.body.field !== undefined) {
    subscription.field = req.body.field;
  } else {
    subscription.field = '*';
  }

  if (req.body.domainId !== undefined) {
    subscription.domainId = req.body.domainId;
  } else {
    return next(new ApiError(400, 'domainId parameter required', '/body/domainId'));
  }

  if (req.body.timeLineType !== undefined) {
    if (req.body.timeLineType === timeLineTypes.SESSION) {
      subscription.timeLineType = req.body.timeLineType;
      if (req.body.sessionId !== undefined) {
        subscription.sessionId = req.body.sessionId;
      } else {
        return next(new ApiError(400, 'sessionId parameter required', '/body/sessionId'));
      }
    } else if (req.body.timeLineType === timeLineTypes.DATASET
      || req.body.timeLineType === timeLineTypes.RECORDSET) {
      subscription.timeLineType = req.body.timeLineType;
      if (req.body.setFileName !== undefined) {
        subscription.setFileName = req.body.setFileName;
      } else {
        return next(new ApiError(400, 'setFileName parameter required', '/body/setFileName'));
      }
    } else {
      return next(new ApiError(400, 'timeLineType should not have this value', '/body/timeLineType'));
    }
  } else {
    return next(new ApiError(400, 'timeLineType parameter required', '/body/timeLineType'));
  }

  if (req.body.subscriptionState !== undefined) {
    if (req.body.subscriptionState === subscriptionStates.PLAY
      || req.body.subscriptionState === subscriptionStates.PAUSE) {
      subscription.subscriptionState = req.body.subscriptionState;
    } else {
      return next(new ApiError(400, 'subscriptionState should not have this value', '/body/subscriptionState'));
    }
  } else {
    return next(new ApiError(400, 'subscriptionState parameter required', '/body/subscriptionState'));
  }

  if (req.body.visuSpeed !== undefined) {
    subscription.visuSpeed = req.body.visuSpeed;
  } else {
    subscription.visuSpeed = DEFAULT_VISU_SPEED;
  }

  if (req.body.visuWindow !== undefined) {
    if (req.body.visuWindow.dInf === undefined) {
      return next(new ApiError(400, 'dInf parameter required', '/body/visuWindow/dInf'));
    }
    if (req.body.visuWindow.dSup === undefined) {
      return next(new ApiError(400, 'dSup parameter required', '/body/visuWindow/dSup'));
    }
    subscription.visuWindow = req.body.visuWindow;
  } else {
    return next(new ApiError(400, 'visuWindow parameter required', '/body/visuWindow'));
  }

  if (req.body.filter !== undefined) {
    if (req.body.filter.constructor === Array) {
      subscription.filter = [];
      let cpt = 0;
      req.body.filter.forEach((reqFilter) => {
        let filter;
        if (reqFilter.dataFullName !== undefined) {
          parseDataFullName(reqFilter.dataFullName, (err, data) => {
            if (err) {
              return next(new ApiError(400, err, `/body/filter/${cpt}/dataFullName`));
            }
            filter = data;
          });
        } else {
          return next(new ApiError(400, 'dataFullName parameter required', `/body/filter/${cpt}/dataFullName`));
        }
        if (reqFilter.field !== undefined) {
          filter.field = reqFilter.field;
        } else {
          return next(new ApiError(400, 'field parameter should be an array', `/body/filter/${cpt}/field`));
        }
        if (reqFilter.operator !== undefined) {
          if (reqFilter.operator in operatorMappingObject) {
            filter.operator = reqFilter.operator;
          } else {
            return next(new ApiError(400, 'operator parameter should not have this value', `/body/filter/${cpt}/operator`));
          }
        } else {
          return next(new ApiError(400, 'operator parameter should be an array', `/body/filter/${cpt}/operator`));
        }
        if (reqFilter.value !== undefined) {
          filter.value = reqFilter.value;
        } else {
          return next(new ApiError(400, 'value parameter should be an array', `/body/filter/${cpt}/value`));
        }
        subscription.filter.push(filter);
        cpt++;
      });
    } else {
      return next(new ApiError(400, 'filter parameter should be an array', '/body/filter'));
    }
  } else {
    subscription.filter = [];
  }
  
  debug.info(`Received subscription: ${JSON.stringify(req.body, null, 4)}`);
  debug.info(`Transformed subscription: ${JSON.stringify(subscription, null, 4)}`);
  const subscriptionId = subscriptionManager.addSubscription(subscription);
  debug.info(`Subscription Id associed: ${subscriptionId} - ${typeof subscriptionId}`);
  return res.type('application/vnd.api+json').json({ subscriptionId });
};
